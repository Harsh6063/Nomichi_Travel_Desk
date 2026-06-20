import { prisma } from "@/lib/prisma";
import { AdminPageHeader } from "@/components/admin-page-header";
import { LeadsListClient } from "@/components/leads-list-client";

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ trip?: string }>;
}) {
  const params = await searchParams;

  const leads = await prisma.lead.findMany({
    include: {
      trip: true,
      owner: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <>
      <AdminPageHeader
        title="Leads"
        description="Every enquiry that's come in, in one place."
      />

      <LeadsListClient
        leads={leads}
        initialTripFilter={params.trip}
      />
    </>
  );
}