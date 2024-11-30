"use client";

import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";

export default function ChangeAllowance() {
  const { data: session } = useSession();
  const [allowance, setAllowance] = useState(0);
  const [originalAllowance, setOriginalAllowance] = useState(50);

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
      setAllowance(userData.allowance);
      setOriginalAllowance(userData.allowance);
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
    // Add confirmation logic here
    console.log("Confirmed new allowance:", allowance);
  };

  return (
    <div className="bg-foreground text-background p-6 rounded-lg shadow-md transition-all">
      <h2 className="text-2xl text-center font-bold mb-4">Change Allowance</h2>
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={handleDecrement}
          className="px-4 py-2 bg-accent text-background rounded-md hover:bg-accent/90 text-xl font-bold"
        >
          -
        </button>
        <p className="text-2xl font-bold min-w-[80px] text-center">
          {allowance}
        </p>
        <button
          onClick={handleIncrement}
          className="px-4 py-2 bg-accent text-background rounded-md hover:bg-accent/90 text-xl font-bold"
        >
          +
        </button>
      </div>
      <div className="h-[52px] mt-4 transition-all duration-300 ease-in-out overflow-hidden">
        <div className="flex justify-center">
          <button
            onClick={handleConfirm}
            disabled={allowance === originalAllowance}
            className={`flex items-center gap-2 px-4 py-2 rounded-md ${
              allowance === originalAllowance
                ? "bg-accent/50 text-background/50 cursor-not-allowed"
                : "bg-accent text-background hover:bg-accent/90"
            }`}
          >
            <FaCheck /> Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
