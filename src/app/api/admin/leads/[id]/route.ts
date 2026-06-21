import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  const { id } = await context.params;

  const lead = await prisma.lead.findUnique({
    where: {
      id,
    },
    include: {
      trip: true,
      owner: true,
      notes: true,
    },
  });

  return NextResponse.json(lead);
}