import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { LeadDetailClient } from "@/components/lead-detail-client";

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const lead = await prisma.lead.findUnique({
    where: {
      id,
    },
    include: {
      trip: true,
      owner: true,
      notes: true,
    },
  });

  if (!lead) {
    notFound();
  }

  const admins = await prisma.user.findMany({
    where: {
      role: "ADMIN",
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  return (
    <LeadDetailClient
      lead={lead}
      initialLogs={lead.notes}
      admins={admins}
    />
  );
}