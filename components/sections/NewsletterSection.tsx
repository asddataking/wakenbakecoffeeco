import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { siteCopy } from "@/lib/content/site-copy";

export function NewsletterSection() {
  const { newsletter } = siteCopy;

  return (
    <section id="join-the-crew" className="border-t border-ocean/10 bg-sand/30">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-xs tracking-[0.22em] text-driftwood uppercase">
            {newsletter.eyebrow}
          </p>
          <h2 className="font-display mt-2 text-4xl text-ocean md:text-5xl">
            {newsletter.heading}
          </h2>
          <p className="mt-3 text-driftwood">{newsletter.body}</p>
        </div>
        <NewsletterForm variant="newsletter" />
      </div>
    </section>
  );
}
