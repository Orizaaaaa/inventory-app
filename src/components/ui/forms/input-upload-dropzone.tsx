import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import type { FileRejection } from "react-dropzone";
import { Label } from "./label";
import { Input } from "./input";
import { Upload, FileText, Trash } from "lucide-react";
import { Button } from "../button";

const MAX_SIZE = 10 * 1024 * 1024;

interface InputUploadDropZoneProps {
  label?: string;
  className?: string;
  onFileChange?: (files: File[] | null) => void;
  name?: string;
  defaultFiles?: File[]
}

export default function InputUploadDropZone({ label = "Upload File", className, onFileChange, defaultFiles }: InputUploadDropZoneProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    useEffect(() => {
    if (Array.isArray(defaultFiles) && defaultFiles.length > 0) {
      setSelectedFiles(defaultFiles);
    }
  }, [defaultFiles]);

  const onDrop = (acceptedFiles: File[], fileRejections: FileRejection[]) => {
    if (acceptedFiles.length > 0) {
      setSelectedFiles(prev => [...prev, ...acceptedFiles]);
      onFileChange?.([...selectedFiles, ...acceptedFiles]);
    }

    fileRejections.forEach(({ errors }) => {
      errors.forEach((e: { code: string; message: string }) => {
        alert(e.message);
      });
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "application/pdf": [] },
    maxSize: MAX_SIZE,
    multiple: true,
    onDrop,
  });

  const handleRemove = (idx: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== idx);
    setSelectedFiles(newFiles);
    if (onFileChange) onFileChange(newFiles.length > 0 ? newFiles : null);
  };

  return (
    <div className={`w-full ${className}`}>
      <Label className="block mb-2 text-sm font-semibold">{label}</Label>
      <div
        {...getRootProps()}
        className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg px-8 py-10 cursor-pointer transition-colors duration-200
          ${isDragActive ? "border-pink-500 bg-pink-50" : "border-gray-300 bg-white"}`}
      >
        <Input {...getInputProps()} className="hidden" />
        <Upload />
        <p className="text-sm text-neutral-9 mt-3">Drag & Drop or Choose file to upload</p>
        <p className="text-sm text-neutral-6 mt-3">PDF Maksimum. 10MB</p>
      </div>
      {selectedFiles.length > 0 && (
        <div className="mt-4 flex flex-col gap-2">
          {selectedFiles.map((file, idx) => (
            <div key={idx} className="flex items-center justify-between border border-grey-50 rounded-lg px-4 py-2">
              <div className="flex items-center">
                <FileText className="w-6 h-6  mr-3" />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">{file.name}</span>
                  <span className="text-sm text-neutral-6">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                </div>
              </div>
              <Button variant={"ghost"} onClick={e => { e.preventDefault(); handleRemove(idx); }} className="hover:bg-white w-1">
                <Trash className="text-red-500" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

