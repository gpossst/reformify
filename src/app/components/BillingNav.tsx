"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { MdKeyboardArrowRight } from "react-icons/md";

function BillingNav() {
  const router = useRouter();
  return (
    <div>
      <button
        className="px-4 flex items-center gap-1 text-foreground text-lg font-merriweather font-semibold py-2"
        onClick={() => router.push("/dashboard/billing/pricing")}
      >
        Pricing
        <MdKeyboardArrowRight size={20} />
      </button>
    </div>
  );
}

export default BillingNav;
