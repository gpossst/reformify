import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.json();
  console.log("Form Data:", formData);
  console.log("API Key:", process.env.HELP_FORM_KEY);
  try {
    const response = await fetch("http://localhost:3000/api/entry/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "0c71ac8c82c48093d4cef0382309843e",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      return NextResponse.json({
        message: "Help request submitted successfully",
      });
    } else {
      return NextResponse.json(
        { error: "Failed to submit help request" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error submitting help request:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
