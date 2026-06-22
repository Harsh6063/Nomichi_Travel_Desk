import { prisma } from "@/lib/prisma";
import { AdminPageHeader } from "@/components/admin-page-header";
import { StampBadge } from "@/components/stamp-badge";
import Link from "next/link";
export const dynamic = "force-dynamic";
const STATUS_LABELS = {
  NEW: "New",
  CONTACTED: "Contacted",
  QUALIFIED: "Qualified",
  VIBE_CHECK_SENT: "Vibe Check Sent",
  CONFIRMED: "Confirmed",
  NOT_A_FIT: "Not A Fit",
};

export default async function AdminDashboardPage() {
  const [leads, trips, admins] = await Promise.all([
    prisma.lead.findMany({
      include: {
        trip: true,
        owner: true,
      },
    }),

    prisma.trip.findMany(),

    prisma.user.findMany({
      where: {
        role: "ADMIN",
      },
    }),
  ]);

  const totalLeads = leads.length;

  const unassignedLeads = leads.filter(
    (lead: any) => !lead.ownerId
  ).length;

  const confirmedLeads = leads.filter(
    (lead: any) =>
      lead.status === "CONFIRMED"
  ).length;

  const openTrips = trips.filter(
    (trip: any) =>
      trip.status === "OPEN"
  ).length;

  const byStage = {
    NEW: 0,
    CONTACTED: 0,
    QUALIFIED: 0,
    VIBE_CHECK_SENT: 0,
    CONFIRMED: 0,
    NOT_A_FIT: 0,
  };

  leads.forEach((lead: any) => {
  const status =
    lead.status as keyof typeof byStage;

  byStage[status]++;
});

  const maxStageCount = Math.max(
    ...Object.values(byStage),
    1
  );

  const leadsPerTrip = trips
    .map((trip: any) => ({
      trip,
      count: leads.filter(
        (lead: any) =>
          lead.tripId === trip.id
      ).length,
    }))
    .sort(
  (
    a: { trip: any; count: number },
    b: { trip: any; count: number }
  ) => b.count - a.count
);

  const recentLeads = [...leads]
  .sort(
    (a: any, b: any) =>
      new Date(b.createdAt).getTime() -
      new Date(a.createdAt).getTime()
  )
    .slice(0, 5);

  return (
    <>
      <AdminPageHeader
        title="Dashboard"
        description="A quick read on where things stand."
      />

      <div className="px-5 sm:px-8 py-8 space-y-8">

        {/* Stats */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

          <StatCard
            label="Total Leads"
            value={totalLeads}
          />

          <StatCard
            label="Unassigned"
            value={unassignedLeads}
            accent="rust"
          />

          <StatCard
            label="Confirmed"
            value={confirmedLeads}
            accent="olive"
          />

          <StatCard
            label="Open Trips"
            value={openTrips}
          />

        </div>

        {/* Charts */}

        <div className="grid lg:grid-cols-2 gap-6">

          <div className="border border-ink/10 rounded-sm p-6">

            <h2 className="font-display font-bold text-lg mb-5">
              Leads By Pipeline Stage
            </h2>

            <div className="space-y-3">

              {Object.entries(byStage).map(
                ([status, count]) => (
                  <div
                    key={status}
                    className="flex items-center gap-3"
                  >
                    <span className="w-40 text-sm text-ink/70">
                      {
                        STATUS_LABELS[
                          status as keyof typeof STATUS_LABELS
                        ]
                      }
                    </span>

                    <div className="flex-1 h-2 bg-ink/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-rust"
                        style={{
                          width: `${
                            (count /
                              maxStageCount) *
                            100
                          }%`,
                        }}
                      />
                    </div>

                    <span className="w-6 text-right">
                      {count}
                    </span>
                  </div>
                )
              )}

            </div>

          </div>

          <div className="border border-ink/10 rounded-sm p-6">

            <h2 className="font-display font-bold text-lg mb-5">
              Leads Per Trip
            </h2>

            <div className="space-y-3">

              {leadsPerTrip.map(
                ({ trip, count }: { trip: any; count: number }) => (
                  <Link
                    key={trip.id}
                    href={`/admin/leads?trip=${trip.id}`}
                    className="flex justify-between items-center p-2 rounded hover:bg-ink/5"
                  >
                    <div>

                      <p className="font-medium">
                        {trip.name}
                      </p>

                      <p className="text-xs text-ink/50">
                        ₹
                        {trip.priceGST.toLocaleString()}
                      </p>

                    </div>

                    <div className="flex gap-2 items-center">

                      <StampBadge
                        tone={
                          trip.status ===
                          "OPEN"
                            ? "olive"
                            : "ink"
                        }
                      >
                        {trip.status}
                      </StampBadge>

                      <span>
                        {count}
                      </span>

                    </div>
                  </Link>
                )
              )}

            </div>

          </div>

        </div>

        {/* Team Load */}

        <div className="border border-ink/10 rounded-sm p-6">

          <h2 className="font-display font-bold text-lg mb-5">
            Team Load
          </h2>

          <div className="grid md:grid-cols-3 gap-4">

            {admins.map((admin: any) => {
              const count =
                leads.filter(
                  (lead: any ) =>
                    lead.ownerId ===
                    admin.id
                ).length;

              return (
                <div
                  key={admin.id}
                  className="border border-ink/10 rounded-sm p-4"
                >
                  <p className="font-medium">
                    {admin.name}
                  </p>

                  <p className="text-sm text-ink/50">
                    {count} active leads
                  </p>
                </div>
              );
            })}

          </div>

        </div>

        {/* Recent Leads */}

        <div className="border border-ink/10 rounded-sm p-6">

          <h2 className="font-display font-bold text-lg mb-5">
            Recent Leads
          </h2>

          <div className="space-y-3">

            {recentLeads.map(
              (lead: any) => (
                <Link
                  key={lead.id}
                  href={`/admin/leads/${lead.id}`}
                  className="flex justify-between items-center border-b border-ink/5 pb-3"
                >
                  <div>

                    <p className="font-medium">
                      {lead.name}
                    </p>

                    <p className="text-sm text-ink/50">
                      {
                        lead.trip
                          ?.name
                      }
                    </p>

                  </div>

                  <StampBadge tone="rust">
                    {lead.status}
                  </StampBadge>

                </Link>
              )
            )}

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
    <div className="border border-ink/10 rounded-sm p-5">

      <p className="text-xs text-ink/50 mb-2">
        {label}
      </p>

      <p
        className={`font-display text-3xl font-black ${
          accent === "rust"
            ? "text-rust"
            : accent === "olive"
            ? "text-olive"
            : "text-ink"
        }`}
      >
        {value}
      </p>

    </div>
  );
}