"use client";

import React, { useState } from "react";
import { FormElement } from "../types/formElement";
import { FaRegCopy } from "react-icons/fa6";
import DashButton from "./DashButton";
import { Form } from "../types/form";

// Create a client-side only wrapper
function ClientFormRequest({
  elements,
  emailSettings,
}: {
  elements: FormElement[];
  emailSettings: Form["emailSettings"];
}) {
  return (
    <div className="h-full">
      <FormRequest elements={elements} emailSettings={emailSettings} />
    </div>
  );
}

// Main component becomes an internal component
function FormRequest({
  elements,
  emailSettings,
}: {
  elements: FormElement[];
  emailSettings: Form["emailSettings"];
}) {
  const [selectedLanguage, setSelectedLanguage] = useState("curl");
  const [copied, setCopied] = useState(false);

  const getCodeExample = () => {
    const payload = {
      entry: {
        ...(emailSettings.requireEmail && { email: "<email>" }),
        ...elements.reduce((acc, element) => {
          acc[element.name] = `<${element.type} value>`;
          return acc;
        }, {} as Record<string, string>),
      },
    };

    const examples = {
      curl: `curl -X POST \\
  http://localhost:3000/api/entry/new \\
  -H 'Content-Type: application/json' \\
  -H 'Authorization: YOUR_API_KEY' \\
  -d '${JSON.stringify(payload, null, 2)}'`,

      javascript: `fetch('http://localhost:3000/api/entry/new', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'YOUR_API_KEY'
  },
  body: JSON.stringify(${JSON.stringify(payload, null, 2)})
})`,

      python: `import requests

payload = ${JSON.stringify(payload, null, 2)}

response = requests.post(
    'http://localhost:3000/api/entry/new',
    json=payload,
    headers={
        'Content-Type': 'application/json',
        'Authorization': 'YOUR_API_KEY'
    }
)`,
    };

    return examples[selectedLanguage as keyof typeof examples];
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(getCodeExample());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full font-merriweather bg-foreground p-4 rounded-lg text-background">
      <div className="flex justify-between items-center">
        <h3 className="font-fredoka text-xl font-bold">API Request Example</h3>

        <div className="flex gap-2">
          <DashButton link="#" text="Learn More" size="sm" color="background" />
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="bg-background text-foreground px-2 rounded-md"
          >
            <option value="curl">cURL</option>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
          </select>
        </div>
      </div>

      <div className="flex-1 mt-4 bg-background text-foreground rounded-lg overflow-hidden min-h-0 relative">
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 p-2 hover:bg-foreground hover:text-background rounded-md transition-colors"
          title={copied ? "Copied!" : "Copy to clipboard"}
        >
          <FaRegCopy size={16} />
        </button>
        <pre className="p-4 overflow-auto whitespace-pre h-full">
          <code>{getCodeExample()}</code>
        </pre>
      </div>
    </div>
  );
}

export default ClientFormRequest;
