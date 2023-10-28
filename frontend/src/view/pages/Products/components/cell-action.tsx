import { MoreHorizontal, Trash } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

import { useProducts } from "@/app/hooks/useProducts";
import { productsService } from "@/app/services/productsService";
import { AlertModal } from "@/view/components/modals/alert-modal";
import { Button } from "@/view/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/view/components/ui/dropdown-menu";

import { ProductColumn } from "./column";

interface CellActionProps {
  data: ProductColumn;
}

export function CellAction({ data }: CellActionProps) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const { refetchProducts } = useProducts();

  async function handleDelete() {
    try {
      setLoading(true);

      await productsService.remove(data.id);

      refetchProducts();
      toast.success("Product deleted");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={handleDelete}
        loading={loading}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
