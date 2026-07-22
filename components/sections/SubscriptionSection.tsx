import Link from "next/link";
import type { Product } from "@/lib/shopify/types";
import { siteCopy } from "@/lib/content/site-copy";

export function SubscriptionSection({
  hasSellingPlans,
}: {
  hasSellingPlans: boolean;
  subscriptionProducts?: Product[];
}) {
  const { subscriptions } = siteCopy;

  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <div className="texture-topo rounded-3xl border border-ocean/10 bg-foam/80 px-6 py-12 shadow-soft md:px-12">
        <p className="text-xs tracking-[0.22em] text-driftwood uppercase">
          {subscriptions.eyebrow}
        </p>
        <h2 className="font-display mt-2 text-4xl text-ocean md:text-5xl">
          {subscriptions.heading}
        </h2>
        {hasSellingPlans ? (
          <>
            <p className="mt-3 max-w-2xl text-driftwood">{subscriptions.body}</p>
            <p className="mt-2 text-sm text-driftwood/80">{subscriptions.note}</p>
            <Link
              href={subscriptions.primaryHref}
              className="mt-6 inline-block rounded-full bg-seaglass px-6 py-3 text-sm font-semibold text-ocean-deep no-underline transition hover:bg-seaglass-bright"
            >
              {subscriptions.primaryCta}
            </Link>
          </>
        ) : (
          <>
            <p className="mt-3 max-w-2xl text-driftwood">{subscriptions.fallbackBody}</p>
            <p className="mt-2 text-sm text-driftwood/80">{subscriptions.note}</p>
            <Link
              href={subscriptions.fallbackHref}
              className="mt-6 inline-block rounded-full bg-seaglass px-6 py-3 text-sm font-semibold text-ocean-deep no-underline transition hover:bg-seaglass-bright"
            >
              {subscriptions.fallbackCta}
            </Link>
          </>
        )}
      </div>
    </section>
  );
}
