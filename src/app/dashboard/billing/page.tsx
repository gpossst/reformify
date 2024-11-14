import BillingHistory from "@/app/components/BillingHistory";
import BillingNav from "@/app/components/BillingNav";
import React from "react";

function page() {
  return (
    <div className="h-full">
      <div className="flex justify-between items-center px-12 pt-4">
        <div className="text-3xl font-semibold font-fredoka">Billing</div>
        <BillingNav />
      </div>
      <BillingHistory />
    </div>
  );
}

export default page;
