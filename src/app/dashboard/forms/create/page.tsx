import BackButton from "@/app/components/Dashboard/BackButton";
import NewFormForm from "@/app/components/Dashboard/NewFormForm";
import React from "react";

function page() {
  return (
    <div className="flex flex-col h-full p-4 gap-4">
      <div className="flex justify-between items-center">
        <div className="flex-1 flex justify-start">
          <BackButton />
        </div>
        <div className="font-fredoka text-xl text-center font-bold text-foreground">
          Create Form
        </div>
        <div className="flex-1 flex justify-end items-center text-sm text-foreground font-merriweather">
          A form to create a form 😉
        </div>
      </div>
      <div className="flex flex-col flex-1 items-center justify-center text-background rounded-lg overflow-hidden">
        <NewFormForm />
      </div>
    </div>
  );
}

export default page;
