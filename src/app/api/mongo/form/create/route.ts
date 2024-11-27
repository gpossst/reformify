import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const email = searchParams.get("email");

  const apiSecret = request.headers.get("x-api-secret");
  if (apiSecret !== process.env.NEXT_PUBLIC_API_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    const {
      title,
      description,
      elements,
      requireEmail,
      confirmationEmail,
      notifyOnEntry,
      sendConfirmation,
    } = await request.json();

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
      userEmail: email,
      apiKey,
      createdAt: new Date(),
      emailSettings: {
        requireEmail,
        confirmationEmail,
        notifyOnEntry,
        sendConfirmation,
      },
      title,
      description,
      elements,
    });

    await db
      .collection("users")
      .updateOne({ email }, { $inc: { formCount: 1 } });

    await client.close();

    return NextResponse.json(form);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
