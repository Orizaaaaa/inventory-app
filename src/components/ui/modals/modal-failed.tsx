import { XIcon } from "lucide-react";
import { Button } from "../button";
import { Dialog, DialogContent, DialogTitle } from "../dialog";

type ModalFailedProps = {
  visible: boolean;
  message: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onClose?: () => void;
}

export default function ModalFailed({
  visible,
  message,
  setOpen,
  onClose = () => null,
}: ModalFailedProps) {
  const handleClose = () => {
    setOpen(false);
    onClose();
  }
  
  return (
    <Dialog open={visible}>
      <DialogTitle className="hidden">Failed!</DialogTitle>
      <DialogContent className="flex flex-col items-center gap-8 w-[480px] p-6 rounded-xl bg-white" aria-describedby={undefined} showCloseButton={false}>
        <div className="flex flex-row items-center justify-center w-[80px] h-[80px] rounded-full bg-[#FF3333] sm:w-[120px] sm:h-[120px]">
          <XIcon color="white" className="w-12 h-12 sm:w-[75px] sm:h-[75px]" />
        </div>
        <div className="flex flex-col items-center text-center gap-2">
          <p className="font-[600] text-[20px] text-[#1F1F1F] sm:text-[24px]">Failed!</p>
          <p className="font-[400] text-[14px] text-[#595959] sm:text-[16px]">{message || ""}</p>
        </div>
        <div className="grid grid-cols-1 gap-3 w-full justify-center">
          <Button onClick={handleClose} className="h-[52px] sm:text-[16px]" text="Close" />
        </div>
      </DialogContent>
    </Dialog>
  );
}