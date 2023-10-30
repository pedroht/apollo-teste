import { httpClient } from '../httpClient';

export interface CreateCategoryParams {
  name: string;
  discount: number;
}

export async function create(params: CreateCategoryParams) {
  const { data } = await httpClient.post('/categories', params);

  return data;
}
