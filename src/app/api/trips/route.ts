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
        priceGST: Number(body.priceGST),
        totalSeats: Number(body.totalSeats),
        status: body.status,
        description: body.description,
        duration: body.duration || "",
        journeyType: body.journeyType || "",
        image: body.image || "",
      },
    });

    return NextResponse.json(trip);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to create trip" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const trip = await prisma.trip.update({
      where: {
        id: body.id,
      },
      data: {
        name: body.name,
        destination: body.destination,
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
        priceGST: Number(body.priceGST),
        totalSeats: Number(body.totalSeats),
        status: body.status,
        description: body.description,
        duration: body.duration || "",
        journeyType: body.journeyType || "",
        image: body.image || "",
      },
    });

    return NextResponse.json(trip);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to update trip" },
      { status: 500 }
    );
  }
}