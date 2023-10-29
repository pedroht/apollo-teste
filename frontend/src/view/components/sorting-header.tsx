import { Column } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/view/components/ui/button";

interface SortingHeaderProps<T> {
  title: string;
  column: Column<T, unknown>;
}

export function SortingHeader<T>({ title, column }: SortingHeaderProps<T>) {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {title}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
}
