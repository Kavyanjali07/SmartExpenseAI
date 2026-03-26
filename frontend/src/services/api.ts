import axios from "axios";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export function getApiErrorMessage(
  error: unknown,
  fallback = "Something went wrong. Please try again."
) {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      return "Cannot connect to backend. Please start the backend server and try again.";
    }

    const data = error.response.data as
      | { message?: string; error?: string; details?: string }
      | undefined;

    return (
      data?.message ||
      data?.error ||
      data?.details ||
      `Request failed with status ${error.response.status}`
    );
  }

  return fallback;
}

api.interceptors.request.use((config) => {

  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    if (typeof window !== "undefined" && (status === 401 || status === 403)) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export type Expense = {
  id: number;
  amount: number;
  category: string;
  expenseDate: string;
  description?: string;
};

export type CreateExpenseRequest = {
  amount: number;
  category: string;
  expenseDate: string;
  description?: string;
};

export type Insight = {
  message: string;
};

export type AssistantQueryResponse = {
  answer: string;
};

export type LoginRequest = {
  username: string;
  password: string;
};

export type SignupRequest = {
  username: string;
  email: string;
  fullName: string;
  password: string;
};

export type UserProfile = {
  id: number;
  username: string;
  email: string;
  fullName: string;
  riskProfile?: string;
  monthlyIncome?: number;
  monthlyBudget?: number;
  primaryGoal?: string;
  createdAt?: string;
};

export type ProfileUpdateRequest = {
  income: number;
  budget: number;
  goal: string;
};

export type DashboardSummaryResponse = {
  totalSpent: number;
  topCategory?: string;
  budgetRemaining: number;
  expenseCount?: number;
};

export type FinancialHealthResponse = {
  score: number;
  status?: string;
  reasons?: string[];
};

export type MonthlyTrendPoint = {
  month: string;
  total: number;
};

export type CategoryDistributionPoint = {
  category: string;
  amount: number;
};

export const signupUser = async (data: SignupRequest) => {
  const res = await api.post("/auth/signup", data);
  return res.data as UserProfile;
};

export const loginUser = async (data: LoginRequest) => {
  const res = await api.post("/auth/login", data);
  return res.data as { token: string };
};

export const getUserProfile = async () => {
  const res = await api.get("/users/profile");
  return res.data as UserProfile;
};

export const updateUserProfile = async (data: ProfileUpdateRequest) => {
  const res = await api.post("/users/profile", data);
  return res.data as UserProfile;
};

export const getDashboardSummary = async () => {
  const res = await api.get("/dashboard/summary");
  return res.data as DashboardSummaryResponse;
};

export const getFinancialHealth = async () => {
  const res = await api.get("/financial-health");
  return res.data as FinancialHealthResponse;
};

export const getMonthlyTrend = async () => {
  const res = await api.get("/dashboard/monthly-trend");
  return res.data as MonthlyTrendPoint[];
};

export const getCategoryDistribution = async () => {
  const res = await api.get("/dashboard/category-distribution");
  return res.data as CategoryDistributionPoint[];
};

export const getExpenses = async () => {
  const res = await api.get("/expenses");
  return res.data as Expense[];
};

export const createExpense = async (data: CreateExpenseRequest) => {
  const res = await api.post("/expenses", data);
  return res.data as Expense;
};

export const deleteExpense = async (id: number) => {
  await api.delete(`/expenses/${id}`);
};

export const importCsv = async (file: File) => {

  const formData = new FormData();
  formData.append("file", file);

  const res = await api.post("/expenses/import", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

  return res.data;
};

export const getInsights = async () => {
  const res = await api.get("/insights/monthly");
  return res.data as Insight[];
};

export const queryAssistant = async (query: string) => {
  const res = await api.post("/assistant/query", { query });
  return res.data as AssistantQueryResponse;
};
