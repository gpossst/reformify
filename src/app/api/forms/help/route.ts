import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const apiKey = request.headers.get("Authorization");
  console.log("Received API Key:", apiKey);

  if (!apiKey) {
    return NextResponse.json({ error: "API key is required" }, { status: 400 });
  }

  const formData = await request.json();
  console.log("Form Data:", formData);
  console.log("API Key:", process.env.HELP_FORM_KEY);
  try {
    const response = await fetch("https://reformify.dev/api/entry/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "defa8381c60832b2975a6e7e17c0e94a",
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
