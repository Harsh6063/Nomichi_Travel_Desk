import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { TripForm } from "@/components/trip-form";

export default async function EditTripPage({
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

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Edit Trip
      </h1>

      <TripForm
        mode="edit"
        initialTrip={trip}
      />
    </div>
  );
}