import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function POST() {
  const headersList = headers();
  const cronSecret = (await headersList).get("x-cron-secret");

  // Verify the request is from your cron job
  if (cronSecret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI!);
    const db = client.db("db1");

    const today = new Date();
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    // Update users with updateDate = today
    await db.collection("users").updateMany(
      {
        updateDate: {
          $gte: new Date(today.setHours(0, 0, 0, 0)),
          $lt: new Date(today.setHours(23, 59, 59, 999)),
        },
      },
      {
        $set: {
          entries: 0,
          updateDate: nextMonth,
        },
      }
    );

    // Set updateDate for users without one
    await db.collection("users").updateMany(
      {
        updateDate: { $exists: false },
      },
      {
        $set: {
          updateDate: nextMonth,
        },
      }
    );

    await client.close();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Reset entries error:", error);
    return NextResponse.json(
      { error: "Failed to reset entries" },
      { status: 500 }
    );
  }
}
