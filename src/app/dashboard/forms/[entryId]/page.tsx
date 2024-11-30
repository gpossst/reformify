"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Form } from "@/app/types/form";
import { Entry } from "@/app/types/entry";
import BackButton from "@/app/components/BackButton";
import LoadIcon from "@/app/components/LoadIcon";
export default function Page({ params }: { params: { entryId: string } }) {
  const { data: session } = useSession();
  const [entry, setEntry] = useState<Entry | null>(null);
  const [form, setForm] = useState<Form | null>(null);
  const [loading, setLoading] = useState(true);
  // @ts-ignore
  const entryId = React.use(params).entryId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const entryResponse = await fetch(
          `/api/mongo/entry/get?id=${entryId}`,
          {
            headers: {
              "x-api-secret": process.env.NEXT_PUBLIC_API_SECRET!,
            },
          }
        );
        const entryData = await entryResponse.json();
        setEntry(entryData);

        const formResponse = await fetch(
          `/api/mongo/form/get?id=${entryData.formId}`,
          {
            headers: {
              "x-api-secret": process.env.NEXT_PUBLIC_API_SECRET!,
            },
          }
        );
        const formData = await formResponse.json();
        setForm(formData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user) {
      fetchData();
    }
  }, [entryId, session]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <LoadIcon color={""} size={30} />
      </div>
    );
  }

  if (!entry || !form) {
    return (
      <div className="flex items-center justify-center h-full">
        Entry not found
      </div>
    );
  }
  return (
    <div className="h-full p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex-1 flex justify-start">
          <BackButton />
        </div>
        <div className="font-fredoka text-xl text-center font-bold text-foreground">
          {form.title} Entry
        </div>
        <div className="flex-1" />
      </div>

      <div className="bg-foreground rounded-lg p-4 overflow-y-auto">
        <div className="flex flex-col gap-4">
          {form.elements.map((field) => (
            <div key={field.name} className="flex flex-col gap-2">
              <label className="font-merriweather text-background text-sm">
                {field.name}
              </label>
              <div className="font-merriweather bg-background text-foreground p-4 rounded-lg">
                {entry.entry[field.name] || "N/A"}
              </div>
            </div>
          ))}
          <div className="flex flex-col gap-2">
            <label className="font-merriweather text-background text-sm">
              Submitted At
            </label>
            <div className="font-merriweather bg-background text-foreground p-4 rounded-lg">
              {new Date(entry.date).toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
