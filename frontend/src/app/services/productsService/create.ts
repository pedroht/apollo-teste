import { httpClient } from '../httpClient';

export interface CreateProductParams {
  categoryId: string;
  name: string;
  description: string;
  color: string;
  price: number;
}

export async function create(params: CreateProductParams) {
  const { data } = await httpClient.post('/products', params);

  return data;
}
