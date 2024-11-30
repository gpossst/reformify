"use client";

import React from "react";
import Link from "next/link";

function QuickLinks() {
  return (
    <div className="flex-1 flex flex-col gap-4 bg-foreground rounded-lg p-4">
      <h3 className="font-fredoka text-xl font-bold text-background text-start">
        Quick Links
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <Link
          href="/dashboard/forms/new"
          className="flex items-center justify-center p-4 bg-accent text-foreground rounded-lg font-merriweather hover:opacity-90 transition-opacity"
        >
          New Form
        </Link>
        <Link
          href="/dashboard/forms"
          className="flex items-center justify-center p-4 bg-accent text-foreground rounded-lg font-merriweather hover:opacity-90 transition-opacity"
        >
          All Forms
        </Link>
        <Link
          href="/dashboard/billing/pricing"
          className="flex items-center justify-center p-4 bg-accent text-foreground rounded-lg font-merriweather hover:opacity-90 transition-opacity"
        >
          Pricing
        </Link>
        <Link
          href="/documentation"
          className="flex items-center justify-center p-4 bg-accent text-foreground rounded-lg font-merriweather hover:opacity-90 transition-opacity"
        >
          Documentation
        </Link>
      </div>
    </div>
  );
}

export default QuickLinks;
