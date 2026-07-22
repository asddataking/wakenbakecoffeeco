import Link from "next/link";
import type { Product } from "@/lib/shopify/types";

export function SubscriptionSection({
  hasSellingPlans,
}: {
  hasSellingPlans: boolean;
  subscriptionProducts?: Product[];
}) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <div className="texture-topo rounded-2xl border border-ocean/10 bg-foam/80 px-6 py-12 md:px-12">
        <p className="text-xs tracking-[0.22em] text-driftwood uppercase">Recurring coffee</p>
        <h2 className="font-display mt-2 text-4xl text-ocean">Never run the pot dry</h2>
        {hasSellingPlans ? (
          <>
            <p className="mt-3 max-w-2xl text-driftwood">
              Subscribe through Shopify selling plans for automatic deliveries. Manage or
              cancel anytime in your Shopify customer account after checkout.
            </p>
            <Link
              href="/shop?subscription=true"
              className="mt-6 inline-block rounded bg-seaglass px-5 py-3 text-sm font-semibold text-ocean-deep no-underline"
            >
              Explore subscriptions
            </Link>
          </>
        ) : (
          <>
            <p className="mt-3 max-w-2xl text-driftwood">
              Recurring delivery options will appear on product pages once Shopify selling
              plans are configured. Until then, explore the full catalog and stock up for
              the week.
            </p>
            <Link
              href="/shop"
              className="mt-6 inline-block rounded bg-seaglass px-5 py-3 text-sm font-semibold text-ocean-deep no-underline"
            >
              Explore recurring coffee
            </Link>
          </>
        )}
      </div>
    </section>
  );
}
