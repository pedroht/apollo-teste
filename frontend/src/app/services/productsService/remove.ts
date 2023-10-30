import { httpClient } from '../httpClient';

export async function remove(productId: string) {
  const { data } = await httpClient.delete(`/products/${productId}`);

  return data;
}
