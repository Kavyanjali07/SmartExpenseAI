import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

api.interceptors.request.use((config) => {

  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export const getDashboardSummary = async () => {
  const res = await api.get("/dashboard/summary");
  return res.data;
};

export const getFinancialHealth = async () => {
  const res = await api.get("/financial-health");
  return res.data;
};

export const getMonthlyTrend = async () => {
  const res = await api.get("/dashboard/monthly-trend");
  return res.data;
};

export const getCategoryDistribution = async () => {
  const res = await api.get("/dashboard/category-distribution");
  return res.data;
};

export const getExpenses = async () => {
  const res = await api.get("/expenses");
  return res.data;
};

export const createExpense = async (data: any) => {
  const res = await api.post("/expenses", data);
  return res.data;
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
  return res.data;
};