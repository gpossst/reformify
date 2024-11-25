import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

export async function GET(request: NextRequest) {
  // Check API secret
  const apiSecret = request.headers.get("x-api-secret");
  if (apiSecret !== process.env.NEXT_PUBLIC_API_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get email from query params
  const searchParams = request.nextUrl.searchParams;
  const formId = searchParams.get("formId");

  if (!formId) {
    return NextResponse.json({ error: "formId is required" }, { status: 400 });
  }

  try {
    // Connect to MongoDB
    const client = await MongoClient.connect(process.env.MONGODB_URI!);
    const db = client.db("db1");

    // Find entries
    const entries = await db
      .collection("entries")
      .find({ formId: new ObjectId(formId) })
      .toArray();

    // Close connection
    await client.close();

    console.log(entries);
    return NextResponse.json(entries);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
