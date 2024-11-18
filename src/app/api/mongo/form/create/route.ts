import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    const { title, description, elements } = await request.json();

    const client = await MongoClient.connect(process.env.MONGODB_URI!);
    const db = client.db("db1");
    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const formLimit =
      user.plan === "small"
        ? 1
        : user.plan === "medium"
        ? 10
        : user.plan === "large"
        ? 50
        : Number.POSITIVE_INFINITY; // enterprise

    if (user.formCount >= formLimit) {
      return NextResponse.json(
        { error: "Maximum form limit reached for your plan" },
        { status: 403 }
      );
    }

    const forms = db.collection("forms");
    const formId = new ObjectId();
    const apiKey = crypto
      .createHash("sha256")
      .update(formId.toString() + Date.now().toString())
      .digest("hex")
      .substring(0, 32);

    const form = await forms.insertOne({
      _id: formId,
      email,
      apiKey,
      createdAt: new Date(),
      title,
      description,
      elements,
      entries: [],
    });

    await db.collection("users").updateOne(
      { email },
      // @ts-expect-error - Gets type error for pushing ObjectId
      { $inc: { formCount: 1 }, $push: { forms: formId } }
    );

    await client.close();

    return NextResponse.json(form);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to connect to MongoDB" },
      { status: 500 }
    );
  }
}
