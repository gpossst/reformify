"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Form } from "@/app/types/form";
import { Entry } from "@/app/types/entry";
import BackButton from "@/app/components/BackButton";
import LoadIcon from "@/app/components/LoadIcon";
import { FaTrash } from "react-icons/fa6";
import { useRouter } from "next/navigation";

export default function Page({ params }: { params: { entryId: string } }) {
  const { data: session } = useSession();
  const [entry, setEntry] = useState<Entry | null>(null);
  const [form, setForm] = useState<Form | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // @ts-ignore
  const entryId = React.use(params).entryId;
  const router = useRouter();

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

  const handleDelete = async () => {
    setDeleting(true);

    try {
      const response = await fetch(`/api/mongo/entry/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-api-secret": process.env.NEXT_PUBLIC_API_SECRET!,
        },
        body: JSON.stringify({ entryId }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete entry");
      }

      router.push(`/dashboard/forms/form/${form?._id}`);
    } catch (error) {
      console.error("Error deleting entry:", error);
      setShowConfirm(false);
      alert("Failed to delete entry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (deleting) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-accent text-3xl font-merriweather gap-4">
        <p className="text-center">Deleting this entry...</p>
        <div className="flex justify-center">
          <LoadIcon color={"accent"} size={30} />
        </div>
      </div>
    );
  }

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
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background p-6 rounded-lg flex flex-col gap-4">
            <p className="font-merriweather text-foreground">
              Are you sure you want to delete this entry? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowConfirm(false)}
                className="font-merriweather bg-foreground text-background px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="font-merriweather bg-accent text-background px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex items-center justify-between">
        <div className="flex-1 flex justify-start">
          <BackButton />
        </div>
        <div className="font-fredoka text-xl text-center font-bold text-foreground">
          {form.title} Entry
        </div>
        <div className="flex-1 flex justify-end">
          <button
            onClick={() => setShowConfirm(true)}
            className="flex items-center justify-center gap-2 font-merriweather bg-accent text-background px-2 py-1 rounded-md hover:opacity-90 transition-opacity"
          >
            <p>Delete</p>
            <FaTrash size={16} />
          </button>
        </div>
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
