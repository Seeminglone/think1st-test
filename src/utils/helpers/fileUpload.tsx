import React from "react";

export const handleFileChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setFileName: React.Dispatch<React.SetStateAction<string>>
) => {
  if (e.target.files && e.target.files.length > 0) {
    setFileName(e.target.files[0].name);
  }
};

export const handleDelete = (
  setFileName: React.Dispatch<React.SetStateAction<string>>
) => {
  setFileName("");
};

export const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
  e.preventDefault();
  e.stopPropagation();
};

export const handleDrop = (
  e: React.DragEvent<HTMLDivElement>,
  setFileName: React.Dispatch<React.SetStateAction<string>>
) => {
  e.preventDefault();
  e.stopPropagation();

  if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
    setFileName(e.dataTransfer.files[0].name);
  }
};
