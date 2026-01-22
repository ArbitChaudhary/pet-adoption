"use client";
import { useState } from "react";

interface UseFormUploadProps {
  mutateAsync: () => Promise<void>;
  data: FormData;
}

export const useFormUpload = () => {
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleUpload;
};
