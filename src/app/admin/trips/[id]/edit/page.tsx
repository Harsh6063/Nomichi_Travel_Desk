import { TRIPS } from "@/lib/mock-data";
import { AdminPageHeader } from "@/components/admin-page-header";
import { TripForm } from "@/components/trip-form";
import { notFound } from "next/navigation";

export default async function EditTripPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const trip = TRIPS.find((t) => t.id === id);

  if (!trip) notFound();

  return (
    <>
      <AdminPageHeader title={`Edit ${trip.name}`} description="Changes save instantly once submitted." />
      <div className="px-5 sm:px-8 py-6 sm:py-8">
        <TripForm mode="edit" initialTrip={trip} />
      </div>
    </>
  );
}
