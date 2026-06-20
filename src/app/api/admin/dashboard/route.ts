import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const totalLeads = await prisma.lead.count();

  const openTrips = await prisma.trip.count({
    where: {
      status: "OPEN",
    },
  });

  const confirmedLeads = await prisma.lead.count({
    where: {
      status: "CONFIRMED",
    },
  });

  const newLeads = await prisma.lead.count({
    where: {
      status: "NEW",
    },
  });

  return NextResponse.json({
    totalLeads,
    openTrips,
    confirmedLeads,
    newLeads,
  });
}