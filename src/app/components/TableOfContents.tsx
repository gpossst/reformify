"use client";

import React, { useState } from "react";

const basicSections = [
  { id: "creating-a-form", title: "Creating a Form" },
  { id: "input-types", title: "Input Types" },
  { id: "submitting-to-a-form", title: "Submitting to a Form" },
  { id: "api-responses", title: "API Responses" },
];

const extraSections = [
  { id: "spam-protection", title: "Spam Protection" },
  { id: "rate-limits", title: "Rate Limits & Usage" },
  { id: "security-best-practices", title: "Security Best Practices" },
  { id: "error-handling", title: "Error Handling Examples" },
];

export default function TableOfContents() {
  const [basicsOpen, setBasicsOpen] = useState(true);
  const [extrasOpen, setExtrasOpen] = useState(true);

  return (
    <nav className="hidden lg:block sticky top-24 w-64 h-fit">
      <h4 className="font-fredoka text-2xl mb-4">Contents</h4>
      <ul className="space-y-3 font-merriweather">
        <li>
          <button
            onClick={() => setBasicsOpen(!basicsOpen)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-medium"
          >
            <span className="transform transition-transform">
              {basicsOpen ? "▼" : "▶"}
            </span>
            The Basics
          </button>
          {basicsOpen && (
            <ul className="ml-4 mt-2 space-y-2">
              {basicSections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </li>
        <li>
          <button
            onClick={() => setExtrasOpen(!extrasOpen)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-medium"
          >
            <span className="transform transition-transform">
              {extrasOpen ? "▼" : "▶"}
            </span>
            The Extras
          </button>
          {extrasOpen && (
            <ul className="ml-4 mt-2 space-y-2">
              {extraSections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </li>
        <li>
          <a
            href="#top"
            className="text-muted-foreground hover:text-foreground transition-colors font-medium"
          >
            Back to top
          </a>
        </li>
      </ul>
    </nav>
  );
}
