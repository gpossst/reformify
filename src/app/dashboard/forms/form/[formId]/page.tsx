import BackButton from "@/app/components/BackButton";
import FormEntriesGraph from "@/app/components/FormEntriesGraph";
import FormInfo from "@/app/components/FormInfo";
import React from "react";

function Page({ params }: { params: { formId: string } }) {
  const { formId } = params;

  return (
    <div className="flex flex-col h-screen p-4 w-full">
      <div className="flex flex-row pb-4">
        <BackButton />
      </div>
      <div className="flex flex-1 flex-col gap-4 mb-4">
        <div className="flex flex-1 gap-4 w-full">
          <div className="flex flex-1 bg-foreground rounded-lg">
            <FormInfo formId={formId} />
          </div>
          <div className="flex flex-[2] bg-foreground rounded-lg">
            <FormEntriesGraph formId={formId} />
          </div>
        </div>
        <div className="flex flex-[1.5] w-full bg-foreground rounded-lg"></div>
      </div>
    </div>
  );
}

export default Page;
