import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";




export const useExportExam = () => {
  const exportRequest = async ({examId , examTitle}) => {

    const res = await fetch(
      import.meta.env.VITE_BACKEND_URL+`/api/exams/${examId}/export`,
      {
        credentials: "include",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to export file");
    }

    const blob = await res.blob();

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = `exam-${examTitle}-results.xlsx`;
    a.click();

    window.URL.revokeObjectURL(url);
  };

  return useMutation({
    mutationFn: exportRequest,
  });
};


export const useCreateExam = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const createExamRequest = async (data) => {
    const response = await fetch(import.meta.env.VITE_BACKEND_URL+"/api/exams/create", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Create exam failed");
    }
    return response.json();
  };
  return useMutation({
    mutationFn: createExamRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getExams"] });
      toast.success("Exam created successfully");
      navigate("/dashboard/exams");
    },
  });
};

export const useGetAllExams = () => {
  const getAllExams = async () => {
    const response = await fetch(import.meta.env.VITE_BACKEND_URL+"/api/exams", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Get exams failed");
    }
    return response.json();
  };

  return useQuery({
    queryKey: ["getExams"],
    queryFn: getAllExams,
  });
};

export const useDeleteExam = () => {
  const queryClient = useQueryClient();
  const deleteExamRequest = async (id) => {
    const response = await fetch(import.meta.env.VITE_BACKEND_URL+`/api/exams/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Delete exam failed");
    }

    return response.json();
  };

  return useMutation({
    mutationFn: deleteExamRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getExams"] });
      toast.success("Exam deleted successfully");
    },
  });
};

export const useGetExamById = (id) => {
  return useQuery({
    queryKey: ["exam", id],
    queryFn: async () => {
      const res = await fetch(import.meta.env.VITE_BACKEND_URL+`/api/exams/${id}`, {
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to fetch exam");

      return res.json();
    },
    enabled: !!id,
  });
};
