import Link from "next/link";
import { siteCopy } from "@/lib/content/site-copy";

export default function NotFound() {
  const { notFound } = siteCopy;

  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="text-xs tracking-[0.22em] text-driftwood uppercase">404</p>
      <h1 className="font-display mt-3 text-5xl text-ocean text-balance">
        {notFound.heading}
      </h1>
      <p className="mt-4 text-driftwood">{notFound.body}</p>
      <p className="mt-3 text-sm text-driftwood/80">{notFound.luna}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="inline-block rounded-full bg-ocean px-5 py-3 text-cream no-underline"
        >
          {notFound.primaryCta}
        </Link>
        <Link
          href="/shop"
          className="inline-block rounded-full border border-ocean/25 px-5 py-3 text-ocean no-underline"
        >
          {notFound.secondaryCta}
        </Link>
      </div>
    </div>
  );
}
