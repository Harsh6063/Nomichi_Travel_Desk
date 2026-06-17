import { LEAD_STATUS_LABELS, type LeadStatus } from "@/types";
import { StampBadge } from "./stamp-badge";

const STATUS_TONE: Record<LeadStatus, "rust" | "olive" | "ink" | "sand"> = {
  new: "rust",
  contacted: "sand",
  qualified: "olive",
  vibe_check_sent: "olive",
  confirmed: "olive",
  not_a_fit: "ink",
};

export function LeadStatusBadge({ status }: { status: LeadStatus }) {
  return (
    <StampBadge tone={STATUS_TONE[status]}>
      {LEAD_STATUS_LABELS[status]}
    </StampBadge>
  );
}
