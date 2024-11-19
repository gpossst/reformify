import DashButton from "@/app/components/DashButton";
import EntriesGraph from "@/app/components/EntriesGraph";
import FormAllowances from "@/app/components/FormAllowances";

function Page() {
  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="flex justify-between items-center px-4 pt-4">
        <div className="flex-1" />
        <div className="font-fredoka text-xl text-center font-bold text-foreground">
          Forms
        </div>
        <div className="flex-1 flex justify-end">
          <DashButton link="/dashboard/forms/create" text="New Form" />
        </div>
      </div>
      <div className="flex flex-col flex-1 p-4 gap-4">
        <div className="flex gap-4">
          <FormAllowances />
          <EntriesGraph />
        </div>
        <div className="bg-foreground rounded-lg flex-1"></div>
      </div>
    </div>
  );
}

export default Page;
