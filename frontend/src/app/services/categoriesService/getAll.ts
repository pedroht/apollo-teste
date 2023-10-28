import { httpClient } from "../httpClient";

export type ProductsFilters = {
  name?: string;
  categoryId?: string;
};

type GetAllCategoriesResponse = {
  id: string;
  name: string;
};

export async function getAll(): Promise<GetAllCategoriesResponse[]> {
  const { data } = await httpClient.get("/categories");

  return data;
}
