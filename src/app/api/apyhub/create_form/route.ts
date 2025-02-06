import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

export async function POST(request: NextRequest) {
  const userId = request.headers.get("x-customer-id");

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const {
      formKey,
      title,
      description,
      elements,
      requireEmail,
      confirmationEmail,
      notifyOnEntry,
      sendConfirmation,
    } = await request.json();

    const client = await MongoClient.connect(process.env.MONGODB_URI!);
    const db = client.db("apyhub");

    const forms = db.collection("forms");
    const formId = new ObjectId();

    const isFormKeyUnique = await forms.findOne({
      formKey,
      userId,
    });

    if (isFormKeyUnique) {
      return NextResponse.json(
        { error: "Form key already exists" },
        { status: 400 }
      );
    }

    const form = await forms.insertOne({
      _id: formId,
      userId,
      formKey,
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

    await client.close();

    return NextResponse.json(form);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
