import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

export async function POST(request: NextRequest) {
  const sharedSecret = request.headers.get("x-apy-authorization");
  if (sharedSecret !== process.env.APYHUB_SHARED_SECRET) {
    return NextResponse.json(
      { error: "Invalid shared secret" },
      { status: 401 }
    );
  }

  const userId = request.headers.get("x-customer-id");
  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized: No User Id" },
      { status: 401 }
    );
  }

  // Form ID
  const { formKey } = await request.json();
  if (!formKey) {
    return NextResponse.json({ error: "formKey is required" }, { status: 400 });
  }

  try {
    // Connect to MongoDB
    const client = await MongoClient.connect(process.env.MONGODB_URI!);
    const db = client.db("apyhub");

    // Find form
    const form = await db.collection("forms").findOne({ userId, formKey });
    if (!form) {
      return NextResponse.json({ error: "Form not found" }, { status: 404 });
    }

    // Find entries
    const entries = await db
      .collection("entries")
      .find({ formId: new ObjectId(form._id) })
      .toArray();

    // Close connection
    await client.close();

    return NextResponse.json(entries, {
      headers: {
        "x-apy-atoms": "10",
      },
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
