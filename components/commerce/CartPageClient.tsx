"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "./CartProvider";
import { formatMoney } from "@/lib/shopify/normalize";

export function CartPageClient() {
  const { cart, updateItem, removeItem, applyCode, checkout, isPending, error } = useCart();
  const [code, setCode] = useState("");

  if (!cart) {
    return <p className="text-driftwood">Loading cart…</p>;
  }

  if (cart.lines.length === 0) {
    return (
      <p className="text-driftwood">
        Your cart is empty.{" "}
        <Link href="/shop" className="underline">
          Browse coffee
        </Link>
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <ul className="space-y-4">
        {cart.lines.map((line) => (
          <li key={line.id} className="flex gap-4 border-b border-ocean/10 pb-4">
            <div className="relative h-24 w-20 bg-sand/40">
              {line.merchandise.product.featuredImage ? (
                <Image
                  src={line.merchandise.product.featuredImage.url}
                  alt={line.merchandise.product.title}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              ) : null}
            </div>
            <div className="flex-1">
              <Link
                href={`/products/${line.merchandise.product.handle}`}
                className="font-medium text-ocean no-underline"
              >
                {line.merchandise.product.title}
              </Link>
              <p className="text-sm text-driftwood">{line.merchandise.title}</p>
              <p className="mt-1">{formatMoney(line.cost.totalAmount)}</p>
              <div className="mt-2 flex gap-3">
                <input
                  type="number"
                  min={1}
                  value={line.quantity}
                  onChange={(e) => void updateItem(line.id, Number(e.target.value) || 1)}
                  className="w-16 rounded border border-ocean/20 px-2 py-1"
                  aria-label={`Quantity for ${line.merchandise.product.title}`}
                />
                <button
                  type="button"
                  className="text-sm underline"
                  onClick={() => void removeItem(line.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <form
        className="flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          void applyCode(code);
        }}
      >
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Discount code"
          className="flex-1 rounded border border-ocean/20 px-3 py-2"
        />
        <button type="submit" className="rounded bg-denim px-4 py-2 text-cream">
          Apply
        </button>
      </form>

      <div className="flex justify-between font-medium">
        <span>Subtotal</span>
        <span>{formatMoney(cart.cost.subtotalAmount)}</span>
      </div>
      <p className="text-sm text-driftwood">
        Tax and shipping calculated at Shopify checkout.
      </p>
      {error ? (
        <p className="text-sm text-red-800" role="alert">
          {error}
        </p>
      ) : null}
      <button
        type="button"
        disabled={isPending}
        onClick={() => void checkout()}
        className="w-full rounded bg-ocean px-4 py-3 text-cream"
      >
        Checkout with Shopify
      </button>
    </div>
  );
}
