import ChangeAllowance from "./ChangeAllowance";

function Pricing() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center pb-24 min-h-full">
      <div className="flex flex-col items-center gap-8 sm:gap-10 md:gap-12 max-w-6xl w-full mx-auto">
        <div className="relative w-full flex flex-col md:flex-row justify-center items-center gap-6 sm:gap-7 md:gap-8 px-4 sm:px-5 md:px-6">
          <div className="w-full md:w-[300px]">
            <ChangeAllowance />
          </div>
          <div className="flex flex-col items-center gap-4 sm:gap-5 md:gap-6 p-6 sm:p-7 md:p-8 bg-foreground text-background rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 w-full max-w-[500px]">
            <h3 className="text-3xl sm:text-3xl md:text-4xl font-fredoka font-bold">
              Free
            </h3>
            <div className="text-4xl sm:text-5xl md:text-6xl font-fredoka font-bold">
              $0
            </div>
            <ul className="flex flex-col gap-3 sm:gap-3 md:gap-4 text-lg sm:text-xl md:text-xl font-merriweather text-center">
              <li>50 submissions</li>
              <li>Unlimited forms</li>
              <li>All features included</li>
            </ul>
          </div>
          <div className="w-full md:w-[300px] flex flex-col items-center gap-3 sm:gap-3 md:gap-4 p-4 sm:p-5 md:p-6 bg-accent text-foreground rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300">
            <div className="text-2xl sm:text-2xl md:text-3xl font-fredoka font-bold">
              +$5
            </div>
            <div className="text-lg sm:text-lg md:text-xl font-merriweather text-center">
              per additional 1000 submissions
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
