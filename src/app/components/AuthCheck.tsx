"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoadIcon from "./LoadIcon";

export default function AuthCheck() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-full">
        <LoadIcon color="accent" size={30} />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return <div className="h-0 w-0"></div>;
}
