import { XIcon } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "../dialog";
import { Button } from "../button";
import { cn } from "@/utils/cn";

export default function ModalForm({
  heading,
  visible,
  onClose,
  children,
  className,
  hideBtnClose = false,
}: {
  heading: string;
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  hideBtnClose?: boolean;
}) {
  return (
    <Dialog open={visible} onOpenChange={(open) => !open && onClose()}>
      <DialogTitle className="hidden">{heading}</DialogTitle>
      <DialogContent
        className={cn(
          "flex flex-col gap-6 min-w-[400px] p-6 rounded-xl bg-white",
          className
        )}
        aria-describedby={undefined}
        showCloseButton={false}
      >
        <div className="w-full flex justify-between items-center gap-4">
          <div className="font-[600] text-[18px] leading-[100%] text-[#313030]">
            {heading}
          </div>
          {!hideBtnClose && (
            <Button
              icon={<XIcon size={20} />}
              onClick={onClose}
              variant="default"
              className="w-10 h-10 p-2 rounded-full"
            />
          )}
        </div>
        {children}
      </DialogContent>
    </Dialog>
  );
}