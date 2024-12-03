"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Form } from "@/app/types/form";
import BackButton from "@/app/components/Dashboard/BackButton";
import LoadIcon from "@/app/components/Other/LoadIcon";
import { useRouter } from "next/navigation";
import ElementSelector from "@/app/components/Dashboard/ElementSelector";
import { FaCheck } from "react-icons/fa6";

export default function EditForm({ params }: { params: { formId: string } }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [form, setForm] = useState<Form | null>(null);
  const [loading, setLoading] = useState(true);
  const [pressed, setPressed] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [elements, setElements] = useState<
    { name: string; required: boolean; type: string }[]
  >([]);
  const [requireEmail, setRequireEmail] = useState(false);
  const [confirmationEmail, setConfirmationEmail] = useState("");
  const [notifyOnEntry, setNotifyOnEntry] = useState(false);
  const [sendConfirmation, setSendConfirmation] = useState(false);

  // @ts-expect-error Params works
  const formId = React.use(params).formId;

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await fetch(`/api/mongo/form/get?id=${formId}`, {
          headers: {
            "x-api-secret": process.env.NEXT_PUBLIC_API_SECRET!,
          },
        });
        const data = await response.json();
        setForm(data);
        setTitle(data.title);
        setDescription(data.description || "");
        setElements(data.elements || []);
        setRequireEmail(data.requireEmail || false);
        setConfirmationEmail(data.confirmationEmail || "");
        setNotifyOnEntry(data.notifyOnEntry || false);
        setSendConfirmation(data.sendConfirmation || false);
      } catch (error) {
        console.error("Error fetching form:", error);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user) {
      fetchForm();
    }
  }, [formId, session]);

  const validateForm = () => {
    if (!title.trim()) {
      setError("Please enter a form title");
      return false;
    }
    if (!description.trim()) {
      setError("Please enter a form description");
      return false;
    }

    if (sendConfirmation && !confirmationEmail.trim()) {
      setError("Please enter confirmation email text");
      return false;
    }

    const emptyFields = elements
      .map((element, index) => ({ ...element, index: index + 1 }))
      .filter((element) => element.required && !element.name.trim())
      .map((element) => element.index);

    if (emptyFields.length > 0) {
      setError(
        `Please fill in the required name field${
          emptyFields.length > 1 ? "s" : ""
        } for element${emptyFields.length > 1 ? "s" : ""}: ${emptyFields.join(
          ", "
        )}`
      );
      return false;
    }

    const names = elements
      .map((el) => el.name.trim())
      .filter((name) => name !== "");
    const duplicates = names.filter(
      (name, index) => names.indexOf(name) !== index
    );
    if (duplicates.length > 0) {
      setError(`Duplicate element names found: ${duplicates.join(", ")}`);
      return false;
    }

    setError(null);
    return true;
  };

  const handleSubmit = async () => {
    if (pressed) return;
    setPressed(true);

    if (validateForm()) {
      try {
        const response = await fetch(`/api/mongo/form/update`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-secret": process.env.NEXT_PUBLIC_API_SECRET!,
          },
          body: JSON.stringify({
            formId,
            title: title.trim(),
            description: description.trim(),
            requireEmail,
            confirmationEmail,
            notifyOnEntry,
            sendConfirmation,
            elements: elements.map(({ name, required, type }) => ({
              name: name.trim(),
              required,
              type,
            })),
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to update form");
        }

        finish();
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Failed to update form"
        );
        setPressed(false);
      }
    } else {
      setPressed(false);
    }
  };

  const finish = () => {
    setCompleted(true);
    setTimeout(() => {
      router.push("/dashboard/forms");
    }, 1000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <LoadIcon color="accent" size={30} />
      </div>
    );
  }

  if (!form) {
    return (
      <div className="flex items-center justify-center h-full">
        Form not found
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full p-4 gap-4">
      <div className="flex justify-between items-center">
        <div className="flex-1 flex justify-start">
          <BackButton />
        </div>
        <div className="flex-1 font-fredoka text-xl text-center font-bold text-foreground">
          Edit Form
        </div>
        <div className="flex-1"></div>
      </div>
      <div className="flex flex-1 gap-4 h-[calc(100%-4rem)] overflow-hidden">
        {/* Left side */}
        <div className="flex-1 bg-foreground rounded-lg overflow-y-auto p-4">
          <div className="flex flex-col gap-4 font-merriweather">
            <div className="flex flex-col gap-1">
              <label htmlFor="form-title" className="text-background">
                Form Title
              </label>
              <input
                id="form-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`p-2 rounded-md bg-foreground text-background focus:outline-accent border-2 transition-all ${
                  error && !title.trim() ? "border-accent" : "border-background"
                }`}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="form-description" className="text-background">
                Form Description
              </label>
              <textarea
                id="form-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className={`p-2 rounded-md bg-foreground text-background focus:outline-accent border-2 transition-all resize-none ${
                  error && !description.trim()
                    ? "border-accent"
                    : "border-background"
                }`}
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="require-email"
                checked={requireEmail}
                onChange={(e) => {
                  setRequireEmail(e.target.checked);
                  if (!e.target.checked) {
                    setSendConfirmation(false);
                  }
                }}
                className="accent-accent"
              />
              <label htmlFor="require-email" className="text-background">
                Require Email from Respondents
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="notify-on-entry"
                checked={notifyOnEntry}
                onChange={(e) => setNotifyOnEntry(e.target.checked)}
                className="accent-accent"
              />
              <label htmlFor="notify-on-entry" className="text-background">
                Receive Email Notifications for New Entries
              </label>
            </div>
            {requireEmail && (
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="send-confirmation"
                  checked={sendConfirmation}
                  onChange={(e) => setSendConfirmation(e.target.checked)}
                  className="accent-accent"
                />
                <label htmlFor="send-confirmation" className="text-background">
                  Send Confirmation Email to Respondents
                </label>
              </div>
            )}
            {sendConfirmation && (
              <div className="flex flex-col gap-1">
                <label htmlFor="confirmation-email" className="text-background">
                  Confirmation Email Text
                </label>
                <textarea
                  id="confirmation-email"
                  value={confirmationEmail}
                  onChange={(e) => setConfirmationEmail(e.target.value)}
                  rows={4}
                  className={`p-2 rounded-md bg-foreground text-background focus:outline-accent border-2 transition-all resize-none ${
                    error && !confirmationEmail.trim() && sendConfirmation
                      ? "border-accent"
                      : "border-background"
                  }`}
                />
              </div>
            )}
          </div>
        </div>

        {/* Right side */}
        <div className="flex-1 overflow-y-auto">
          <ElementSelector
            elements={elements}
            setElements={setElements}
            setError={setError}
          />
        </div>
      </div>

      {/* Bottom section */}
      <div className="h-16 flex flex-col items-center justify-center mt-auto">
        <div className="min-h-[1.5rem] text-center">
          {error && <p className="text-accent text-sm">{error}</p>}
        </div>
        <button
          onClick={handleSubmit}
          className={`w-32 bg-accent text-background p-2 rounded-md hover:bg-accent/90 transition-colors text-center flex justify-center items-center ${
            pressed ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {pressed && !completed ? (
            <LoadIcon color="white" size={20} />
          ) : completed ? (
            <FaCheck size={20} />
          ) : (
            "Save"
          )}
        </button>
      </div>
    </div>
  );
}
