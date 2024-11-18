"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import LoadIcon from "./LoadIcon";
function BillingHistory() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [transactions, setTransactions] = useState<any[]>([]);
  const { data: session } = useSession();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchTransactions() {
      if (session?.user?.email) {
        const response = await fetch(
          `/api/stripe/transactions?email=${session.user.email}`
        );
        const data = await response.json();
        setTransactions(data.transactions || []);
      }
      setLoading(false);
    }

    fetchTransactions();
  }, [session]);

  return (
    <div className="h-full flex flex-col p-4">
      <div className="bg-foreground text-background p-4 font-merriweather rounded-xl flex-1 flex flex-col min-h-0">
        {/* Fixed Header */}
        <div className="grid grid-cols-3 gap-4 pb-2">
          <div className="font-bold">Date</div>
          <div className="font-bold">Amount</div>
          <div className="font-bold">Status</div>
        </div>

        {loading ? <LoadIcon color="accent" size={20} /> : null}

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 min-h-0">
          <div className="grid grid-cols-3 gap-4">
            {transactions.map((transaction) => (
              <React.Fragment key={transaction.id}>
                <div>
                  {new Date(transaction.created * 1000).toLocaleDateString()}
                </div>
                <div>${(transaction.amount / 100).toFixed(2)}</div>
                <div>{transaction.status}</div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BillingHistory;
