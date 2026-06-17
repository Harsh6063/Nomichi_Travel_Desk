import { NextResponse } from "next/server";

// This route runs server-side only. The real implementation will call the
// Anthropic API using ANTHROPIC_API_KEY from environment variables — never
// exposed to the client. For now it returns a templated message so the UI
// can be fully exercised before the data layer is wired up.

interface RequestBody {
  leadName: string;
  groupType: string;
  preferredMonth: string;
  vibeAnswer: string;
  tripName: string;
  destination: string;
  priceInr: number;
}

export async function POST(req: Request) {
  const body: RequestBody = await req.json();
  const firstName = body.leadName.split(" ")[0];

  // Placeholder generation logic — swapped for an Anthropic API call later.
  const message = `Hi ${firstName}, this is the Nomichi team.\n\nThanks for your enquiry about ${body.tripName} in ${body.destination}. You mentioned wanting "${body.vibeAnswer.slice(0, 80)}${body.vibeAnswer.length > 80 ? "..." : ""}" — that's exactly the kind of trip this one is.\n\nWe have a few seats left for ${body.preferredMonth}. Happy to call you this week if that works, or feel free to ask anything here first.`;

  return NextResponse.json({ message });
}
