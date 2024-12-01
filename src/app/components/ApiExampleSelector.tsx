"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Form } from "../types/form";
import LoadIcon from "./LoadIcon";
import FormRequest from "./FormRequest";
import { FormElement } from "../types/formElement";

export default function ApiExampleSelector() {
  const { data: session } = useSession();
  const [forms, setForms] = useState<Form[]>([]);
  const [selectedForm, setSelectedForm] = useState<Form | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForms = async () => {
      if (!session?.user?.email) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `/api/mongo/user/forms?email=${session.user.email}`,
          {
            headers: {
              "x-api-secret": process.env.NEXT_PUBLIC_API_SECRET!,
            },
          }
        );
        const data = await response.json();
        setForms(data);
        if (data.length > 0) {
          setSelectedForm(data[0]);
        }
      } catch (error) {
        console.error("Error fetching forms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchForms();
  }, [session]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <LoadIcon color="accent" size={30} />
      </div>
    );
  }

  // Default example if user is not signed in or has no forms
  const defaultExample = {
    elements: [
      { name: "name", type: "text", required: true },
      { name: "email", type: "email", required: true },
      { name: "message", type: "text", required: false },
    ],
    emailSettings: {
      requireEmail: true,
      notifyOnEntry: false,
      sendConfirmation: false,
      confirmationEmail: "",
    },
  };

  if (!session || forms.length === 0) {
    return (
      <FormRequest
        showLearnMore={false}
        elements={defaultExample.elements as FormElement[]}
        emailSettings={defaultExample.emailSettings}
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <select
          value={selectedForm?._id.toString() || ""}
          onChange={(e) => {
            const form = forms.find((f) => f._id.toString() === e.target.value);
            setSelectedForm(form || null);
          }}
          className="bg-background text-foreground px-3 py-1 rounded-md border border-foreground/20"
        >
          {forms.map((form) => (
            <option key={form._id.toString()} value={form._id.toString()}>
              {form.title}
            </option>
          ))}
        </select>
      </div>
      {selectedForm && (
        <FormRequest
          showLearnMore={false}
          elements={selectedForm.elements as FormElement[]}
          emailSettings={selectedForm.emailSettings}
        />
      )}
    </div>
  );
}
