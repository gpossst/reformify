"use client";

// TODO: Could work with color checking system in AvailableForms.tsx (gives console errors, but works)

import React from "react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function Logo({ size, clickable }: { size: number; clickable: boolean }) {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [pointer, setPointer] = useState("false");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (clickable) {
      setPointer("cursor-pointer");
    } else {
      setPointer("");
    }
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDarkMode(true);
    }
  }, [clickable]);

  const handleClick = () => {
    if (clickable) {
      router.push("/");
    }
  };

  if (!mounted) {
    return null;
  }

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
