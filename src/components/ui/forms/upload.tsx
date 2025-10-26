import React, { useState } from "react";
import { Eye, Trash, Upload } from "lucide-react";
import { cn } from "@/utils/cn";
// import ImagePreviewModal from "@/modules/SSO/user-access-management/components/modal-view-photo";
import { useModalStore } from "@/hooks/use-modal-store";

type FileUploadProps = {
  disabled?: boolean;
  label?: string;
  buttonText?: string;
  helperMessage?: string;
  placeholder?: string;
  maxSizeMB?: number;
  accept?: string;
  onFileChange?: (file: File | null) => void;
  existingFileName?: string;
  existingFileUrl?: string;
};

export default function FileUploadInput({
  disabled = false,
  label,
  buttonText,
  helperMessage = "Format JPG or PNG",
  placeholder = "Max file size 5Mb",
  maxSizeMB = 5,
  accept = "image/png,image/jpeg,image/jpg",
  onFileChange,
  existingFileName,
  existingFileUrl,
}: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState(false);
  const [useExisting, setUseExisting] = useState(!!existingFileName);
  const modalFailed = useModalStore("modalFailed");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    if (!selectedFile) return;

    if (selectedFile.size > maxSizeMB * 1024 * 1024) {
      e.target.value = "";
      modalFailed.openModal(`File size exceeds ${maxSizeMB}MB limit.`);
      onFileChange?.(null);
      return;
    }

    setFile(selectedFile);
    setUseExisting(false);
    onFileChange?.(selectedFile);
  };

  const handleRemove = () => {
    setFile(null);
    setUseExisting(false);
    onFileChange?.(null);
  };

  const handlePreview = () => {
    if (file) {
      if (file.type.startsWith("image/")) setPreview(true);
      else {
        const url = URL.createObjectURL(file);
        window.open(url, "_blank");
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      }
    } else if (useExisting && existingFileUrl) {
      setPreview(true);
    }
  };

  const displayName = file
    ? file.name
    : useExisting
      ? existingFileName
      : placeholder;

  return (
    <div className="w-full">
      <div className="flex flex-col gap-2">
        {label && (
          <label className="text-sm font-semibold text-neutral-9">{label}</label>
        )}

        {file || useExisting ? (
          <div className="flex">
            <div className="bg-gray-100 flex justify-between items-center px-3 gap-3 rounded-lg h-[46px] w-full">
              <p className="text-sm truncate">{displayName}</p>
              <div className="flex justify-center items-center gap-2">
                <Eye
                  className="cursor-pointer text-neutral-9"
                  size={24}
                  onClick={handlePreview}
                />
                <div className="bg-neutral-3 w-px h-[46px]" />
                <Trash
                  className="cursor-pointer text-red-500"
                  size={24}
                  onClick={handleRemove}
                />
              </div>
            </div>
          </div>
        ) : (
          <label className="flex">
            <input
              type="file"
              accept={accept}
              className="hidden"
              onChange={handleFileChange}
              disabled={disabled}
            />
            <div
              className={cn(
                "flex h-[46px] w-full rounded-lg overflow-hidden",
                disabled ? "bg-grey-100" : "bg-neutral-3 cursor-pointer"
              )}
            >
              <div className="flex justify-center items-center px-3 py-[11px] bg-neutral-7 gap-2">
                <Upload className="text-white" size={16} />
                {buttonText && (
                  <span className="text-white text-sm font-normal whitespace-nowrap">
                    {buttonText}
                  </span>
                )}
              </div>
              <div className="flex items-center px-3 py-[13.5px]">
                <p className="text-sm text-neutral-6">{placeholder}</p>
              </div>
            </div>
          </label>
        )}
        <p className="text-sm font-semibold text-neutral-8">{helperMessage}</p>
      </div>

      {/* ImagePreviewModal component is commented out due to missing dependency */}
      {/* {(file || (useExisting && existingFileUrl)) && (
        <ImagePreviewModal
          open={preview}
          onOpenChange={setPreview}
          file={file}
          url={!file && useExisting ? existingFileUrl : undefined}
        />
      )} */}
    </div>
  );
}