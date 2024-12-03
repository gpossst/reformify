"use client";
import Link from "next/link";

export default function About() {
  return (
    <div className="font-merriweather text-background bg-foreground rounded-lg p-4 w-full ">
      <h3 className="font-fredoka text-xl font-bold text-background text-start">
        About
      </h3>
      <div className="flex justify-between">
        <p className=" font-fredoka">
          This is a website by{" "}
          <a
            href="https://garrett.one"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-accent"
          >
            Garrett Post
          </a>
          .
        </p>
        <Link
          href="/legal"
          className="font-fredoka underline hover:text-accent"
        >
          Legal
        </Link>
      </div>
    </div>
  );
}
