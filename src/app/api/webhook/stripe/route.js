import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { MongoClient } from "mongodb";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
const stripePriceIds = {
  medium: "price_1QKmGUIPoxnIXceCrM1XxIXf",
  large: "price_1QKmHgIPoxnIXceCczV4m0NP",
};

export async function POST(req) {
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db("db1");

  const body = await req.text();
  const headersList = await headers();
  const signature = await headersList.get("stripe-signature");

  let data;
  let eventType;
  let event;

  // verify Stripe event is legit
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error(`Webhook signature verification failed. ${err.message}`);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  data = event.data;
  eventType = event.type;

  try {
    switch (eventType) {
      case "checkout.session.completed": {
        console.log("checkout.session.completed");
        // First payment is successful and a subscription is created (if mode was set to "subscription" in ButtonCheckout)
        // ✅ Grant access to the product
        let user;
        console.log(data.object.id);
        const session = await stripe.checkout.sessions.retrieve(
          data.object.id,
          {
            expand: ["line_items"],
          }
        );
        const customerId = session?.customer;
        const customer = await stripe.customers.retrieve(customerId);
        const priceId = session?.line_items?.data[0]?.price.id;
        const plan =
          priceId === stripePriceIds.medium
            ? "medium"
            : priceId === stripePriceIds.large
            ? "large"
            : null;

        console.log(customer.email);
        console.log(plan);
        if (customer.email) {
          user = await db
            .collection("users")
            .findOne({ email: customer.email });

          if (!user) {
            user = {
              email: customer.email,
              name: customer.name,
              customerId,
            };

            await db.collection("users").insertOne(user);
          }
        } else {
          console.error("No user found");
          throw new Error("No user found");
        }

        await db
          .collection("users")
          .updateOne(
            { email: customer.email },
            { $set: { customerId, priceId, plan } }
          );
        console.log(customer.email, customerId, priceId, plan);

        // Extra: >>>>> send email to dashboard <<<<

        break;
      }

      case "customer.subscription.deleted": {
        // ❌ Revoke access to the product
        // The customer might have changed the plan (higher or lower plan, cancel soon etc...)
        const session = await stripe.checkout.sessions.retrieve(
          data.object.id,
          {
            expand: ["line_items"],
          }
        );

        const customerId = session?.customer;
        const customer = await stripe.customers.retrieve(customerId);

        await db
          .collection("users")
          .updateOne(
            { email: customer.email },
            { $set: { customerId: "", priceId: "", plan: "small" } }
          );

        break;
      }

      case "customer.subscription.updated": {
        console.log("customer.subscription.updated");

        const session = await stripe.checkout.sessions.retrieve(
          data.object.id,
          {
            expand: ["line_items"],
          }
        );

        const customerId = session?.customer;
        const customer = await stripe.customers.retrieve(customerId);

        await db
          .collection("users")
          .updateOne({ email: customer.email }, { $set: { entryCount: 0 } });

        break;
      }

      default:
      // Unhandled event type
    }
  } catch (e) {
    console.error("stripe error: " + e.message + " | EVENT TYPE: " + eventType);
  }

  return NextResponse.json({});
}
