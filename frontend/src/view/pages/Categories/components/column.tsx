import { ColumnDef } from '@tanstack/react-table';

import { categoriesService } from '../../../../app/services/categoriesService';
import { CellAction } from '../../../components/cell-action';
import { SortingHeader } from '../../../components/sorting-header';

export type CategoryColumn = {
  id: string;
  name: string;
  discount: string;
};

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => <SortingHeader title="Name" column={column} />,
  },
  {
    accessorKey: 'discount',
    header: ({ column }) => <SortingHeader title="Discount" column={column} />,
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <CellAction
        invalidateQueryKey="categories"
        onDelete={() => categoriesService.remove(row.original.id)}
      />
    ),
  },
];
