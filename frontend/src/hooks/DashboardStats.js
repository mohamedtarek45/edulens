import { useQuery } from "@tanstack/react-query";

const fetchStats = async () => {
  const res = await fetch(import.meta.env.VITE_BACKEND_URL+"api/dashboard/stats", {
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch stats");
  }

  return data;
};

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ["dashboard-stats" ],
    queryFn: fetchStats,
  });
};