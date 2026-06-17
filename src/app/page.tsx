import { TRIPS } from "@/lib/mock-data";
import { TripCard } from "@/components/trip-card";
import { SiteHeader, SiteFooter } from "@/components/site-header-footer";

export default function HomePage() {
  const openTrips = TRIPS.filter((t) => t.status === "open");
  const closedTrips = TRIPS.filter((t) => t.status === "closed");

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-5 sm:px-8 pt-14 sm:pt-20 pb-10 sm:pb-14">
          <p className="text-sm uppercase tracking-[0.2em] text-rust font-medium mb-4">
            Small groups. Slow trips.
          </p>
          <h1 className="font-display font-black text-[2.5rem] sm:text-6xl lg:text-7xl leading-[1.05] text-ink max-w-3xl">
            Travel that finds you.
          </h1>
          <p className="text-base sm:text-lg text-ink/70 max-w-xl mt-5 leading-relaxed">
            We run a handful of trips a year, never more than fourteen people
            at a time. No itinerary packed by the hour. Tell us what you are
            looking for and we will tell you if one of these fits.
          </p>
        </section>

        {/* Trip listing */}
        <section id="trips" className="mx-auto max-w-6xl px-5 sm:px-8 pb-20">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink">
              Open for enquiries
            </h2>
            <span className="text-sm text-ink/50">{openTrips.length} trips</span>
          </div>

          {openTrips.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {openTrips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-ink/20 rounded-sm p-10 text-center">
              <p className="text-ink/60">
                Nothing open right now. New trips get posted here first,
                before anywhere else.
              </p>
            </div>
          )}

          {closedTrips.length > 0 && (
            <div className="mt-14">
              <h2 className="font-display font-bold text-xl text-ink/60 mb-6">
                Recently closed
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 opacity-60">
                {closedTrips.map((trip) => (
                  <TripCard key={trip.id} trip={trip} />
                ))}
              </div>
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
