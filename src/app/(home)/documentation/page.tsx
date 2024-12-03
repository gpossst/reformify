import ApiExampleSelector from "@/app/components/ApiExampleSelector";
import React from "react";
import ErrorHandlingExample from "@/app/components/ErrorHandlingExample";
import TableOfContents from "@/app/components/TableOfContents";
import ToTopArrow from "@/app/components/ToTopArrow";

function page() {
  return (
    <div className="max-w-7xl mx-auto w-full">
      <div className="flex gap-8 p-4 md:p-8 lg:p-12">
        <ToTopArrow />
        <TableOfContents />
        <div className="flex-1 flex flex-col gap-8">
          <h1 className="font-fredoka text-4xl pt-12 font-bold text-foreground">
            Documentation
          </h1>

          <section id="creating-a-form">
            <h3 className="font-merriweather text-2xl text-foreground pb-4">
              Creating a Form
            </h3>
            <p className="font-merriweather text-foreground pb-6 leading-relaxed">
              Once you&apos;ve signed in, you can create a form by clicking the{" "}
              <span className="font-extrabold bg-slate-400/20 px-2 py-0.5 rounded">
                New Form
              </span>{" "}
              button in the top right of the Forms page of the dashboard or the{" "}
              <span className="font-extrabold bg-slate-400/20 px-2 py-0.5 rounded">
                New Form
              </span>{" "}
              button in the Quick Links section of the Home page of the
              dashboard. Ironically, you&apos;ll be filling out a form to create
              your form.
            </p>
            <div className="font-merriweather text-foreground pb-8">
              <h4 className="font-bold text-xl pb-4">Form Creation Fields</h4>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-slate-400/5 rounded-lg overflow-hidden">
                  <tbody>
                    <tr className="border-b border-gray-400/20 hover:bg-slate-400/10 transition-colors">
                      <td className="py-4 px-6 font-bold w-1/4">Title</td>
                      <td className="py-4 px-6 leading-relaxed">
                        The name of your form. This is used to identify the form
                        and which entries belong to it. It&apos;s also the
                        sender name for the confirmation email.
                      </td>
                    </tr>
                    <tr className="border-b border-gray-400/20 hover:bg-slate-400/10 transition-colors">
                      <td className="py-4 px-6 font-bold w-1/4">Description</td>
                      <td className="py-4 px-6 leading-relaxed">
                        A brief explanation of what the form is for and any
                        important information. This is optional, but should be
                        used to help describe in more detail what the form is
                        for.
                      </td>
                    </tr>
                    <tr className="border-b border-gray-400/20 hover:bg-slate-400/10 transition-colors">
                      <td className="py-4 px-6 font-bold w-1/4">
                        Email Settings
                      </td>
                      <td className="py-4 px-6 leading-relaxed">
                        Configure if and where you want to receive email
                        notifications when users submit responses to your form.
                      </td>
                    </tr>
                    <tr className="border-b border-gray-400/20 hover:bg-slate-400/10 transition-colors">
                      <td className="py-4 px-6 font-bold text-end w-1/4">
                        Require Email
                      </td>
                      <td className="py-4 px-6 leading-relaxed">
                        Adds an email element to the form. This is required if
                        you want to send confirmation emails to users. If this
                        is enabled, you don&apos;t need to add a custom email
                        field to the form.
                      </td>
                    </tr>
                    <tr className="border-b border-gray-400/20 hover:bg-slate-400/10 transition-colors">
                      <td className="py-4 px-6 font-bold text-end w-1/4">
                        Receive Email Notifications
                      </td>
                      <td className="py-4 px-6 leading-relaxed">
                        If you have this enabled, you&apos;ll receive an email
                        notification whenever a user submits a response to your
                        form.
                      </td>
                    </tr>
                    <tr className="border-b border-gray-400/20 hover:bg-slate-400/10 transition-colors">
                      <td className="py-4 px-6 font-bold text-end w-1/4">
                        Send Confirmation Email
                      </td>
                      <td className="py-4 px-6 leading-relaxed">
                        Sends a confirmation email to the address submitted to
                        the email element. This is only available if you&apos;ve
                        got the{" "}
                        <span className="font-extrabold bg-slate-400/20 px-2 py-0.5 rounded">
                          Require Email
                        </span>{" "}
                        option enabled. The sender name will be the form title.
                      </td>
                    </tr>
                    <tr className="border-b border-gray-400/20 hover:bg-slate-400/10 transition-colors">
                      <td className="py-4 px-6 font-bold text-end w-1/4">
                        Confirmation Email Text
                      </td>
                      <td className="py-4 px-6 leading-relaxed">
                        The custom text for the confirmation email. The email
                        will still be sent from noreply@reformify.dev with a
                        Reformify watermark, but it allows you to add a custom
                        message to the email.
                      </td>
                    </tr>
                    <tr className="border-b border-gray-400/20 hover:bg-slate-400/10 transition-colors">
                      <td className="py-4 px-6 font-bold w-1/4">Elements</td>
                      <td className="py-4 px-6 leading-relaxed">
                        Edit the data you expect for the form to take. You can
                        add as many as you&apos;d like, and they can be of
                        different types.
                      </td>
                    </tr>
                    <tr className="border-b border-gray-400/20 hover:bg-slate-400/10 transition-colors">
                      <td className="py-4 px-6 font-bold text-end w-1/4">
                        Name
                      </td>
                      <td className="py-4 px-6 leading-relaxed">
                        The name of the element. This is used to identify the
                        element in the API request. Must be unique.
                      </td>
                    </tr>
                    <tr className="border-b border-gray-400/20 hover:bg-slate-400/10 transition-colors">
                      <td className="py-4 px-6 font-bold text-end w-1/4">
                        Type
                      </td>
                      <td className="py-4 px-6 leading-relaxed">
                        Set the type of input. The options are Text, Number,
                        Email, Date, and Boolean.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-400/10 transition-colors">
                      <td className="py-4 px-6 font-bold text-end w-1/4">
                        Required
                      </td>
                      <td className="py-4 px-6 leading-relaxed">
                        If this is checked, the API will only accept responses
                        with this value included.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section id="input-types">
            <h3 className="font-merriweather text-2xl text-foreground pb-4">
              Input Types
            </h3>
            <p className="font-merriweather text-foreground pb-6 leading-relaxed">
              Each form element has a specific type that determines what kind of
              data it accepts. Here&apos;s how to format each type of input:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-slate-400/5 rounded-lg overflow-hidden mb-8">
                <thead>
                  <tr className="border-b border-gray-400/20 bg-slate-400/10">
                    <th className="py-4 px-6 text-left font-fredoka">Type</th>
                    <th className="py-4 px-6 text-left font-fredoka">Format</th>
                    <th className="py-4 px-6 text-left font-fredoka">
                      Example
                    </th>
                    <th className="py-4 px-6 text-left font-fredoka">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-400/20 hover:bg-slate-400/10 transition-colors">
                    <td className="py-4 px-6 font-bold">Text</td>
                    <td className="py-4 px-6">String</td>
                    <td className="py-4 px-6 font-mono text-sm bg-slate-400/20 rounded mx-2">
                      &quot;Hello World&quot;
                    </td>
                    <td className="py-4 px-6">Any text value</td>
                  </tr>
                  <tr className="border-b border-gray-400/20 hover:bg-slate-400/10 transition-colors">
                    <td className="py-4 px-6 font-bold">Number</td>
                    <td className="py-4 px-6">Number</td>
                    <td className="py-4 px-6 font-mono text-sm bg-slate-400/20 rounded mx-2">
                      42
                    </td>
                    <td className="py-4 px-6">Integer or decimal numbers</td>
                  </tr>
                  <tr className="border-b border-gray-400/20 hover:bg-slate-400/10 transition-colors">
                    <td className="py-4 px-6 font-bold">Email</td>
                    <td className="py-4 px-6">String</td>
                    <td className="py-4 px-6 font-mono text-sm bg-slate-400/20 rounded mx-2">
                      &quot;user@example.com&quot;
                    </td>
                    <td className="py-4 px-6">Must be a valid email format</td>
                  </tr>
                  <tr className="border-b border-gray-400/20 hover:bg-slate-400/10 transition-colors">
                    <td className="py-4 px-6 font-bold">Date</td>
                    <td className="py-4 px-6">ISO 8601 String</td>
                    <td className="py-4 px-6 font-mono text-sm bg-slate-400/20 rounded mx-2">
                      &quot;2024-03-14&quot;
                    </td>
                    <td className="py-4 px-6">YYYY-MM-DD format</td>
                  </tr>
                  <tr className="hover:bg-slate-400/10 transition-colors">
                    <td className="py-4 px-6 font-bold">Boolean</td>
                    <td className="py-4 px-6">Boolean</td>
                    <td className="py-4 px-6 font-mono text-sm bg-slate-400/20 rounded mx-2">
                      true
                    </td>
                    <td className="py-4 px-6">Must be true or false</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section id="submitting-to-a-form">
            <h3 className="font-merriweather text-2xl text-foreground pb-4">
              Submitting to a Form
            </h3>
            <p className="font-merriweather text-foreground pb-6 leading-relaxed">
              Reformify forms are simply submitted via API POST requests. The
              URL for the request is{" "}
              <span className="font-extrabold bg-slate-400/20 px-2 py-0.5 rounded">
                https://reformify.dev/api/entry/new
              </span>
              .
            </p>
            <h4 className="font-merriweather text-xl text-foreground pb-4">
              Headers
            </h4>
            <p className="font-merriweather text-foreground pb-6 leading-relaxed">
              The only header required is an Authorization header with the
              form&apos;s API key. This can be found on any form&apos;s page in
              the Form Details section. The API key is used to match the request
              to the correct form and is required for every request. DO NOT
              SHARE THIS KEY WITH ANYONE ELSE.
            </p>
            <h4 className="font-merriweather text-xl text-foreground pb-4">
              Request Body
            </h4>
            <p className="font-merriweather text-foreground pb-6 leading-relaxed">
              The request body is a JSON object with an object called{" "}
              <span className="font-extrabold bg-slate-400/20 px-2 py-0.5 rounded">
                entry
              </span>
              . This object contains all the data submitted to the form. The
              keys for each element are the names you gave them when creating
              the form.
            </p>
            <ApiExampleSelector />
          </section>

          <section id="api-responses">
            <h3 className="font-merriweather text-2xl text-foreground pb-4">
              API Responses
            </h3>
            <p className="font-merriweather text-foreground pb-6 leading-relaxed">
              The API will return different responses based on the success or
              failure of your request. Here are all possible responses:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-slate-400/5 rounded-lg overflow-hidden mb-8">
                <thead>
                  <tr className="border-b border-gray-400/20 bg-slate-400/10">
                    <th className="py-4 px-6 text-left font-fredoka">Status</th>
                    <th className="py-4 px-6 text-left font-fredoka">
                      Response
                    </th>
                    <th className="py-4 px-6 text-left font-fredoka">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-400/20 hover:bg-slate-400/10 transition-colors">
                    <td className="py-4 px-6 font-mono text-sm bg-green-400/20 rounded mx-2">
                      200 OK
                    </td>
                    <td className="py-4 px-6 font-mono text-sm">
                      {`{
  "success": true,
  "message": "Entry submitted successfully",
  "entryId": "12345...",
  "timestamp": "2024-03-14T12:00:00.000Z"
}`}
                    </td>
                    <td className="py-4 px-6 leading-relaxed">
                      Successful form submission
                    </td>
                  </tr>
                  <tr className="border-b border-gray-400/20 hover:bg-slate-400/10 transition-colors">
                    <td className="py-4 px-6 font-mono text-sm bg-red-400/20 rounded mx-2">
                      400 Bad Request
                    </td>
                    <td className="py-4 px-6 font-mono text-sm">
                      {`{
  "error": "API key is required"
}`}
                    </td>
                    <td className="py-4 px-6 leading-relaxed">
                      Missing Authorization header
                    </td>
                  </tr>
                  <tr className="border-b border-gray-400/20 hover:bg-slate-400/10 transition-colors">
                    <td className="py-4 px-6 font-mono text-sm bg-red-400/20 rounded mx-2">
                      400 Bad Request
                    </td>
                    <td className="py-4 px-6 font-mono text-sm">
                      {`{
  "error": "Invalid entry format"
}`}
                    </td>
                    <td className="py-4 px-6 leading-relaxed">
                      Request body is malformed or missing entry object
                    </td>
                  </tr>
                  <tr className="border-b border-gray-400/20 hover:bg-slate-400/10 transition-colors">
                    <td className="py-4 px-6 font-mono text-sm bg-red-400/20 rounded mx-2">
                      404 Not Found
                    </td>
                    <td className="py-4 px-6 font-mono text-sm">
                      {`{
  "error": "Form not found"
}`}
                    </td>
                    <td className="py-4 px-6 leading-relaxed">
                      Invalid API key or form doesn&apos;t exist
                    </td>
                  </tr>
                  <tr className="border-b border-gray-400/20 hover:bg-slate-400/10 transition-colors">
                    <td className="py-4 px-6 font-mono text-sm bg-red-400/20 rounded mx-2">
                      422 Unprocessable Entity
                    </td>
                    <td className="py-4 px-6 font-mono text-sm">
                      {`{
  "error": "Field \"fieldname\" is required"
}`}
                    </td>
                    <td className="py-4 px-6 leading-relaxed">
                      Missing required field
                    </td>
                  </tr>
                  <tr className="border-b border-gray-400/20 hover:bg-slate-400/10 transition-colors">
                    <td className="py-4 px-6 font-mono text-sm bg-red-400/20 rounded mx-2">
                      422 Unprocessable Entity
                    </td>
                    <td className="py-4 px-6 font-mono text-sm">
                      {`{
  "error": "Invalid value for field \"fieldname\": error details"
}`}
                    </td>
                    <td className="py-4 px-6 leading-relaxed">
                      Field validation failed
                    </td>
                  </tr>
                  <tr className="border-b border-gray-400/20 hover:bg-slate-400/10 transition-colors">
                    <td className="py-4 px-6 font-mono text-sm bg-red-400/20 rounded mx-2">
                      422 Unprocessable Entity
                    </td>
                    <td className="py-4 px-6 font-mono text-sm">
                      {`{
  "error": "Submission contains inappropriate content"
}`}
                    </td>
                    <td className="py-4 px-6 leading-relaxed">
                      Content filtering detected inappropriate content
                    </td>
                  </tr>
                  <tr className="border-b border-gray-400/20 hover:bg-slate-400/10 transition-colors">
                    <td className="py-4 px-6 font-mono text-sm bg-red-400/20 rounded mx-2">
                      422 Unprocessable Entity
                    </td>
                    <td className="py-4 px-6 font-mono text-sm">
                      {`{
  "error": "Submission contains potentially harmful content"
}`}
                    </td>
                    <td className="py-4 px-6 leading-relaxed">
                      Content filtering detected dangerous patterns
                    </td>
                  </tr>
                  <tr className="border-b border-gray-400/20 hover:bg-slate-400/10 transition-colors">
                    <td className="py-4 px-6 font-mono text-sm bg-red-400/20 rounded mx-2">
                      429 Too Many Requests
                    </td>
                    <td className="py-4 px-6 font-mono text-sm">
                      {`{
  "error": "Please wait at least 1 minute between submissions from the same email"
}`}
                    </td>
                    <td className="py-4 px-6 leading-relaxed">
                      Rate limit exceeded for email submissions
                    </td>
                  </tr>
                  <tr className="border-b border-gray-400/20 hover:bg-slate-400/10 transition-colors">
                    <td className="py-4 px-6 font-mono text-sm bg-red-400/20 rounded mx-2">
                      403 Forbidden
                    </td>
                    <td className="py-4 px-6 font-mono text-sm">
                      {`{
  "error": "Entry limit exceeded for this account"
}`}
                    </td>
                    <td className="py-4 px-6 leading-relaxed">
                      Monthly entry allowance exceeded
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-400/10 transition-colors">
                    <td className="py-4 px-6 font-mono text-sm bg-red-400/20 rounded mx-2">
                      500 Server Error
                    </td>
                    <td className="py-4 px-6 font-mono text-sm">
                      {`{
  "error": "Failed to submit entry"
}`}
                    </td>
                    <td className="py-4 px-6 leading-relaxed">
                      Internal server error
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="font-merriweather text-foreground pb-6 leading-relaxed">
              All error responses will include an{" "}
              <span className="font-mono bg-slate-400/20 px-2 py-0.5 rounded">
                error
              </span>{" "}
              field with a description of what went wrong. Success responses
              will include the updated form object with the new entry count.
            </p>
          </section>

          <section id="spam-protection">
            <h3 className="font-merriweather text-2xl text-foreground pb-4">
              Spam Protection
            </h3>
            <p className="font-merriweather text-foreground pb-6 leading-relaxed">
              Reformify provides basic spam protection by default. We filter
              text for abusive content and reject submissions with the same
              email address within a 1 minute window.
            </p>
          </section>

          <section id="rate-limits">
            <h3 className="font-merriweather text-2xl text-foreground pb-4">
              Rate Limits &amp; Usage
            </h3>
            <p className="font-merriweather text-foreground pb-6 leading-relaxed">
              Rate limits depend on your plan, but entry count is incremented
              with every successful submission. When you&apos;re nearing your
              limit, you&apos;ll receive an email. Reformify&apos;s spam
              protection isn&apos;t perfect, so make sure to implement your own
              security measures to avoid unnecessary submissions.
            </p>
          </section>

          <section id="security-best-practices">
            <h3 className="font-merriweather text-2xl text-foreground pb-4">
              Security Best Practices
            </h3>
            <div className="font-merriweather text-foreground pb-6 leading-relaxed">
              <ul className="list-disc pl-6 space-y-4">
                <li>
                  <span className="font-bold">Never expose your API key</span> -
                  Keep it server-side and never include it in client-side code
                  or public repositories.
                </li>
                <li>
                  <span className="font-bold">Validate input data</span> -
                  Always validate user input before sending it to the API to
                  ensure it matches the expected format.
                </li>
                <li>
                  <span className="font-bold">Use HTTPS</span> - Always use
                  HTTPS when making requests to ensure data is encrypted in
                  transit.
                </li>
                <li>
                  <span className="font-bold">Implement rate limiting</span> -
                  Add rate limiting on your end to prevent abuse of your form
                  endpoints.
                </li>
              </ul>
            </div>
          </section>

          <section id="error-handling">
            <h3 className="font-merriweather text-2xl text-foreground pb-4">
              Error Handling Examples
            </h3>
            <ErrorHandlingExample />
          </section>
        </div>
      </div>
      <footer className="text-center text-sm text-foreground p-4">
        &copy; {new Date().getFullYear()} Reformify
      </footer>
    </div>
  );
}

export default page;
