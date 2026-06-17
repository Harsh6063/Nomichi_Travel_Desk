"use client";

import { useState } from "react";
import type { CallLog, TeamMember } from "@/types";
import { formatRelativeTime } from "@/lib/utils";
import { Button } from "@/components/button";
import { Phone, Plus } from "lucide-react";

export function CallLogSection({
  logs,
  teamMembers,
  onAddLog,
}: {
  logs: CallLog[];
  teamMembers: TeamMember[];
  onAddLog: (log: { discussed: string; next_action: string }) => void;
}) {
  const [showForm, setShowForm] = useState(false);
  const [discussed, setDiscussed] = useState("");
  const [nextAction, setNextAction] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!discussed.trim()) {
      setError("Add a quick note on what was discussed.");
      return;
    }
    onAddLog({ discussed: discussed.trim(), next_action: nextAction.trim() });
    setDiscussed("");
    setNextAction("");
    setError("");
    setShowForm(false);
  }

  const sortedLogs = [...logs].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display font-bold text-lg text-ink">Call logs</h2>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-1.5 text-sm font-medium text-rust hover:underline"
          >
            <Plus className="size-4" /> Add note
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="border border-ink/15 rounded-sm p-4 mb-4 space-y-3">
          {error && <p className="text-xs text-rust">{error}</p>}
          <div>
            <label className="block text-xs font-medium text-ink/60 mb-1">What was discussed</label>
            <textarea
              value={discussed}
              onChange={(e) => setDiscussed(e.target.value)}
              rows={2}
              placeholder="Spoke about dates, group size, any concerns"
              className="w-full px-3 py-2 text-sm bg-cream border border-ink/20 rounded-sm outline-none focus:border-ink/40 resize-none"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-ink/60 mb-1">Next action</label>
            <input
              type="text"
              value={nextAction}
              onChange={(e) => setNextAction(e.target.value)}
              placeholder="Send vibe check, follow up Thursday"
              className="w-full px-3 py-2 text-sm bg-cream border border-ink/20 rounded-sm outline-none focus:border-ink/40"
            />
          </div>
          <div className="flex gap-2">
            <Button type="submit" size="sm">Save note</Button>
            <Button type="button" variant="ghost" size="sm" onClick={() => { setShowForm(false); setError(""); }}>
              Cancel
            </Button>
          </div>
        </form>
      )}

      {sortedLogs.length === 0 ? (
        <div className="border border-dashed border-ink/20 rounded-sm p-6 text-center">
          <Phone className="size-5 text-ink/30 mx-auto mb-2" />
          <p className="text-sm text-ink/50">
            No calls logged yet. Notes you add here build the story for whoever picks this up next.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {sortedLogs.map((log) => {
            const author = teamMembers.find((m) => m.id === log.author_id);
            return (
              <div key={log.id} className="border border-ink/10 rounded-sm p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-ink/60">{author?.name ?? "Unknown"}</span>
                  <span className="text-xs text-ink/40">{formatRelativeTime(log.created_at)}</span>
                </div>
                <p className="text-sm text-ink/80 leading-relaxed">{log.discussed}</p>
                {log.next_action && (
                  <div className="mt-2 pt-2 border-t border-ink/5">
                    <p className="text-xs text-olive font-medium">Next: {log.next_action}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
