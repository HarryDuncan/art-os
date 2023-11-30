import React, { ReactNode, useState } from "react";
import { FullScreenContainer } from "../digital-art/StyledComponents";

interface FileDropProps {
  children: ReactNode;
  onFileLoad: (fileContent: string) => void;
}

export const AssetFileUpload: React.FC<FileDropProps> = ({
  children,
  onFileLoad,
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    console.log(e);
    const file = e.dataTransfer.files[0];

    if (file) {
      const fileContent = await readFileContent(file);
      onFileLoad(fileContent);
    }
  };

  const readFileContent = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          resolve(event.target.result.toString());
        } else {
          reject(new Error("Failed to read the file."));
        }
      };
      reader.readAsText(file);
    });
  };

  return (
    <FullScreenContainer
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{
        border: isDragging ? "2px dashed #2196F3" : "2px dashed #ccc",
        padding: "20px",
      }}
    >
      {children}
    </FullScreenContainer>
  );
};
