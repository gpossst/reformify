"use client";

import React from "react";
import { useRouter } from "next/navigation";

function BillingNav() {
  const router = useRouter();
  return (
    <div>
      <button
        className="px-4 flex items-center gap-2 text-foreground text-xl font-semibold py-2 bg-accent border-accent border-2 rounded-md hover:bg-accent"
        onClick={() => router.push("/dashboard/billing/pricing")}
      >
        Pricing
      </button>
    </div>
  );
}

export default BillingNav;
