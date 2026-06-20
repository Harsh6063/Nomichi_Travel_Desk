// POST /api/admin/leads/[id]/notes

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const body = await req.json();
  const { id } = await params;

  const note = await prisma.leadNote.create({
    data: {
      leadId: id,
      note: body.note,
      nextAction: body.nextAction ?? null,
      userId: body.userId,
    },
  });

  return NextResponse.json(note);
}