export interface DashboardSummary {
  totalSpent: number;
  topCategory: string;
  budgetRemaining: number;
  expenseCount: number;
}

export interface FinancialHealth {
  score: number;
  status: string;
  reasons: string[];
}