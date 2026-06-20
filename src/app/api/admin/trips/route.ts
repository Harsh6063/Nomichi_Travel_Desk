import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const trip = await prisma.trip.create({
      data: {
        name: body.name,
        destination: body.destination,
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
        priceGST: Number(body.price),
        totalSeats: Number(body.totalSeats),
        status: body.status,
        description: body.description,
      },
    });

    return NextResponse.json(trip);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create trip" },
      { status: 500 }
    );
  }
}