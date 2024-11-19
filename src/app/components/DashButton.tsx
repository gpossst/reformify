"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

interface DashButtonProps {
  link: string;
  text: string;
  size?: "sm" | "md" | "lg";
  color?: "foreground" | "background";
}

function DashButton({ link, text, size, color }: DashButtonProps) {
  const router = useRouter();

  if (size == "sm") {
    return (
      <div>
        <button
          className={`flex items-center text-sm gap-1 font-merriweather ${
            color == "background"
              ? "bg-background text-foreground"
              : "bg-foreground text-background"
          } px-2 py-1 rounded-md`}
          onClick={() => router.push(link)}
        >
          {text}
          <MdKeyboardDoubleArrowRight size={16} />
        </button>
      </div>
    );
  }

  return (
    <div>
      <button
        className={`flex items-center gap-1 font-merriweather ${
          color == "background"
            ? "bg-background text-foreground"
            : "bg-foreground text-background"
        } px-2 py-1 rounded-md`}
        onClick={() => router.push(link)}
      >
        {text}
        <MdKeyboardDoubleArrowRight size={20} />
      </button>
    </div>
  );
}

export default DashButton;
