"use client";

import { useState } from "react";
import { Button } from "@/components/button";
import { Sparkles, Copy, Check } from "lucide-react";
import type { Lead, Trip } from "@/types";

export function WhatsAppGenerator({ lead, trip }: { lead: Lead; trip: Trip }) {
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  async function generate() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/ai/whatsapp-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadName: lead.name,
          groupType: lead.group_type,
preferredMonth: lead.preferred_month,
vibeAnswer: lead.vibe_answer,
tripName: trip.name,
destination: trip.destination,
priceInr: trip.priceGST,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      const data = await res.json();
      setMessage(data.message);
    } catch {
      setError("Couldn't generate a message right now. Try again in a moment.");
    } finally {
      setLoading(false);
    }
  }

  function copyToClipboard() {
    if (!message) return;
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="border border-ink/15 rounded-sm p-4 sm:p-5 bg-sand/5">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="size-4 text-rust" />
        <h3 className="font-display font-bold text-base text-ink">First WhatsApp message</h3>
      </div>

      {!message && !loading && (
        <p className="text-sm text-ink/60 mb-3">
          Generate a warm opener based on this lead's answers, ready to send as is or tweak first.
        </p>
      )}

      {error && <p className="text-sm text-rust mb-3">{error}</p>}

      {message ? (
        <div>
          <div className="bg-cream border border-ink/10 rounded-sm p-3.5 text-sm text-ink/85 leading-relaxed whitespace-pre-line mb-3">
            {message}
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="ghost" onClick={copyToClipboard}>
              {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              {copied ? "Copied" : "Copy"}
            </Button>
            <Button size="sm" variant="ghost" onClick={generate} loading={loading}>
              Regenerate
            </Button>
          </div>
        </div>
      ) : (
        <Button size="sm" onClick={generate} loading={loading}>
          {loading ? "Writing" : "Generate message"}
        </Button>
      )}
    </div>
  );
}
