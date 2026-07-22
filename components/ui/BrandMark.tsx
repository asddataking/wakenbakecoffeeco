import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { brand } from "@/lib/content/brand";

type BrandMarkProps = {
  variant?: "default" | "light";
  className?: string;
  /** Show wordmark text beside the emblem. Default false — logo already includes the name. */
  showWordmark?: boolean;
};

export function BrandMark({
  variant = "default",
  className,
  showWordmark = false,
}: BrandMarkProps) {
  const light = variant === "light";

  return (
    <Link
      href="/"
      className={cn("group flex items-center gap-3 no-underline", className)}
      aria-label={brand.name}
    >
      <BrandEmblem className="h-12 w-12 shrink-0 md:h-14 md:w-14" />
      {showWordmark ? (
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
      ) : null}
    </Link>
  );
}

type BrandEmblemProps = {
  className?: string;
  priority?: boolean;
  sizes?: string;
};

export function BrandEmblem({
  className,
  priority = false,
  sizes = "56px",
}: BrandEmblemProps) {
  return (
    <span className={cn("relative inline-block overflow-hidden", className)}>
      <Image
        src="/brand/logo.webp"
        alt={brand.name}
        width={1024}
        height={1024}
        sizes={sizes}
        priority={priority}
        className="h-full w-full object-contain"
      />
    </span>
  );
}
