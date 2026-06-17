import Link from "next/link";
import { formatDateRange, formatPrice, seatsLeftLabel } from "@/lib/utils";
import type { Trip } from "@/types";
import { StampBadge } from "./stamp-badge";
import { MapPin } from "lucide-react";

const COVER_GRADIENTS: Record<string, string> = {
  spiti: "linear-gradient(135deg, #45471D 0%, #1C1B1A 100%)",
  kerala: "linear-gradient(135deg, #1C1B1A 0%, #45471D 60%, #D1B788 100%)",
  ladakh: "linear-gradient(135deg, #D55D27 0%, #1C1B1A 100%)",
  konkan: "linear-gradient(135deg, #D1B788 0%, #45471D 100%)",
};

export function TripCard({ trip }: { trip: Trip }) {
  const isOpen = trip.status === "open";
  const seatsLabel = seatsLeftLabel(trip.total_seats, trip.seats_booked);
  const isFull = seatsLabel === "Full";

  return (
    <Link
      href={`/trips/${trip.id}`}
      className="group block bg-cream border border-ink/15 rounded-sm overflow-hidden hover:border-ink/30 hover:shadow-[4px_4px_0_0_rgba(28,27,26,0.08)] transition-all duration-200"
    >
      <div
        className="h-40 sm:h-48 relative flex items-end p-4"
        style={{ background: COVER_GRADIENTS[trip.cover_image ?? "spiti"] }}
      >
        <div className="absolute top-3 right-3">
          <StampBadge tone={isOpen && !isFull ? "olive" : "ink"} className="bg-cream/90">
            {isFull ? "Full" : isOpen ? "Open" : "Closed"}
          </StampBadge>
        </div>
        <h3 className="font-display font-bold text-2xl text-cream leading-tight relative z-10">
          {trip.name}
        </h3>
      </div>
      <div className="p-4 sm:p-5">
        <div className="flex items-center gap-1.5 text-sm text-ink/60 mb-2">
          <MapPin className="size-3.5" />
          <span>{trip.destination}</span>
        </div>
        <p className="text-sm text-ink/75 leading-relaxed mb-3">
          {trip.short_description}
        </p>
        <div className="flex items-center justify-between pt-3 border-t border-ink/10">
          <div>
            <p className="text-xs text-ink/50">{formatDateRange(trip.start_date, trip.end_date)}</p>
            <p className="font-display font-bold text-lg text-ink mt-0.5">
              {formatPrice(trip.price_inr)}
              <span className="text-xs font-sans font-normal text-ink/50"> incl. GST</span>
            </p>
          </div>
          <span className="text-xs text-ink/50 text-right">{seatsLabel}</span>
        </div>
      </div>
    </Link>
  );
}
