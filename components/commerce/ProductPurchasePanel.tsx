"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { Product } from "@/lib/shopify/types";
import {
  defaultSelectedOptions,
  formatMoney,
  selectVariant,
} from "@/lib/shopify/normalize";
import { useCart } from "./CartProvider";
import { trackEvent } from "@/lib/analytics/events";
import { cn } from "@/lib/utils/cn";
import { siteCopy } from "@/lib/content/site-copy";

export function ProductPurchasePanel({ product }: { product: Product }) {
  const { addItem, isPending, error } = useCart();
  const [selected, setSelected] = useState(() => defaultSelectedOptions(product));
  const [quantity, setQuantity] = useState(1);
  const [sellingPlanId, setSellingPlanId] = useState<string | undefined>();
  const [justAdded, setJustAdded] = useState(false);
  const copy = siteCopy.product;

  const variant = useMemo(
    () => selectVariant(product, selected) ?? product.variants[0],
    [product, selected],
  );

  const plans = product.sellingPlanGroups.flatMap((g) => g.sellingPlans);

  useEffect(() => {
    trackEvent("view_item", {
      currency: variant?.price.currencyCode,
      value: variant ? Number(variant.price.amount) : undefined,
      items: [
        {
          item_id: product.id,
          item_name: product.title,
          item_variant: variant?.title,
          price: variant ? Number(variant.price.amount) : undefined,
        },
      ],
    });
  }, [product.id, product.title, variant]);

  const available = Boolean(variant?.availableForSale);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-2xl text-ocean">
          {variant ? formatMoney(variant.price) : null}
        </p>
        {!available ? (
          <div className="mt-2">
            <p className="text-sm font-medium text-sunrise">{copy.soldOutHeading}</p>
            <p className="text-sm text-driftwood">{copy.soldOutBody}</p>
          </div>
        ) : null}
      </div>

      {product.options.map((option) => (
        <fieldset key={option.id}>
          <legend className="mb-2 text-sm font-medium text-ocean">{option.name}</legend>
          <div className="flex flex-wrap gap-2">
            {option.values.map((value) => {
              const active = selected[option.name] === value;
              return (
                <button
                  key={value}
                  type="button"
                  className={cn(
                    "rounded border px-3 py-2 text-sm",
                    active
                      ? "border-ocean bg-ocean text-cream"
                      : "border-ocean/20 bg-foam text-ocean",
                  )}
                  onClick={() =>
                    setSelected((prev) => ({ ...prev, [option.name]: value }))
                  }
                >
                  {value}
                </button>
              );
            })}
          </div>
        </fieldset>
      ))}

      {plans.length > 0 ? (
        <fieldset>
          <legend className="mb-2 text-sm font-medium text-ocean">
            {copy.purchaseOptions}
          </legend>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="selling-plan"
                checked={!sellingPlanId}
                onChange={() => setSellingPlanId(undefined)}
              />
              {copy.justThisBag}
            </label>
            {plans.map((plan) => (
              <label key={plan.id} className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="selling-plan"
                  checked={sellingPlanId === plan.id}
                  onChange={() => setSellingPlanId(plan.id)}
                />
                <span>
                  {copy.keepItComing}
                  {plan.name ? ` — ${plan.name}` : ""}
                </span>
                {plan.description ? (
                  <span className="text-driftwood"> — {plan.description}</span>
                ) : null}
              </label>
            ))}
          </div>
        </fieldset>
      ) : null}

      <div className="flex items-end gap-3">
        <div>
          <label htmlFor="qty" className="mb-1 block text-sm font-medium">
            {copy.quantity}
          </label>
          <input
            id="qty"
            type="number"
            min={1}
            max={20}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
            className="w-20 rounded-xl border border-ocean/20 bg-foam px-3 py-2"
          />
        </div>
        <button
          type="button"
          disabled={!available || !variant || isPending}
          onClick={() => {
            if (!variant) return;
            setJustAdded(true);
            window.setTimeout(() => setJustAdded(false), 3200);
            void addItem({
              merchandiseId: variant.id,
              quantity,
              sellingPlanId,
              productTitle: product.title,
              price: Number(variant.price.amount),
              currency: variant.price.currencyCode,
            });
          }}
          className="flex-1 rounded-full bg-ocean px-4 py-3 font-medium text-cream disabled:opacity-50"
        >
          {available ? copy.addToCart : copy.soldOut}
        </button>
      </div>

      {justAdded ? (
        <div className="rounded-xl border border-seaglass/40 bg-seaglass/10 px-3 py-2" role="status">
          <p className="text-sm font-medium text-ocean">{copy.addedToStash}</p>
          <p className="text-sm text-driftwood">{copy.addedSupport}</p>
        </div>
      ) : null}

      {error ? (
        <p className="text-sm text-red-800" role="alert">
          {error}
        </p>
      ) : null}

      {/* Sticky mobile ATC */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-ocean/10 bg-cream/95 p-3 backdrop-blur md:hidden">
        <button
          type="button"
          disabled={!available || !variant || isPending}
          onClick={() =>
            variant &&
            void addItem({
              merchandiseId: variant.id,
              quantity,
              sellingPlanId,
              productTitle: product.title,
              price: Number(variant.price.amount),
              currency: variant.price.currencyCode,
            })
          }
          className="w-full rounded-full bg-ocean px-4 py-3 font-medium text-cream disabled:opacity-50"
        >
          {available && variant
            ? `${copy.addToCart} · ${formatMoney(variant.price)}`
            : copy.soldOut}
        </button>
      </div>
    </div>
  );
}

export function ProductGallery({ product }: { product: Product }) {
  const images = product.images.length
    ? product.images
    : product.featuredImage
      ? [product.featuredImage]
      : [];
  const [active, setActive] = useState(0);
  const current = images[active];

  return (
    <div>
      <div className="relative aspect-[4/5] overflow-hidden bg-sand/30 texture-topo">
        {current ? (
          <Image
            src={current.url}
            alt={current.altText || product.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        ) : (
          <div className="flex h-full items-center justify-center text-driftwood">
            {siteCopy.product.photographySoon}
          </div>
        )}
      </div>
      {images.length > 1 ? (
        <div className="mt-3 flex gap-2 overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={`${image.url}-${index}`}
              type="button"
              className={cn(
                "relative h-16 w-14 shrink-0 overflow-hidden border",
                index === active ? "border-ocean" : "border-transparent",
              )}
              onClick={() => setActive(index)}
              aria-label={`View image ${index + 1}`}
            >
              <Image src={image.url} alt="" fill className="object-cover" sizes="56px" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
