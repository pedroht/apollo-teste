import { useCategories } from "@/app/hooks/useCategories";
import { ProductForm } from "./components/product-form";

export function CreateProduct() {
  const { categories } = useCategories();

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm categories={categories} />
      </div>
    </div>
  );
}
