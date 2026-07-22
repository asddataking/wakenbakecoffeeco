import Image from "next/image";
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
          {brand.currents.map((current, index) => (
            <Link
              key={current.id}
              href={current.href}
              className="group relative isolate overflow-hidden rounded-2xl border border-cream/15 no-underline transition hover:border-cream/40"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={current.image}
                  alt={current.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition duration-500 ease-out group-hover:scale-[1.04]"
                  priority={index < 2}
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-ocean via-ocean/55 to-ocean/10"
                  aria-hidden
                />
              </div>
              <div className="relative -mt-24 px-6 pb-6 pt-2">
                <h3 className="font-display text-2xl text-cream transition group-hover:text-sunrise-soft">
                  {current.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/75">
                  {current.description}
                </p>
                <span className="mt-4 inline-flex text-sm font-semibold tracking-wide text-sunrise-soft">
                  {current.cta}
                  <span
                    className="ml-1 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden
                  >
                    →
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
