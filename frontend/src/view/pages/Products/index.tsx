import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useProducts } from '../../../app/hooks/useProducts';
import { formatCurrency } from '../../../app/lib/utils';
import { ProductResponse } from '../../../app/services/productsService/getAll';
import { Heading } from '../../components/heading';
import { EditProductModal } from '../../components/modals/edit-product-modal';
import { Button } from '../../components/ui/button';
import { DataTable } from '../../components/ui/data-table';

import { ProductColumn, columns } from './components/column';

export function Products() {
  const [productBeingEdited, setProductBeingEdited] =
    useState<ProductResponse | null>(null);
  const { products } = useProducts();
  const navigate = useNavigate();

  function handleEditProduct(id: string) {
    const product = products.find((p) => p.id === id);
    if (product) {
      setProductBeingEdited(product);
    }
  }

  function handleNavigateToCreatePage() {
    navigate('/products/new');
  }

  function handleCloseEditModal() {
    setProductBeingEdited(null);
  }

  const formatedProducts: ProductColumn[] = products.map((product) => ({
    ...product,
    price: formatCurrency(product.price),
    promotionalPrice: formatCurrency(product.promotionalPrice),
    category: product.category.name,
    onEdit: () => handleEditProduct(product.id),
  }));

  return (
    <>
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between">
            <Heading title="Products" description="Manage your products" />

            <Button onClick={handleNavigateToCreatePage}>
              <Plus className="mr-2 h-4 w-4" />
              Add New
            </Button>
          </div>

          <DataTable
            data={formatedProducts}
            columns={columns}
            searchKeys={[
              { key: 'name', placeholder: 'Search by Name' },
              { key: 'category', placeholder: 'Search by Category' },
            ]}
          />
        </div>
      </div>

      {productBeingEdited && (
        <EditProductModal
          initialData={productBeingEdited}
          onClose={handleCloseEditModal}
        />
      )}
    </>
  );
}
