import { NextResponse } from "next/server";
import {
  addToCart,
  applyDiscountCode,
  beginCheckout,
  getOrCreateCart,
  removeLine,
  updateLineQuantity,
} from "@/lib/shopify/cart";
import { isDemoMode } from "@/lib/validation/env";
import { ShopifyError } from "@/lib/shopify/types";
import { z } from "zod";

export async function GET() {
  try {
    const cart = await getOrCreateCart();
    return NextResponse.json({ cart, demo: isDemoMode() });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to load cart";
    return NextResponse.json({ error: message, cart: null }, { status: 500 });
  }
}

const bodySchema = z.discriminatedUnion("action", [
  z.object({
    action: z.literal("add"),
    merchandiseId: z.string().min(1),
    quantity: z.number().int().min(1).max(50),
    sellingPlanId: z.string().optional(),
  }),
  z.object({
    action: z.literal("update"),
    lineId: z.string().min(1),
    quantity: z.number().int().min(0).max(50),
  }),
  z.object({
    action: z.literal("remove"),
    lineId: z.string().min(1),
  }),
  z.object({
    action: z.literal("discount"),
    code: z.string().max(64),
  }),
  z.object({
    action: z.literal("checkout"),
  }),
]);

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const body = bodySchema.parse(json);

    if (body.action === "add") {
      if (isDemoMode()) {
        return NextResponse.json({
          error:
            "Demo mode: cart mutations are simulated only. Connect Shopify to enable real checkout.",
          cart: await getOrCreateCart(),
        }, { status: 200 });
      }
      const cart = await addToCart({
        merchandiseId: body.merchandiseId,
        quantity: body.quantity,
        sellingPlanId: body.sellingPlanId,
      });
      return NextResponse.json({ cart });
    }

    if (body.action === "update") {
      const cart = await updateLineQuantity(body.lineId, body.quantity);
      return NextResponse.json({ cart });
    }

    if (body.action === "remove") {
      const cart = await removeLine(body.lineId);
      return NextResponse.json({ cart });
    }

    if (body.action === "discount") {
      const cart = await applyDiscountCode(body.code);
      return NextResponse.json({ cart });
    }

    if (body.action === "checkout") {
      if (isDemoMode()) {
        return NextResponse.json(
          {
            error:
              "Demo mode cannot redirect to Shopify checkout. Add Storefront API credentials to continue.",
          },
          { status: 400 },
        );
      }
      const checkoutUrl = await beginCheckout();
      return NextResponse.json({ checkoutUrl });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid cart request" }, { status: 400 });
    }
    if (error instanceof ShopifyError) {
      const status =
        error.code === "SOLD_OUT" || error.code === "UNAVAILABLE"
          ? 409
          : error.code === "CART_EXPIRED"
            ? 410
            : error.code === "RATE_LIMITED"
              ? 429
              : 400;
      return NextResponse.json({ error: error.message, code: error.code }, { status });
    }
    const message = error instanceof Error ? error.message : "Cart request failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
