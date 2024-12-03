"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  LayoutGrid,
  PiggyBank,
  ReceiptText,
  CircleDollarSign,
} from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";

function SideNav() {
  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      href: "/dashboard",
      icon: <LayoutGrid size={20} />,
    },
    {
      id: 2,
      name: "Budget",
      href: "/dashboard/budget",
      icon: <PiggyBank size={20} />,
    },
    {
      id: 3,
      name: "Income",
      href: "/dashboard/income",
      icon: <CircleDollarSign size={20} />,
    },
    {
      id: 4,
      name: "Expense",
      href: "/dashboard/expense",
      icon: <ReceiptText size={20} />,
    },
  ];

  const path = usePathname();

  return (
    <div>
      {/* Sidebar for larger screens */}
      <div className="hidden md:block h-screen bg-primary p-5 border shadow-sm transition-all duration-300">
        <div className="flex flex-row ml-4 items-center">
          <Image src={"/logo.svg"} alt="logo" width={40} height={40} />
          <span className="text-black ml-2 uppercase font-bold text-xl">
            Kontan
          </span>
        </div>
        <div className="mt-5 space-y-4">
          {menuList.map((menu) => (
            <Link href={menu.href} key={menu.id}>
              <h2
                className={`flex gap-2 items-center text-gray-500 font-medium my-4 p-4 cursor-pointer rounded-full transition-all duration-300 hover:text-gray-600 hover:bg-yellow-200 ${
                  path === menu.href ? "text-black bg-yellow-200" : ""
                }`}
              >
                {menu.icon}
                {menu.name}
              </h2>
            </Link>
          ))}
        </div>
        <div className="fixed bottom-10 p-5 flex gap-2 items-center">
          <UserButton />
          Profile
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden h-screen bg-primary p-5 shadow-sm">
        {/* Mobile View: Display logo and profile button only */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Image src={"/logo.svg"} alt="logo" width={40} height={40} />
            <span className="text-black ml-2 uppercase font-bold text-xl">
              Kontan
            </span>
          </div>
          <div className="p-2">
            <UserButton />
          </div>
        </div>

        <div className="mt-5 space-y-4">
          {menuList.map((menu) => (
            <Link href={menu.href} key={menu.id}>
              <h2
                className={`flex gap-2 items-center text-gray-500 font-medium p-4 cursor-pointer rounded-full transition-all duration-300 hover:text-gray-600 hover:bg-yellow-200 ${
                  path === menu.href ? "text-primary bg-yellow-200" : ""
                }`}
              >
                {menu.icon}
                {menu.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SideNav;
