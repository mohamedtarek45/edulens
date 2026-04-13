import { useFormik } from "formik";
import * as Yup from "yup";
import { useAddQuestion, useUpdateQuestion } from "../hooks/QuestionHook";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useUploadImage } from "../hooks/useUploadImage";
import { useState } from "react";

const QuestionForm = ({ onClose, initialData }) => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, isError } = useAddQuestion();

  const {
    mutateAsync: updateMutationAsync,
    isPending: isUpdating,
    isError: isUpdateError,
  } = useUpdateQuestion({ id: initialData?._id });

  const { mutateAsync: uploadImage, isPending: uploading } = useUploadImage();

  const [preview, setPreview] = useState(initialData?.image || null);

  const formik = useFormik({
    initialValues: {
      text: initialData?.question || "",
      optionA: initialData?.options?.[0] || "",
      optionB: initialData?.options?.[1] || "",
      optionC: initialData?.options?.[2] || "",
      optionD: initialData?.options?.[3] || "",
      correct:
        initialData?.correctAnswer === initialData?.options?.[0]
          ? "A"
          : initialData?.correctAnswer === initialData?.options?.[1]
            ? "B"
            : initialData?.correctAnswer === initialData?.options?.[2]
              ? "C"
              : "D",
      image: null,
    },

    enableReinitialize: true,

    validationSchema: Yup.object({
      text: Yup.string().required("Required"),
      optionA: Yup.string().required("Required"),
      optionB: Yup.string().required("Required"),
      optionC: Yup.string().required("Required"),
      optionD: Yup.string().required("Required"),
      correct: Yup.string().required("Required"),
    }),

    onSubmit: async (values) => {
      try {
        let imageUrl = initialData?.image || null;

        if (values.image) {
          imageUrl = await uploadImage(values.image);
        }

        const correctAnswer =
          values.correct === "A"
            ? values.optionA
            : values.correct === "B"
              ? values.optionB
              : values.correct === "C"
                ? values.optionC
                : values.optionD;

        const payload = {
          question: values.text,
          options: [
            values.optionA,
            values.optionB,
            values.optionC,
            values.optionD,
          ],
          correctAnswer,
          image: imageUrl,
        };

        if (initialData) {
          await updateMutationAsync(payload);

          if (isUpdateError) toast.error("Error updating question");
          else {
            toast.success("Question updated successfully");
          }
        } else {
          await mutateAsync(payload);

          if (isError) toast.error("Error adding question");
          else {
            toast.success("Question added successfully");
          }
        }

        queryClient.invalidateQueries(["getQuestions"]);
        onClose();
      } catch (err) {
        console.log(err);
        toast.error("Something went wrong");
      }
    },
  });

  return (
    <div className="max-w-2xl mx-auto bg-white px-6 pb-5 ">
      <h2 className="text-xl font-bold mb-5">
        {initialData ? "Edit Question" : "Add Question"}
      </h2>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* Question */}
        <div>
          <label className="block text-sm mb-1">Question</label>
          <textarea
            name="text"
            value={formik.values.text}
            onChange={formik.handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        {/* Options */}
        {["A", "B", "C", "D"].map((opt) => (
          <div key={opt}>
            <label className="block text-sm mb-1">Option {opt}</label>
            <input
              type="text"
              name={`option${opt}`}
              value={formik.values[`option${opt}`]}
              onChange={formik.handleChange}
              className="w-full border rounded-lg p-2"
            />
          </div>
        ))}

        {/* Correct Answer */}
        <div>
          <label className="block text-sm mb-1">Correct Answer</label>
          <select
            name="correct"
            value={formik.values.correct}
            onChange={formik.handleChange}
            className="w-full border rounded-lg p-2"
          >
            <option value="A">Option A</option>
            <option value="B">Option B</option>
            <option value="C">Option C</option>
            <option value="D">Option D</option>
          </select>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm mb-1">Upload Image (optional)</label>

          <input
            type="file"
            onChange={(e) => {
              const file = e.currentTarget.files[0];
              formik.setFieldValue("image", file);

              if (file) {
                setPreview(URL.createObjectURL(file));
              }
            }}
            className="w-full border rounded-lg p-2"
          />

          {formik.values.image && (
            <p className="text-xs text-gray-500 mt-1">
              Selected: {formik.values.image.name}
            </p>
          )}
        </div>

        {/* Preview */}
        {preview && (
          <img
            src={preview}
            alt="preview"
            className="w-32 h-32 object-cover rounded"
          />
        )}

        {uploading && (
          <p className="text-sm text-blue-500">Uploading image...</p>
        )}

        <button
          type="submit"
          disabled={isPending || isUpdating || uploading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {isPending || isUpdating || uploading ? (
            <div className="size-5 border-b-2 border-b-white rounded-full animate-spin mx-auto" />
          ) : (
            "Save Question"
          )}
        </button>
      </form>
    </div>
  );
};

export default QuestionForm;
