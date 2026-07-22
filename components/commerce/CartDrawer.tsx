"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { X } from "lucide-react";
import { useCart } from "./CartProvider";
import { formatMoney } from "@/lib/shopify/normalize";

export function CartDrawer() {
  const { cart, isOpen, closeCart, updateItem, removeItem, applyCode, checkout, isPending, error } =
    useCart();
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const [code, setCode] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCart();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="presentation">
      <button
        type="button"
        className="absolute inset-0 bg-ocean/40"
        aria-label="Close cart"
        onClick={closeCart}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative flex h-full w-full max-w-md flex-col bg-cream shadow-soft"
      >
        <div className="flex items-center justify-between border-b border-ocean/10 px-4 py-4">
          <h2 id={titleId} className="font-display text-2xl text-ocean">
            Your cart
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={closeCart}
            className="rounded-md p-2 text-ocean"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          {!cart || cart.lines.length === 0 ? (
            <p className="text-driftwood">
              Your cart is empty.{" "}
              <Link href="/shop" className="text-ocean underline" onClick={closeCart}>
                Browse coffee
              </Link>
            </p>
          ) : (
            <ul className="space-y-4">
              {cart.lines.map((line) => (
                <li key={line.id} className="flex gap-3 border-b border-ocean/10 pb-4">
                  <div className="relative h-20 w-16 overflow-hidden bg-sand/40">
                    {line.merchandise.product.featuredImage ? (
                      <Image
                        src={line.merchandise.product.featuredImage.url}
                        alt={
                          line.merchandise.product.featuredImage.altText ||
                          line.merchandise.product.title
                        }
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    ) : null}
                  </div>
                  <div className="flex-1">
                    <Link
                      href={`/products/${line.merchandise.product.handle}`}
                      className="font-medium text-ocean no-underline"
                      onClick={closeCart}
                    >
                      {line.merchandise.product.title}
                    </Link>
                    <p className="text-sm text-driftwood">{line.merchandise.title}</p>
                    <p className="mt-1 text-sm">{formatMoney(line.cost.amountPerQuantity)}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <label className="sr-only" htmlFor={`qty-${line.id}`}>
                        Quantity
                      </label>
                      <input
                        id={`qty-${line.id}`}
                        type="number"
                        min={1}
                        value={line.quantity}
                        onChange={(e) =>
                          void updateItem(line.id, Number(e.target.value) || 1)
                        }
                        className="w-16 rounded border border-ocean/20 bg-foam px-2 py-1 text-sm"
                      />
                      <button
                        type="button"
                        className="text-sm text-driftwood underline"
                        onClick={() => void removeItem(line.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-ocean/10 px-4 py-4">
          <form
            className="mb-3 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              void applyCode(code);
            }}
          >
            <label className="sr-only" htmlFor="discount-code">
              Discount code
            </label>
            <input
              id="discount-code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Discount code"
              className="flex-1 rounded border border-ocean/20 bg-foam px-3 py-2 text-sm"
            />
            <button
              type="submit"
              className="rounded bg-denim px-3 py-2 text-sm text-cream"
              disabled={isPending}
            >
              Apply
            </button>
          </form>
          {cart?.discountCodes.map((d) => (
            <p key={d.code} className="mb-2 text-xs text-driftwood">
              {d.code}: {d.applicable ? "applied" : "not applicable"}
            </p>
          ))}
          <div className="mb-3 flex justify-between text-sm">
            <span>Subtotal</span>
            <span>{cart ? formatMoney(cart.cost.subtotalAmount) : "$0.00"}</span>
          </div>
          <p className="mb-3 text-xs text-driftwood">
            Tax and shipping are calculated at Shopify checkout.
          </p>
          {error ? (
            <p className="mb-3 text-sm text-red-800" role="alert">
              {error}
            </p>
          ) : null}
          <button
            type="button"
            onClick={() => void checkout()}
            disabled={!cart?.lines.length || isPending}
            className="w-full rounded bg-ocean px-4 py-3 font-medium text-cream disabled:opacity-50"
          >
            Checkout with Shopify
          </button>
          <Link
            href="/cart"
            onClick={closeCart}
            className="mt-3 block text-center text-sm text-ocean underline"
          >
            View full cart
          </Link>
        </div>
      </aside>
    </div>
  );
}
