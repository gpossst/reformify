import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { headers } from "next/headers";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature || "",
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    const client = await MongoClient.connect(process.env.MONGODB_URI!);
    const db = client.db("db1");

    switch (event.type) {
      case "checkout.session.completed": {
        const session = await stripe.checkout.sessions.retrieve(
          event.data.object.id,
          {
            expand: ["subscription", "subscription.default_payment_method"],
          }
        );

        const customerData = (await stripe.customers.retrieve(
          session.customer as string
        )) as Stripe.Customer;

        const subscription = session.subscription as Stripe.Subscription;
        const allowance = subscription?.metadata?.allowance || "50";

        await db.collection("users").updateOne(
          { email: customerData.email },
          {
            $set: {
              stripeCustomerId: customerData.id,
              subscriptionId: session.subscription?.toString(),
              allowance: parseInt(allowance),
              subscriptionStatus: "active",
              entryCount: 0,
              updateDate: new Date(),
            },
          }
        );
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerData = (await stripe.customers.retrieve(
          subscription.customer as string
        )) as Stripe.Customer;

        // Debug logs
        console.log("Subscription:", {
          quantity: subscription.items.data[0].quantity,
          metadata: subscription.metadata,
          items: subscription.items.data,
        });

        const quantity = subscription.items.data[0].quantity || 1;
        const allowance = quantity * 1000 + 50; // Convert quantity back to allowance

        console.log("Calculated values:", {
          quantity,
          allowance,
          email: customerData.email,
        });

        // Check if subscription was renewed by comparing current_period_start
        const previousAttributes = event.data
          .previous_attributes as Partial<Stripe.Subscription>;
        const wasRenewed =
          previousAttributes.current_period_start !== undefined &&
          subscription.current_period_start !==
            previousAttributes.current_period_start;

        if (subscription.cancel_at_period_end) {
          await db.collection("users").updateOne(
            { email: customerData.email },
            {
              $set: {
                subscriptionStatus: "canceling",
                cancelAt: subscription.cancel_at,
                allowance: allowance,
                lastRenewal: wasRenewed ? new Date() : undefined,
              },
            }
          );
        } else {
          await db.collection("users").updateOne(
            { email: customerData.email },
            {
              $set: {
                subscriptionStatus: subscription.status,
                allowance: allowance,
                lastRenewal: wasRenewed ? new Date() : undefined,
              },
            }
          );
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object;
        const customerData = (await stripe.customers.retrieve(
          subscription.customer as string
        )) as Stripe.Customer;

        // Check for a pending subscription (for downgrades)
        const pendingSubscriptions = await stripe.subscriptions.list({
          customer: subscription.customer as string,
          status: "trialing",
          limit: 1,
        });

        if (pendingSubscriptions.data.length === 0) {
          // No replacement subscription, reset to free tier
          await db.collection("users").updateOne(
            { email: customerData.email },
            {
              $set: {
                allowance: 50,
                subscriptionStatus: "canceled",
                entryCount: 0,
              },
              $unset: {
                subscriptionId: "",
              },
            }
          );
        }
        break;
      }
    }

    await client.close();
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 400 }
    );
  }
}
