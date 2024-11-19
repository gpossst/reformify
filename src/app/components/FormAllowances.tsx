import AvailableForms from "./AvailableForms";
import DashButton from "./DashButton";

function FormAllowances() {
  return (
    <div className="flex flex-1 flex-col gap-4 bg-foreground p-4 rounded-lg">
      <div className="flex justify-between items-start">
        <h3 className="font-fredoka text-xl font-bold text-background text-center">
          Form Allowances
        </h3>
        <div className="ml-auto">
          <DashButton
            link="/dashboard/billing/pricing"
            size="sm"
            color="background"
            text="Get more"
          />
        </div>
      </div>
      <div className="flex gap-4">
        <AvailableForms forms={true} />
        <AvailableForms forms={false} />
      </div>
    </div>
  );
}

export default FormAllowances;
