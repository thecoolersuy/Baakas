import { api } from "@lib/api";
import type {
  Product,
  ProductsResponse,
  ProductQueryParams,
} from "../../types/index";

export async function fetchProducts(
  params: ProductQueryParams = {},
): Promise<ProductsResponse> {
  const { limit = 20, skip = 0, q, category } = params;

  if (q) {
    const { data } = await api.get<ProductsResponse>("/products/search", {
      params: { q, limit, skip },
    });
    return data;
  }

  if (category) {
    const { data } = await api.get<ProductsResponse>(
      `/products/category/${category}`,
      { params: { limit, skip } },
    );
    return data;
  }

  const { data } = await api.get<ProductsResponse>("/products", {
    params: { limit, skip },
  });
  return data;
}

export async function fetchProductById(id: number): Promise<Product> {
  const { data } = await api.get<Product>(`/products/${id}`);
  return data;
}

export async function fetchCategories(): Promise<string[]> {
  const { data } = await api.get<{ slug: string; name: string; url: string }[]>(
    "/products/categories",
  );
  return data.map((categories) => categories.slug);
}
