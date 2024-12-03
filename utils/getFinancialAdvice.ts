// getFinancialAdvice.ts
const getFinancialAdvice = async ({
  budget,
  income,
  spend,
}: {
  budget: number;
  income: number;
  spend: number;
}) => {
  // Implementasi logika nasihat keuangan berdasarkan budget, income, dan spend
  // Kembalikan advice dalam bentuk string
  return "Financial advice based on your data.";
};

export default getFinancialAdvice;
