import { httpClient } from "../httpClient";

export type ProductsFilters = {
  name?: string;
  categoryId?: string;
};

export type ProductResponse = {
  id: string;
  name: string;
  description: string;
  color: string;
  price: number;
  promotionalPrice: number;
  categoryId: string;
  category: {
    id: string;
    name: string;
  };
};

export async function getAll(
  filters?: ProductsFilters,
): Promise<ProductResponse[]> {
  const { data } = await httpClient.get("/products", {
    params: filters,
  });

  return data;
}
