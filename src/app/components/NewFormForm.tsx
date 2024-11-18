"use client";
import React, { useState } from "react";
import ElementSelector from "./ElementSelector";
import { useSession } from "next-auth/react";
import LoadIcon from "./LoadIcon";
import { FaCheck } from "react-icons/fa6";
import { useRouter } from "next/navigation";

function NewFormForm() {
  const [completed, setCompleted] = useState(false);
  const [pressed, setPressed] = useState(false);
  const { data: session } = useSession();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [elements, setElements] = useState<
    { name: string; required: boolean; type: string }[]
  >([{ name: "", required: true, type: "text" }]);

  const router = useRouter();

  const validateForm = () => {
    if (!title.trim()) {
      setError("Please enter a form title");
      return false;
    }
    if (!description.trim()) {
      setError("Please enter a form description");
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

    setError(null);
    return true;
  };

  const handleSubmit = async () => {
    if (pressed) return;
    setPressed(true);

    if (!session?.user?.email) {
      setError("You must be logged in to create a form");
      return;
    }

    if (validateForm()) {
      try {
        const response = await fetch(
          `/api/mongo/form/create?email=${session.user.email}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-api-secret": process.env.NEXT_PUBLIC_API_SECRET || "",
            },
            body: JSON.stringify({
              title: title.trim(),
              description: description.trim(),
              elements: elements.map(({ name, required, type }) => ({
                name: name.trim(),
                required,
                type,
              })),
            }),
          }
        );

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Failed to create form");
        }

        const data = await response.json();
        console.log("Form created:", data);
        finish();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to create form");
      }
    } else {
      setPressed(false);
    }
  };

  const finish = () => {
    setCompleted(true);
    setTimeout(() => {
      router.push(`/dashboard/forms/`);
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-md mx-auto p-4 h-full">
      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Form Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`p-2 rounded-md bg-foreground text-background focus:outline-accent border-2 transition-all ${
            error && !title.trim() ? "border-accent" : "border-background"
          }`}
        />
        <textarea
          placeholder="Form Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className={`p-2 rounded-md bg-foreground text-background focus:outline-accent border-2 transition-all resize-none ${
            error && !description.trim() ? "border-accent" : "border-background"
          }`}
        />
      </div>
      <ElementSelector
        elements={elements}
        setElements={setElements}
        setError={setError}
      />
      <div className="min-h-[1.5rem] text-center">
        {error && <p className="text-accent text-sm">{error}</p>}
      </div>
      <button
        onClick={handleSubmit}
        className={`bg-accent text-background p-2 rounded-md hover:bg-accent/90 transition-colors text-center flex justify-center items-center ${
          pressed ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {pressed && !completed ? (
          <LoadIcon color="white" size={20} />
        ) : completed ? (
          <FaCheck size={20} />
        ) : (
          "Submit"
        )}
      </button>
    </div>
  );
}

export default NewFormForm;
