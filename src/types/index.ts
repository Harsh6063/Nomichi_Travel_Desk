// Core data model types. These mirror the eventual Supabase/Postgres schema
// so that swapping mock data for real queries later is a straight swap.

export type TripStatus = "open" | "closed";

export interface Trip {
  id: string;
  name: string;
  destination: string;
  start_date: string; // ISO date
  end_date: string; // ISO date
  price_inr: number; // price including GST, in INR
  total_seats: number;
  seats_booked: number;
  status: TripStatus;
  description: string;
  short_description: string;
  cover_image?: string;
  created_at: string;
}

export type GroupType = "solo" | "friends" | "couple" | "family";

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
  lead_id: string;
  author_id: string;
  discussed: string;
  next_action: string;
  created_at: string;
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

export const GROUP_TYPE_LABELS: Record<GroupType, string> = {
  solo: "Solo",
  friends: "Friends",
  couple: "Couple",
  family: "Family",
};
