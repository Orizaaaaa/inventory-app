import React, { useRef, useState, useEffect } from "react";
import { ImageUp, Trash } from "lucide-react";
import { cn } from "@/utils/cn";

type ImageCircleUploaderProps = {
  className?: string;
  accept?: string;
  disabled?: boolean;
  defaultImageUrl?: string | null;
  size?: number; // diameter in px
  iconSize?: number; // icon size in px
  onFileChange?: (file: File | null, dataUrl?: string | null) => void;
};

export default function ImageCircleUploader({
  className = "",
  accept = "image/*",
  disabled = false,
  defaultImageUrl = null,
  size = 96,
    iconSize = 24,
  onFileChange,
}: ImageCircleUploaderProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(defaultImageUrl);

  useEffect(() => {
    // if defaultImageUrl changes, update preview
    setPreview(defaultImageUrl);
  }, [defaultImageUrl]);

  useEffect(() => {
    // notify parent of change
    if (onFileChange) {
      // also provide a base64 data URL for convenience
      if (!file) {
        onFileChange(null, preview || null);
      } else {
        const reader = new FileReader();
        reader.onload = () => {
          onFileChange(file, reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
    // We intentionally do not include onFileChange in deps to avoid double-calls
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file, preview]);

  const handleClick = () => {
    if (disabled) return;
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    if (!selected) return;
    setFile(selected);
    // create a temporary preview URL
    const url = URL.createObjectURL(selected);
    setPreview(url);
  };

  const handleRemove = (e?: React.SyntheticEvent) => {
    e?.stopPropagation();
    if (preview && preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }
    setFile(null);
    setPreview(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const diameterStyle = { width: size, height: size } as React.CSSProperties;

  return (
    <div className={cn("relative inline-block", className)}>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={handleChange}
        disabled={disabled}
      />

      <button
        type="button"
        onClick={handleClick}
        disabled={disabled}
        className={cn(
          "flex items-center justify-center rounded-full overflow-hidden border-4 border-gray-500 bg-linear-to-br relative z-10",
          disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
        )}
        style={diameterStyle}
        aria-label="Upload Image"
      >
        {preview ? (
          <img
            src={preview}
            alt="preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-500">
            <ImageUp size={iconSize} />
          </div>
        )}
      </button>

      {preview && (
        <button
          type="button"
          onClick={handleRemove}
          className="absolute -top-2 -right-2 bg-white rounded-full shadow-md p-1 cursor-pointer"
          title="Remove image"
        >
          <Trash className="text-red-500" size={20} />
        </button>
      )}
    </div>
  );
}
