import AvailableForms from "./AvailableForms";

function FormAllowances() {
  return (
    <div className="flex flex-1 gap-4 bg-foreground p-4 rounded-lg">
      <AvailableForms forms={true} />
      <AvailableForms forms={false} />
    </div>
  );
}

export default FormAllowances;
