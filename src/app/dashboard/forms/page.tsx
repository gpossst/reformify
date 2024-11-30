import DashButton from "@/app/components/DashButton";
import EntriesGraph from "@/app/components/EntriesGraph";
import FormAllowances from "@/app/components/FormAllowances";
import FormsData from "@/app/components/FormsData";

function Page() {
  return (
    <div className="flex-1 flex flex-col h-full overflow-auto">
      <div className="flex justify-between items-center px-4 pt-4 flex-shrink-0">
        <div className="flex-1" />
        <div className="font-fredoka text-xl text-center font-bold text-foreground">
          Forms
        </div>
        <div className="flex-1 flex justify-end">
          <DashButton link="/dashboard/forms/create" text="New Form" />
        </div>
      </div>
      <div className="flex flex-col flex-1 p-4 gap-4 overflow-auto">
        <div className="flex flex-1 gap-4 flex-shrink-0">
          <FormAllowances />
          <EntriesGraph />
        </div>
        <div className="flex-1 min-h-0">
          <FormsData />
        </div>
      </div>
    </div>
  );
}

export default Page;
