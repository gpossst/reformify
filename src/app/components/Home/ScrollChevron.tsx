"use client";

import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

export default function ScrollChevron() {
  const [hasScrolled, setHasScrolled] = useState(false);

  if (typeof window !== "undefined") {
    window.onscroll = () => {
      setHasScrolled(window.scrollY > 0);
    };
  }

  return (
    <div className="fixed bottom-8 sm:bottom-10 md:bottom-12 animate-bounce cursor-pointer hover:text-accent transition-colors left-1/2 -translate-x-1/2 z-50">
      <FaChevronDown
        className={`text-2xl sm:text-3xl md:text-4xl ${
          hasScrolled ? "opacity-0" : "opacity-100"
        } transition-opacity duration-300`}
        aria-label="Scroll down for more information"
      />
    </div>
  );
}
