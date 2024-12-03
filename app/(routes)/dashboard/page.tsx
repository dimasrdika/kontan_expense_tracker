"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import CardInfo from "./_components/cardinfo";
import { db } from "@/utils/dbConfig";
import { desc, eq, sql } from "drizzle-orm";
import { budget, income, expense } from "@/utils/schema";

// Type definitions with improved type safety
interface ExpenseItem {
  id: number;
  name: string;
  amount: string;
  createdAt: Date; // Pastikan createdAt menjadi tipe Date
}

interface BudgetItem {
  id: number;
  name: string;
  amount: number;
  totalSpend: number;
  totalItem: number;
  icon: string | null; // Ubah icon ke string | null
}

interface IncomeItem {
  id: number;
  amount: number;
  totalAmount: number;
  name?: string;
  icon: string | null; // Ubah icon ke string | null
}

function Dashboard() {
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress;

  // Consolidated state management
  const [dashboardData, setDashboardData] = useState<{
    budgetList: BudgetItem[];
    incomeList: IncomeItem[];
    expenseList: ExpenseItem[];
  }>({
    budgetList: [],
    incomeList: [],
    expenseList: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  // Memoized data fetching functions
  const fetchBudgetList = useCallback(async () => {
    if (!email) {
      console.error("User email is not defined.");
      return null;
    }

    try {
      const result = await db
        .select({
          id: budget.id,
          name: budget.name,
          totalSpend: sql`sum(${expense.amount})`.mapWith(Number),
          totalItem: sql`count(${expense.id})`.mapWith(Number),
          amount: budget.amount,
          icon: budget.icon,
          createdBy: budget.createdBy,
        })
        .from(budget)
        .leftJoin(expense, eq(budget.id, expense.budgetId))
        .where(eq(budget.createdBy, email))
        .groupBy(budget.id)
        .orderBy(desc(budget.id));

      return result.map((item) => ({
        ...item,
        amount: Number(item.amount),
      }));
    } catch (error) {
      console.error("Error fetching budget list:", error);
      return null;
    }
  }, [email]);

  const fetchIncomeList = useCallback(async () => {
    try {
      const result = await db
        .select({
          id: income.id,
          amount: income.amount,
          totalAmount: sql`SUM(CAST(${income.amount} AS NUMERIC))`.mapWith(
            Number
          ),
          name: income.name,
          icon: income.icon,
          createdBy: income.createdBy,
        })
        .from(income)
        .groupBy(income.id);

      return result.map((item) => ({
        ...item,
        amount: Number(item.amount),
      }));
    } catch (error) {
      console.error("Error fetching income list:", error);
      return null;
    }
  }, []);

  const fetchAllExpenses = useCallback(async () => {
    if (!email) {
      console.error("User email is not defined.");
      return null;
    }

    try {
      const result = await db
        .select({
          id: expense.id,
          name: expense.name,
          amount: expense.amount,
          createdAt: expense.createdAt,
        })
        .from(budget)
        .rightJoin(expense, eq(budget.id, expense.budgetId))
        .where(eq(budget.createdBy, email))
        .orderBy(desc(expense.id));

      return result.map((item) => ({
        ...item,
        createdAt: new Date(item.createdAt), // Konversi string ke Date
      }));
    } catch (error) {
      console.error("Error fetching all expenses:", error);
      return null;
    }
  }, [email]);

  // Consolidated data fetching
  const fetchAllData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [budgetList, incomeList, expenseList] = await Promise.all([
        fetchBudgetList(),
        fetchIncomeList(),
        fetchAllExpenses(),
      ]);

      setDashboardData({
        budgetList: budgetList || [],
        incomeList: incomeList || [],
        expenseList: expenseList || [],
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchBudgetList, fetchIncomeList, fetchAllExpenses]);

  // Trigger data fetching when user is available
  useEffect(() => {
    if (user) {
      fetchAllData();
    }
  }, [user, fetchAllData]);

  // Memoize render data to prevent unnecessary re-renders
  const cardInfoProps = useMemo(
    () => ({
      budgetList: dashboardData.budgetList,
      incomeList: dashboardData.incomeList,
    }),
    [dashboardData.budgetList, dashboardData.incomeList]
  );

  return (
    <div className="p-8">
      <h2 className="font-bold mb-1 text-4xl capitalize">
        Hi, {user?.fullName} 👋🏼
      </h2>
      <p className="text-gray-500">
        Here's what is happening with your budget, Let's manage your finances.
      </p>
      <CardInfo {...cardInfoProps} />
    </div>
  );
}

export default Dashboard;
