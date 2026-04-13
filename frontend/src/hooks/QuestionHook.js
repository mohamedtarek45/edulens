import { useQuery, useMutation } from "@tanstack/react-query";

export const useAddQuestion = () => {
  const addQuestionRequest = async (data) => {
    const response = await fetch(
      import.meta.env.VITE_BACKEND_URL + "api/questions",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );
    if (!response.ok) {
      throw new Error("Add question failed");
    }
    return response.json();
  };
  return useMutation({
    mutationFn: addQuestionRequest,
  });
};

export const useDeleteQuestion = () => {
  const deleteQuestionRequest = async (id) => {
    const response = await fetch(
      import.meta.env.VITE_BACKEND_URL + `api/questions/${id}`,
      {
        method: "DELETE",
        credentials: "include",
      },
    );
    if (!response.ok) {
      throw new Error("Delete question failed");
    }
    return response.json();
  };
  return useMutation({
    mutationFn: deleteQuestionRequest,
  });
};

export const useUpdateQuestion = ({ id }) => {
  const updateQuestionRequest = async (data) => {
    const response = await fetch(import.meta.env.VITE_BACKEND_URL+`api/questions/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Update question failed");
    }
    return response.json();
  };
  return useMutation({
    mutationFn: updateQuestionRequest,
  });
};

export const useGetAllQuestions = () => {
  const getQuestionsRequest = async () => {
    const response = await fetch(import.meta.env.VITE_BACKEND_URL+"api/questions", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Get questions failed");
    }
    return response.json();
  };
  return useQuery({
    queryKey: ["getQuestions"],
    queryFn: getQuestionsRequest,
  });
};
