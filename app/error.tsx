"use client";

import { useEffect } from "react";
import { siteCopy } from "@/lib/content/site-copy";

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

  const { error: copy } = siteCopy;

  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="font-display text-4xl text-ocean">{copy.heading}</h1>
      <p className="mt-4 text-driftwood">{copy.body}</p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 rounded-full bg-ocean px-5 py-3 text-cream"
      >
        {copy.retry}
      </button>
    </div>
  );
}
