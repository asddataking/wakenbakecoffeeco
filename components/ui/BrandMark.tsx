import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { brand } from "@/lib/content/brand";

type BrandMarkProps = {
  variant?: "default" | "light";
  className?: string;
};

export function BrandMark({ variant = "default", className }: BrandMarkProps) {
  const light = variant === "light";

  return (
    <Link
      href="/"
      className={cn("group flex items-center gap-3 no-underline", className)}
      aria-label={brand.name}
    >
      <BrandEmblem className={cn("h-11 w-11 shrink-0", light ? "text-cream" : "text-ocean")} />
      <span className="leading-tight">
        <span
          className={cn(
            "font-display block text-[15px] tracking-[0.14em]",
            light ? "text-cream" : "text-ocean",
          )}
        >
          {brand.lockup.line1}
        </span>
        <span
          className={cn(
            "block text-[10px] tracking-[0.28em]",
            light ? "text-cream/75" : "text-driftwood",
          )}
        >
          {brand.lockup.line2}
        </span>
      </span>
    </Link>
  );
}

export function BrandEmblem({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="Temporary Wake N Bake emblem: sunrise, cup, and wave"
    >
      <title>Wake N Bake temporary emblem</title>
      <circle cx="32" cy="26" r="10" fill="currentColor" opacity="0.2" />
      <path
        d="M18 28c4-6 8-8 14-8s10 2 14 8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M24 34h16v10c0 4-3.5 7-8 7s-8-3-8-7V34z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M40 36h4c2 0 4 2 4 4s-2 4-4 4h-4" fill="none" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 52c6-4 12-4 18 0s12 4 18 0 12-4 18 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
