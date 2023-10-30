import { Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Heading } from "@/view/components/heading";
import { Button } from "@/view/components/ui/button";
import { DataTable } from "@/view/components/ui/data-table";

import { useProducts } from "@/app/hooks/useProducts";
import { formatCurrency } from "@/app/lib/utils";

import { ProductResponse } from "@/app/services/productsService/getAll";
import { EditProductModal } from "@/view/components/modals/edit-product-modal";

import { ProductColumn, columns } from "./components/column";

export function Products() {
  const [productBeingEdited, setProductBeingEdited] = useState<ProductResponse | null>(null)
  const { products } = useProducts();
  const navigate = useNavigate();

  const formatedProducts: ProductColumn[] = products.map((product) => ({
    ...product,
    price: formatCurrency(product.price),
    promotionalPrice: formatCurrency(product.promotionalPrice),
    category: product.category.name,
  }));

  function handleNavigateToCreatePage() {
    navigate("/products/new");
  }

  function handleRowClick(data: ProductColumn) {
    const product = products.find(p => p.id === data.id)
    if (product) {
      setProductBeingEdited(product);
    }
  }

  function handleCloseEditModal() {
    setProductBeingEdited(null);
  }

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
              { key: "name", placeholder: "Search by Name" },
              { key: "category", placeholder: "Search by Category" },
            ]}
            onRowClick={handleRowClick}
          />
        </div>
      </div>

      {productBeingEdited && (
        <EditProductModal initialData={productBeingEdited} onClose={handleCloseEditModal} />
      )}
    </>
  );
}
