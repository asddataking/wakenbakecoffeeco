import { cookies } from "next/headers";
import {
  addCartLines,
  createCart,
  getCart,
  getCheckoutUrl,
  removeCartLines,
  updateCartDiscountCodes,
  updateCartLines,
} from "./client";
import { buildCartLineInput } from "./normalize";
import type { Cart } from "./types";
import { ShopifyError } from "./types";

export const CART_COOKIE = "wnbc_cart_id";
const CART_COOKIE_MAX_AGE = 60 * 60 * 24 * 14; // 14 days

export async function readCartId(): Promise<string | undefined> {
  const jar = await cookies();
  return jar.get(CART_COOKIE)?.value;
}

export async function writeCartId(cartId: string): Promise<void> {
  const jar = await cookies();
  jar.set(CART_COOKIE, cartId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: CART_COOKIE_MAX_AGE,
  });
}

export async function clearCartId(): Promise<void> {
  const jar = await cookies();
  jar.delete(CART_COOKIE);
}

export async function getOrCreateCart(): Promise<Cart> {
  const existingId = await readCartId();
  if (existingId) {
    try {
      const cart = await getCart(existingId);
      if (cart) return cart;
    } catch (error) {
      if (!(error instanceof ShopifyError && error.code === "CART_EXPIRED")) {
        // Fall through to create a fresh cart on recoverable errors
      }
    }
  }
  const cart = await createCart();
  await writeCartId(cart.id);
  return cart;
}

export async function addToCart(input: {
  merchandiseId: string;
  quantity: number;
  sellingPlanId?: string;
}): Promise<Cart> {
  const line = buildCartLineInput(input);
  const existingId = await readCartId();
  if (!existingId) {
    const cart = await createCart([line]);
    await writeCartId(cart.id);
    return cart;
  }
  try {
    return await addCartLines(existingId, [line]);
  } catch (error) {
    if (error instanceof ShopifyError && error.code === "CART_EXPIRED") {
      const cart = await createCart([line]);
      await writeCartId(cart.id);
      return cart;
    }
    throw error;
  }
}

export async function updateLineQuantity(lineId: string, quantity: number): Promise<Cart> {
  const cart = await getOrCreateCart();
  if (quantity <= 0) {
    return removeCartLines(cart.id, [lineId]);
  }
  return updateCartLines(cart.id, [{ id: lineId, quantity }]);
}

export async function removeLine(lineId: string): Promise<Cart> {
  const cart = await getOrCreateCart();
  return removeCartLines(cart.id, [lineId]);
}

export async function applyDiscountCode(code: string): Promise<Cart> {
  const cart = await getOrCreateCart();
  const codes = code.trim() ? [code.trim()] : [];
  return updateCartDiscountCodes(cart.id, codes);
}

export async function beginCheckout(): Promise<string> {
  const cart = await getOrCreateCart();
  if (cart.totalQuantity < 1) {
    throw new ShopifyError("CHECKOUT_FAILED", "Your cart is empty");
  }
  return getCheckoutUrl(cart);
}
