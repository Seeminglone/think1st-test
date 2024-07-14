import React, { useState, useEffect } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import {
  handleFileChange,
  handleDelete,
  handleDragOver,
  handleDrop,
} from "../utils/helpers/fileUpload";

interface FileUploadComponentProps {
  onFileChange: (fileName: string) => void;
}

const FileUploadComponent: React.FC<FileUploadComponentProps> = ({
  onFileChange,
}) => {
  const [fileName, setFileName] = useState<string>("");

  useEffect(() => {
    onFileChange(fileName);
  }, [fileName, onFileChange]);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileChange(e, setFileName);
  };

  const handleDeleteButtonClick = () => {
    handleDelete(setFileName);
  };

  const handleDragOverEvent = (e: React.DragEvent<HTMLDivElement>) => {
    handleDragOver(e);
  };

  const handleDropEvent = (e: React.DragEvent<HTMLDivElement>) => {
    handleDrop(e, setFileName);
  };

  return (
    <div
      className="mt-2 flex flex-col justify-center items-center bg-white rounded-lg"
      style={{ border: "1px solid #CBB6E5", height: "96px" }}
      onDragOver={handleDragOverEvent}
      onDrop={handleDropEvent}
    >
      <div className="text-center">
        {fileName ? (
          <div className="flex flex-row gap-2 justify-center items-center">
            <p className="text-gray-800 text-base font-medium">{fileName}</p>
            <button
              className="bg-black text-white rounded-md hover:bg-red-600"
              style={{
                borderRadius: "100%",
                width: "20px",
                height: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={handleDeleteButtonClick}
            >
              <ClearIcon sx={{ fontSize: "16px" }} />
            </button>
          </div>
        ) : (
          <div className="flex flex-row items-center text-sm leading-6 text-gray-600">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer rounded-md font-semibold text-indigo-600"
            >
              <span
                style={{
                  textDecoration: "underline",
                  color: "#761BE4",
                  fontSize: "16px",
                }}
              >
                Upload a file
              </span>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                onChange={handleFileInputChange}
              />
            </label>
            <p className="pl-2" style={{ fontSize: "16px" }}>
              or drag and drop here
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploadComponent;
