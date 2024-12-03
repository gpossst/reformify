"use client";

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
    const backgroundColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--background")
      .trim();
    setDarkMode(backgroundColor === "#143642");
  }, [clickable]);

  const handleClick = () => {
    if (clickable) {
      router.push("/");
    }
  };

  if (!mounted) {
    return (
      <div className={pointer} onClick={handleClick}>
        <Image
          src="https://utfs.io/f/STFL4gpOFkcnBJhDzk1RwMS74yxKeDvdaC08VYptEgrbcz6n"
          alt="Formify Logo Light"
          width={Math.floor(size / 1.15)}
          height={size}
        />
      </div>
    );
  }

  return (
    <div className={pointer} onClick={handleClick}>
      {darkMode ? (
        <Image
          src="https://utfs.io/f/STFL4gpOFkcntBKcL5dVbQDo8T7RmK6aH09S5z4fXAqCGNPB"
          alt="Formify Logo Dark"
          width={Math.floor(size / 1.15)}
          height={size}
        />
      ) : (
        <Image
          src="https://utfs.io/f/STFL4gpOFkcntBKcL5dVbQDo8T7RmK6aH09S5z4fXAqCGNPB"
          alt="Formify Logo Light"
          width={Math.floor(size / 1.15)}
          height={size}
        />
      )}
    </div>
  );
}

export default Logo;
