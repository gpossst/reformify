import BillingHistory from "@/app/components/BillingHistory";
import DashButton from "@/app/components/DashButton";
import React from "react";

function page() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center px-4 pt-4">
        <div className="flex-1" />
        <div className="font-fredoka text-xl text-center font-bold text-foreground">
          Billing
        </div>
        <div className="flex-1 flex justify-end">
          <DashButton link="/dashboard/billing/pricing" text="Pricing" />
        </div>
      </div>
      <div className="flex-1 min-h-0">
        <BillingHistory />
      </div>
    </div>
  );
}

export default page;
