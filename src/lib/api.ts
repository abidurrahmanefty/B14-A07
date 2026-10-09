import type { Category, Product } from "@/lib/types";

const BASES = [
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

async function fetchJson<T>(path: string): Promise<T> {
  let lastError: unknown;

  for (const base of BASES) {
    try {
      const res = await fetch(`${base}${path}`, { cache: "no-store" });
      if (!res.ok) {
        lastError = new Error(`${res.status} ${res.statusText}`);
        continue;
      }
      return (await res.json()) as T;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error("Failed to fetch BazarDor API");
}

export function getProducts(): Promise<Product[]> {
  return fetchJson<Product[]>("/products");
}

export function getProduct(idOrSlug: string): Promise<Product> {
  return fetchJson<Product>(`/products/${idOrSlug}`);
}

export function getCategories(): Promise<Category[]> {
  return fetchJson<Category[]>("/categories");
}

export function getCategory(slug: string): Promise<Category> {
  return fetchJson<Category>(`/categories/${slug}`);
}

export async function findProductBySlug(slug: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find((p) => p.slug === slug || String(p.id) === slug) ?? null;
}
