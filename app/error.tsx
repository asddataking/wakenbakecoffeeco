"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="font-display text-4xl text-ocean">Something went sideways</h1>
      <p className="mt-4 text-driftwood">
        We hit an unexpected error loading this page. Try again, or return to the shop.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 rounded bg-ocean px-5 py-3 text-cream"
      >
        Try again
      </button>
    </div>
  );
}
