import BackButton from "@/app/components/BackButton";
import Pricing from "@/app/components/Pricing";
import React from "react";

function page() {
  return (
    <div className="p-4 h-full">
      <div className="flex items-center relative pb-4">
        <BackButton />
        <div className="text-foreground font-fredoka text-xl font-bold absolute left-1/2 -translate-x-1/2">
          Plans
        </div>
      </div>
      <Pricing />
    </div>
  );
}

export default page;
