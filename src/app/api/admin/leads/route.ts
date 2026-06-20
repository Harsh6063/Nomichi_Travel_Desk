import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const leads = await prisma.lead.findMany({
    include: {
      trip: true,
      owner: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(leads);
}