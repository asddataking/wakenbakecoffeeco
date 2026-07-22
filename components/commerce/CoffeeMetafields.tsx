import type { CoffeeMetafields } from "@/lib/shopify/types";
import { siteCopy } from "@/lib/content/site-copy";

const labels: Record<keyof CoffeeMetafields, string> = {
  roastLevel: "Roast level",
  origin: "Origin",
  tastingNotes: "Tasting notes",
  processingMethod: "Processing",
  altitude: "Altitude",
  beanType: "Bean type",
  brewMethods: "Brew methods",
  body: "Body",
  acidity: "Acidity",
  bagSize: "Bag size",
  roastSchedule: "Roast schedule",
  shippingNote: "Shipping note",
};

export function CoffeeMetafieldsList({ metafields }: { metafields: CoffeeMetafields }) {
  const entries = (Object.keys(labels) as Array<keyof CoffeeMetafields>)
    .map((key) => ({ key, label: labels[key], value: metafields[key] }))
    .filter((entry) => Boolean(entry.value));

  if (entries.length === 0) return null;

  return (
    <section aria-labelledby="coffee-details-heading" className="mt-10">
      <h2 id="coffee-details-heading" className="font-display text-2xl text-ocean">
        {siteCopy.product.factsHeading}
      </h2>
      <dl className="mt-4 grid gap-3 sm:grid-cols-2">
        {entries.map((entry) => (
          <div key={entry.key} className="border-t border-ocean/10 pt-3">
            <dt className="text-xs tracking-[0.18em] text-driftwood uppercase">
              {entry.label}
            </dt>
            <dd className="mt-1 text-ocean">{entry.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
