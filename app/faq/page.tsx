import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl } from "@/lib/utils/cn";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about Wake N Bake Coffee Co.",
  alternates: { canonical: absoluteUrl("/faq") },
};

const items = [
  {
    q: "Where is checkout handled?",
    a: "All payments and checkout happen on Shopify-hosted checkout. We never process card data on this storefront.",
  },
  {
    q: "Who ships the coffee?",
    a: "Fulfillment is managed through Shopify with Dripshipper partners. Timing shown on product pages comes from live Shopify data when available.",
  },
  {
    q: "Do you offer subscriptions?",
    a: "When selling plans are configured in Shopify, they appear on product pages. Otherwise you can purchase one-time bags from the shop.",
  },
  {
    q: "How do accounts work?",
    a: "Customer accounts are powered by Shopify. If account login is configured, you will see an account link in the header.",
  },
  {
    q: "Where can I learn to brew?",
    a: "Visit our Brew Guides for pour-over, French press, and batch drip methods.",
  },
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="font-display text-5xl text-ocean">FAQ</h1>
      <div className="mt-10 space-y-4">
        {items.map((item) => (
          <details key={item.q} className="border-b border-ocean/10 pb-4">
            <summary className="cursor-pointer text-lg font-medium text-ocean">
              {item.q}
            </summary>
            <p className="mt-2 text-driftwood">{item.a}</p>
          </details>
        ))}
      </div>
      <p className="mt-10 text-sm text-driftwood">
        Still stuck?{" "}
        <Link href="/contact" className="underline">
          Contact us
        </Link>
        .
      </p>
    </div>
  );
}
