"use client";

import { useEffect } from "react";
import type { Product } from "@/lib/shopify/types";
import { trackEvent } from "@/lib/analytics/events";

export function ViewItemListTracker({
  products,
  listName,
}: {
  products: Product[];
  listName: string;
}) {
  useEffect(() => {
    if (!products.length) return;
    trackEvent("view_item_list", {
      item_list_name: listName,
      items: products.slice(0, 20).map((p) => ({
        item_id: p.id,
        item_name: p.title,
        price: Number(p.priceRange.minVariantPrice.amount),
      })),
    });
  }, [products, listName]);

  return null;
}
