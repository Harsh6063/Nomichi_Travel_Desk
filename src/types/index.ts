// Core data model types. These mirror the eventual Supabase/Postgres schema
// so that swapping mock data for real queries later is a straight swap.

export type TripStatus = "open" | "closed";

export interface Trip {
  id: string;
  name: string;
  destination: string;

  startDate: Date;
  endDate: Date;

  priceGST: number;
  totalSeats: number;

  status: "OPEN" | "CLOSED";

  description: string;

  image?: string | null;

  createdAt: Date;
}

export type GroupType =
  | "SOLO"
  | "FRIENDS"
  | "COUPLE"
  | "FAMILY";

export type LeadStatus =
  | "new"
  | "contacted"
  | "qualified"
  | "vibe_check_sent"
  | "confirmed"
  | "not_a_fit";

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  trip_id: string;
  group_type: GroupType;
  preferred_month: string;
  vibe_answer: string; // "what are you hoping this trip feels like"
  status: LeadStatus;
  owner_id: string | null;
  source: "ads" | "instagram" | "whatsapp" | "website" | "other";
  created_at: string;
  updated_at: string;
}

export interface CallLog {
  id: string;
  leadId: string;
  note: string;
  nextAction?: string | null;
  createdAt: string;

  user?: {
    id: string;
    name: string;
    email?: string;
  } | null;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar_color: string;
}

export const LEAD_STATUS_LABELS: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  qualified: "Qualified",
  vibe_check_sent: "Vibe check sent",
  confirmed: "Confirmed",
  not_a_fit: "Not a fit",
};

export const LEAD_STATUS_ORDER: LeadStatus[] = [
  "new",
  "contacted",
  "qualified",
  "vibe_check_sent",
  "confirmed",
];

export const GROUP_TYPE_LABELS = {
  SOLO: "Solo",
  FRIENDS: "Friends",
  COUPLE: "Couple",
  FAMILY: "Family",
};
