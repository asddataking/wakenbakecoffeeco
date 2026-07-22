import Link from "next/link";

type TrustItem = {
  id: string;
  name: string;
  href?: string;
  external?: boolean;
};

const items: TrustItem[] = [
  {
    id: "dav",
    name: "Disabled American Veterans",
    href: "https://www.dav.org/",
    external: true,
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
  },
  {
    id: "secure-checkout",
    name: "Secure Checkout",
  },
  {
    id: "dankndevour",
    name: "DankNDevour",
    href: "https://www.dankndevour.com/",
    external: true,
  },
];

function TrustMark({ id }: { id: string }) {
  switch (id) {
    case "dav":
      return (
        <svg viewBox="0 0 132 40" className="h-9 w-auto" aria-hidden>
          <circle cx="18" cy="20" r="14" fill="none" stroke="currentColor" strokeWidth="1.75" />
          <path
            d="M18 8.5v23M8.5 20h19"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            opacity="0.5"
          />
          <text
            x="18"
            y="24"
            textAnchor="middle"
            fill="currentColor"
            fontSize="11"
            fontWeight="700"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
            letterSpacing="0.04em"
          >
            DAV
          </text>
          <text
            x="40"
            y="17"
            fill="currentColor"
            fontSize="11"
            fontWeight="700"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
            letterSpacing="0.08em"
          >
            DAV
          </text>
          <text
            x="40"
            y="28"
            fill="currentColor"
            fontSize="5.5"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
            letterSpacing="0.12em"
            opacity="0.75"
          >
            DISABLED AMERICAN VETERANS
          </text>
        </svg>
      );
    case "veteran-owned":
      return (
        <svg viewBox="0 0 150 40" className="h-9 w-auto" aria-hidden>
          <path
            fill="currentColor"
            d="M14 8.5l1.7 5.2H21l-4.3 3.1 1.6 5.2L14 18.9l-4.3 3.1 1.6-5.2-4.3-3.1h5.3L14 8.5z"
          />
          <text
            x="28"
            y="17"
            fill="currentColor"
            fontSize="10"
            fontWeight="700"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
            letterSpacing="0.14em"
          >
            VETERAN
          </text>
          <text
            x="28"
            y="29"
            fill="currentColor"
            fontSize="10"
            fontWeight="700"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
            letterSpacing="0.14em"
          >
            OWNED
          </text>
        </svg>
      );
    case "shopify":
      return (
        <svg viewBox="0 0 130 36" className="h-8 w-auto" aria-hidden>
          <path
            fill="currentColor"
            d="M23.2 8.4c-.1 0-1.3-.1-1.3-.1s-1.1-1.1-1.2-1.2c-.1-.1-.3-.1-.4 0 0 0-.2.1-.3.1l-.6 18.5c0 .4.3.8.8.9 1.9.4 5.4 1 8.2 1 2.9 0 3.7-.6 3.9-1.4.2-.8.1-14.4.1-14.4s-.9-.3-2.3-.6c-1.3-.3-3.5-.8-5.1-1.1-.7-.1-1.5-.2-1.8-.7z"
          />
          <path
            fill="currentColor"
            opacity="0.85"
            d="M20.7 7.1c0-.1.1-.3.2-.4.2-.3.5-.2.5-.2s1.1.1 1.1.1c.4-1.2 1.1-2.3 2.2-2.3.1 0 .2 0 .3.1-.3 1.1-.1 2.4.4 3.5-1.2.3-2.7.7-3.7.9-.4.1-.9.2-1 .2 0 0-.1-.1 0-.9z"
          />
          <text
            x="38"
            y="24"
            fill="currentColor"
            fontSize="16"
            fontWeight="600"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
            letterSpacing="-0.02em"
          >
            shopify
          </text>
        </svg>
      );
    case "secure-checkout":
      return (
        <svg viewBox="0 0 150 40" className="h-9 w-auto" aria-hidden>
          <rect
            x="6"
            y="12"
            width="14"
            height="16"
            rx="2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
          />
          <path
            d="M9.5 12V9.8a3.5 3.5 0 0 1 7 0V12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
          />
          <circle cx="13" cy="20" r="1.4" fill="currentColor" />
          <path d="M13 21.4v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <text
            x="28"
            y="17"
            fill="currentColor"
            fontSize="9"
            fontWeight="700"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
            letterSpacing="0.12em"
          >
            SECURE
          </text>
          <text
            x="28"
            y="29"
            fill="currentColor"
            fontSize="9"
            fontWeight="700"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
            letterSpacing="0.12em"
          >
            CHECKOUT
          </text>
        </svg>
      );
    case "dankndevour":
      return (
        <svg viewBox="0 0 168 36" className="h-8 w-auto" aria-hidden>
          <text
            x="0"
            y="23"
            fill="currentColor"
            fontSize="15"
            fontWeight="700"
            fontFamily="Georgia, 'Times New Roman', serif"
            letterSpacing="0.01em"
          >
            {"Dank'N'Devour"}
          </text>
        </svg>
      );
    default:
      return null;
  }
}

export function TrustLogos() {
  return (
    <div className="border-t border-cream/10">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-center text-[11px] tracking-[0.22em] text-cream/50 uppercase">
          Proud affiliations &amp; checkout you can trust
        </p>
        <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-10 gap-y-7">
          {items.map((item) => {
            const mark = (
              <span className="text-cream/70 transition group-hover:text-cream">
                <TrustMark id={item.id} />
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
                    <Link href={item.href} className="group inline-flex no-underline" aria-label={item.name}>
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
    </div>
  );
}
