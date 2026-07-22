import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="text-xs tracking-[0.22em] text-driftwood uppercase">404</p>
      <h1 className="font-display mt-3 text-5xl text-ocean">Lost at sea</h1>
      <p className="mt-4 text-driftwood">
        That page drifted out with the tide. Head back to shore and keep browsing.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block rounded bg-ocean px-5 py-3 text-cream no-underline"
      >
        Back home
      </Link>
    </div>
  );
}
