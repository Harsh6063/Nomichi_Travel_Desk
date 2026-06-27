// src/app/api/ai/generate-whatsapp/route.ts

import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const prompt = `
You are a travel consultant at Nomichi.

Generate a warm, friendly and professional WhatsApp message.

Lead Information:
Name: ${body.leadName}
Destination: ${body.destination}
Trip: ${body.tripName}
Preferred Month: ${body.preferredMonth || "Not specified"}
Group Type: ${body.groupType}
Travel Goal: ${body.vibeAnswer || "Not provided"}

Requirements:
- Maximum 140 words.
- Sound natural and human.
- Personalize using the travel goal.
- Encourage a reply.
- Don't sound salesy.
- No markdown.
- No emojis unless very natural (maximum one).
- End with "— Team Nomichi".
`;

    const completion =
      await groq.chat.completions.create({
        model: "llama-3.1-8b-instant",

        temperature: 0.8,

        messages: [
          {
            role: "system",
            content:
              "You are an experienced travel consultant for Nomichi.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      });

    return NextResponse.json({
      message:
        completion.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to generate WhatsApp message",
      },
      {
        status: 500,
      }
    );
  }
}