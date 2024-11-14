import { NextResponse } from "next/server";
import Stripe from "stripe";

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Initialize Stripe
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2024-10-28.acacia",
    });

    // Get customer ID from user email
    const customers = await stripe.customers.list({
      email: email,
      limit: 1,
    });

    if (!customers.data.length) {
      return NextResponse.json({ transactions: [] });
    }

    // Get transactions
    const transactions = await stripe.charges.list({
      customer: customers.data[0].id,
    });

    return NextResponse.json({ transactions: transactions.data });
  } catch (error) {
    console.error("Stripe API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
};
