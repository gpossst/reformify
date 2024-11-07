"use client";

import React from "react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function Logo({ size, clickable }: { size: number; clickable: boolean }) {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [pointer, setPointer] = useState("false");

  useEffect(() => {
    if (clickable) {
      setPointer("cursor-pointer");
    } else {
      setPointer("");
    }
    // Check initial preference
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const handleClick = () => {
    if (clickable) {
      router.push("/");
    }
  };

  return (
    <div className={pointer} onClick={handleClick}>
      {darkMode ? (
        <Image
          src="/reformify_dark.png"
          alt="Formify Logo Dark"
          width={Math.floor(size / 1.15)}
          height={size}
        />
      ) : (
        <Image
          src="/reformify_light.png"
          alt="Formify Logo Light"
          width={Math.floor(size / 1.15)}
          height={size}
        />
      )}
    </div>
  );
}

export default Logo;
