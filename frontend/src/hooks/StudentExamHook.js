import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useExamResult = (examId) => {
  const fetchResult = async () => {
    const res = await fetch(
      import.meta.env.VITE_BACKEND_URL+`/api/student/result/${examId}`,
      {
        credentials: "include",
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }

    return data;
  };

  return useQuery({
    queryKey: ["exam-result", examId],
    queryFn: fetchResult,
    enabled: !!examId,
  });
};



export const useSubmitExam = () => {
  const queryClient = useQueryClient();

  const submitRequest = async ({ attemptId, answers }) => {
    const res = await fetch(
      import.meta.env.VITE_BACKEND_URL+`/api/student/${attemptId}/submit`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answers }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Submit failed");
    }

    return data;
  };

  return useMutation({
    mutationFn: submitRequest,

    onSuccess: () => {
      queryClient.invalidateQueries(["student-exams"]);
      toast.success("Exam submitted successfully");
    },
  });
};


export const useStartExam = (examId) => {
  const fetchExam = async () => {
    const res = await fetch(
      import.meta.env.VITE_BACKEND_URL+`/api/student/${examId}/start`,
      {
        credentials: "include",
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }

    return data;
  };

  return useQuery({
    queryKey: ["start-exam", examId],
    queryFn: fetchExam,
    refetchOnWindowFocus: false,
    enabled: !!examId,
  });
};
export const useStudentExams = () => {
  const fetchExams = async () => {
    const res = await fetch(import.meta.env.VITE_BACKEND_URL+"/api/student/", {
      credentials: "include",
    });
    const result = await res.json();
    if (!res.ok) throw new Error("Failed to fetch exams");
    console.log(result, "result 111111111111111");
    return result;
  };

  return useQuery({
    queryKey: ["student-exams"],
    queryFn: fetchExams,
  });
};
