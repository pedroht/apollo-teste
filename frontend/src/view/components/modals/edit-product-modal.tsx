import { Dialog, DialogContent } from '@radix-ui/react-dialog';
import { useState } from 'react';

import { useCategories } from '../../../app/hooks/useCategories';
import { ProductResponse } from '../../../app/services/productsService/getAll';
import { ProductForm } from '../../pages/Products/components/product-form';

interface EditProductModalProps {
  initialData: ProductResponse;
  onClose(): void;
}

export function EditProductModal({
  initialData,
  onClose,
}: EditProductModalProps) {
  const [isOpen, setIsOpen] = useState(true);
  const { categories } = useCategories();

  function handleClose() {
    onClose();
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <ProductForm
          onSubmit={handleClose}
          initialData={initialData}
          categories={categories}
        />
      </DialogContent>
    </Dialog>
  );
}
