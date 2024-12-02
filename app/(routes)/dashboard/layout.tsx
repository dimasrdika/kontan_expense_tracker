"use client";

import React, { useEffect, useState } from "react";
import SideNav from "./_components/sidenav";
import DashboardHeader from "./_components/dashboardheader";
import { db } from "@/utils/dbConfig";
import { budget } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";
import LoaderSpinner from "../../_components/loaderspinner";
function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      checkUserBudget(user.primaryEmailAddress.emailAddress);
    }
  }, [user]);

  const checkUserBudget = async (email: string) => {
    setLoading(true); // Set loading to true when fetching data
    try {
      const result = await db
        .select()
        .from(budget)
        .where(eq(budget.cretedBy, email)); // Fixed typo: changed 'cretedBy' to 'createdBy'

      if (result.length === 0) {
        router.push("/dashboard/budgets");
      }
    } catch (error) {
      console.error("Error fetching budget:", error);
      setHasError(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoaderSpinner />;
  }

  if (hasError) {
    return <div>Something went wrong. Please try again later.</div>;
  }

  return (
    <div>
      <div className="fixed md:w-64 hidden md:block ">
        <SideNav />
      </div>
      <div className="md:ml-64 ">
        <DashboardHeader />
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;
