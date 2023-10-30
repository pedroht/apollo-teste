import { ColumnDef } from "@tanstack/react-table";

import { productsService } from "@/app/services/productsService";
import { CellAction } from "@/view/components/cell-action";
import { SortingHeader } from "@/view/components/sorting-header";

export type ProductColumn = {
  id: string;
  name: string;
  description: string;
  color: string;
  price: string;
  promotionalPrice: string;
  category: string;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <SortingHeader title="Name" column={column} />;
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "color",
    header: "Color",
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return <SortingHeader title="Price" column={column} />;
    },
  },
  {
    accessorKey: "promotionalPrice",
    header: ({ column }) => {
      return <SortingHeader title="Promotional Price" column={column} />;
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return <SortingHeader title="Category" column={column} />;
    },
  },
  {
    id: "actions",
    cell: ({ row }) =>
      <CellAction invalidateQueryKey="products" onDelete={() => productsService.remove(row.original.id)} />
    ,
  },
];
