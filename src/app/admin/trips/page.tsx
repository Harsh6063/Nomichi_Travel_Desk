import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminPageHeader } from "@/components/admin-page-header";
export const dynamic = "force-dynamic";
export default async function TripsPage() {
const trips = await prisma.trip.findMany({
orderBy: {
startDate: "asc",
},
});

return (
<> <AdminPageHeader
     title="Trips"
     description="Manage all Nomichi journeys."
   />

  <div className="px-4 sm:px-8 py-6">

    <div className="flex justify-end mb-6">
      <Link
        href="/admin/trips/new"
        className="
          bg-rust
          text-white
          px-5
          py-3
          rounded-sm
          font-medium
        "
      >
        + Create Trip
      </Link>
    </div>

    {/* MOBILE CARDS */}

    <div className="md:hidden space-y-4">

      {trips.map((trip: any) => (

        <div
          key={trip.id}
          className="
            border
            border-ink/10
            rounded-sm
            p-4
            bg-white
          "
        >
          <div className="flex justify-between items-start gap-3">

            <div>
              <h3 className="font-semibold text-lg">
                {trip.name}
              </h3>

              <p className="text-ink/60 text-sm">
                {trip.destination}
              </p>
            </div>

            <span
              className={
                trip.status === "OPEN"
                  ? "text-green-600 font-medium text-sm"
                  : "text-red-600 font-medium text-sm"
              }
            >
              {trip.status}
            </span>

          </div>

          <div className="mt-4 space-y-2 text-sm">

            <div className="flex justify-between">
              <span className="text-ink/50">
                Date
              </span>

              <span>
                {new Date(
                  trip.startDate
                ).toLocaleDateString()}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-ink/50">
                Price
              </span>

              <span>
                ₹{trip.priceGST.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-ink/50">
                Seats
              </span>

              <span>
                {trip.totalSeats}
              </span>
            </div>

          </div>

          <Link
            href={`/admin/trips/${trip.id}/edit`}
            className="
              block
              mt-4
              text-center
              bg-rust
              text-white
              py-2
              rounded-sm
              font-medium
            "
          >
            Edit Trip
          </Link>

        </div>

      ))}

    </div>

    {/* DESKTOP TABLE */}

    <div className="hidden md:block">

      <div className="border border-ink/10 rounded-sm overflow-hidden">

        <table className="w-full">

          <thead>

            <tr className="bg-ink/[0.03]">

              <th className="text-left px-5 py-4">
                Trip
              </th>

              <th className="text-left px-5 py-4">
                Destination
              </th>

              <th className="text-left px-5 py-4">
                Date
              </th>

              <th className="text-left px-5 py-4">
                Price
              </th>

              <th className="text-left px-5 py-4">
                Seats
              </th>

              <th className="text-left px-5 py-4">
                Status
              </th>

              <th className="text-left px-5 py-4">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {trips.map((trip: any) => (

              <tr
                key={trip.id}
                className="border-t border-ink/10"
              >

                <td className="px-5 py-4">
                  {trip.name}
                </td>

                <td className="px-5 py-4">
                  {trip.destination}
                </td>

                <td className="px-5 py-4">
                  {new Date(
                    trip.startDate
                  ).toLocaleDateString()}
                </td>

                <td className="px-5 py-4">
                  ₹
                  {trip.priceGST.toLocaleString()}
                </td>

                <td className="px-5 py-4">
                  {trip.totalSeats}
                </td>

                <td className="px-5 py-4">

                  <span
                    className={
                      trip.status === "OPEN"
                        ? "text-green-600 font-medium"
                        : "text-red-600 font-medium"
                    }
                  >
                    {trip.status}
                  </span>

                </td>

                <td className="px-5 py-4">

                  <Link
                    href={`/admin/trips/${trip.id}/edit`}
                    className="
                      text-rust
                      font-medium
                    "
                  >
                    Edit
                  </Link>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  </div>
</>


);
}
