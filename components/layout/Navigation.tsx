"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, ShoppingBag, User, X } from "lucide-react";
import { brand } from "@/lib/content/brand";
import { BrandMark } from "@/components/ui/BrandMark";
import { useCart } from "@/components/commerce/CartProvider";
import { CartDrawer } from "@/components/commerce/CartDrawer";

export function Navigation() {
  const [open, setOpen] = useState(false);
  const { cart, openCart } = useCart();
  const accountUrl = process.env.NEXT_PUBLIC_SHOPIFY_ACCOUNT_URL;
  const count = cart?.totalQuantity ?? 0;

  return (
    <header className="sticky top-0 z-40 border-b border-ocean/10 bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <button
          type="button"
          className="rounded-md p-2 text-ocean md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          {open ? <X aria-hidden size={22} /> : <Menu aria-hidden size={22} />}
        </button>

        <BrandMark />

        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
          {brand.navigation.primary.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium tracking-wide text-ocean/90 no-underline hover:text-ocean"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          {accountUrl ? (
            <a
              href={accountUrl}
              className="rounded-md p-2 text-ocean no-underline"
              aria-label="Account"
            >
              <User size={20} aria-hidden />
            </a>
          ) : (
            <span className="sr-only">
              Customer accounts will appear here when Shopify Customer Account is configured.
            </span>
          )}
          <button
            type="button"
            className="relative rounded-md p-2 text-ocean"
            onClick={openCart}
            aria-label={`Open cart${count ? `, ${count} items` : ""}`}
          >
            <ShoppingBag size={20} aria-hidden />
            {count > 0 ? (
              <span className="absolute top-0.5 right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-sunrise px-1 text-[10px] font-semibold text-cream">
                {count}
              </span>
            ) : null}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="border-t border-ocean/10 bg-cream px-4 py-4 md:hidden"
          aria-label="Mobile"
        >
          <ul className="space-y-3">
            {brand.navigation.primary.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block text-base font-medium text-ocean no-underline"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}

      <CartDrawer />
    </header>
  );
}
