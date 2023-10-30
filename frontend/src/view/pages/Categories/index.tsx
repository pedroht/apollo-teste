import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { useCategories } from '../../../app/hooks/useCategories';
import { transformDecimalDiscountToPercent } from '../../../app/lib/utils';
import { Heading } from '../../components/heading';
import { Button } from '../../components/ui/button';
import { DataTable } from '../../components/ui/data-table';

import { CategoryColumn, columns } from './components/column';

export function Categories() {
  const { categories } = useCategories();
  const navigate = useNavigate();

  const formatedCategories: CategoryColumn[] = categories.map((category) => ({
    ...category,
    discount: transformDecimalDiscountToPercent(category.discountPercentage),
  }));

  function handleNavigateToCreatePage() {
    navigate('/categories/new');
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <Heading title="Categories" description="Manage your categories" />

          <Button onClick={handleNavigateToCreatePage}>
            <Plus className="mr-2 h-4 w-4" />
            Add New
          </Button>
        </div>

        <DataTable
          data={formatedCategories}
          columns={columns}
          searchKeys={[{ key: 'name', placeholder: 'Search by Name' }]}
        />
      </div>
    </div>
  );
}
