import Link from "next/link";
import type { Product } from "@/lib/shopify/types";
import { siteCopy } from "@/lib/content/site-copy";
import { WavingFlagBackground } from "@/components/sections/WavingFlagBackground";

export function SubscriptionSection({
  hasSellingPlans,
}: {
  hasSellingPlans: boolean;
  subscriptionProducts?: Product[];
}) {
  const { subscriptions } = siteCopy;

  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <div className="relative isolate min-h-[22rem] overflow-hidden rounded-3xl border border-ocean/10 shadow-soft md:min-h-[24rem]">
        <WavingFlagBackground />

        <div className="relative z-10 flex h-full items-center p-5 md:p-8">
          <div className="w-full max-w-2xl rounded-2xl border border-white/70 bg-foam/93 px-6 py-10 shadow-[0_16px_48px_rgba(11,31,51,0.14)] backdrop-blur-[3px] md:px-10 md:py-12">
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
