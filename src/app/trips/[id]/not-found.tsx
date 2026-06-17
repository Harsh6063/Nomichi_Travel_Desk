import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/site-header-footer";
import { Compass } from "lucide-react";

export default function TripNotFound() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center px-5 py-20">
        <div className="text-center max-w-sm">
          <Compass className="size-10 text-ink/30 mx-auto mb-5" />
          <h1 className="font-display font-bold text-2xl text-ink mb-2">
            Can't find this trip
          </h1>
          <p className="text-ink/60 mb-6">
            It may have closed, or the link might be off. Here's what's
            currently open.
          </p>
          <Link
            href="/#trips"
            className="inline-flex px-5 py-2.5 bg-rust text-cream rounded-sm text-sm font-medium hover:bg-[#bd4f1f] transition-colors"
          >
            See open trips
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
