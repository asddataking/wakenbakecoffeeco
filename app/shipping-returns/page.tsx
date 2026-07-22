import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/utils/cn";

export const metadata: Metadata = {
  title: "Shipping & Returns",
  alternates: { canonical: absoluteUrl("/shipping-returns") },
};

export default function ShippingReturnsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="font-display text-5xl text-ocean">Shipping & Returns</h1>
      <p className="mt-4 text-sm text-driftwood">
        [CONFIRM final carrier, regions, and return window with Dripshipper/Shopify]
      </p>
      <div className="mt-8 space-y-4 text-ocean/90">
        <p>
          Shipping rates and delivery estimates are calculated at Shopify checkout based
          on your address and the fulfillment settings connected to our store.
        </p>
        <p>
          Because coffee is perishable, returns may be limited. If a shipment arrives
          damaged or incorrect, contact us with your order number and photos within
          [CONFIRM X days].
        </p>
        <p>
          Subscription modifications and cancellations are managed through Shopify customer
          portals when selling plans are enabled.
        </p>
      </div>
    </div>
  );
}
