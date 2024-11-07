"use client";

import { FaGithub } from "react-icons/fa";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function GitHubSignIn({ size }: { size: number }) {
  const { data: session } = useSession();
  const router = useRouter();

  if (size == 1) {
    return session ? (
      <button onClick={() => router.push("/dashboard")}>Dashboard</button>
    ) : (
      <button
        className="px-4 flex items-center gap-2 text-foreground text-xl font-semibold py-2 bg-accent border-accent border-2 rounded-md hover:bg-accent"
        onClick={() =>
          signIn("github", { callbackUrl: "/dashboard", redirect: true })
        }
      >
        <FaGithub className="text-foreground" size={30} />
        Sign in with GitHub
      </button>
    );
  } else {
    {
      return session ? (
        <button onClick={() => router.push("/dashboard")}>Dashboard</button>
      ) : (
        <button
          className="px-2 flex items-center gap-2 text-foreground text-lg font-semibold py-1 bg-accent border-accent border-2 rounded-md hover:bg-accent"
          onClick={() =>
            signIn("github", { callbackUrl: "/dashboard", redirect: true })
          }
        >
          <FaGithub className="text-foreground" size={24} />
          Sign in with GitHub
        </button>
      );
    }
  }
}
