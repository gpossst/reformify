import { NextRequest, NextResponse } from "next/server";

// Add CORS headers helper function
function corsHeaders(origin: string) {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400", // 24 hours cache
  };
}

// Handle OPTIONS request for CORS preflight
export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get("origin") ?? "*";

  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders(origin),
  });
}

export async function POST(req: NextRequest) {
  try {
    // Get the requesting origin
    const origin = req.headers.get("origin") ?? "*";

    const formData = await req.json();
    console.log("Form Data:", formData);
    console.log("Making request to reformify.dev...");

    const response = await fetch("https://reformify.dev/api/entry/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "defa8381c60832b2975a6e7e17c0e94a",
        Origin: "https://reformify.dev",
      },
      body: JSON.stringify({ entry: formData }),
    });

    const responseData = await response.json();

    // Return response with CORS headers
    return NextResponse.json(
      response.ok
        ? {
            message: "Help request submitted successfully",
            response: responseData,
          }
        : { error: "Failed to submit help request", details: responseData },
      {
        status: response.status,
        headers: corsHeaders(origin),
      }
    );
  } catch (error) {
    console.error("Error in help request handler:", error);

    // Return error with CORS headers
    return NextResponse.json(
      {
        error: "An error occurred",
        details: error instanceof Error ? error.message : String(error),
      },
      {
        status: 500,
        headers: corsHeaders(req.headers.get("origin") ?? "*"),
      }
    );
  }
}
