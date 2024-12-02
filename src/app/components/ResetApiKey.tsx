"use client";

import { useState } from "react";
import LoadIcon from "./LoadIcon";

interface ResetApiKeyProps {
  formId: string;
  onReset?: (newApiKey: string) => void;
}

export default function ResetApiKey({ formId, onReset }: ResetApiKeyProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = async () => {
    if (
      !confirm(
        "Are you sure you want to reset this form's API key? All existing integrations will stop working."
      )
    ) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/mongo/form/reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-secret": process.env.NEXT_PUBLIC_API_SECRET!,
        },
        body: JSON.stringify({ formId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to reset API key");
      }

      onReset?.(data.apiKey);
    } catch (error) {
      console.error("Failed to reset API key:", error);
      alert("Failed to reset API key. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const buttonClasses = `
    flex items-center gap-1 font-merriweather bg-accent text-foreground text-sm px-2 py-1 rounded-md
  `;

  return (
    <div>
      <button
        className={buttonClasses}
        onClick={handleReset}
        disabled={isLoading}
      >
        {isLoading ? (
          <LoadIcon color="background" size={16} />
        ) : (
          <>Reset API Key</>
        )}
      </button>
    </div>
  );
}
