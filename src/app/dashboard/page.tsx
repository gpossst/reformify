import React from "react";
import UserName from "../components/UserName";

function page() {
  return (
    <div className="flex flex-col h-full w-full gap-4 p-4">
      <h1 className="font-fredoka text-xl font-bold">Dashboard</h1>
      <UserName />
    </div>
  );
}

export default page;
