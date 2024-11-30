import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export async function POST(request: NextRequest) {
  const apiKey = request.headers.get("Authorization");

  if (!apiKey) {
    return NextResponse.json({ error: "API key is required" }, { status: 400 });
  }

  try {
    const { entry } = await request.json();

    const client = await MongoClient.connect(process.env.MONGODB_URI!);
    const db = client.db("db1");

    console.log("API Key:", apiKey);
    const form = await db.collection("forms").findOne({ apiKey });

    if (!form) {
      return NextResponse.json({ error: "Form not found" }, { status: 404 });
    }

    const user = await db
      .collection("users")
      .findOneAndUpdate({ email: form.userEmail }, { $inc: { entryCount: 1 } });

    await db.collection("entries").insertOne({
      formId: form._id,
      formName: form.title,
      email: user?.email,
      entry,
      date: new Date(),
    });

    const out = await db.collection("forms").findOneAndUpdate(
      { _id: form._id },
      {
        $inc: { entryCount: 1 },
      },
      { returnDocument: "after" }
    );

    await client.close();

    return NextResponse.json(out);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to connect to MongoDB" },
      { status: 500 }
    );
  }
}
