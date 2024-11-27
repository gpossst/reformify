"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import LoadIcon from "@/app/components/LoadIcon";
import { User } from "@/app/types/user";
import DashButton from "@/app/components/DashButton";

function Page() {
  const { data: session } = useSession();
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserData() {
      if (session?.user?.email) {
        try {
          const response = await fetch(
            `/api/mongo/user?email=${session.user.email}`,
            {
              headers: {
                "x-api-secret": process.env.NEXT_PUBLIC_API_SECRET || "",
              },
            }
          );
          if (response.ok) {
            const data = await response.json();
            setUserData(data);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
        setLoading(false);
      }
    }

    fetchUserData();
  }, [session]);

  if (!session?.user) {
    return (
      <div className="flex flex-col gap-4 w-full justify-center items-center h-full bg-foreground rounded-lg p-4">
        Not signed in
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full gap-4 p-4">
      <div className="flex justify-between items-center">
        <div className="flex-1" />
        <div className="font-fredoka text-xl text-center font-bold text-foreground">
          Account
        </div>
        <div className="flex-1 flex justify-end">
          <DashButton link="/dashboard/help" text="Help" />
        </div>
      </div>
      {loading ? (
        <div className="flex flex-col gap-4 w-full h-full justify-center items-center bg-foreground rounded-lg p-4">
          <LoadIcon color="accent" size={20} />
        </div>
      ) : (
        <div className="flex flex-col w-full h-full font-merriweather text-background bg-foreground items-center justify-center rounded-lg">
          <div className="font-semibold">Name</div>
          <div className="pb-2">{userData?.name}</div>
          <div className="font-semibold">Email</div>
          <div className="pb-2">{userData?.email}</div>
          <div className="font-semibold">Plan</div>
          <div className="pb-2">{userData?.plan}</div>
          <div className="font-semibold">Customer ID</div>
          <div className="pb-2">{userData?.customerId}</div>
          <div className="font-semibold">Subscription ID</div>
          <div className="pb-8">{userData?.priceId}</div>
          <div className="w-1/2 text-center">
            Yeah, that&apos;s all we know about you. Your account is managed by
            GitHub, so you&apos;ll never need a password here, just don&apos;t
            forget your GitHub credentials. If you need help, just contact us!
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
