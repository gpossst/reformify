"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LoadIcon from "../Other/LoadIcon";
import { useSession } from "next-auth/react";
import { Form } from "../../types/form";

function FormsData() {
  const router = useRouter();
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

  const handleRowClick = (formId: string) => {
    router.push(`/dashboard/forms/form/${formId}`);
  };

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
  if (error) {
    return (
      <div className="h-full bg-foreground p-4 rounded-lg flex flex-col">
        <div className="text-center text-background">{error}</div>
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
        <div className="flex flex-col gap-2">
          {forms.map((form: Form) => (
            <div
              key={form._id.toString()}
              onClick={() => handleRowClick(form._id.toString())}
              className="p-4 bg-background rounded-lg w-full cursor-pointer flex justify-between items-center font-merriweather text-sm"
            >
              <div className="flex w-1/3 justify-between items-center">
                <div className="font-bold text-base">{form.title}</div>
                <div>
                  {form.entryCount ? (
                    form.entryCount == 1 ? (
                      <div>{form.entryCount} entry</div>
                    ) : (
                      <div>{form.entryCount} entries</div>
                    )
                  ) : (
                    <div>0 entries</div>
                  )}
                </div>
              </div>
              <div>{new Date(form.createdAt).toLocaleDateString()}</div>
            </div>
          ))}
          {forms.length === 0 && (
            <div className="text-center text-background p-4">
              No forms found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FormsData;
