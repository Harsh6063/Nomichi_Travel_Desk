import { LEADS, CALL_LOGS } from "@/lib/mock-data";
import { LeadDetailClient } from "@/components/lead-detail-client";
import { notFound } from "next/navigation";

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lead = LEADS.find((l) => l.id === id);

  if (!lead) notFound();

  const logs = CALL_LOGS.filter((log) => log.lead_id === lead.id);

  return <LeadDetailClient lead={lead} initialLogs={logs} />;
}
