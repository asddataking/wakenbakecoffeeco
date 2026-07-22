import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { brewGuides, getBrewGuide } from "@/lib/content/brew-guides";
import { absoluteUrl } from "@/lib/utils/cn";
import { JsonLd } from "@/components/ui/JsonLd";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return brewGuides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getBrewGuide(slug);
  if (!guide) return { title: "Brew Guide" };
  return {
    title: guide.title,
    description: guide.excerpt,
    alternates: { canonical: absoluteUrl(`/brew-guides/${slug}`) },
  };
}

export default async function BrewGuidePage({ params }: { params: Params }) {
  const { slug } = await params;
  const guide = getBrewGuide(slug);
  if (!guide) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: guide.title,
          datePublished: guide.publishedAt,
          description: guide.excerpt,
          author: { "@type": "Organization", name: "Wake N Bake Coffee Co." },
        }}
      />
      <p className="text-sm text-driftwood">
        <Link href="/brew-guides" className="underline">
          Brew guides
        </Link>{" "}
        / {guide.title}
      </p>
      <h1 className="font-display mt-4 text-5xl text-ocean">{guide.title}</h1>
      <p className="mt-4 text-lg text-driftwood">{guide.excerpt}</p>
      <p className="mt-2 text-sm text-driftwood">
        {guide.readTime} read · Updated {guide.publishedAt}
      </p>

      <div className="mt-12 space-y-10">
        {guide.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="font-display text-3xl text-ocean">{section.heading}</h2>
            {section.body.map((paragraph) => (
              <p key={paragraph} className="mt-3 leading-relaxed text-ocean/90">
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </div>

      <aside className="mt-12 border border-seaglass/40 bg-seaglass/10 p-6">
        <h2 className="font-display text-2xl text-ocean">Tips</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-ocean/90">
          {guide.tips.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
      </aside>
    </article>
  );
}
