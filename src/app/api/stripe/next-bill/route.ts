import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    // Get customer
    const customers = await stripe.customers.list({
      email,
      limit: 1,
    });

    const customer = customers.data[0];
    if (!customer) {
      return NextResponse.json(
        { error: "Customer not found" },
        { status: 404 }
      );
    }

    // Get active subscription
    const subscriptions = await stripe.subscriptions.list({
      customer: customer.id,
      status: "active",
      limit: 1,
    });

    const subscription = subscriptions.data[0];
    if (!subscription) {
      return NextResponse.json(
        { error: "No active subscription" },
        { status: 404 }
      );
    }

    // Get upcoming invoice
    const upcomingInvoice = await stripe.invoices.retrieveUpcoming({
      customer: customer.id,
    });

    return NextResponse.json({
      amount: upcomingInvoice.amount_due,
      date: subscription.current_period_end * 1000, // Convert to milliseconds
    });
  } catch (error) {
    console.error("Error fetching next bill:", error);
    return NextResponse.json(
      { error: "Failed to fetch next bill" },
      { status: 500 }
    );
  }
}
