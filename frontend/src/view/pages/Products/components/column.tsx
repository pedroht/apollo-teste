import { ColumnDef } from '@tanstack/react-table';

import { productsService } from '../../../../app/services/productsService';
import { CellAction } from '../../../components/cell-action';
import { SortingHeader } from '../../../components/sorting-header';

export type ProductColumn = {
  id: string;
  name: string;
  description: string;
  color: string;
  price: string;
  promotionalPrice: string;
  category: string;
  onEdit(): void;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => <SortingHeader title="Name" column={column} />,
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'color',
    header: 'Color',
  },
  {
    accessorKey: 'price',
    header: ({ column }) => <SortingHeader title="Price" column={column} />,
  },
  {
    accessorKey: 'promotionalPrice',
    header: ({ column }) => (
      <SortingHeader title="Promotional Price" column={column} />
    ),
  },
  {
    accessorKey: 'category',
    header: ({ column }) => <SortingHeader title="Category" column={column} />,
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <CellAction
        invalidateQueryKey="products"
        onEdit={row.original.onEdit}
        onDelete={() => productsService.remove(row.original.id)}
      />
    ),
  },
];
