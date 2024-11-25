"use client";

import React, { useEffect, useState } from "react";
import LoadIcon from "./LoadIcon";
import { Form } from "../types/form";

interface FormInfoProps {
  formId: string;
}

function FormInfo({ formId }: FormInfoProps) {
  const [form, setForm] = useState<Form | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/mongo/form/get?id=${formId}`, {
          headers: {
            "x-api-secret": process.env.NEXT_PUBLIC_API_SECRET || "",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch form data");
        }

        const data = await response.json();
        setForm(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (formId) {
      fetchForm();
    }
  }, [formId]);

  if (loading) {
    return (
      <div className="h-full flex-1 bg-foreground p-4 rounded-lg flex flex-col items-center justify-center">
        <LoadIcon color="accent" size={20} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full bg-foreground p-4 rounded-lg flex flex-col">
        <div className="text-center text-background">{error}</div>
      </div>
    );
  }

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
        <div>
          <h4 className="font-bold">Description</h4>
          <p>{form.description}</p>
        </div>
      </div>
    </div>
  );
}

export default FormInfo;
