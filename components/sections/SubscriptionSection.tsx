import Image from "next/image";
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
      <div className="relative overflow-hidden rounded-3xl border border-ocean/10 shadow-soft">
        <div className="absolute inset-0" aria-hidden>
          <Image
            src="/placeholders/flag-soft.svg"
            alt=""
            fill
            sizes="(max-width: 1152px) 100vw, 1152px"
            className="object-cover object-center opacity-90"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-cream/35 via-transparent to-cream/45" />
        </div>

        <div className="relative m-4 rounded-2xl border border-cream/60 bg-foam/92 px-6 py-10 shadow-[0_12px_40px_rgba(11,31,51,0.08)] backdrop-blur-[2px] md:m-6 md:px-12 md:py-12">
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
      </div>
    </section>
  );
}
