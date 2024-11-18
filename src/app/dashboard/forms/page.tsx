import DashButton from "@/app/components/DashButton";

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
    </div>
  );
}

export default Page;
