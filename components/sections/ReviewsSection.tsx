/**
 * Reviews: only render approved testimonials when provided.
 * Never fabricate star ratings or customer quotes.
 */
export function ReviewsSection({
  testimonials = [],
}: {
  testimonials?: Array<{ quote: string; name: string; location?: string }>;
}) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h2 className="font-display text-3xl text-ocean">From the shoreline</h2>
      {testimonials.length === 0 ? (
        <p className="mt-4 max-w-2xl text-driftwood">
          Customer stories will appear here after moderation. We do not display placeholder
          or fabricated reviews.
        </p>
      ) : (
        <ul className="mt-8 grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <li key={item.quote} className="border-l-2 border-seaglass pl-4">
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
