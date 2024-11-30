import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

export async function POST(request: NextRequest) {
  const apiSecret = request.headers.get("x-api-secret");
  if (apiSecret !== process.env.NEXT_PUBLIC_API_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { formId, title, description, elements } = await request.json();

    const client = await MongoClient.connect(process.env.MONGODB_URI!);
    const db = client.db("db1");

    // Update the form
    const formResult = await db.collection("forms").updateOne(
      { _id: new ObjectId(formId) },
      {
        $set: {
          title,
          description,
          elements,
          updatedAt: new Date(),
        },
      }
    );

    // Update all entries for this form to include the new form name
    await db.collection("entries").updateMany(
      { formId: new ObjectId(formId) },
      {
        $set: {
          formName: title,
        },
      }
    );

    await client.close();

    if (formResult.matchedCount === 0) {
      return NextResponse.json({ error: "Form not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
