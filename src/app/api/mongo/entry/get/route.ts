import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id: string = searchParams.get("id")!;

  const apiSecret = request.headers.get("x-api-secret");
  if (apiSecret !== process.env.NEXT_PUBLIC_API_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!id) {
    return NextResponse.json(
      { error: "ObjectId is required" },
      { status: 400 }
    );
  }
  const objectId = new ObjectId(id);

  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI!);
    const db = client.db("db1");
    const entry = await db.collection("entries").findOne({ _id: objectId });

    if (!entry) {
      return NextResponse.json({ error: "Entry not found" }, { status: 404 });
    }

    return NextResponse.json(entry);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
