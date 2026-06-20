import { TripForm } from "@/components/trip-form";

export default function NewTripPage() {
  return (
    <div className="px-8 py-8">
      <h1 className="text-3xl font-bold mb-6">
        Create Trip
      </h1>

      <TripForm mode="create" />
    </div>
  );
}