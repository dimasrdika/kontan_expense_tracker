import React, { useEffect, useState, useMemo, useCallback } from "react";
import formatNumber from "@/utils";
import getFinancialAdvice from "@/utils/getFinancialAdvice";
import {
  PiggyBank,
  ReceiptText,
  Wallet,
  Sparkles,
  CircleDollarSign,
} from "lucide-react";

// Improved type definitions
interface BudgetItem {
  amount: number;
  totalSpend: number;
}

interface IncomeItem {
  totalAmount: number;
}

interface CardInfoProps {
  budgetList: BudgetItem[];
  incomeList: IncomeItem[];
}

function CardInfo({ budgetList, incomeList }: CardInfoProps) {
  // Consolidated state
  const [financialMetrics, setFinancialMetrics] = useState({
    totalBudget: 0,
    totalSpend: 0,
    totalIncome: 0,
  });
  const [financialAdvice, setFinancialAdvice] = useState("");

  // Memoized calculation of financial metrics
  const calculateFinancialMetrics = useCallback(() => {
    const totalBudget = budgetList.reduce((sum, item) => sum + item.amount, 0);
    const totalSpend = budgetList.reduce(
      (sum, item) => sum + item.totalSpend,
      0
    );
    const totalIncome = incomeList.reduce(
      (sum, item) => sum + item.totalAmount,
      0
    );

    return { totalBudget, totalSpend, totalIncome };
  }, [budgetList, incomeList]);

  // Calculate financial metrics when data changes
  useEffect(() => {
    if (budgetList.length > 0 || incomeList.length > 0) {
      const metrics = calculateFinancialMetrics();
      setFinancialMetrics(metrics);
    }
  }, [budgetList, incomeList, calculateFinancialMetrics]);

  // Fetch financial advice when metrics change
  useEffect(() => {
    const fetchFinancialAdvice = async () => {
      const { totalBudget, totalSpend, totalIncome } = financialMetrics;

      // Only fetch advice if metrics are valid
      if (totalBudget > 0 || totalIncome > 0 || totalSpend > 0) {
        try {
          const advice = await getFinancialAdvice({
            budget: totalBudget,
            income: totalIncome,
            spend: totalSpend,
          });

          setFinancialAdvice(advice);
        } catch (error) {
          console.error("Error fetching financial advice:", error);
        }
      }
    };

    fetchFinancialAdvice();
  }, [financialMetrics]);

  // Memoize metric rendering to prevent unnecessary re-renders
  const cardMetrics = useMemo(
    () => [
      {
        label: "Total Budget",
        value: `$${formatNumber(financialMetrics.totalBudget)}`,
        Icon: PiggyBank,
      },
      {
        label: "Total Spend",
        value: `$${formatNumber(financialMetrics.totalSpend)}`,
        Icon: ReceiptText,
      },
      {
        label: "No. Of Budget",
        value: budgetList.length.toString(),
        Icon: Wallet,
      },
      {
        label: "Sum of Income Streams",
        value: `$${formatNumber(financialMetrics.totalIncome)}`,
        Icon: CircleDollarSign,
      },
    ],
    [financialMetrics, budgetList.length]
  );

  // Render loading state if no data
  if (!budgetList?.length) {
    return (
      <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {[1, 2, 3, 4].map((_, index) => (
          <div
            key={index}
            className="h-[110px] w-full bg-slate-200 animate-pulse rounded-lg"
          ></div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="p-7 border mt-4 -mb-1 rounded-2xl flex items-center justify-between">
        <div>
          <div className="flex mb-2 flex-row space-x-1 items-center">
            <h2 className="text-md">Kontan Smart AI</h2>
            <Sparkles
              className="rounded-full text-white w-10 h-10 p-2 
              bg-gradient-to-r
              from-indigo-500
              via-red-500
              to-yellow-500
              background-animate"
            />
          </div>
          <h2 className="font-light text-md">
            {financialAdvice || "Loading financial advice..."}
          </h2>
        </div>
      </div>

      <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {cardMetrics.map(({ label, value, Icon }, index) => (
          <div
            key={index}
            className="p-7 border rounded-2xl flex items-center justify-between"
          >
            <div>
              <h2 className="text-sm">{label}</h2>
              <h2 className="font-bold text-2xl">{value}</h2>
            </div>
            <Icon className="bg-primary p-3 h-12 w-12 rounded-full text-black" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default React.memo(CardInfo);
