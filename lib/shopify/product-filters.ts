import type { Product, ShopFilters } from "@/lib/shopify/types";

const ROAST_ALIASES: Record<string, string[]> = {
  light: ["light", "blonde", "blond", "breakfast", "mild"],
  medium: ["medium", "city", "house", "americano"],
  dark: ["dark", "french", "italian", "espresso", "bold", "vienna", "french roast"],
};

function productHaystack(product: Product): string {
  return [
    product.title,
    product.description,
    product.productType,
    product.vendor,
    product.tags.join(" "),
    product.metafields.roastLevel ?? "",
    product.metafields.tastingNotes ?? "",
    product.metafields.beanType ?? "",
    product.metafields.origin ?? "",
  ]
    .join(" ")
    .toLowerCase();
}

function matchesRoast(product: Product, roast: string): boolean {
  const key = roast.toLowerCase().trim();
  const terms = ROAST_ALIASES[key] ?? [key];
  const hay = productHaystack(product);
  const roastField = (product.metafields.roastLevel ?? "").toLowerCase();

  // Prefer explicit roast metafield when present.
  if (roastField) {
    return terms.some((term) => roastField.includes(term));
  }

  return terms.some((term) => hay.includes(term));
}

function matchesType(product: Product, type: string): boolean {
  const key = type.toLowerCase().trim();
  const hay = productHaystack(product);

  if (key === "decaf") {
    return hay.includes("decaf") || hay.includes("caffeine-free");
  }
  if (key === "single-origin") {
    return (
      hay.includes("single origin") ||
      hay.includes("single-origin") ||
      Boolean(product.metafields.origin)
    );
  }
  if (key === "blend") {
    return hay.includes("blend");
  }

  return hay.includes(key);
}

/**
 * Local catalog matching for roast/type/search.
 * Dripshipper / headless catalogs often lack the roast tags the old Shopify query expected.
 */
export function productMatchesFilters(
  product: Product,
  filters: Pick<
    ShopFilters,
    "q" | "roast" | "type" | "availability" | "minPrice" | "maxPrice" | "subscription"
  >,
): boolean {
  if (filters.q) {
    const q = filters.q.toLowerCase().trim();
    if (q && !productHaystack(product).includes(q)) return false;
  }

  if (filters.roast && !matchesRoast(product, filters.roast)) return false;
  if (filters.type && !matchesType(product, filters.type)) return false;

  if (filters.availability === "in-stock" && !product.availableForSale) return false;
  if (filters.subscription && product.sellingPlanGroups.length === 0) return false;

  const price = Number.parseFloat(product.priceRange.minVariantPrice.amount);
  if (filters.minPrice != null && price < filters.minPrice) return false;
  if (filters.maxPrice != null && price > filters.maxPrice) return false;

  return true;
}

export function filterCatalogProducts(
  products: Product[],
  filters: Parameters<typeof productMatchesFilters>[1],
): Product[] {
  return products.filter((product) => productMatchesFilters(product, filters));
}
