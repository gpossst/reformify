"use client";

import React from "react";
import { useRouter } from "next/navigation";
import GitHubSignIn from "./GitHubSignIn";
import Logo from "./Logo";

function HomeNav() {
  const router = useRouter();
  return (
    <div className="flex text-foreground justify-between items-center p-4 font-merriweather-sans absolute top-0 w-full">
      <div className="flex gap-4 items-center">
        <div className="">
          <Logo size={50} clickable={true} />
        </div>
        <div
          className="cursor-pointer text-lg font-semibold"
          onClick={() => router.push("/documentation")}
        >
          Documentation
        </div>
        <div
          className="cursor-pointer text-lg font-semibold"
          onClick={() => router.push("/pricing")}
        >
          Pricing
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <GitHubSignIn size={0} />
      </div>
    </div>
  );
}

export default HomeNav;
