import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

export async function POST(request: NextRequest) {
  // Set CORS headers
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers":
      "Content-Type, x-apy-authorization, x-customer-id",
  };

  // Handle OPTIONS request (preflight)
  if (request.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  const sharedSecret = request.headers.get("x-apy-authorization");
  if (sharedSecret !== process.env.APYHUB_SHARED_SECRET) {
    return NextResponse.json(
      { error: "Invalid shared secret" },
      { status: 401, headers: corsHeaders }
    );
  }

  const userId = request.headers.get("x-customer-id");
  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized: No User Id" },
      { status: 401, headers: corsHeaders }
    );
  }

  // Form ID
  const { formKey } = await request.json();
  if (!formKey) {
    return NextResponse.json(
      { error: "formKey is required" },
      { status: 400, headers: corsHeaders }
    );
  }

  try {
    // Connect to MongoDB
    const client = await MongoClient.connect(process.env.MONGODB_URI!);
    const db = client.db("apyhub");

    // Find form
    const form = await db.collection("forms").findOne({ userId, formKey });
    if (!form) {
      return NextResponse.json(
        { error: "Form not found" },
        { status: 404, headers: corsHeaders }
      );
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
        ...corsHeaders,
        "x-apy-atoms": "10",
      },
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500, headers: corsHeaders }
    );
  }
}

// Export OPTIONS handler to support preflight requests
export const OPTIONS = () => {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers":
        "Content-Type, x-apy-authorization, x-customer-id",
    },
  });
};
