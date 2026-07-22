"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import type { Cart } from "@/lib/shopify/types";
import { trackEvent } from "@/lib/analytics/events";

type CartContextValue = {
  cart: Cart | null;
  isOpen: boolean;
  isPending: boolean;
  error: string | null;
  openCart: () => void;
  closeCart: () => void;
  refreshCart: () => Promise<void>;
  addItem: (input: {
    merchandiseId: string;
    quantity: number;
    sellingPlanId?: string;
    productTitle?: string;
    price?: number;
    currency?: string;
  }) => Promise<void>;
  updateItem: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  applyCode: (code: string) => Promise<void>;
  checkout: () => Promise<void>;
};

const CartContext = createContext<CartContextValue | null>(null);

async function parseJson<T>(response: Response): Promise<T> {
  const data = (await response.json()) as T & { error?: string };
  if (!response.ok) {
    throw new Error(
      typeof data === "object" && data && "error" in data && data.error
        ? String(data.error)
        : "Request failed",
    );
  }
  return data;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const refreshCart = useCallback(async () => {
    try {
      const data = await parseJson<{ cart: Cart | null }>(await fetch("/api/cart"));
      setCart(data.cart);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load cart");
    }
  }, []);

  useEffect(() => {
    void refreshCart();
  }, [refreshCart]);

  const addItem: CartContextValue["addItem"] = useCallback(
    async (input) => {
      setError(null);
      startTransition(async () => {
        try {
          const data = await parseJson<{ cart: Cart }>(
            await fetch("/api/cart", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                action: "add",
                merchandiseId: input.merchandiseId,
                quantity: input.quantity,
                sellingPlanId: input.sellingPlanId,
              }),
            }),
          );
          setCart(data.cart);
          setIsOpen(true);
          trackEvent("add_to_cart", {
            currency: input.currency ?? "USD",
            value: (input.price ?? 0) * input.quantity,
            items: [
              {
                item_id: input.merchandiseId,
                item_name: input.productTitle ?? "Coffee",
                quantity: input.quantity,
                price: input.price,
              },
            ],
          });
        } catch (err) {
          setError(err instanceof Error ? err.message : "Unable to add to cart");
        }
      });
    },
    [],
  );

  const updateItem = useCallback(async (lineId: string, quantity: number) => {
    setError(null);
    startTransition(async () => {
      try {
        const data = await parseJson<{ cart: Cart }>(
          await fetch("/api/cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "update", lineId, quantity }),
          }),
        );
        setCart(data.cart);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unable to update cart");
      }
    });
  }, []);

  const removeItem = useCallback(async (lineId: string) => {
    setError(null);
    startTransition(async () => {
      try {
        const line = cart?.lines.find((l) => l.id === lineId);
        const data = await parseJson<{ cart: Cart }>(
          await fetch("/api/cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "remove", lineId }),
          }),
        );
        setCart(data.cart);
        if (line) {
          trackEvent("remove_from_cart", {
            currency: line.cost.amountPerQuantity.currencyCode,
            value: Number(line.cost.totalAmount.amount),
            items: [
              {
                item_id: line.merchandise.id,
                item_name: line.merchandise.product.title,
                quantity: line.quantity,
                price: Number(line.cost.amountPerQuantity.amount),
              },
            ],
          });
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unable to remove item");
      }
    });
  }, [cart?.lines]);

  const applyCode = useCallback(async (code: string) => {
    setError(null);
    startTransition(async () => {
      try {
        const data = await parseJson<{ cart: Cart }>(
          await fetch("/api/cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "discount", code }),
          }),
        );
        setCart(data.cart);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unable to apply code");
      }
    });
  }, []);

  const checkout = useCallback(async () => {
    setError(null);
    try {
      trackEvent("begin_checkout", {
        currency: cart?.cost.totalAmount.currencyCode,
        value: cart ? Number(cart.cost.totalAmount.amount) : undefined,
        items: cart?.lines.map((line) => ({
          item_id: line.merchandise.id,
          item_name: line.merchandise.product.title,
          quantity: line.quantity,
          price: Number(line.cost.amountPerQuantity.amount),
        })),
      });
      const data = await parseJson<{ checkoutUrl: string }>(
        await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "checkout" }),
        }),
      );
      window.location.href = data.checkoutUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to start checkout");
    }
  }, [cart]);

  const value = useMemo<CartContextValue>(
    () => ({
      cart,
      isOpen,
      isPending,
      error,
      openCart: () => {
        setIsOpen(true);
        if (cart) {
          trackEvent("view_cart", {
            currency: cart.cost.totalAmount.currencyCode,
            value: Number(cart.cost.totalAmount.amount),
          });
        }
      },
      closeCart: () => setIsOpen(false),
      refreshCart,
      addItem,
      updateItem,
      removeItem,
      applyCode,
      checkout,
    }),
    [
      cart,
      isOpen,
      isPending,
      error,
      refreshCart,
      addItem,
      updateItem,
      removeItem,
      applyCode,
      checkout,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
