import { AdminPageHeader } from "@/components/admin-page-header";
import { TripForm } from "@/components/trip-form";

export default function NewTripPage() {
  return (
    <>
      <AdminPageHeader title="New trip" description="Add a trip for the team to start sending enquiries to." />
      <div className="px-5 sm:px-8 py-6 sm:py-8">
        <TripForm mode="create" />
      </div>
    </>
  );
}
