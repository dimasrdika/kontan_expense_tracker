"use client";

import React from "react";
import Image from "next/image";
import { useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function Header() {
  const { user, isSignedIn } = useUser();

  return (
    <div className="p-5 flex bg-primary justify-between items-center border shadow-sm">
      <div className="flex flex-row items-center">
        <Image src="/logo.svg" alt="logo" width={50} height={50} />
        <span className="text-xl font-semibold font-sans">KONTAN</span>
      </div>
      {isSignedIn ? (
        <UserButton />
      ) : (
        <div className="flex gap-3  items-center">
          <Link href={"/dashboard"}>
            <Button variant="outline" className="rounded-full">
              Dashboard
            </Button>
          </Link>
          <Link href={"/sign-in"}>
            <Button className="rounded-full">Get Started</Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Header;
