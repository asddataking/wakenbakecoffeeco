"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { brand } from "@/lib/content/brand";

export function AnnouncementBar() {
  const { enabled, href, messages } = brand.announcement;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!enabled || messages.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % messages.length);
    }, 6000);
    return () => window.clearInterval(id);
  }, [enabled, messages.length]);

  if (!enabled) return null;

  const message = messages[index] ?? messages[0];

  return (
    <div className="bg-ocean text-cream">
      <div className="mx-auto flex max-w-6xl items-center justify-center px-4 py-2.5 text-center text-sm tracking-wide">
        <Link
          href={href}
          className="no-underline hover:underline"
          aria-live="polite"
          aria-atomic="true"
        >
          {message}
        </Link>
      </div>
    </div>
  );
}
