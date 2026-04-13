import { useMutation } from "@tanstack/react-query";

export const useUploadImage = () => {
  const uploadImageRequest = async (file) => {
    const cloudName = import.meta.env.VITE_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    formData.append("folder", "EduLens/Questions");
    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (!res.ok) {
        throw new Error("Image upload failed");
      }

      const data = await res.json();
      return data.secure_url;
    } catch (err) {
      console.log(err);
      throw new Error("Image upload failed");
    }
  };

  return useMutation({
    mutationFn: uploadImageRequest,
  });
};
