import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.json();
  console.log("Form Data:", formData);
  console.log("Making request to reformify.dev...");
  try {
    const response = await fetch("https://reformify.dev/api/entry/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "defa8381c60832b2975a6e7e17c0e94a",
        Origin: "https://reformify.dev",
      },
      body: JSON.stringify(formData),
    });

    const responseData = await response.json();
    console.log("Response status:", response.status);
    console.log("Response data:", responseData);

    if (response.ok) {
      return NextResponse.json({
        message: "Help request submitted successfully",
      });
    } else {
      return NextResponse.json(
        {
          error: `Failed to submit help request: ${
            responseData.error || "Unknown error"
          }`,
        },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error("Error submitting help request:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
