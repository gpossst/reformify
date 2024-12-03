import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const customerId = searchParams.get("customerId");
    const { allowance } = await req.json();

    if (!customerId) {
      return NextResponse.json(
        { error: "Customer ID is required" },
        { status: 400 }
      );
    }

    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      limit: 1,
    });

    if (subscriptions.data.length === 0) {
      return NextResponse.json(
        { error: "No active subscription found" },
        { status: 404 }
      );
    }

    const subscription = subscriptions.data[0];
    const subscriptionItem = subscription.items.data[0];

    // Calculate quantity based on allowance
    const quantity = Math.ceil((allowance - 50) / 1000);

    // Update subscription item with new price
    const updatedSubscriptionItem = await stripe.subscriptionItems.update(
      subscriptionItem.id,
      {
        price: process.env.STRIPE_PRICE_ID!, // Using the price ID from env
        quantity,
      }
    );

    return NextResponse.json({ subscriptionItem: updatedSubscriptionItem });
  } catch (error) {
    console.error("Error updating subscription:", error);
    return NextResponse.json(
      { error: "Failed to update subscription" },
      { status: 500 }
    );
  }
}
