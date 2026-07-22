import Link from "next/link";
import { brand } from "@/lib/content/brand";

export function AnnouncementBar() {
  if (!brand.announcement.enabled) return null;

  return (
    <div className="bg-ocean text-cream">
      <div className="mx-auto flex max-w-6xl items-center justify-center px-4 py-2 text-center text-sm tracking-wide">
        <Link href={brand.announcement.href} className="hover:underline">
          {brand.announcement.message}
        </Link>
      </div>
    </div>
  );
}
