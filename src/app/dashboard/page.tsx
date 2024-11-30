import React from "react";
import QuickLinks from "../components/QuickLinks";
import UserEntries from "../components/UserEntries";
import About from "../components/About";
import FormAllowances from "../components/FormAllowances";

function page() {
  return (
    <div className="flex flex-col h-full w-full gap-4 p-4">
      <h1 className="font-fredoka flex h-[2rem] text-xl items-center justify-center w-full font-bold text-foreground">
        Home
      </h1>
      <div className="flex flex-[3] h-full gap-4">
        <FormAllowances />
        <UserEntries />
      </div>
      <div className="flex-1 flex h-full gap-4">
        <div className="flex-1">
          <QuickLinks />
        </div>
        <div className="flex-1">
          <About />
        </div>
      </div>
    </div>
  );
}
export default page;
