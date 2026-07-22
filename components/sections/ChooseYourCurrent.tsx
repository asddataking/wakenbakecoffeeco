import Link from "next/link";
import { brand } from "@/lib/content/brand";
import { siteCopy } from "@/lib/content/site-copy";

export function ChooseYourCurrent() {
  const { tasteFinder } = siteCopy;

  return (
    <section id="taste-finder" className="border-y border-ocean/10 bg-ocean text-cream">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <p className="text-xs tracking-[0.22em] text-seaglass-bright uppercase">
          {tasteFinder.eyebrow}
        </p>
        <h2 className="font-display mt-2 text-4xl md:text-5xl">{tasteFinder.heading}</h2>
        <p className="mt-3 max-w-2xl text-cream/75">{tasteFinder.body}</p>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {brand.currents.map((current) => (
            <Link
              key={current.id}
              href={current.href}
              className="group rounded-2xl border border-cream/15 bg-cream/5 p-6 no-underline backdrop-blur-sm transition hover:border-cream/40 hover:bg-cream/10"
            >
              <h3 className="font-display text-2xl text-cream group-hover:text-sunrise-soft">
                {current.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/70">
                {current.description}
              </p>
              <span className="mt-5 inline-flex text-sm font-semibold tracking-wide text-sunrise-soft">
                {current.cta} →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
