"use client";

import React, { useState, useEffect } from "react";
import LoadIcon from "./LoadIcon";
import { useSession } from "next-auth/react";
import { Form } from "../types/form";
import DashButton from "./DashButton";
function FormsData() {
  const { data: session } = useSession();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [forms, setForms] = useState<Form[]>([]);

  useEffect(() => {
    const fetchForms = async () => {
      if (!session?.user?.email) return;

      try {
        setLoading(true);
        const response = await fetch(
          `/api/mongo/user/forms?email=${session.user.email}`,
          {
            headers: {
              "x-api-secret": process.env.NEXT_PUBLIC_API_SECRET || "",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch forms data");
        }

        const data = await response.json();
        setForms(data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      }
    };
    fetchForms();
  }, [session?.user?.email]);

  if (loading) {
    return (
      <div className="bg-foreground h-full rounded-lg flex-1 p-4 flex-col items-center">
        <div className="flex justify-start items-center">
          <h3 className="font-fredoka text-xl font-bold text-background">
            All Forms
          </h3>
        </div>
        <LoadIcon color="accent" size={20} />
      </div>
    );
  }

  return (
    <div className="h-full bg-foreground p-4 rounded-lg flex flex-col">
      <div className="flex justify-start items-center">
        <h3 className="font-fredoka text-xl font-bold text-background">
          All Forms
        </h3>
      </div>
      <div className="overflow-auto flex-1 min-h-0 mt-4">
        <table className="min-w-full divide-y divide-foreground">
          <thead className="bg-foreground sticky top-0">
            <tr className="text-background font-semibold font-merriweather shadow-lg">
              <th className="px-6 py-3 text-left text-sm text-background/70">
                Title
              </th>
              <th className="px-6 py-3 text-left text-sm text-background/70">
                Description
              </th>
              <th className="px-6 py-3 text-left text-sm text-background/70">
                Entries
              </th>
              <th className="px-6 py-3 text-left text-sm text-background/70">
                Created
              </th>
              <th className="px-6 py-3 text-left text-sm text-background/70">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y text-background font-merriweather divide-background">
            {forms.map((form: any) => (
              <tr key={form._id.toString()} className="hover:bg-background/5">
                <td className="px-6 py-4 text-sm text-background">
                  {form.title}
                </td>
                <td className="px-6 py-4 text-sm text-background">
                  {form.description}
                </td>
                <td className="px-6 py-4 text-sm text-background">
                  {form.entries?.length || 0}
                </td>
                <td className="px-6 py-4 text-sm text-background">
                  {new Date(form.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm flex gap-2">
                  <DashButton
                    link={`/dashboard/forms/${form._id.toString()}/edit`}
                    text="Edit"
                    color="background"
                  />
                  <DashButton
                    link={`/dashboard/forms/${form._id.toString()}`}
                    text="View"
                    color="background"
                  />
                </td>
              </tr>
            ))}
            {forms.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-4 text-center text-background"
                >
                  No forms found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FormsData;
