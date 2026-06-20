import { LEAD_STATUS_LABELS, type LeadStatus } from "@/types";
import { StampBadge } from "./stamp-badge";

const STATUS_TONE: Record<LeadStatus, "rust" | "olive" | "ink" | "sand"> = {
  NEW: "rust",
  CONTACTED: "sand",
  QUALIFIED: "olive",
  VIBE_CHECK_SENT: "olive",
  CONFIRMED: "olive",
  NOT_A_FIT: "ink",
};
export function LeadStatusBadge({ status }: { status: LeadStatus }) {
  return (
    <StampBadge tone={STATUS_TONE[status]}>
  {String(status)}
</StampBadge>
  );
}
