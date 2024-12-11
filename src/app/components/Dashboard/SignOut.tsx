import { signOut } from "next-auth/react";
import React from "react";

export default function SignOut() {
  return (
    <div>
      <button
        className="flex items-center gap-1 font-merriweather bg-accent text-background px-2 py-1 rounded-md"
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        Sign Out
      </button>
    </div>
  );
}
