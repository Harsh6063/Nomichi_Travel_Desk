"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  LEAD_STATUS_LABELS,
  GROUP_TYPE_LABELS,
  type LeadStatus,
} from "@/types";

import { LeadStatusBadge } from "@/components/lead-status-badge";
import { formatRelativeTime } from "@/lib/utils";
import {
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

export function LeadsListClient({
  leads,
  initialTripFilter,
}: {
  leads: any[];
  initialTripFilter?: string;
}) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "all">("all");
  const [tripFilter, setTripFilter] = useState<string>(initialTripFilter ?? "all");
  const [ownerFilter, setOwnerFilter] = useState<string>("all");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    return leads.filter((lead) => {
      if (statusFilter !== "all" && lead.status !== statusFilter) return false;
      if (tripFilter !== "all" && lead.tripId !== tripFilter) return false;
      if (ownerFilter === "unassigned" && lead.ownerId !== null) return false;
      if (ownerFilter !== "all" && ownerFilter !== "unassigned" && lead.ownerId !== ownerFilter) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        const matches =
          lead.name.toLowerCase().includes(q) ||
          lead.phone.includes(q) ||
          lead.email.toLowerCase().includes(q);
        if (!matches) return false;
      }
      return true;
    }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [search, statusFilter, tripFilter, ownerFilter]);

  const activeFilterCount = [statusFilter !== "all", tripFilter !== "all", ownerFilter !== "all"].filter(Boolean).length;

  function clearFilters() {
    setStatusFilter("all");
    setTripFilter("all");
    setOwnerFilter("all");
  }

  return (
    <div>
      {/* Search + filter toggle */}
      <div className="px-5 sm:px-8 py-4 flex items-center gap-3 border-b border-ink/10">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-ink/40" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, phone, email"
            className="w-full pl-9 pr-3 py-2 text-sm bg-cream border border-ink/20 rounded-sm outline-none focus:border-ink/40"
          />
        </div>
        <button
          onClick={() => setFiltersOpen((o) => !o)}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium border border-ink/20 rounded-sm hover:border-ink/40 transition-colors"
        >
          <SlidersHorizontal className="size-4" />
          <span className="hidden sm:inline">Filters</span>
          {activeFilterCount > 0 && (
            <span className="bg-rust text-cream text-[11px] font-semibold rounded-full size-5 flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </button>
        <span className="text-sm text-ink/50 ml-auto hidden sm:inline">
          {filtered.length} of {leads.length}
        </span>
      </div>

      {filtersOpen && (
        <div className="px-5 sm:px-8 py-4 bg-ink/[0.03] border-b border-ink/10 flex flex-wrap gap-3 items-end">
          <FilterSelect
            label="Status"
            value={statusFilter}
            onChange={(v) => setStatusFilter(v as LeadStatus | "all")}
            options={[
              { value: "all", label: "All statuses" },
              ...Object.entries(LEAD_STATUS_LABELS).map(([value, label]) => ({ value, label })),
            ]}
          />
          <FilterSelect
            label="Trip"
            value={tripFilter}
            onChange={setTripFilter}
            options={[
              { value: "all", label: "All trips" },
              ...Array.from(
  new Map(
    leads
      .filter((l) => l.trip)
      .map((l) => [
        l.trip.id,
        {
          value: l.trip.id,
          label: l.trip.name,
        },
      ])
  ).values()
),
            ]}
          />
          <FilterSelect
            label="Owner"
            value={ownerFilter}
            onChange={setOwnerFilter}
            options={[
              { value: "all", label: "All owners" },
              { value: "unassigned", label: "Unassigned" },
              ...Array.from(
  new Map(
    leads
      .filter((l) => l.owner)
      .map((l) => [
        l.owner.id,
        {
          value: l.owner.id,
          label: l.owner.name,
        },
      ])
  ).values()
),
            ]}
          />
          {activeFilterCount > 0 && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 text-sm text-rust hover:underline pb-2"
            >
              <X className="size-3.5" /> Clear filters
            </button>
          )}
        </div>
      )}

      {/* Lead list */}
      {filtered.length === 0 ? (
        <div className="px-5 sm:px-8 py-16 text-center">
          <p className="text-ink/60">
            {filtered.length === 0
              ? "No enquiries yet. They will show up here the moment someone submits the form."
              : "Nothing matches that search or filter combination."}
          </p>
          {activeFilterCount > 0 && (
            <button onClick={clearFilters} className="text-sm text-rust hover:underline mt-2">
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden md:block px-5 sm:px-8">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-ink/50 border-b border-ink/10">
                  <th className="py-3 font-medium">Name</th>
                  <th className="py-3 font-medium">Trip</th>
                  <th className="py-3 font-medium">Group</th>
                  <th className="py-3 font-medium">Status</th>
                  <th className="py-3 font-medium">Owner</th>
                  <th className="py-3 font-medium">Received</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((lead) => {
                  const trip = lead.trip;
const owner = lead.owner;
                  return (
                    <tr
                      key={lead.id}
                      className="border-b border-ink/5 hover:bg-ink/[0.02] cursor-pointer"
                    >
                      <td className="py-3.5">
                        <Link href={`/admin/leads/${lead.id}`} className="block">
                          <p className="font-medium text-ink">{lead.name}</p>
                          <p className="text-ink/50 text-xs">{lead.phone}</p>
                        </Link>
                      </td>
                      <td className="py-3.5 text-ink/70">{trip?.name ?? "—"}</td>
                      <td className="py-3.5 text-ink/70">{GROUP_TYPE_LABELS[lead.groupType]}</td>
                      <td className="py-3.5"><LeadStatusBadge status={lead.status} /></td>
                      <td className="py-3.5">
                        {owner ? (
                          <span className="text-ink/70">{owner.name}</span>
                        ) : (
                          <span className="text-ink/40 italic">Unassigned</span>
                        )}
                      </td>
                      <td className="py-3.5 text-ink/50">{formatRelativeTime(lead.createdAt)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden px-5 py-3 space-y-3">
            {filtered.map((lead) => {
              const trip = lead.trip;
              const owner = lead.owner;
              return (
                <Link
                  key={lead.id}
                  href={`/admin/leads/${lead.id}`}
                  className="block border border-ink/10 rounded-sm p-4"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <p className="font-medium text-ink">{lead.name}</p>
                      <p className="text-xs text-ink/50">{lead.phone}</p>
                    </div>
                    <LeadStatusBadge status={lead.status} />
                  </div>
                  <p className="text-sm text-ink/70 mb-1">{trip?.name ?? "—"}</p>
                  <div className="flex items-center justify-between text-xs text-ink/50 mt-2 pt-2 border-t border-ink/5">
                    <span>{owner ? owner.name : "Unassigned"}</span>
                    <span>{formatRelativeTime(lead.createdAt)}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-ink/60 mb-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-3 py-2 text-sm bg-cream border border-ink/20 rounded-sm outline-none focus:border-ink/40 min-w-[150px]"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}
