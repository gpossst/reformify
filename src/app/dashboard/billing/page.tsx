import BillingHistory from "@/app/components/BillingHistory";
import DashButton from "@/app/components/DashButton";
import CancelSubscription from "@/app/components/CancelSubscription";
import React from "react";
import NextBill from "@/app/components/NextBill";

function page() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center px-4 pt-4">
        <div className="flex-1" />
        <div className="font-fredoka text-xl text-center font-bold text-foreground">
          Billing
        </div>
        <div className="flex-1 flex justify-end gap-2">
          <CancelSubscription />
          <DashButton link="/dashboard/billing/pricing" text="Pricing" />
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-4 min-h-0 px-4 p-4">
        <NextBill />
        <BillingHistory />
      </div>
    </div>
  );
}

export default page;
