"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import LoadIcon from "./LoadIcon";

export default function NextBill() {
  const { data: session } = useSession();
  const [nextBill, setNextBill] = useState<{
    amount: number;
    date: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNextBill = async () => {
      if (!session?.user?.email) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `/api/stripe/next-bill?email=${session.user.email}`
        );
        const data = await response.json();
        setNextBill(data);
      } catch (error) {
        console.error("Error fetching next bill:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNextBill();
  }, [session]);

  if (loading) {
    return <LoadIcon color="accent" size={20} />;
  }

  if (!nextBill) {
    return null;
  }

  return (
    <div className="bg-foreground rounded-lg p-4">
      <div className="flex justify-start items-center">
        <h3 className="font-fredoka text-xl font-bold text-background">
          Next Bill
        </h3>
      </div>
      <div className="text-background font-merriweather grid grid-cols-2 gap-1 pt-2">
        <div className="font-bold">Amount</div>
        <div className="font-bold">Date</div>
        <div>${(nextBill.amount / 100).toFixed(2)}</div>
        <div>{new Date(nextBill.date).toLocaleDateString()}</div>
      </div>
    </div>
  );
}
