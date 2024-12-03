"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

export default function CancelSubscription() {
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { data: session } = useSession();

  const handleCancel = async () => {
    const email = session?.user?.email;

    try {
      setLoading(true);
      const response = await fetch(
        `/api/stripe/cancel-subscription?email=${email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to cancel subscription");
      }

      // Refresh the page to show updated status
      window.location.reload();
    } catch (error) {
      console.error("Cancel subscription error:", error);
      alert("Failed to cancel subscription. Please try again.");
    } finally {
      setLoading(false);
      setShowConfirm(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        disabled={loading}
        className={`px-2 py-1 rounded-md text-background ${
          loading
            ? "bg-red-500/50 cursor-not-allowed"
            : "bg-red-500 hover:bg-red-600"
        }`}
      >
        {loading ? "Canceling..." : "Cancel Subscription"}
      </button>

      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-background p-6 rounded-lg shadow-lg max-w-sm w-full mx-4">
            <h3 className="text-lg font-bold mb-4">Cancel Subscription</h3>
            <p className="mb-6">
              Are you sure you want to cancel your subscription?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded-md text-background bg-foreground"
              >
                No, keep it
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 rounded-md text-background bg-accent hover:bg-red-600"
              >
                Yes, cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
