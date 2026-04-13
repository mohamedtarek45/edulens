import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/userStore";
export const useLogout = () => {
  const queryClient = useQueryClient();
  const logoutFromStore = useUserStore((state) => state.clearUser);
  const navigate = useNavigate();

  const logoutRequest = async () => {
    const res = await fetch(import.meta.env.VITE_BACKEND_URL + "api/my/user/logout", {
      method: "POST",
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Logout failed");
    }

    return res.json();
  };

  return useMutation({
    mutationFn: logoutRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getMe"] });
      queryClient.clear();
      logoutFromStore();
      navigate("/login");
    },
  });
};

export const useGetMe = () => {
  const getMeRequest = async () => {
    const response = await fetch(import.meta.env.VITE_BACKEND_URL +"api/my/user/me", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      return { user: null };
    }
    return response.json();
  };
  return useQuery({
    queryKey: ["getMe"],
    queryFn: getMeRequest,
    staleTime: 0,
    gcTime: 0,
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export const useLogin = () => {
  const loginRequest = async (data) => {
    const response = await fetch(import.meta.env.VITE_BACKEND_URL+"api/my/user/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Login failed");
    }
    return response.json();
  };
  return useMutation({
    mutationFn: loginRequest,
  });
};
export const useRegister = () => {
  const registerRequest = async (data) => {
    const response = await fetch(import.meta.env.VITE_BACKEND_URL+"api/my/user/singup", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json(); // 👈 مهم جدًا

    if (!response.ok) {
      throw new Error(result.message || "Register failed");
    }

    return result;
  };

  return useMutation({
    mutationFn: registerRequest,
  });
};
