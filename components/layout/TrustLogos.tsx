import Image from "next/image";
import Link from "next/link";

type TrustItem = {
  id: string;
  name: string;
  href?: string;
  external?: boolean;
  src?: string;
  width?: number;
  height?: number;
  className?: string;
};

const items: TrustItem[] = [
  {
    id: "dav",
    name: "Disabled American Veterans",
    href: "https://www.dav.org/",
    external: true,
    src: "/brand/trust/dav.svg",
    width: 136,
    height: 47,
    className: "h-10 w-auto md:h-11",
  },
  {
    id: "veteran-owned",
    name: "Veteran Owned",
    href: "/about",
  },
  {
    id: "shopify",
    name: "Shopify",
    href: "https://www.shopify.com/",
    external: true,
    src: "/brand/trust/shopify.svg",
    width: 160,
    height: 46,
    className: "h-8 w-auto md:h-9",
  },
  {
    id: "dankndevour",
    name: "DankNDevour",
    href: "https://www.dankndevour.com/",
    external: true,
    src: "/brand/trust/dankndevour.webp",
    width: 256,
    height: 256,
    className: "h-14 w-14 md:h-16 md:w-16",
  },
];

function VeteranOwnedMark() {
  return (
    <span className="inline-flex items-center gap-2 text-ocean">
      <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0" aria-hidden>
        <path
          fill="currentColor"
          d="M12 2.5l2.1 6.4H21l-5.3 3.8 2 6.3L12 15.7 6.3 19l2-6.3L3 8.9h6.9L12 2.5z"
        />
      </svg>
      <span className="text-left leading-tight">
        <span className="block text-[11px] font-bold tracking-[0.16em]">VETERAN</span>
        <span className="block text-[11px] font-bold tracking-[0.16em]">OWNED</span>
      </span>
    </span>
  );
}

function TrustMark({ item }: { item: TrustItem }) {
  if (item.id === "veteran-owned") return <VeteranOwnedMark />;
  if (!item.src || !item.width || !item.height) return null;

  return (
    <Image
      src={item.src}
      alt={item.name}
      width={item.width}
      height={item.height}
      className={`object-contain opacity-90 transition group-hover:opacity-100 ${item.className ?? "h-10 w-auto"}`}
    />
  );
}

/** Light trust strip for the homepage (under brew guides / journal content). */
export function TrustLogos() {
  return (
    <section className="border-y border-ocean/10 bg-foam/55 py-14">
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-center text-[11px] tracking-[0.22em] text-driftwood uppercase">
          Proud affiliations &amp; checkout you can trust
        </p>
        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
          {items.map((item) => {
            const mark = (
              <span className="inline-flex items-center justify-center">
                <TrustMark item={item} />
              </span>
            );

            return (
              <li key={item.id}>
                {item.href ? (
                  item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex no-underline"
                      aria-label={item.name}
                    >
                      {mark}
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className="group inline-flex no-underline"
                      aria-label={item.name}
                    >
                      {mark}
                    </Link>
                  )
                ) : (
                  <span className="group inline-flex" aria-label={item.name} role="img">
                    {mark}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
