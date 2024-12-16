"use client";

import React, { useState } from "react";
import DashButton from "@/app/components/Dashboard/DashButton";
import { useSession } from "next-auth/react";
import LoadIcon from "@/app/components/Other/LoadIcon";
import { FaCheck } from "react-icons/fa";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    problem: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();

    if (!session?.user?.email || !session?.user?.name) {
      alert("You must be signed in to submit a help request");
      return;
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await fetch("/api/forms/help", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          entry: {
            email: session.user.email,
            Name: session.user.name,
            Problem: formData.problem,
            Description: formData.description,
          },
        }),
      });

      setFormData({
        problem: "",
        description: "",
      });
      console.log(response);
    } catch (error) {
      console.error("Error submitting help request:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setCompleted(true);
      setLoading(false);
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col h-full w-full gap-4 p-4">
      <div className="flex justify-between items-center">
        <div className="flex-1" />
        <div className="font-fredoka text-xl text-center font-bold text-foreground">
          Help
        </div>
        <div className="flex-1 flex justify-end">
          <DashButton link="/dashboard/account" text="Account" />
        </div>
      </div>
      <div className="flex h-full w-full gap-4">
        <div className="flex-1 bg-foreground rounded-lg p-4">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 w-full h-full justify-between"
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="font-merriweather text-background font-semibold">
                  Problem or Suggestion
                </label>
                <input
                  type="text"
                  value={formData.problem}
                  onChange={(e) =>
                    setFormData({ ...formData, problem: e.target.value })
                  }
                  className="p-2 rounded-lg text-background bg-foreground border-2 border-background font-merriweather text-sm"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-merriweather text-background font-semibold">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="p-2 rounded-lg min-h-[400px] text-background bg-foreground border-2 border-background font-merriweather text-sm"
                  style={{ resize: "none" }}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className={`w-full bg-accent text-background p-2 rounded-md hover:bg-accent/90 transition-colors text-center flex justify-center items-center ${
                loading && !completed ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading && !completed ? (
                <LoadIcon color="white" size={20} />
              ) : completed ? (
                <FaCheck size={20} />
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </div>
        <div className="flex-1 bg-foreground text-background font-merriweather flex flex-col rounded-lg gap-4 p-4">
          <div className="flex flex-col gap-2">
            <h2 className="font-fredoka text-xl font-bold">Fun Fact</h2>
            <p>This help form uses Reformify to handle your responses!</p>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="font-fredoka text-xl font-bold">The Team:</h2>
            <p>
              Reformify is maintained by one person: a college student named
              Garrett. Thanks for using the project and thanks for the feedback!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
