import { useCallback } from "react";

/**
 * useFileUrl
 * Returns a function to get a URL for a File or string (URL).
 * If input is File, returns object URL. If string, returns as is.
 * Usage: const getFileUrl = useFileUrl(); getFileUrl(fileOrUrl)
 */
export function useFileUrl() {
  return useCallback((file: File | string | null | undefined) => {
    if (!file) return null;
    if (typeof file === "string") return file;
    if (file instanceof File) return URL.createObjectURL(file);
    return null;
  }, []);
}
