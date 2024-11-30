"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Entry } from "../types/entry";
import LoadIcon from "./LoadIcon";

export default function UserEntries() {
  const { data: session } = useSession();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntries = async () => {
      if (!session?.user?.email) return;

      try {
        const response = await fetch(
          `/api/mongo/user/entries?email=${session.user.email}`,
          {
            headers: {
              "x-api-secret": process.env.NEXT_PUBLIC_API_SECRET || "",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch entries");
        }

        const data = await response.json();
        const sortedEntries = data
          .sort(
            (a: Entry, b: Entry) =>
              new Date(b.date).getTime() - new Date(a.date).getTime()
          )
          .slice(0, 10);

        setEntries(sortedEntries);
      } catch (error) {
        console.error("Error fetching entries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, [session?.user?.email]);

  if (loading) {
    return (
      <div className="bg-foreground flex-1 rounded-lg p-4 flex justify-center items-center">
        <LoadIcon color="accent" size={20} />
      </div>
    );
  }

  return (
    <div className="bg-foreground flex-1 rounded-lg p-4">
      <h3 className="font-fredoka text-xl font-bold text-background mb-4">
        Recent Entries
      </h3>
      <div className="space-y-2">
        {entries.length > 0 ? (
          <>
            {entries.map((entry) => (
              <div
                key={entry._id.toString()}
                className="bg-background rounded-lg p-3 text-foreground font-merriweather"
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold">
                    {entry.formName ||
                      `Form ${entry.formId.toString().slice(0, 8)}...`}
                  </span>
                  <span className="text-sm">
                    {new Date(entry.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
            {entries.length < 10 && (
              <div className="text-center text-background font-merriweather">
                That&apos;s all! You&apos;ve got less than 10 entries.
              </div>
            )}
          </>
        ) : (
          <div className="text-center text-background font-merriweather">
            No entries found
          </div>
        )}
      </div>
    </div>
  );
}
