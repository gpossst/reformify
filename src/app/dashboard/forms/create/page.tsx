import BackButton from "@/app/components/BackButton";
import NewFormForm from "@/app/components/NewFormForm";
import React from "react";

function page() {
  return (
    <div>
      <div className="flex justify-between items-center px-4 pt-4">
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
      <NewFormForm />
    </div>
  );
}

export default page;
