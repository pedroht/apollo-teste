import { httpClient } from "../httpClient";

export async function remove(productId: string) {
  await httpClient.delete(`/categories/${productId}`);
  return;
}
