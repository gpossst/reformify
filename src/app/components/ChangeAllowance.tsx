"use client";

import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { useRouter } from "next/navigation";

export default function ChangeAllowance() {
  const { data: session } = useSession();
  const router = useRouter();
  const [allowance, setAllowance] = useState(50);
  const [originalAllowance, setOriginalAllowance] = useState(50);
  const [loading, setLoading] = useState(false);
  const [customerId, setCustomerId] = useState("");
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (!session?.user?.email) return;
      const response = await fetch(
        `/api/mongo/user?email=${session.user.email}`,
        {
          headers: {
            "x-api-secret": process.env.NEXT_PUBLIC_API_SECRET || "",
          },
        }
      );
      const userData = await response.json();
      setAllowance(userData.allowance || 50);
      setOriginalAllowance(userData.allowance || 50);
      setCustomerId(userData.stripeCustomerId || "");
    };

    fetchUser();
  }, [session?.user?.email]);

  const handleIncrement = () => {
    setAllowance((prev) => prev + 1000);
  };

  const handleDecrement = () => {
    setAllowance((prev) => Math.max(50, prev - 1000));
  };

  const handleConfirm = async () => {
    try {
      setLoading(true);
      const endpoint =
        originalAllowance === 50 && customerId
          ? `/api/stripe/create-checkout-session?email=${session?.user?.email}`
          : `/api/stripe/update-subscription?customerId=${customerId}`;

      const response = await fetch(`${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          allowance,
        }),
      });

      const { sessionUrl } = await response.json();
      if (sessionUrl) {
        window.location.href = sessionUrl;
      } else {
        setShowUpdateModal(true);
      }
    } catch (error) {
      console.error("Subscription error:", error);
    } finally {
      setLoading(false);
    }
  };

  const totalPrice =
    allowance == 50 ? 0 : Math.ceil((allowance - 50) / 1000) * 5;

  return (
    <>
      <div className="bg-foreground text-background p-6 rounded-lg shadow-md transition-all">
        <h2 className="text-2xl text-center font-bold mb-4">
          Change Allowance
        </h2>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={handleDecrement}
            className="px-4 py-2 bg-accent text-background rounded-md hover:bg-accent/90 text-xl font-bold"
          >
            -
          </button>
          <p className="text-2xl font-bold min-w-[80px] text-center">
            {allowance.toLocaleString()}
          </p>
          <button
            onClick={handleIncrement}
            className="px-4 py-2 bg-accent text-background rounded-md hover:bg-accent/90 text-xl font-bold"
          >
            +
          </button>
        </div>
        <p className="text-center mt-2 font-merriweather text-sm">
          ${totalPrice}/mo
        </p>
        <div className="h-[52px] mt-4 transition-all duration-300 ease-in-out overflow-hidden">
          <div className="flex justify-center">
            <button
              onClick={handleConfirm}
              disabled={allowance === originalAllowance || loading}
              className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                allowance === originalAllowance || loading
                  ? "bg-accent/50 text-background/50 cursor-not-allowed"
                  : "bg-accent text-background hover:bg-accent/90"
              }`}
            >
              <FaCheck /> {loading ? "Processing..." : "Confirm"}
            </button>
          </div>
        </div>
      </div>

      {showUpdateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
            <p className="text-foreground mb-6 text-center">
              Your subscription has been updated!{" "}
              {originalAllowance === 50
                ? "Additional charges will be added to next month's subscription proportional to the changes you made this month."
                : "Additional charges will be added to next month's subscription proportional to the changes you made this month."}
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => {
                  setShowUpdateModal(false);
                  router.push("/dashboard");
                }}
                className="px-4 py-2 bg-accent text-background rounded-md hover:bg-accent/90"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
