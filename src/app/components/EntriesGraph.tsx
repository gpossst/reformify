"use client";

import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Entry } from "../types/entry";
import LoadIcon from "./LoadIcon";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function EntriesGraph() {
  const { data: session } = useSession();
  const [dailyEntries, setDailyEntries] = useState<
    { day: string; count: number }[]
  >([]);
  const [monthlyEntries, setMonthlyEntries] = useState<
    { month: string; count: number }[]
  >([]);
  const [yearlyEntries, setYearlyEntries] = useState<
    { year: string; count: number }[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<"daily" | "monthly" | "yearly">("monthly");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForms = async () => {
      if (!session?.user?.email) return;

      try {
        setLoading(true);
        const response = await fetch(
          `/api/mongo/user/entries?email=${session.user.email}`,
          {
            headers: {
              "x-api-secret": process.env.NEXT_PUBLIC_API_SECRET || "",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch forms data");
        }

        const entryData: Entry[] = await response.json();
        console.log(entryData);

        // Group by day
        const entriesByDay = entryData.reduce<{ [key: string]: number }>(
          (acc, entry) => {
            const date = new Date(entry.date);
            const dayKey = date.toISOString().split("T")[0];
            acc[dayKey] = (acc[dayKey] || 0) + 1;
            return acc;
          },
          {}
        );

        // Group by month
        const entriesByMonth = entryData.reduce<{ [key: string]: number }>(
          (acc, entry) => {
            const date = new Date(entry.date);
            const monthKey = `${date.toLocaleString("en-US", {
              month: "short",
            })} '${date.getFullYear().toString().slice(-2)}`;
            acc[monthKey] = (acc[monthKey] || 0) + 1;
            return acc;
          },
          {}
        );

        // Group by year
        const entriesByYear = entryData.reduce<{ [key: string]: number }>(
          (acc, entry) => {
            const date = new Date(entry.date);
            const yearKey = `${date.getFullYear()}`;
            acc[yearKey] = (acc[yearKey] || 0) + 1;
            return acc;
          },
          {}
        );

        // Get last 7 days with 0s for missing days
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        const dailyData = [];
        for (
          let d = new Date(oneWeekAgo);
          d <= new Date();
          d.setDate(d.getDate() + 1)
        ) {
          const dayKey = d.toISOString().split("T")[0];
          const formattedDay = `${d.toLocaleString("en-US", {
            month: "short",
          })} ${d.getDate()}`;
          dailyData.push({
            day: formattedDay,
            count: entriesByDay[dayKey] || 0,
          });
        }
        setDailyEntries(dailyData);

        // Get last 6 months with 0s for missing months
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
        const monthlyData = [];
        for (
          let m = new Date(sixMonthsAgo);
          m <= new Date();
          m.setMonth(m.getMonth() + 1)
        ) {
          const monthKey = `${m.toLocaleString("en-US", {
            month: "short",
          })} '${m.getFullYear().toString().slice(-2)}`;
          monthlyData.push({
            month: monthKey,
            count: entriesByMonth[monthKey] || 0,
          });
        }
        setMonthlyEntries(monthlyData);

        // Get last 5 years with 0s for missing years
        const fiveYearsAgo = new Date();
        fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 4);
        const yearlyData = [];
        for (
          let y = fiveYearsAgo.getFullYear();
          y <= new Date().getFullYear();
          y++
        ) {
          const yearKey = y.toString();
          yearlyData.push({
            year: yearKey,
            count: entriesByYear[yearKey] || 0,
          });
        }
        setYearlyEntries(yearlyData);

        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      }
    };
    fetchForms();
  }, [session?.user?.email]);

  const getActiveData = () => {
    switch (view) {
      case "daily":
        return {
          data: dailyEntries,
          dataKey: "day",
          label: "Last 7 Days",
        };
      case "monthly":
        return {
          data: monthlyEntries,
          dataKey: "month",
          label: "Last 6 Months",
        };
      case "yearly":
        return {
          data: yearlyEntries,
          dataKey: "year",
          label: "Last 5 Years",
        };
    }
  };

  if (loading) {
    return (
      <div className="bg-foreground flex-[2] h-full rounded-lg p-4 flex-col items-center">
        <div className="flex justify-start items-center">
          <h3 className="font-fredoka text-xl font-bold text-background">
            Entries
          </h3>
        </div>
        <LoadIcon color="accent" size={20} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-[2] h-full bg-foreground rounded-lg p-4">
        {error}
      </div>
    );
  }

  const activeData = getActiveData();
  const maxCount = Math.max(...activeData.data.map((item) => item.count));
  const yAxisWidth = Math.max(30, maxCount.toString().length * 15);

  return (
    <div className="flex flex-col flex-[2] h-full bg-foreground rounded-lg p-4 w-full gap-4">
      <div className="flex justify-between items-center">
        <h3 className="font-fredoka text-xl font-bold text-background text-center">
          Entries
        </h3>
        <div className="text-background font-merriweather text-sm">
          {activeData.label}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setView("daily")}
            className={`px-2 py-1 rounded-md text-sm font-merriweather ${
              view === "daily"
                ? "bg-accent text-background"
                : "bg-background text-foreground"
            }`}
          >
            Daily
          </button>
          <button
            onClick={() => setView("monthly")}
            className={`px-2 py-1 rounded-md text-sm font-merriweather ${
              view === "monthly"
                ? "bg-accent text-background"
                : "bg-background text-foreground"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setView("yearly")}
            className={`px-2 py-1 rounded-md text-sm font-merriweather ${
              view === "yearly"
                ? "bg-accent text-background"
                : "bg-background text-foreground"
            }`}
          >
            Yearly
          </button>
        </div>
      </div>
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={activeData.data} margin={{ right: 40 }}>
            <XAxis
              dataKey={activeData.dataKey}
              tick={{
                fontFamily: "var(--font-merriweather-sans)",
                fill: "var(--background)",
              }}
              stroke="var(--background)"
              interval={0}
            />
            <YAxis
              width={yAxisWidth}
              allowDecimals={false}
              tick={{
                fontFamily: "var(--font-merriweather-sans)",
                fill: "var(--background)",
              }}
              stroke="var(--background)"
            />
            <CartesianGrid strokeDasharray="3 3" />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#ef6461"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default EntriesGraph;
