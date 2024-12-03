"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { User } from "../../types/user";
import LoadIcon from "../Other/LoadIcon";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function AvailableForms() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const [possibleEntries, setPossibleEntries] = useState<number>(0);

  useEffect(() => {
    if (session?.user?.email) {
      fetch(`/api/mongo/user?email=${session.user.email}`, {
        headers: {
          "x-api-secret": process.env.NEXT_PUBLIC_API_SECRET || "",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
          setLoading(false);
        });
    }
    setPossibleEntries(user?.allowance ?? 0);
  }, [session, user?.allowance]);

  return (
    <div className=" flex flex-col items-center justify-center">
      <CircularProgressbarWithChildren
        value={user?.entryCount ?? 0}
        maxValue={possibleEntries}
        strokeWidth={10}
        styles={buildStyles({
          pathColor: "var(--accent)",
          trailColor: "var(--background)",
        })}
      >
        <div className="text-background font-merriweather text-lg font-semibold">
          {loading ? (
            <LoadIcon color="accent" size={10} />
          ) : (
            `${user?.entryCount ?? 0} / ${possibleEntries}`
          )}
        </div>
      </CircularProgressbarWithChildren>
      <div className="text-background font-merriweather text-lg font-semibold">
        Entries
      </div>
    </div>
  );
}

export default AvailableForms;
