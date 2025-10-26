import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";

type PDFPreviewProps = {
  visible: boolean;
  onCancel?: () => void;
  pdfUrl?: string | null;
};

export default function PDFPreview({
  visible,
  onCancel,
  pdfUrl,
}: PDFPreviewProps) {
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  useEffect(() => {
    if (visible && pdfUrl) {
      setFileUrl(pdfUrl);
    } else {
      setFileUrl(null);
    }
  }, [pdfUrl, visible]);

  return (
    <Dialog
      open={visible}
      onOpenChange={(open) => {
        if (!open) onCancel?.();
      }}
    >
      <DialogContent
        className="flex flex-col items-center gap-4 px-4 py-6 rounded-t-xl bg-white w-[800px] h-[80vh] sm:p-6 sm:rounded-xl"
        showCloseButton={false}
      >
        <div className="flex justify-between items-center w-full">
          <p className="font-semibold text-lg">PDF Preview</p>
          <div
            className="flex justify-center items-center w-[44px] h-[44px] rounded-full bg-neutral-3 cursor-pointer"
            onClick={onCancel}
          >
            <X size={24} color="black" />
          </div>
        </div>

        <div className="flex justify-center items-center h-full w-full">
          {fileUrl ? (
            <object
              data={fileUrl}
              type="application/pdf"
              className="w-full h-full rounded-md"
            >
              <p className="text-center text-gray-500">
                PDF preview not supported.{" "}
                <a
                  href={fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-blue-600"
                >
                  Download PDF
                </a>
              </p>
            </object>
          ) : (
            <p className="text-gray-500">No PDF available</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
