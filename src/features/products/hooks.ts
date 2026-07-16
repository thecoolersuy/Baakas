import type { ProductQueryParams } from "../../types/index";
import { useQuery } from "@tanstack/react-query";
import { fetchProductById, fetchProducts, fetchCategories } from "./api";

export const productKeys = {
  all: ["products"] as const,
  list: (params: ProductQueryParams) => ["products", "list", params] as const,
  detail: (id: number) => ["products", "detail", id] as const,
  categories: ["products", "categories"] as const,
};

export function useProducts(params: ProductQueryParams = {}) {
  return useQuery({
    queryKey: productKeys.list(params),
    queryFn: () => fetchProducts(params),
    placeholderData: (prev) => prev,
  });
}

export function useProduct(id: number) {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => fetchProductById(id),
    enabled: !!id,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: productKeys.categories,
    queryFn: () => fetchCategories(),
    staleTime: 1000 * 60 * 30,
  });
}
