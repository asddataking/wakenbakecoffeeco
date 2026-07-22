import type { Metadata } from "next";
import { CartPageClient } from "@/components/commerce/CartPageClient";
import { absoluteUrl } from "@/lib/utils/cn";

export const metadata: Metadata = {
  title: "Cart",
  robots: { index: false, follow: false },
  alternates: { canonical: absoluteUrl("/cart") },
};

export default async function CartPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const demoCheckout = sp.demoCheckout === "1";

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-display text-5xl text-ocean">Cart</h1>
      {demoCheckout ? (
        <p className="mt-4 rounded border border-sunrise/40 bg-sunrise/10 px-4 py-3 text-sm text-ocean" role="status">
          Demo mode cannot open Shopify checkout. Connect Storefront API credentials to
          complete real orders.
        </p>
      ) : null}
      <div className="mt-8">
        <CartPageClient />
      </div>
    </div>
  );
}
