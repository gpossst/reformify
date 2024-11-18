"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

interface DashButtonProps {
  link: string;
  text: string;
}

function DashButton({ link, text }: DashButtonProps) {
  const router = useRouter();
  return (
    <div>
      <button
        className="flex items-center gap-1 font-merriweather bg-foreground text-background px-2 py-1 rounded-md"
        onClick={() => router.push(link)}
      >
        {text}
        <MdKeyboardDoubleArrowRight size={20} />
      </button>
    </div>
  );
}

export default DashButton;
