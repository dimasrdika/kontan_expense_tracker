"use client";

import React from "react";
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
    <div className="h-screen p-5 border shadow-sm">
      <div className="flex flex-row bg-primary items-center">
        <Image src={"/logo.svg"} alt="logo" width={40} height={25} />
        <span className="text-black font-bold text-xl">Kontan</span>
      </div>
      <div className="mt-5">
        {menuList.map((menu) => (
          <Link href={menu.href} key={menu.id}>
            <h2
              className={`flex gap-2 items-center text-gray-500 font-medium mb-2 p-4 cursor-pointer rounded-full hover:text-primary hover:bg-blue-100 ${
                path === menu.href ? "text-primary bg-blue-100" : ""
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
  );
}

export default SideNav;
