"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";

function BackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="flex items-center gap-1 font-merriweather bg-foreground text-background px-2 py-1 rounded-md"
    >
      <MdKeyboardDoubleArrowLeft size={20} />
      Back
    </button>
  );
}

export default BackButton;
