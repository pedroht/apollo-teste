export interface Product {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  color: string;
  price: number;
  promotionalPrice: number;
  category?: {
    id: string;
    name: string;
  };
}
