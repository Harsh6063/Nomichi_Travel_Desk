"use client";

import { useState } from "react";
import Link from "next/link";
import type { Lead, LeadStatus, CallLog } from "@/types";
import { GROUP_TYPE_LABELS } from "@/types";
import { TEAM_MEMBERS, TRIPS } from "@/lib/mock-data";
import { LeadStatusBadge } from "@/components/lead-status-badge";
import { PipelineStepper } from "@/components/pipeline-stepper";
import { CallLogSection } from "@/components/call-log-section";
import { WhatsAppGenerator } from "@/components/whatsapp-generator";
import { formatDateRange, formatPrice, formatRelativeTime } from "@/lib/utils";
import { ArrowLeft, Phone, Mail, Calendar, MapPin } from "lucide-react";

export function LeadDetailClient({
  lead: initialLead,
  initialLogs,
}: {
  lead: Lead;
  initialLogs: CallLog[];
}) {
  const [lead, setLead] = useState(initialLead);
  const [logs, setLogs] = useState(initialLogs);

  const trip = TRIPS.find((t) => t.id === lead.trip_id);

  function handleStatusChange(status: LeadStatus) {
    setLead((l) => ({ ...l, status, updated_at: new Date().toISOString() }));
  }

  function handleOwnerChange(ownerId: string) {
    setLead((l) => ({ ...l, owner_id: ownerId === "unassigned" ? null : ownerId }));
  }

  function handleAddLog(entry: { discussed: string; next_action: string }) {
    const newLog: CallLog = {
      id: `log_${Date.now()}`,
      lead_id: lead.id,
      author_id: TEAM_MEMBERS[0].id, // would be the logged-in user
      discussed: entry.discussed,
      next_action: entry.next_action,
      created_at: new Date().toISOString(),
    };
    setLogs((prev) => [newLog, ...prev]);
  }

  if (!trip) return null;

  return (
    <div>
      {/* Header */}
      <div className="px-5 sm:px-8 pt-6 sm:pt-8 pb-5 sm:pb-6 border-b border-ink/10">
        <Link
          href="/admin/leads"
          className="inline-flex items-center gap-1.5 text-sm text-ink/60 hover:text-ink mb-4 transition-colors"
        >
          <ArrowLeft className="size-4" /> All leads
        </Link>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-ink">{lead.name}</h1>
            <p className="text-sm text-ink/50 mt-1">
              Enquired {formatRelativeTime(lead.created_at)} via {lead.source}
            </p>
          </div>
          <LeadStatusBadge status={lead.status} />
        </div>
      </div>

      <div className="px-5 sm:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
          {/* Main column */}
          <div className="space-y-8 min-w-0">
            {/* Pipeline */}
            <div>
              <h2 className="font-display font-bold text-lg text-ink mb-3">Pipeline stage</h2>
              <PipelineStepper currentStatus={lead.status} onChange={handleStatusChange} />
            </div>

            {/* AI feature */}
            <WhatsAppGenerator lead={lead} trip={trip} />

            {/* Call logs */}
            <CallLogSection logs={logs} teamMembers={TEAM_MEMBERS} onAddLog={handleAddLog} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact */}
            <div className="border border-ink/10 rounded-sm p-4 sm:p-5">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-ink/50 mb-3">
                Contact
              </h3>
              <div className="space-y-2.5 text-sm">
                <a href={`tel:${lead.phone}`} className="flex items-center gap-2.5 text-ink hover:text-rust transition-colors">
                  <Phone className="size-3.5 text-ink/40" /> {lead.phone}
                </a>
                <a href={`mailto:${lead.email}`} className="flex items-center gap-2.5 text-ink hover:text-rust transition-colors break-all">
                  <Mail className="size-3.5 text-ink/40 shrink-0" /> {lead.email}
                </a>
              </div>
            </div>

            {/* Owner */}
            <div className="border border-ink/10 rounded-sm p-4 sm:p-5">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-ink/50 mb-3">
                Owner
              </h3>
              <select
                value={lead.owner_id ?? "unassigned"}
                onChange={(e) => handleOwnerChange(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-cream border border-ink/20 rounded-sm outline-none focus:border-ink/40"
              >
                <option value="unassigned">Unassigned</option>
                {TEAM_MEMBERS.map((m) => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
            </div>

            {/* Trip context */}
            <div className="border border-ink/10 rounded-sm p-4 sm:p-5">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-ink/50 mb-3">
                Trip
              </h3>
              <Link href={`/trips/${trip.id}`} target="_blank" className="font-medium text-ink hover:text-rust transition-colors">
                {trip.name}
              </Link>
              <div className="space-y-2 mt-3 text-sm text-ink/70">
                <div className="flex items-center gap-2"><MapPin className="size-3.5 text-ink/40" /> {trip.destination}</div>
                <div className="flex items-center gap-2"><Calendar className="size-3.5 text-ink/40" /> {formatDateRange(trip.start_date, trip.end_date)}</div>
              </div>
              <p className="font-display font-bold text-lg text-ink mt-3">{formatPrice(trip.price_inr)}</p>
            </div>

            {/* Enquiry details */}
            <div className="border border-ink/10 rounded-sm p-4 sm:p-5">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-ink/50 mb-3">
                Enquiry details
              </h3>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="text-ink/50 text-xs mb-0.5">Group type</dt>
                  <dd className="text-ink">{GROUP_TYPE_LABELS[lead.group_type]}</dd>
                </div>
                <div>
                  <dt className="text-ink/50 text-xs mb-0.5">Preferred month</dt>
                  <dd className="text-ink">{lead.preferred_month}</dd>
                </div>
                {lead.vibe_answer && (
                  <div>
                    <dt className="text-ink/50 text-xs mb-0.5">Hoping this feels like</dt>
                    <dd className="text-ink leading-relaxed">{lead.vibe_answer}</dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
