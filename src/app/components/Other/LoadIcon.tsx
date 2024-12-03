import React from "react";
import { BeatLoader } from "react-spinners";

interface LoadIconProps {
  color: string;
  size: number;
}

function LoadIcon({ color, size }: LoadIconProps) {
  return (
    <div className="flex justify-center items-center h-full">
      {color === "accent" ? (
        <BeatLoader color="#ef6461" size={size} />
      ) : (
        <BeatLoader color="#dad2d8" size={size} />
      )}
    </div>
  );
}

export default LoadIcon;
