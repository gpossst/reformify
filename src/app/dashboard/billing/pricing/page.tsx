import BackButton from "@/app/components/Dashboard/BackButton";
import Pricing from "@/app/components/Dashboard/Pricing";
import React from "react";

function page() {
  return (
    <div className="p-4 h-full">
      <div className="flex items-center relative pb-4">
        <BackButton />
        <div className="text-foreground font-fredoka text-xl font-bold absolute left-1/2 -translate-x-1/2">
          Pricing
        </div>
      </div>
      <div className="flex justify-center h-full">
        <Pricing />
      </div>
    </div>
  );
}

export default page;
