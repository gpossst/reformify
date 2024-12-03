"use client";

import React, { useState } from "react";
import { Form } from "../../types/form";
import ResetApiKey from "./ResetApiKey";

interface FormInfoProps {
  form: Form | null;
}

function FormInfo({ form }: FormInfoProps) {
  const [showApiKey, setShowApiKey] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleApiKeyClick = async () => {
    if (showApiKey && form?.apiKey) {
      await navigator.clipboard.writeText(form.apiKey);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setShowApiKey(false);
      }, 2000);
    } else {
      setShowApiKey(true);
    }
  };

  if (!form) {
    return (
      <div className="h-full bg-foreground p-4 rounded-lg flex flex-col">
        <div className="text-center text-background">Form not found</div>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-foreground p-4 rounded-lg font-merriweather flex flex-col">
      <div className="flex justify-start items-center">
        <h3 className="font-fredoka text-xl font-bold text-background">
          Form Details
        </h3>
      </div>
      <div className="w-full flex gap-4 flex-col overflow-auto flex-1 min-h-0 mt-4 text-background">
        <div className="flex items-center justify-between w-full">
          <div>
            <h4 className="font-bold">Title</h4>
            <p>{form.title}</p>
          </div>
          <div className="flex flex-col items-center">
            <h4 className="font-bold">Created</h4>
            <p>{new Date(form.createdAt).toLocaleDateString()}</p>
          </div>
          <div className="flex flex-col items-end">
            <h4 className="font-bold">Entries</h4>
            <p>{form.entryCount || 0}</p>
          </div>
        </div>
        <div className="flex-col gap-2">
          <h4 className="font-bold">Form API Key</h4>
          <div className="flex items-center gap-2">
            <button
              onClick={handleApiKeyClick}
              className="bg-background text-foreground px-2 py-1 rounded-md text-sm hover:bg-accent hover:text-background transition-colors"
            >
              {copied
                ? "Copied to clipboard!"
                : showApiKey
                ? form.apiKey
                : "Click to reveal"}
            </button>
            <ResetApiKey formId={form._id.toString()} />
          </div>
        </div>
        <div>
          <h4 className="font-bold">Description</h4>
          <p>{form.description}</p>
        </div>
      </div>
    </div>
  );
}

export default FormInfo;
