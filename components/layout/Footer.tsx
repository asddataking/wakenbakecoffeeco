import Link from "next/link";
import { brand } from "@/lib/content/brand";
import { BrandMark } from "@/components/ui/BrandMark";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-ocean/10 bg-ocean text-cream">
      <div className="wave-divider h-8 w-full bg-cream" aria-hidden />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-[1.2fr_repeat(3,1fr)]">
        <div>
          <BrandMark variant="light" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/80">
            {brand.description}
          </p>
          {brand.logoIsTemporary ? (
            <p className="mt-3 text-xs text-cream/55">
              Temporary wordmark — final logo assets pending.
            </p>
          ) : null}
        </div>
        {brand.navigation.footer.map((group) => (
          <div key={group.title}>
            <h2 className="font-display text-lg">{group.title}</h2>
            <ul className="mt-4 space-y-2 text-sm text-cream/80">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-cream hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-cream/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {brand.name}. Brew the good life.
          </p>
          <p>Checkout secured by Shopify. Fulfillment via Dripshipper partners.</p>
        </div>
      </div>
    </footer>
  );
}
