import { useQuery } from "@tanstack/react-query";
import { productsService } from "../services/productsService";
import { ProductsFilters } from "../services/productsService/getAll";

export function useProducts(filters?: ProductsFilters) {
  const { data, isFetching, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: () => productsService.getAll(filters),
  });

  return {
    products: data ?? [],
    isLoading: isFetching,
    refetchProducts: refetch,
  };
}
