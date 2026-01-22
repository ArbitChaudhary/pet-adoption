export const uploadToCloudinary = async (file: File) => {
  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/upload`,
    {
      method: "POST",
      body: (() => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "pets-bucket");
        return formData;
      })(),
    },
  );
  const data = await response.json();
  return data.secure_url as string;
};
