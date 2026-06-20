import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const body = await req.json();

    console.log("NOTE BODY:", body);

    const note = await prisma.leadNote.create({
      data: {
        note: body.note,
        nextAction: body.nextAction,
        leadId: id,
        userId: body.userId,
      },
      include: {
        user: true,
      },
    });

    return NextResponse.json(note);
  } catch (error) {
    console.error("NOTE ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to save note",
      },
      {
        status: 500,
      }
    );
  }
}
