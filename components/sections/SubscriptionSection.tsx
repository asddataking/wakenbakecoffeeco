import Link from "next/link";
import type { Product } from "@/lib/shopify/types";
import { siteCopy } from "@/lib/content/site-copy";
import { GreyFlagOverlay } from "@/components/sections/GreyFlagOverlay";

export function SubscriptionSection({
  hasSellingPlans,
}: {
  hasSellingPlans: boolean;
  subscriptionProducts?: Product[];
}) {
  const { subscriptions } = siteCopy;

  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <div className="relative isolate overflow-hidden rounded-3xl border border-ocean/10 bg-foam/80 shadow-soft texture-topo">
        <GreyFlagOverlay />

        <div className="relative z-10 p-6 md:p-12">
          <div className="max-w-2xl rounded-2xl border border-cream/70 bg-foam/95 px-6 py-10 shadow-[0_12px_40px_rgba(11,31,51,0.08)] md:px-10 md:py-12">
            <p className="text-xs tracking-[0.22em] text-driftwood uppercase">
              {subscriptions.eyebrow}
            </p>
            <h2 className="font-display mt-2 text-4xl text-ocean md:text-5xl">
              {subscriptions.heading}
            </h2>
            {hasSellingPlans ? (
              <>
                <p className="mt-3 text-driftwood">{subscriptions.body}</p>
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
                <p className="mt-3 text-driftwood">{subscriptions.fallbackBody}</p>
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
        </div>
      </div>
    </section>
  );
}
