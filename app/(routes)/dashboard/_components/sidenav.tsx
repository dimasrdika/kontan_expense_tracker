"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  PiggyBank,
  ReceiptText,
  CircleDollarSign,
  Menu,
  X,
} from "lucide-react";

function SideNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  const MenuButton = ({
    href,
    icon,
    name,
    isActive,
  }: {
    href: string;
    icon: React.ReactNode;
    name: string;
    isActive: boolean;
  }) => (
    <Link
      href={href}
      className={`
        flex gap-3 items-center 
        px-4 py-2.5 
        rounded-xl 
        transition-all duration-300 
        group
        ${
          isActive
            ? "bg-yellow-100 text-black font-semibold"
            : "text-gray-600 hover:bg-yellow-50 hover:text-black"
        }
      `}
      onClick={() => setIsMobileMenuOpen(false)}
    >
      <span
        className={`
        group-hover:scale-110 
        transition-transform 
        ${isActive ? "text-yellow-600" : "text-gray-500"}
      `}
      >
        {icon}
      </span>
      <span>{name}</span>
    </Link>
  );

  return (
    <>
      <div
        className="
          hidden md:flex flex-col 
          fixed top-0 left-0 
          h-full w-64 
          bg-primary 
          border-r 
          shadow-lg 
          p-5 
          transition-all 
          duration-300
        "
      >
        {/* Logo Section */}
        <div className="flex items-center mb-10 pl-2">
          <Image
            src="/logo.svg"
            alt="Kontan Logo"
            width={40}
            height={40}
            className="mr-3"
          />
          <h1 className="text-2xl font-bold text-gray-800">Kontan</h1>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-grow space-y-2">
          {menuList.map((menu) => (
            <MenuButton
              key={menu.id}
              href={menu.href}
              icon={menu.icon}
              name={menu.name}
              isActive={path === menu.href}
            />
          ))}
        </nav>

        {/* User Profile Section */}
        <div className="mt-auto flex items-center gap-3 border-t pt-5">
          <UserButton afterSignOutUrl="/" />
          <span className="text-gray-700 font-medium">Profile</span>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed inset-x-0 top-0 z-50 bg-primary shadow-md">
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center">
            <Image
              src="/logo.svg"
              alt="Kontan Logo"
              width={30}
              height={30}
              className="mr-3"
            />
            <h1 className="text-xl font-bold text-gray-800">Kontan</h1>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-md focus:outline-none"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`
            fixed inset-0 bg-black/50 
            transition-opacity duration-300
            ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}
          `}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className={`
              absolute left-0 top-0 h-full w-64 
              bg-primary 
              transform transition-transform duration-300
              ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
              shadow-lg
              p-6
            `}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-10 flex items-center">
              <Image
                src="/logo.svg"
                alt="Kontan Logo"
                width={40}
                height={40}
                className="mr-3"
              />
              <h1 className="text-2xl font-bold text-gray-800">Kontan</h1>
            </div>

            <nav className="space-y-3">
              {menuList.map((menu) => (
                <MenuButton
                  key={menu.id}
                  href={menu.href}
                  icon={menu.icon}
                  name={menu.name}
                  isActive={path === menu.href}
                />
              ))}
            </nav>

            <div className="mt-auto absolute bottom-5 left-0 right-0 px-6 flex items-center gap-3">
              <UserButton afterSignOutUrl="/" />
              <span className="text-gray-700 font-medium">Profile</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SideNav;
