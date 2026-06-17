import Link from "next/link";
import { TRIPS, LEADS } from "@/lib/mock-data";
import { AdminPageHeader } from "@/components/admin-page-header";
import { StampBadge } from "@/components/stamp-badge";
import { Button } from "@/components/button";
import { formatDateRange, formatPrice, seatsLeftLabel } from "@/lib/utils";
import { Plus, Pencil } from "lucide-react";

export default function AdminTripsPage() {
  return (
    <>
      <AdminPageHeader
        title="Trips"
        description="What's live, what's closed, and what's coming up."
        action={
          <Link href="/admin/trips/new">
            <Button size="sm">
              <Plus className="size-4" /> New trip
            </Button>
          </Link>
        }
      />

      <div className="px-5 sm:px-8 py-6">
        {TRIPS.length === 0 ? (
          <div className="border border-dashed border-ink/20 rounded-sm p-10 text-center">
            <p className="text-ink/60 mb-3">No trips yet. Add the first one to start taking enquiries.</p>
            <Link href="/admin/trips/new">
              <Button size="sm">Create a trip</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TRIPS.map((trip) => {
              const leadCount = LEADS.filter((l) => l.trip_id === trip.id).length;
              return (
                <div key={trip.id} className="border border-ink/10 rounded-sm p-5 flex flex-col">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-display font-bold text-lg text-ink leading-tight">{trip.name}</h3>
                    <StampBadge tone={trip.status === "open" ? "olive" : "ink"} className="shrink-0">
                      {trip.status === "open" ? "Open" : "Closed"}
                    </StampBadge>
                  </div>
                  <p className="text-sm text-ink/60 mb-3">{trip.destination}</p>
                  <p className="text-xs text-ink/50 mb-1">{formatDateRange(trip.start_date, trip.end_date)}</p>
                  <p className="font-display font-bold text-xl text-ink mb-3">{formatPrice(trip.price_inr)}</p>

                  <div className="flex items-center justify-between text-xs text-ink/50 mb-4">
                    <span>{seatsLeftLabel(trip.total_seats, trip.seats_booked)}</span>
                    <span>{leadCount} {leadCount === 1 ? "enquiry" : "enquiries"}</span>
                  </div>

                  <div className="mt-auto pt-3 border-t border-ink/10 flex gap-2">
                    <Link href={`/admin/trips/${trip.id}/edit`} className="flex-1">
                      <Button variant="ghost" size="sm" className="w-full">
                        <Pencil className="size-3.5" /> Edit
                      </Button>
                    </Link>
                    <Link href={`/trips/${trip.id}`} target="_blank" className="flex-1">
                      <Button variant="ghost" size="sm" className="w-full">
                        View live
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
