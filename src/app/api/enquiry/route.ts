import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const phoneRegex = /^[6-9]\d{9}$/;

    if (!phoneRegex.test(body.phone)) {
      return NextResponse.json(
        { error: "Invalid phone number" },
        { status: 400 }
      );
    }

    const lead = await prisma.lead.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        groupType: body.groupType,
        preferredMonth: body.preferredMonth,
        tripFeeling: body.feeling,
        tripId: body.tripId,
        status: "NEW",
      },
    });

    return NextResponse.json(lead);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create enquiry" },
      { status: 500 }
    );
  }
}