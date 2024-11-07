"use client";
import React from "react";
import Logo from "./Logo";
import { useRouter, usePathname } from "next/navigation";
import clsx from "clsx";
import { AiOutlineHome } from "react-icons/ai";
import { IoDocumentTextOutline } from "react-icons/io5";
import { BsCreditCard } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { BiHelpCircle } from "react-icons/bi";

function DashSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { label: "Home", path: "/dashboard", icon: <AiOutlineHome size={20} /> },
    {
      label: "Forms",
      path: "/dashboard/forms",
      icon: <IoDocumentTextOutline size={20} />,
    },
    {
      label: "Billing",
      path: "/dashboard/billing",
      icon: <BsCreditCard size={20} />,
    },
    {
      label: "Account",
      path: "/dashboard/account",
      icon: <CgProfile size={20} />,
    },
    {
      label: "Help",
      path: "/dashboard/help",
      icon: <BiHelpCircle size={20} />,
    },
  ];

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className="bg-background rounded-xl shadow-2xl flex-1">
      <div
        className="flex items-center gap-1 m-4 cursor-pointer"
        onClick={() => router.push("/")}
      >
        <div className="w-8">
          <Logo size={32} clickable={false} />
        </div>
        <div className="text-2xl font-bold font-fredoka">Formify</div>
      </div>
      <div className="flex flex-col justify-between h-[calc(100vh-80px)] overflow-y-auto">
        <div className="p-4 space-y-2">
          {menuItems.map((item) => (
            <div
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={clsx(
                "cursor-pointer text-foreground text-lg p-2 rounded hover:bg-foreground font-semibold font-merriweather hover:text-background transition-colors flex items-center gap-2",
                pathname === item.path && "bg-accent"
              )}
            >
              {item.icon}
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashSidebar;
