import { LEADS, TRIPS, TEAM_MEMBERS } from "@/lib/mock-data";
import { LEAD_STATUS_LABELS, LEAD_STATUS_ORDER, type LeadStatus } from "@/types";
import { AdminPageHeader } from "@/components/admin-page-header";
import { StampBadge } from "@/components/stamp-badge";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

export default function AdminDashboardPage() {
  const totalLeads = LEADS.length;

  const byStage: Record<LeadStatus, number> = {
    new: 0, contacted: 0, qualified: 0, vibe_check_sent: 0, confirmed: 0, not_a_fit: 0,
  };
  LEADS.forEach((l) => byStage[l.status]++);

  const leadsPerTrip = TRIPS.map((trip) => ({
    trip,
    count: LEADS.filter((l) => l.trip_id === trip.id).length,
  })).sort((a, b) => b.count - a.count);

  const maxStageCount = Math.max(...Object.values(byStage), 1);

  return (
    <>
      <AdminPageHeader
        title="Dashboard"
        description="A quick read on where things stand."
      />

      <div className="px-5 sm:px-8 py-6 sm:py-8 space-y-8">
        {/* Top stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard label="Total leads" value={totalLeads} />
          <StatCard label="New, unassigned" value={LEADS.filter((l) => !l.owner_id).length} accent="rust" />
          <StatCard label="Confirmed" value={byStage.confirmed} accent="olive" />
          <StatCard label="Open trips" value={TRIPS.filter((t) => t.status === "open").length} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Leads by stage */}
          <div className="border border-ink/10 rounded-sm p-5 sm:p-6">
            <h2 className="font-display font-bold text-lg text-ink mb-5">
              Leads by pipeline stage
            </h2>
            <div className="space-y-3">
              {LEAD_STATUS_ORDER.concat("not_a_fit").map((status) => (
                <div key={status} className="flex items-center gap-3">
                  <span className="text-sm text-ink/70 w-32 shrink-0">
                    {LEAD_STATUS_LABELS[status]}
                  </span>
                  <div className="flex-1 h-2 bg-ink/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-rust rounded-full"
                      style={{ width: `${(byStage[status] / maxStageCount) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-ink w-6 text-right">
                    {byStage[status]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Leads per trip */}
          <div className="border border-ink/10 rounded-sm p-5 sm:p-6">
            <h2 className="font-display font-bold text-lg text-ink mb-5">
              Leads per trip
            </h2>
            <div className="space-y-3">
              {leadsPerTrip.map(({ trip, count }) => (
                <Link
                  key={trip.id}
                  href={`/admin/leads?trip=${trip.id}`}
                  className="flex items-center justify-between gap-3 py-2 -mx-2 px-2 rounded-sm hover:bg-ink/5 transition-colors"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-ink truncate">{trip.name}</p>
                    <p className="text-xs text-ink/50">{formatPrice(trip.price_inr)}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <StampBadge tone={trip.status === "open" ? "olive" : "ink"}>
                      {trip.status === "open" ? "Open" : "Closed"}
                    </StampBadge>
                    <span className="text-sm font-medium text-ink w-5 text-right">{count}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Team load */}
        <div className="border border-ink/10 rounded-sm p-5 sm:p-6">
          <h2 className="font-display font-bold text-lg text-ink mb-5">Team load</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {TEAM_MEMBERS.map((member) => {
              const count = LEADS.filter((l) => l.owner_id === member.id).length;
              return (
                <div key={member.id} className="flex items-center gap-3">
                  <div
                    className="size-9 rounded-full flex items-center justify-center text-cream text-sm font-medium shrink-0"
                    style={{ backgroundColor: member.avatar_color }}
                  >
                    {member.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-ink">{member.name}</p>
                    <p className="text-xs text-ink/50">{count} active leads</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent?: "rust" | "olive";
}) {
  return (
    <div className="border border-ink/10 rounded-sm p-4 sm:p-5">
      <p className="text-xs text-ink/50 mb-1.5">{label}</p>
      <p
        className={`font-display font-black text-3xl ${
          accent === "rust" ? "text-rust" : accent === "olive" ? "text-olive" : "text-ink"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
