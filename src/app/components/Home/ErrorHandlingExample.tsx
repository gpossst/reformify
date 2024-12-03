"use client";

import { useState } from "react";

type Language = "javascript" | "python";

export default function ErrorHandlingExample() {
  const [selectedLanguage, setSelectedLanguage] =
    useState<Language>("javascript");

  const examples = {
    javascript: `try {
  const response = await fetch('https://reformify.dev/api/entry/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'YOUR_API_KEY'
    },
    body: JSON.stringify({
      entry: {
        name: "John Doe",
        email: "john@example.com"
      }
    })
  });

  const data = await response.json();

  if (!response.ok) {
    // Handle different error types
    switch (response.status) {
      case 400:
        console.error('Invalid request:', data.error);
        break;
      case 404:
        console.error('Form not found');
        break;
      case 422:
        console.error('Invalid data format:', data.error);
        break;
      case 500:
        console.error('Server error, try again later');
        break;
      default:
        console.error('An error occurred:', data.error);
    }
    return;
  }

  // Handle success
  console.log('Entry submitted:', data.entryId);
} catch (error) {
  console.error('Network error:', error);
}`,

    python: `import requests

try:
    response = requests.post(
        'https://reformify.dev/api/entry/new',
        json={
            'entry': {
                'name': 'John Doe',
                'email': 'john@example.com'
            }
        },
        headers={
            'Content-Type': 'application/json',
            'Authorization': 'YOUR_API_KEY'
        }
    )
    
    data = response.json()
    
    if not response.ok:
        # Handle different error types
        if response.status_code == 400:
            print('Invalid request:', data['error'])
        elif response.status_code == 404:
            print('Form not found')
        elif response.status_code == 422:
            print('Invalid data format:', data['error'])
        elif response.status_code == 500:
            print('Server error, try again later')
        else:
            print('An error occurred:', data['error'])
        return
        
    # Handle success
    print('Entry submitted:', data['entryId'])
    
except requests.exceptions.RequestException as error:
    print('Network error:', error)`,
  };

  return (
    <div className="font-merriweather text-foreground pb-6">
      <div className="flex justify-between items-center pb-4">
        <p>Here&apos;s an example of how to properly handle API responses:</p>
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value as Language)}
          className="bg-background text-foreground px-3 py-1 rounded-md border border-foreground/20"
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
        </select>
      </div>
      <pre className="bg-slate-400/5 p-4 rounded-lg overflow-x-auto">
        <code>{examples[selectedLanguage]}</code>
      </pre>
    </div>
  );
}
