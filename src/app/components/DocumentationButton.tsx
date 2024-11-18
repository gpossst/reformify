"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

function DocumentationButton() {
  const router = useRouter();
  return (
    <button
      className="cursor-pointer font-merriweather text-lg flex items-center gap-1 border-2 border-foreground rounded-md px-4 py-2 hover:bg-foreground hover:text-background transition-all duration-300 shadow-2xl"
      onClick={() => router.push("/docs")}
    >
      <div className="h-[30px] flex items-center">Documentation</div>
      <MdKeyboardDoubleArrowRight />
    </button>
  );
}

export default DocumentationButton;
