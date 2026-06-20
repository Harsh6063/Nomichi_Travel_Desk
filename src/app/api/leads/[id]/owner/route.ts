import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const body = await req.json();

  const lead = await prisma.lead.update({
    where: {
      id,
    },
    data: {
      ownerId: body.ownerId,
    },
  });

  return NextResponse.json(lead);
}