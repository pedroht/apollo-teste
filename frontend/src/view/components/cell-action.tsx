import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MoreHorizontal, Pencil, Trash } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { AlertModal } from './modals/alert-modal';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface CellActionProps {
  onDelete(): Promise<void>;
  onEdit(): void;
  invalidateQueryKey: string;
}

export function CellAction({
  onDelete,
  onEdit,
  invalidateQueryKey,
}: CellActionProps) {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();
  const { isPending: isLoading, mutateAsync: removeFn } = useMutation({
    mutationFn: onDelete,
  });

  async function handleDelete() {
    try {
      await removeFn();

      queryClient.invalidateQueries({
        queryKey: [invalidateQueryKey],
      });

      toast.success('Registry deleted!');
      setOpen(false);
    } catch (error) {
      toast.error('Something went wrong!');
    }
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={handleDelete}
        loading={isLoading}
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
          <DropdownMenuItem onClick={onEdit}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
