import { AdminPageHeader } from "@/components/admin-page-header";
import { LeadsListClient } from "@/components/leads-list-client";

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ trip?: string }>;
}) {
  const params = await searchParams;

  return (
    <>
      <AdminPageHeader
        title="Leads"
        description="Every enquiry that's come in, in one place."
      />
      <LeadsListClient initialTripFilter={params.trip} />
    </>
  );
}
