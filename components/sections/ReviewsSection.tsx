import { siteCopy } from "@/lib/content/site-copy";

/**
 * Reviews: only render approved testimonials when provided.
 * Never fabricate star ratings or customer quotes.
 */
export function ReviewsSection({
  testimonials = [],
}: {
  testimonials?: Array<{ quote: string; name: string; location?: string }>;
}) {
  const { reviews } = siteCopy;

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h2 className="font-display text-3xl text-ocean md:text-4xl">{reviews.heading}</h2>
      {testimonials.length === 0 ? (
        <p className="mt-4 max-w-2xl text-driftwood">{reviews.empty}</p>
      ) : (
        <ul className="mt-8 grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <li
              key={item.quote}
              className="rounded-2xl border border-ocean/10 bg-foam/60 p-5"
            >
              <blockquote className="text-ocean">&ldquo;{item.quote}&rdquo;</blockquote>
              <p className="mt-3 text-sm text-driftwood">
                — {item.name}
                {item.location ? `, ${item.location}` : ""}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
