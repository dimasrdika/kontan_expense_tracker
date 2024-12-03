"use client";

import React from "react";
import Image from "next/image";
import { useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function Header() {
  const { user, isSignedIn } = useUser();
  const router = useRouter();

  const handleDashboardClick = () => {
    if (!isSignedIn) {
      router.push("/sign-in?redirectUrl=/dashboard");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="p-4 flex bg-primary justify-between items-center border shadow-sm w-full">
      <div className="flex flex-row items-center">
        <Image
          src="/logo.svg"
          alt="logo"
          width={40}
          height={40}
          className="w-8 h-8 md:w-10 md:h-10"
        />
        <span className="text-base md:text-xl font-semibold font-sans ml-2 md:ml-3">
          KONTAN
        </span>
      </div>

      {isSignedIn ? (
        <UserButton />
      ) : (
        <div className="flex gap-2 items-center">
          <Button
            variant="outline"
            className="rounded-full text-xs md:text-sm"
            onClick={handleDashboardClick} // Memanggil fungsi ketika klik tombol
          >
            Dashboard
          </Button>

          <Link href="/sign-in">
            <Button className="rounded-full text-xs md:text-sm">
              Get Started
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Header;
