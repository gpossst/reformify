import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import {
  inappropriateWords,
  dangerousPatterns,
} from "@/app/lib/content-filtering";
import sgMail from "@sendgrid/mail";

function containsInappropriateContent(value: string): boolean {
  // Convert to lowercase for case-insensitive matching
  const lowerValue = value.toLowerCase();

  // Check against our set of inappropriate words
  for (const word of inappropriateWords) {
    if (lowerValue.includes(word.toLowerCase())) {
      return true;
    }
  }

  return false;
}

function containsDangerousContent(value: string): boolean {
  return dangerousPatterns.some((pattern) => pattern.test(value));
}

function sanitizeString(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}

// Add these validation constants
const MAX_STRING_LENGTH = 5000;
const MIN_DATE = new Date("1900-01-01").getTime();
const MAX_DATE = new Date("2100-01-01").getTime();
const MAX_NUMBER = 1e9;
const MIN_NUMBER = -1e9;

function validateElementValue(
  type: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any,
  required: boolean
): { isValid: boolean; error?: string } {
  // Check if required field is missing
  if (required && (value === undefined || value === null || value === "")) {
    return { isValid: false, error: "Required field is missing" };
  }

  // Check for undefined/null values
  if (!required && (value === undefined || value === null || value === "")) {
    return { isValid: true };
  }

  switch (type.toLowerCase()) {
    case "text":
      if (typeof value !== "string") {
        return { isValid: false, error: "Text field must be a string" };
      }
      if (value.length > MAX_STRING_LENGTH) {
        return {
          isValid: false,
          error: `Text cannot exceed ${MAX_STRING_LENGTH} characters`,
        };
      }
      if (value.trim().length === 0 && required) {
        return { isValid: false, error: "Text cannot be only whitespace" };
      }
      return { isValid: true };

    case "number":
      if (typeof value !== "number" || isNaN(value)) {
        return { isValid: false, error: "Number field must be a valid number" };
      }
      if (value > MAX_NUMBER || value < MIN_NUMBER) {
        return {
          isValid: false,
          error: `Number must be between ${MIN_NUMBER} and ${MAX_NUMBER}`,
        };
      }
      if (!Number.isFinite(value)) {
        return { isValid: false, error: "Number must be finite" };
      }
      return { isValid: true };

    case "email":
      if (typeof value !== "string") {
        return { isValid: false, error: "Email must be a string" };
      }
      // More comprehensive email validation
      const emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.+[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$/;
      if (!emailRegex.test(value)) {
        return { isValid: false, error: "Invalid email format" };
      }
      if (value.length > 254) {
        // Maximum email length per RFC 5321
        return { isValid: false, error: "Email is too long" };
      }
      return { isValid: true };

    case "date":
      if (typeof value !== "string") {
        return { isValid: false, error: "Date must be a string" };
      }
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(value)) {
        return { isValid: false, error: "Date must be in YYYY-MM-DD format" };
      }
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        return { isValid: false, error: "Invalid date" };
      }
      // Check if date is within reasonable range
      if (date.getTime() < MIN_DATE || date.getTime() > MAX_DATE) {
        return { isValid: false, error: "Date must be between 1900 and 2100" };
      }
      // Validate month and day are valid
      const [year, month, day] = value.split("-").map(Number);
      const monthDays = new Date(year, month, 0).getDate();
      if (month < 1 || month > 12 || day < 1 || day > monthDays) {
        return { isValid: false, error: "Invalid month or day" };
      }
      return { isValid: true };

    case "boolean":
      if (typeof value !== "boolean") {
        return { isValid: false, error: "Boolean field must be true or false" };
      }
      return { isValid: true };

    default:
      return { isValid: false, error: "Unknown field type" };
  }
}

// Add CORS headers helper function
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function corsHeaders(origin: string) {
  return {
    "Access-Control-Allow-Origin": "*", // Allow all origins
    "Access-Control-Allow-Methods": "POST, OPTIONS, GET",
    "Access-Control-Allow-Headers": "Content-Type, x-api-key",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Max-Age": "86400", // 24 hours cache
  };
}

// Handle OPTIONS request for CORS preflight
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function OPTIONS(_request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders("*"),
  });
}

export async function POST(request: NextRequest) {
  const userId = request.headers.get("x-customer-id");
  const sharedSecret = request.headers.get("x-apy-authorization");

  if (sharedSecret !== process.env.APYHUB_SHARED_SECRET) {
    return NextResponse.json(
      { error: "Invalid shared secret" },
      { status: 401 }
    );
  }

  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized: No User Id" },
      {
        status: 400,
        headers: corsHeaders("*"),
      }
    );
  }

  try {
    const { entry, formKey } = await request.json();

    // Validate entry exists and is an object
    if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
      return NextResponse.json(
        { error: "Invalid entry format" },
        { status: 400 }
      );
    }

    const client = await MongoClient.connect(process.env.MONGODB_URI!);
    const db = client.db("apyhub");

    const form = await db.collection("forms").findOne({ userId, formKey });

    if (!form) {
      await client.close();
      return NextResponse.json({ error: "Form not found" }, { status: 404 });
    }

    // Validate each form element
    for (const element of form.elements) {
      let value = entry[element.name];

      // Check for required fields first
      if (element.required) {
        if (
          value === undefined ||
          value === null ||
          (typeof value === "string" && value.trim() === "") ||
          (Array.isArray(value) && value.length === 0)
        ) {
          await client.close();
          return NextResponse.json(
            { error: `Field "${element.name}" is required` },
            { status: 400 }
          );
        }
      } else {
        // Set default values for optional fields if they're missing
        if (value === undefined || value === null) {
          switch (element.type.toLowerCase()) {
            case "text":
            case "email":
            case "date":
              entry[element.name] = "";
              value = "";
              break;
            case "number":
              entry[element.name] = null;
              value = null;
              break;
            case "boolean":
              entry[element.name] = false;
              value = false;
              break;
            default:
              entry[element.name] = null;
              value = null;
          }
        }
      }

      const validation = validateElementValue(
        element.type,
        value,
        element.required
      );

      if (!validation.isValid) {
        await client.close();
        return NextResponse.json(
          {
            error: `Invalid value for field "${element.name}": ${validation.error}`,
          },
          { status: 422 }
        );
      }

      // Sanitize string values
      if (typeof value === "string") {
        // Check for inappropriate content
        if (containsInappropriateContent(value)) {
          await client.close();
          return NextResponse.json(
            { error: "Submission contains inappropriate content" },
            { status: 422 }
          );
        }

        // Check for dangerous patterns
        if (containsDangerousContent(value)) {
          await client.close();
          return NextResponse.json(
            { error: "Submission contains potentially harmful content" },
            { status: 422 }
          );
        }

        entry[element.name] = sanitizeString(value);
      }
    }

    // Check for duplicate email submissions within 1 minute
    if (entry.email) {
      // Validate email format
      const emailValidation = validateElementValue("email", entry.email, true);
      if (!emailValidation.isValid) {
        await client.close();
        return NextResponse.json(
          { error: `Invalid email: ${emailValidation.error}` },
          { status: 422 }
        );
      }

      const oneMinuteAgo = new Date(Date.now() - 60 * 1000);
      const recentSubmission = await db.collection("entries").findOne({
        formId: form._id,
        email: entry.email,
        date: { $gte: oneMinuteAgo },
      });

      if (recentSubmission) {
        await client.close();
        return NextResponse.json(
          {
            error:
              "Please wait at least 1 minute between submissions from the same email",
          },
          { status: 429 }
        );
      }
    }

    const newEntry = await db.collection("entries").insertOne({
      formId: form._id,
      formName: form.title,
      email: entry.email,
      entry,
      date: new Date(),
    });

    await db
      .collection("forms")
      .updateOne({ _id: form._id }, { $inc: { entryCount: 1 } });

    await client.close();

    const confirmationMsg = {
      to: entry.email,
      from: {
        email: "noreply@reformify.dev",
        name: form.title,
      },
      subject: `Form Submission Confirmation - ${form.title}`,
      html:
        form.emailSettings.confirmationEmail != ""
          ? `
          <p>${form.emailSettings.confirmationEmail}</p>
          <br>
          <p>This is an automated message, please do not reply.</p>
          <p>Form services provided by <a href="https://reformify.dev">Reformify</a></p>`
          : `
        <h2>Thank you for your submission!</h2>
        <p>We've received your submission for ${form.title}.</p>
        <p>Your submission ID is: ${newEntry.insertedId}</p>
        <br>
        <p>This is an automated message, please do not reply.</p>
        <p>Form services provided by <a href="https://reformify.dev">Reformify</a></p>
      `,
    };

    const adminMsg = {
      to: form.userEmail,
      from: {
        email: "noreply@reformify.dev",
        name: "Reformify",
      },
      subject: `New Form Submission - ${form.title}`,
      html: `
        <h2>New Form Submission</h2>
        <p>A new submission has been made for ${form.title}.</p>
        <p>Submission ID: ${newEntry.insertedId}</p>
        ${entry.email ? `<p>Email: ${entry.email}</p>` : ``}
        <p>Entry: ${JSON.stringify(entry)}</p>
        <br>
        <p>This is an automated message, please do not reply.</p>
        <p>Form services provided by <a href="https://reformify.dev">Reformify</a></p>
      `,
    };

    // Move SendGrid API key setup outside of try-catch blocks
    sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

    // Consolidate email sending into a single try-catch
    try {
      const emailPromises = [];

      if (entry.email && form.emailSettings.sendConfirmation) {
        emailPromises.push(sgMail.send(confirmationMsg));
      }

      if (form.emailSettings.notifyOnEntry) {
        emailPromises.push(sgMail.send(adminMsg));
      }

      if (emailPromises.length > 0) {
        await Promise.all(emailPromises);
      }
    } catch (emailError) {
      return NextResponse.json(
        {
          error: "Failed to send emails, but the entry was submitted",
          emailError,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Entry submitted successfully",
        entryId: newEntry.insertedId,
        timestamp: new Date(),
      },
      {
        headers: {
          "x-apy-atoms": "14",
        },
      }
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to submit entry" },
      { status: 500 }
    );
  }
}
