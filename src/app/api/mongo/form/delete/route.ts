import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

export async function DELETE(request: NextRequest) {
  const apiSecret = request.headers.get("x-api-secret");
  if (apiSecret !== process.env.NEXT_PUBLIC_API_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { formId } = await request.json();
    const client = await MongoClient.connect(process.env.MONGODB_URI!);
    const db = client.db("db1");

    // Delete the form
    const formResult = await db.collection("forms").deleteOne({
      _id: new ObjectId(formId),
    });

    // Delete all entries associated with this form
    await db.collection("entries").deleteMany({
      formId: new ObjectId(formId),
    });

    await client.close();

    if (formResult.deletedCount === 0) {
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
