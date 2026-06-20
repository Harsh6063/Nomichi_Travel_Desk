import { prisma } from "@/lib/prisma";
import { TripForm } from "@/components/trip-form";
import { notFound } from "next/navigation";

export default async function EditTripPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;

  const trip =
    await prisma.trip.findUnique({
      where: {
        id,
      },
    });

  if (!trip) {
    notFound();
  }

  return (
    <div className="px-8 py-8">
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