import { NewsletterForm } from "@/components/forms/NewsletterForm";

export function NewsletterSection() {
  return (
    <section className="border-t border-ocean/10 bg-sand/30">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 md:grid-cols-2 md:items-center">
        <div>
          <h2 className="font-display text-4xl text-ocean">Stay in the current</h2>
          <p className="mt-3 text-driftwood">
            Roast drops, brew tips, and first-order offers — no spam, unsubscribe anytime.
          </p>
        </div>
        <NewsletterForm variant="newsletter" />
      </div>
    </section>
  );
}
