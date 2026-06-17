"use client";

import { LEAD_STATUS_ORDER, LEAD_STATUS_LABELS, type LeadStatus } from "@/types";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";

export function PipelineStepper({
  currentStatus,
  onChange,
}: {
  currentStatus: LeadStatus;
  onChange: (status: LeadStatus) => void;
}) {
  const isNotAFit = currentStatus === "not_a_fit";
  const currentIndex = LEAD_STATUS_ORDER.indexOf(currentStatus);

  return (
    <div>
      <div className="flex items-center gap-1 overflow-x-auto pb-2 -mx-1 px-1">
        {LEAD_STATUS_ORDER.map((status, i) => {
          const isComplete = !isNotAFit && i <= currentIndex;
          const isCurrent = status === currentStatus;
          return (
            <button
              key={status}
              onClick={() => onChange(status)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 rounded-sm text-xs font-medium whitespace-nowrap transition-colors shrink-0",
                isCurrent
                  ? "bg-ink text-cream"
                  : isComplete
                  ? "bg-olive/10 text-olive"
                  : "bg-ink/5 text-ink/50 hover:bg-ink/10"
              )}
            >
              {isComplete && !isCurrent && <Check className="size-3" />}
              {LEAD_STATUS_LABELS[status]}
            </button>
          );
        })}
        <span className="text-ink/30 px-1">or</span>
        <button
          onClick={() => onChange("not_a_fit")}
          className={cn(
            "flex items-center gap-1.5 px-3 py-2 rounded-sm text-xs font-medium whitespace-nowrap transition-colors shrink-0",
            isNotAFit ? "bg-rust text-cream" : "bg-rust/5 text-rust hover:bg-rust/10"
          )}
        >
          {isNotAFit && <X className="size-3" />}
          Not a fit
        </button>
      </div>
    </div>
  );
}
