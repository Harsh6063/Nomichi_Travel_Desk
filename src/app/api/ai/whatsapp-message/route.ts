import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const message = `Hi ${body.leadName},

Thanks for your interest in ${body.tripName}.

I noticed you're planning for ${body.preferredMonth || "an upcoming trip"}.

${body.vibeAnswer ? `You mentioned: "${body.vibeAnswer}"` : ""}

I'd love to help you explore ${body.destination} and answer any questions.

When would be a good time for a quick call?

— Team Nomichi`;

    return NextResponse.json({
      message,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to generate message",
      },
      {
        status: 500,
      }
    );
  }
}