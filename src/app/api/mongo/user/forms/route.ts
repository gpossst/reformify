import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export async function GET(request: NextRequest) {
  // Check API secret
  const apiSecret = request.headers.get("x-api-secret");
  if (apiSecret !== process.env.NEXT_PUBLIC_API_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get email from query params
  const searchParams = request.nextUrl.searchParams;
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    // Connect to MongoDB
    const client = await MongoClient.connect(process.env.MONGODB_URI!);
    const db = client.db("db1");

    // Find forms
    const forms = await db
      .collection("forms")
      .find({ userEmail: email })
      .toArray();

    // Close connection
    await client.close();

    return NextResponse.json(forms);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
