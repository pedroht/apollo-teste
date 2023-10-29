import { ColumnDef } from "@tanstack/react-table";

import { categoriesService } from "@/app/services/categoriesService";
import { CellAction } from "@/view/components/cell-action";
import { SortingHeader } from "@/view/components/sorting-header";

export type CategoryColumn = {
  id: string;
  name: string;
  discount: string;
};

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <SortingHeader title="Name" column={column} />;
    },
  },
  {
    accessorKey: "discount",
    header: ({ column }) => {
      return <SortingHeader title="Discount" column={column} />;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction invalidateQueryKey="categories" onDelete={() => categoriesService.remove(row.original.id)} />,
  },
];
