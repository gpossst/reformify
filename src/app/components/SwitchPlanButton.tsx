import LoadIcon from "./LoadIcon";

interface ButtonProps {
  plan: "small" | "medium" | "large" | "enterprise";
  userPlan: string;
  planData: {
    link: string;
    priceId: string;
    price: number;
    duration: string;
  };
  email: string;
}

function SwitchPlanButton({ plan, userPlan, planData, email }: ButtonProps) {
  if (userPlan === "loading") {
    return (
      <div className="py-3 w-full flex items-center justify-center text-center gap-2 text-foreground text-lg font-semibold bg-accent border-accent border-2 rounded-md hover:bg-accent">
        <LoadIcon color="white" size={10} />
      </div>
    );
  }

  // Check if current plan matches or if plan is undefined and this is the small plan
  const isCurrentPlan =
    userPlan === plan || (userPlan === undefined && plan === "small");

  if (isCurrentPlan) {
    return (
      <div className="px-2 flex items-center bg-gray-500 justify-center text-center gap-2 text-foreground text-lg font-semibold py-2 rounded-md">
        Current Plan
      </div>
    );
  }

  return (
    <div>
      {plan === "small" ? (
        <a
          target="_blank"
          href={planData.link + "?prefilled_email=" + email}
          className="px-2 w-full flex items-center justify-center text-center gap-2 text-foreground text-lg font-semibold py-2 bg-accent rounded-md"
        >
          Switch to Small
        </a>
      ) : plan === "medium" ? (
        <a
          target="_blank"
          href={planData.link + "?prefilled_email=" + email}
          className="px-2 w-full flex items-center justify-center text-center gap-2 text-foreground text-lg font-semibold py-2 bg-accent rounded-md"
        >
          Switch to Medium
        </a>
      ) : plan === "large" ? (
        <a
          target="_blank"
          href={planData.link + "?prefilled_email=" + email}
          className="px-2 w-full flex items-center justify-center text-center gap-2 text-foreground text-lg font-semibold py-2 bg-accent rounded-md"
        >
          Switch to Large
        </a>
      ) : plan === "enterprise" ? (
        <a
          target="_blank"
          href={planData.link + "?prefilled_email=" + email}
          className="px-2 w-full flex items-center justify-center text-center gap-2 text-foreground text-lg font-semibold py-2 bg-accent rounded-md"
        >
          Contact
        </a>
      ) : null}
    </div>
  );
}

export default SwitchPlanButton;
