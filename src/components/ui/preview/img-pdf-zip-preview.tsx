import { useState } from "react";
import ModalForm from "@/components/ui/modals/modal-form";
import { Loader2 } from "lucide-react";

type FilePreviewModalProps = {
    heading?: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    file?: File | null;
    url?: string;
    loading?: boolean;
    error?: boolean;
};

export default function FilePreviewModal({
    heading = "Preview File",
    open,
    onOpenChange,
    file,
    url,
    loading = false,
}: FilePreviewModalProps) {
    const [localLoading, setLocalLoading] = useState(() => open || loading);

    const src = file ? URL.createObjectURL(file) : url!;
    const fileType = file?.type || (url ? guessFileType(url) : "");

    function guessFileType(path: string): string {
        try {
            const pathname = new URL(path).pathname.toLowerCase();
            if (/\.(jpe?g|png|gif|webp)$/i.test(pathname)) return "image/*";
            if (/\.pdf$/i.test(pathname)) return "application/pdf";
            return "unknown";
        } catch {
            return "unknown";
        }
    }

    const handleLoad = () => setLocalLoading(false);
    const isLoading = loading || localLoading;

    const renderPreview = () => {
        if (fileType.startsWith("image/")) {
            return (
                <img
                    src={src}
                    alt="Preview"
                    onLoad={handleLoad}
                    onError={handleLoad}
                    className={`rounded-lg max-h-[70vh] object-contain mx-auto transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"
                        }`}
                />
            );
        }

        if (fileType === "application/pdf") {
            return (
                <iframe
                    src={`${src}#toolbar=0&navpanes=0&scrollbar=0`}
                    title="PDF Preview"
                    onLoad={handleLoad}
                    className={`w-full h-[70vh] rounded-lg transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"
                        }`}
                />
            );
        }
    };

    return (
        <ModalForm
            heading={heading}
            visible={open}
            onClose={() => onOpenChange(false)}
            className="min-w-[400px]"
        >
            <div className="flex flex-col w-full h-auto gap-6 relative">
                {isLoading && (
                    <div className="flex flex-col gap-2 absolute inset-0 items-center justify-center bg-white/70 rounded-lg z-10">
                        <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
                        <p className="text-sm text-neutral-7">Loading File...</p>
                    </div>
                )}
                <div className="flex justify-center">{renderPreview()}</div>
            </div>
        </ModalForm>
    );
}