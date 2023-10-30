import { httpClient } from "../httpClient";

export interface UpdateProductParams {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  color: string;
  price: number;
}

export async function update({ id, ...params }: UpdateProductParams) {
  const { data } = await httpClient.put(`/products/${id}`, params);

  return data;
}
