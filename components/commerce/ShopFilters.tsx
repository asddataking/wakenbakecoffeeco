"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useEffect, useTransition } from "react";
import { trackEvent } from "@/lib/analytics/events";
import { siteCopy } from "@/lib/content/site-copy";

export function ShopFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) trackEvent("search", { search_term: q });
  }, [searchParams]);

  function update(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (!value || value === "all") params.delete(key);
    else params.set(key, value);
    params.delete("cursor");
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  }

  return (
    <form
      className="grid gap-3 rounded-2xl border border-ocean/10 bg-foam/70 p-4 shadow-[0_10px_30px_rgba(11,31,51,0.04)] md:grid-cols-2 lg:grid-cols-6"
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        update("q", String(fd.get("q") || ""));
      }}
      aria-busy={pending}
    >
      <label className="block text-sm lg:col-span-2">
        <span className="mb-1 block text-driftwood">{siteCopy.shop.searchLabel}</span>
        <input
          name="q"
          defaultValue={searchParams.get("q") ?? ""}
          placeholder={siteCopy.shop.searchPlaceholder}
          className="w-full rounded-xl border border-ocean/20 bg-cream px-3 py-2"
        />
      </label>
      <label className="block text-sm">
        <span className="mb-1 block text-driftwood">Sort</span>
        <select
          value={searchParams.get("sort") ?? "featured"}
          onChange={(e) => update("sort", e.target.value)}
          className="w-full rounded border border-ocean/20 bg-cream px-3 py-2"
        >
          <option value="featured">Featured</option>
          <option value="newest">Newest</option>
          <option value="price-asc">Price: Low to high</option>
          <option value="price-desc">Price: High to low</option>
          <option value="title-asc">Name: A–Z</option>
          <option value="title-desc">Name: Z–A</option>
        </select>
      </label>
      <label className="block text-sm">
        <span className="mb-1 block text-driftwood">Availability</span>
        <select
          value={searchParams.get("availability") ?? "all"}
          onChange={(e) => update("availability", e.target.value)}
          className="w-full rounded border border-ocean/20 bg-cream px-3 py-2"
        >
          <option value="all">All</option>
          <option value="in-stock">In stock</option>
        </select>
      </label>
      <label className="block text-sm">
        <span className="mb-1 block text-driftwood">Roast</span>
        <select
          value={searchParams.get("roast") ?? ""}
          onChange={(e) => update("roast", e.target.value)}
          className="w-full rounded border border-ocean/20 bg-cream px-3 py-2"
        >
          <option value="">Any</option>
          <option value="light">Light</option>
          <option value="medium">Medium</option>
          <option value="dark">Dark</option>
        </select>
      </label>
      <label className="block text-sm">
        <span className="mb-1 block text-driftwood">Type</span>
        <select
          value={searchParams.get("type") ?? ""}
          onChange={(e) => update("type", e.target.value)}
          className="w-full rounded border border-ocean/20 bg-cream px-3 py-2"
        >
          <option value="">Any</option>
          <option value="decaf">Decaf</option>
          <option value="blend">Blend</option>
          <option value="single-origin">Single origin</option>
        </select>
      </label>
      <div className="flex items-end gap-2 lg:col-span-2">
        <label className="block flex-1 text-sm">
          <span className="mb-1 block text-driftwood">Min price</span>
          <input
            type="number"
            min={0}
            defaultValue={searchParams.get("minPrice") ?? ""}
            onBlur={(e) => update("minPrice", e.target.value)}
            className="w-full rounded border border-ocean/20 bg-cream px-3 py-2"
          />
        </label>
        <label className="block flex-1 text-sm">
          <span className="mb-1 block text-driftwood">Max price</span>
          <input
            type="number"
            min={0}
            defaultValue={searchParams.get("maxPrice") ?? ""}
            onBlur={(e) => update("maxPrice", e.target.value)}
            className="w-full rounded border border-ocean/20 bg-cream px-3 py-2"
          />
        </label>
        <button
          type="submit"
          className="rounded bg-denim px-4 py-2 text-sm text-cream"
        >
          Apply
        </button>
      </div>
    </form>
  );
}
