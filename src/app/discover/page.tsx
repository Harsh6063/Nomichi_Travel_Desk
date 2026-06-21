import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { SiteHeader, SiteFooter }
from "@/components/site-header-footer";

export default async function DiscoverPage() {
  const trips = await prisma.trip.findMany({
    where: {
      status: "OPEN",
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <>
      <SiteHeader />
    <main className="min-h-screen py-24">

      <div className="max-w-7xl mx-auto px-5">

        <h1 className="text-center text-7xl font-black text-rust">
          All Open Trips
        </h1>

        <p className="text-center text-ink/60 mt-4">
          Every journey currently open for enquiries.
        </p>

        <div className="grid lg:grid-cols-3 gap-8 mt-16">

          {trips.map((trip:any) => (
            <Link
              key={trip.id}
              href={`/trips/${trip.id}`}
            >
              <div className="rounded-[30px] overflow-hidden bg-white shadow-lg hover:-translate-y-2 transition">

                <img
  src={trip.image || "/images/placeholder.jpg"}
  alt={trip.name}
  className="h-[350px] w-full object-cover"
/>

                <div className="p-6">

                  <div className="flex justify-between">

                    <span className="text-rust text-sm">
                      {trip.duration} Days
                    </span>

                    <span className="text-ink/50 text-sm">
                      {trip.journeyType}
                    </span>

                  </div>

                  <h3 className="font-bold text-3xl mt-3">
                    {trip.name}
                  </h3>

                  <p className="text-ink/60">
                    {trip.destination}
                  </p>

                  <p className="mt-5 text-rust text-4xl font-black">
                    ₹{trip.priceGST}
                  </p>

                </div>

              </div>
            </Link>
          ))}
        </div>

      </div>

    </main>
      <SiteFooter />
    </>
  );
}