"use client";
import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import SwitchPlanButton from "./SwitchPlanButton";
import { useSession } from "next-auth/react";

export const plans = [
  // Small
  {
    link: process.env.NODE_ENV === "development" ? "" : "",
    priceId: process.env.NODE_ENV === "development" ? "" : "",
    price: 24.99,
    duration: "/month",
  },
  // Medium
  {
    link:
      process.env.NODE_ENV === "development"
        ? "https://buy.stripe.com/test_eVa007aJLfnJ3fy3cd"
        : "",
    priceId:
      process.env.NODE_ENV === "development"
        ? "price_1QKmGUIPoxnIXceCrM1XxIXf"
        : "",
    price: 24.99,
    duration: "/month",
  },
  // Large
  {
    link:
      process.env.NODE_ENV === "development"
        ? "https://buy.stripe.com/test_4gw8wD9FH8Zl5nG144"
        : "",
    priceId:
      process.env.NODE_ENV === "development"
        ? "price_1QKmHgIPoxnIXceCczV4m0NP"
        : "",

    price: 79.99,
    duration: "/month",
  },
];

function Pricing() {
  const [userPlan, setUserPlan] = useState("loading");
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchUser = async () => {
      if (!session?.user?.email) return;

      try {
        const response = await fetch(
          `/api/mongo/user?email=${session.user.email}`,
          {
            headers: {
              "x-api-secret": process.env.NEXT_PUBLIC_API_SECRET || "",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const userData = await response.json();
        setUserPlan(userData.plan);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      }
    };

    fetchUser();
  }, [session?.user?.email]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col flex-1 gap-4">
      <div className="flex-1 flex gap-4 min-h-0 overflow-auto">
        {/* Small */}
        <div className="flex-1 flex flex-col font-merriweather text-background bg-foreground p-4 rounded-md shadow-lg h-full">
          <div className="flex justify-between items-center gap-2 mb-4">
            <div className="font-fredoka font-semibold text-2xl">Small</div>
            <div className="text-3xl font-fredoka font-bold">$0</div>
          </div>
          <SwitchPlanButton
            plan="small"
            userPlan={userPlan}
            planData={plans[0]}
            email={session?.user?.email || ""}
          />
          <ul className="flex-1 flex flex-col gap-2 mt-4">
            <li className="flex items-center gap-2">
              <FaCheck size={20} />1 Form
            </li>
            <li className="flex items-center gap-2">
              <FaCheck size={20} />
              50 Entries
            </li>
          </ul>
        </div>

        {/* Medium */}
        <div className="flex-1 flex flex-col font-merriweather text-background bg-foreground p-4 rounded-md shadow-lg h-full">
          <div className="flex justify-between items-center gap-2 mb-4">
            <div className="font-fredoka font-semibold text-2xl">Medium</div>
            <div className="text-3xl font-fredoka font-bold">$24.99</div>
          </div>
          <SwitchPlanButton
            plan="medium"
            userPlan={userPlan}
            planData={plans[1]}
            email={session?.user?.email || ""}
          />
          <ul className="flex-1 flex flex-col gap-2 mt-4">
            <li className="flex items-center gap-2">
              <FaCheck size={20} />
              Up to 10 forms
            </li>
            <li className="flex items-center gap-2">
              <FaCheck size={20} />
              500 entries per month
            </li>
            <li className="flex items-center gap-2">
              <FaCheck size={20} />
              Basic analytics
            </li>
            <li className="flex items-center gap-2">
              <FaCheck size={20} />
              Spreadsheet export
            </li>
            <li className="flex items-center gap-2">
              <FaCheck size={20} />
              Email notifications
            </li>
          </ul>
        </div>

        {/* Large */}
        <div className="flex-1 flex flex-col font-merriweather text-background bg-foreground p-4 rounded-md shadow-lg h-full">
          <div className="flex justify-between items-center gap-2 mb-4">
            <div className="font-fredoka font-semibold text-2xl">Large</div>
            <div className="text-3xl font-fredoka font-bold">$79.99</div>
          </div>
          <SwitchPlanButton
            plan="large"
            userPlan={userPlan}
            planData={plans[2]}
            email={session?.user?.email || ""}
          />
          <ul className="flex-1 flex flex-col gap-2 mt-4">
            <li className="flex items-center gap-2">
              <FaCheck size={20} />
              Up to 50 forms
            </li>
            <li className="flex items-center gap-2">
              <FaCheck size={20} />
              2500 entries per month
            </li>
            <li className="flex items-center gap-2">
              <FaCheck size={20} />
              Full analytics
            </li>
            <li className="flex items-center gap-2">
              <FaCheck size={20} />
              Spreadsheet export
            </li>
            <li className="flex items-center gap-2">
              <FaCheck size={20} />
              Email notifications
            </li>
            <li className="flex items-center gap-2">
              <FaCheck size={20} />
              Weekly email summaries
            </li>
          </ul>
        </div>
      </div>
      <div className="flex-1 flex bg-foreground text-background p-4 rounded-md shadow-lg items-center justify-between">
        <div className="font-fredoka font-semibold text-2xl">Enterprise</div>
        <ul className="flex gap-2 items-center mx-auto">
          <li className="flex items-center gap-2">
            <FaCheck size={20} />
            Full access to all features
          </li>
          <li className="flex items-center gap-2">
            <FaCheck size={20} />
            More forms
          </li>
          <li className="flex items-center gap-2">
            <FaCheck size={20} />
            More entries
          </li>
        </ul>
        <div className="max-w-xs">
          <SwitchPlanButton
            plan="enterprise"
            userPlan={userPlan}
            planData={plans[2]}
            email={session?.user?.email || ""}
          />
        </div>
      </div>
    </div>
  );
}

export default Pricing;
