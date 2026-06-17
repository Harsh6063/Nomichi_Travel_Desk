import { TRIPS } from "@/lib/mock-data";
import { formatDateRange, formatPrice, seatsLeftLabel } from "@/lib/utils";
import { SiteHeader, SiteFooter } from "@/components/site-header-footer";
import { StampBadge } from "@/components/stamp-badge";
import { EnquiryForm } from "@/components/enquiry-form";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin, Users } from "lucide-react";

const COVER_GRADIENTS: Record<string, string> = {
  spiti: "linear-gradient(135deg, #45471D 0%, #1C1B1A 100%)",
  kerala: "linear-gradient(135deg, #1C1B1A 0%, #45471D 60%, #D1B788 100%)",
  ladakh: "linear-gradient(135deg, #D55D27 0%, #1C1B1A 100%)",
  konkan: "linear-gradient(135deg, #D1B788 0%, #45471D 100%)",
};

export default async function TripDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const trip = TRIPS.find((t) => t.id === id);

  if (!trip) notFound();

  const isOpen = trip.status === "open";
  const seatsLabel = seatsLeftLabel(trip.total_seats, trip.seats_booked);
  const isFull = seatsLabel === "Full";
  const canEnquire = isOpen && !isFull;

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <div
          className="h-56 sm:h-72 relative flex items-end"
          style={{ background: COVER_GRADIENTS[trip.cover_image ?? "spiti"] }}
        >
          <div className="mx-auto max-w-5xl w-full px-5 sm:px-8 pb-6 sm:pb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-cream/80 text-sm mb-4 hover:text-cream transition-colors"
            >
              <ArrowLeft className="size-4" /> All trips
            </Link>
            <div className="flex items-center gap-3 mb-2">
              <StampBadge tone={canEnquire ? "olive" : "ink"} className="bg-cream/90">
                {isFull ? "Full" : isOpen ? "Open" : "Closed"}
              </StampBadge>
            </div>
            <h1 className="font-display font-black text-3xl sm:text-5xl text-cream leading-tight">
              {trip.name}
            </h1>
          </div>
        </div>

        <div className="mx-auto max-w-5xl px-5 sm:px-8 py-10 sm:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-14">
            {/* Left: details */}
            <div>
              <div className="flex flex-wrap gap-x-6 gap-y-3 mb-8 pb-8 border-b border-ink/10">
                <InfoItem icon={MapPin} label={trip.destination} />
                <InfoItem icon={Calendar} label={formatDateRange(trip.start_date, trip.end_date)} />
                <InfoItem icon={Users} label={seatsLabel} />
              </div>

              <h2 className="font-display font-bold text-xl text-ink mb-3">
                About this trip
              </h2>
              <p className="text-ink/75 leading-relaxed whitespace-pre-line">
                {trip.description}
              </p>

              <div className="mt-8 pt-8 border-t border-ink/10">
                <p className="text-sm text-ink/50 mb-1">Price per person, including GST</p>
                <p className="font-display font-black text-3xl text-ink">
                  {formatPrice(trip.price_inr)}
                </p>
              </div>
            </div>

            {/* Right: enquiry form */}
            <div>
              <div className="bg-sand/10 border border-sand/40 rounded-sm p-5 sm:p-7 lg:sticky lg:top-24">
                {canEnquire ? (
                  <>
                    <h2 className="font-display font-bold text-xl text-ink mb-1">
                      Send an enquiry
                    </h2>
                    <p className="text-sm text-ink/60 mb-6">
                      No payment now. We call you back to talk it through.
                    </p>
                    <EnquiryForm tripId={trip.id} tripName={trip.name} />
                  </>
                ) : (
                  <div className="text-center py-4">
                    <h2 className="font-display font-bold text-xl text-ink mb-2">
                      {isFull ? "This batch is full" : "Not open right now"}
                    </h2>
                    <p className="text-sm text-ink/60 mb-5">
                      {isFull
                        ? "All seats for this batch are taken. Leave your details and we will reach out when the next one opens."
                        : "This trip isn't taking enquiries at the moment. Check back, or browse what's open now."}
                    </p>
                    <Link
                      href="/#trips"
                      className="text-sm font-medium text-rust hover:underline"
                    >
                      See open trips
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

function InfoItem({ icon: Icon, label }: { icon: typeof MapPin; label: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-ink/70">
      <Icon className="size-4 text-ink/40" />
      <span>{label}</span>
    </div>
  );
}
