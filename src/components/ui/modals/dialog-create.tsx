import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { cn } from "@/utils/cn";
import { GradientOutlineButton } from "../gradient-button/gradient-outline-button";
import { FilterGradientIcon } from "../gradient-button/icons/filter-gradient-icon";

type DialogCreateProps = {
  labelTriggerDialog?: string;
  title: string;
  inputForm: React.ReactNode;
  isFormComplete: boolean;
  width?: string;
  handleSubmit: () => Promise<void> | void;
  buttonTitle?: string;

  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  autoCloseOnSubmitSuccess?: boolean;

  // trigger bawaan ditampilkan atau tidak
  renderTrigger?: boolean; // <— NEW (default: true)

  // opsi filter trigger (tetap ada, jika renderTrigger=true)
  isFilterTrigger?: boolean;
  filterTriggerLabel?: React.ReactNode;
  filterTriggerClassName?: string;
  filterGradientFrom?: string;
  filterGradientTo?: string;
  onFilterTriggerClick?: () => void;
};

export function DialogCreate({
  labelTriggerDialog,
  title,
  inputForm,
  isFormComplete,
  handleSubmit,
  width = "sm:max-w-[800px]",
  open,
  onOpenChange,
  autoCloseOnSubmitSuccess = true,
  buttonTitle = "Save",

  renderTrigger = true, // <— default true (backward compatible)

  isFilterTrigger = false,
  filterTriggerLabel = "Filter",
  filterTriggerClassName,
  filterGradientFrom = "#2E90FA",
  filterGradientTo = "#A43DF2",
  onFilterTriggerClick,
}: DialogCreateProps) {
  const isControlled = typeof open === "boolean";
  const [internalOpen, setInternalOpen] = useState(false);
  const openState = isControlled ? (open as boolean) : internalOpen;
  const setOpen = (v: boolean) =>
    isControlled ? onOpenChange?.(v) : setInternalOpen(v);

  return (
    <Dialog open={openState} onOpenChange={setOpen}>
      {renderTrigger && (
        <DialogTrigger asChild>
          {isFilterTrigger ? (
            <GradientOutlineButton
              leftIcon={<FilterGradientIcon className="h-5 w-5" />}
              onClick={onFilterTriggerClick}
              from={filterGradientFrom}
              to={filterGradientTo}
              className={cn("cursor-pointer", filterTriggerClassName)}
            >
              {filterTriggerLabel}
            </GradientOutlineButton>
          ) : (
            <Button variant="gradien" className="px-[36px]">
              <Plus className="mr-2 h-4 w-4" />
              {labelTriggerDialog || "Create New"}
            </Button>
          )}
        </DialogTrigger>
      )}

      <DialogContent className={`${width} bg-white p-6 rounded-lg`}>
        <DialogHeader>
          <DialogTitle className="text-[20px] font-semibold">
            {title || "Create New"}
          </DialogTitle>
        </DialogHeader>

        {inputForm}

        <DialogFooter className="flex w-full gap-3 mt-6">
          <Button
            className="flex-1 bg-red-500 hover:bg-red-600 text-white"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>

          <Button
            className="flex-1"
            variant={isFormComplete ? "gradien" : "default"}
            disabled={!isFormComplete}
            onClick={async () => {
              if (!isFormComplete) return;
              try {
                await handleSubmit();
                if (autoCloseOnSubmitSuccess) setOpen(false);
              } catch (e) {
                console.error(e);
              }
            }}
          >
            {buttonTitle}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
