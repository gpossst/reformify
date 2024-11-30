"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Entry } from "../types/entry";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

function EntriesList({
  formId,
  entries,
}: {
  formId: string;
  entries: Entry[];
}) {
  const router = useRouter();

  const handleRowClick = (entryId: string) => {
    router.push(`/dashboard/forms/${entryId}`);
  };

  const sortedEntries = [...entries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="h-full bg-foreground p-4 rounded-lg flex flex-col">
      <div className="flex justify-between items-center">
        <h3 className="font-fredoka text-xl font-bold text-background">
          All Entries
        </h3>
        <div>
          <button
            className={`flex items-center text-sm gap-1 font-merriweather bg-background text-foreground px-2 py-1 rounded-md`}
            onClick={() => router.push(`/dashboard/forms/${formId}/export`)}
          >
            Export
            <MdKeyboardDoubleArrowRight size={16} />
          </button>
        </div>
      </div>
      <div className="overflow-auto flex-1 min-h-0 mt-4">
        <div className="flex flex-col gap-2 rounded-lg">
          {sortedEntries.map((entry: Entry) => (
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
            <div className="text-center font-merriweather text-background p-4">
              No forms found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EntriesList;
