import { PropsWithChildren } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/view/components/ui/dialog";

interface ModalProps extends PropsWithChildren {
  title: string;
  description: string;
  isOpen: boolean;
  onClose(): void;
}

export function Modal({
  children,
  title,
  description,
  isOpen,
  onClose,
}: ModalProps) {
  function handleChange(open: boolean) {
    if (!open) {
      onClose();
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
}
