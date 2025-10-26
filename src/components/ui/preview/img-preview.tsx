import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/utils/cn";
import { Loader2, X, AlertTriangle } from "lucide-react";

type ImagePreviewProps = {
    visible: boolean;
    onCancel?: () => void;
    imgUrl?: string | null;
    loading?: boolean;
    error?: boolean;
    className?: string;
    headerClassName?: string;
    closeButtonClassName?: string;
    imageWrapperClassName?: string;
    imageClassName?: string
};

export default function ImagePreview({ 
    visible, 
    onCancel, 
    imgUrl, 
    loading, 
    error,
    className,
    headerClassName,
    closeButtonClassName,
    imageWrapperClassName,
    imageClassName, 
}: ImagePreviewProps) {
    return (
        <Dialog open={visible} onOpenChange={(open) => { if (!open) onCancel?.(); }}>
            <DialogContent
                className={cn(
                    "flex flex-col items-center gap-4 px-4 py-6 rounded-t-xl bg-white w-[510px] h-[580px] sm:p-6 sm:rounded-xl",
                    className
                )}
                showCloseButton={false}
            >
                <div className={cn("flex justify-between items-center w-full", headerClassName)}>
                    <p className="font-semibold text-lg">View Proof Image</p>
                    <div
                        className={cn(
                            "flex justify-center items-center w-[44px] h-[44px] rounded-full bg-neutral-3 cursor-pointer",
                            closeButtonClassName
                        )}
                        onClick={onCancel}
                    >
                        <X size={24} color="black" />
                    </div>
                </div>
                <div className={cn("flex justify-center items-center h-full w-full", imageWrapperClassName)}>
                    {loading ? (
                        <div className="flex flex-col items-center gap-2 text-neutral-6">
                            <Loader2 size={36} className="animate-spin text-primary-500" />
                            <p className="text-sm">Loading image...</p>
                        </div>
                    ) : error ? (
                        <div className="flex flex-col items-center gap-2 text-red-600">
                            <AlertTriangle size={36} />
                            <p className="text-sm font-medium">Failed to load image</p>
                        </div>
                    ) : imgUrl ? (
                        <img
                            src={imgUrl}
                            className={cn("w-full h-[464px] object-contain rounded-md", imageClassName)}
                            alt="Proof"
                        />
                    ) : (
                        <p className="text-gray-500">No image selected</p>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}