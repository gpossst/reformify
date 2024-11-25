"use client";

import React, { useEffect, useState } from "react";
import BackButton from "./BackButton";
import FormEntriesGraph from "./FormEntriesGraph";
import FormInfo from "./FormInfo";
import { Entry } from "../types/entry";
import { useSession } from "next-auth/react";
import LoadIcon from "./LoadIcon";
import EntriesList from "./EntriesList";
import { useRouter } from "next/navigation";
import FormRequest from "./FormRequest";
import { FaPencil } from "react-icons/fa6";
import { Form } from "../types/form";

interface FormPageContentProps {
  formId: string;
}

function FormPageContent({ formId }: FormPageContentProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [form, setForm] = useState<Form | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!session?.user?.email) return;

      try {
        setLoading(true);

        // Fetch form data
        const formResponse = await fetch(`/api/mongo/form/get?id=${formId}`, {
          headers: {
            "x-api-secret": process.env.NEXT_PUBLIC_API_SECRET || "",
          },
        });

        if (!formResponse.ok) {
          throw new Error("Failed to fetch form data");
        }

        // Fetch entries data
        const entriesResponse = await fetch(
          `/api/mongo/form/get/entries?formId=${formId}`,
          {
            headers: {
              "x-api-secret": process.env.NEXT_PUBLIC_API_SECRET || "",
            },
          }
        );

        if (!entriesResponse.ok) {
          throw new Error("Failed to fetch entries data");
        }

        const [formData, entriesData] = await Promise.all([
          formResponse.json(),
          entriesResponse.json(),
        ]);

        setForm(formData);
        setEntries(entriesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [formId, session?.user?.email]);

  if (loading) {
    return (
      <div className="flex flex-col h-screen p-4 w-full items-center justify-center">
        <LoadIcon color="accent" size={20} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col h-screen p-4 w-full items-center justify-center text-foreground">
        {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex flex-row justify-between items-center p-4">
        <BackButton />
        <button
          onClick={() => router.push(`/dashboard/forms/edit/${formId}`)}
          className="flex items-center justify-center gap-2 font-merriweather bg-foreground text-background px-2 py-1 rounded-md"
        >
          <p>Edit</p>
          <FaPencil size={16} />
        </button>
      </div>
      <div className="flex flex-1 flex-col gap-4 px-4 pb-4 min-h-0">
        <div className="flex flex-1 gap-4 w-full min-h-0">
          <div className="flex flex-1 bg-foreground rounded-lg min-h-0">
            <FormInfo form={form} />
          </div>
          <div className="flex flex-[2] bg-foreground rounded-lg h-full min-h-0">
            <FormEntriesGraph entries={entries} />
          </div>
        </div>
        <div className="flex-[1.5] flex min-h-0 gap-4">
          <div className="flex-1">
            <EntriesList entries={entries} />
          </div>
          <div className="flex-1 bg-foreground rounded-lg h-full max-h-full">
            {/* @ts-expect-error FormElement exists but isn't working here */}
            <FormRequest elements={form?.elements || []} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormPageContent;
