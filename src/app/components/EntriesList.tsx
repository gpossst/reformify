"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Entry } from "../types/entry";

function EntriesList({ entries }: { entries: Entry[] }) {
  const router = useRouter();

  const handleRowClick = (entryId: string) => {
    router.push(`/dashboard/entries/${entryId}}`);
  };

  return (
    <div className="h-full bg-foreground p-4 rounded-lg flex flex-col">
      <div className="flex justify-start items-center">
        <h3 className="font-fredoka text-xl font-bold text-background">
          All Forms
        </h3>
      </div>
      <div className="overflow-auto flex-1 min-h-0 mt-4">
        <div className="flex flex-col gap-2">
          {entries.map((entry: Entry) => (
            <div
              key={entry._id.toString()}
              onClick={() => handleRowClick(entry._id.toString())}
              className="p-4 bg-background rounded-lg w-full cursor-pointer flex justify-between items-center font-merriweather text-sm"
            >
              <div className="font-bold text-base">{entry._id.toString()}</div>
              <div>{new Date(entry.date).toLocaleDateString()}</div>
            </div>
          ))}
          {entries.length === 0 && (
            <div className="text-center text-background p-4">
              No forms found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EntriesList;
