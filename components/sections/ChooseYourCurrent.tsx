import Link from "next/link";
import { brand } from "@/lib/content/brand";

export function ChooseYourCurrent() {
  return (
    <section className="border-y border-ocean/10 bg-ocean text-cream">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <h2 className="font-display text-4xl">Choose your current</h2>
        <p className="mt-3 max-w-2xl text-cream/75">
          Four moods. One coastline. Pick the pace that matches your morning.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {brand.currents.map((current) => (
            <Link
              key={current.id}
              href={current.href}
              className="group border border-cream/15 p-6 no-underline transition hover:border-cream/40"
            >
              <h3 className="font-display text-2xl text-cream group-hover:text-sunrise-soft">
                {current.title}
              </h3>
              <p className="mt-2 text-sm text-cream/70">{current.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
