"use client";

import React, { useState, useEffect } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import CardInfo from "./_components/cardinfo";
import { db } from "@/utils/dbConfig";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { budget, income, expense } from "@/utils/schema";
import BarChartDashboard from "./_components/barchartdashboard";

function Dashboard() {
  const user = useUser();
  return (
    <div className="p-8">
      <h2 className="font-bold text-5xl">Hi, {user.user?.fullName}</h2>
    </div>
  );
}

export default Dashboard;
