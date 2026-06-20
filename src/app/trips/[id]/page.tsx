import { prisma } from "@/lib/prisma";
import { SiteHeader, SiteFooter } from "@/components/site-header-footer";
import { EnquiryForm } from "@/components/enquiry-form";
import { notFound } from "next/navigation";
import Link from "next/link";
import ScrollToTop from "@/components/ScrollToTop";
import {
ArrowLeft,
Calendar,
MapPin,
Users,
Clock3,
} from "lucide-react";

export default async function TripDetailPage({
params,
}: {
params: Promise<{ id: string }>;
}) {
const { id } = await params;

const trip = await prisma.trip.findUnique({
where: {
id,
},
});

if (!trip) {
notFound();
}

const seatsLeft =
trip.totalSeats - trip.bookedSeats;

const canEnquire =
trip.status === "OPEN" &&
seatsLeft > 0;

return (

<> <ScrollToTop /><SiteHeader />

  <main>

    <section
      className="
        relative
        h-[75vh]
        flex
        items-end
      "
    >
      <img
        src={trip.image || ""}
        alt={trip.name}
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
        "
      />

      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 max-w-7xl mx-auto w-full px-5 pb-12 text-white">

        <Link
          href="/discover"
          className="inline-flex items-center gap-2 mb-6"
        >
          <ArrowLeft size={18} />
          Back To Trips
        </Link>

        <h1 className="font-display text-6xl font-black">
          {trip.name}
        </h1>

        <p className="text-xl mt-3">
          {trip.journeyType}
        </p>

      </div>

    </section>

    <section className="py-20">

      <div className="max-w-7xl mx-auto px-5">

        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-14">

          <div>

            <div className="flex flex-wrap gap-8 border-b border-ink/10 pb-8 mb-8">

              <InfoItem
                icon={MapPin}
                label={trip.destination}
              />

              <InfoItem
                icon={Clock3}
                label={trip.duration || ""}
              />

              <InfoItem
                icon={Users}
                label={`${seatsLeft} Seats Left`}
              />

              <InfoItem
                icon={Calendar}
                label={`${new Date(
                  trip.startDate
                ).toLocaleDateString()} - ${new Date(
                  trip.endDate
                ).toLocaleDateString()}`}
              />

            </div>

            <h2 className="text-3xl font-bold mb-4">
              About This Journey
            </h2>

            <p className="leading-relaxed text-ink/70">
              {trip.description}
            </p>

            <div className="mt-10">

              <p className="text-sm text-ink/50">
                Price Including GST
              </p>

              <p className="text-rust text-5xl font-black mt-2">
                ₹{trip.priceGST.toLocaleString()}
              </p>

            </div>

          </div>

          <div>

            <div className="bg-white shadow-xl rounded-[32px] p-8 sticky top-24">

              <h3 className="text-3xl font-bold mb-2">
                Enquire Now
              </h3>

              <p className="text-ink/60 mb-6">
                No payment needed right now.
              </p>

              {canEnquire ? (
                <EnquiryForm
                  tripId={trip.id}
                  tripName={trip.name}
                />
              ) : (
                <div>
                  Trip currently unavailable.
                </div>
              )}

            </div>

          </div>

        </div>

      </div>

    </section>

  </main>

  <SiteFooter />
</>


);
}

function InfoItem({
icon: Icon,
label,
}: {
icon: any;
label: string;
}) {
return ( <div className="flex items-center gap-2"> <Icon size={18} /> <span>{label}</span> </div>
);
}
