import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const lead = await prisma.lead.findUnique({
    where: {
      id: params.id,
    },
    include: {
      trip: true,
      notes: true,
      owner: true,
    },
  });

  return NextResponse.json(lead);
}