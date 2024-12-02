"use client";

import React, { useState, useEffect } from "react";
import { UserButton } from "@clerk/nextjs";
import CardInfo from "./_components/cardinfo";
import { db } from "@/utils/dbConfig";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { budget, income, expense } from "@/utils/schema";
import BarChartDashboard from "./_components/barchartdashboard";

function Dashboard() {
  <div className="p-8">
    <h2 className="font-bold text-5xl">Hi, Name</h2>
  </div>;
}

export default Dashboard;
