import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const trips = await prisma.trip.findMany({
    where: {
      status: "OPEN",
    },
    take: 5,
    orderBy: {
      startDate: "asc",
    },
  });

  return NextResponse.json(trips);
}