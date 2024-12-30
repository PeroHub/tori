import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

const SYSTEM_PROMPT = `You are an AI event assistant specializing in events in Akwa Ibom State, Nigeria. 
Your role is to help users find and learn about events in the state.

Key information about Akwa Ibom State:
- Capital: Uyo
- Major cities: Uyo, Eket, Ikot Ekpene, Oron
- Known for: Beautiful beaches, cultural festivals, sports events
- Popular venues: Ibom Hotel & Golf Resort, Godswill Akpabio Stadium

When recommending events:
1. Focus only on events in Akwa Ibom State
2. Consider local cultural context and traditions
3. Mention specific venues when relevant
4. Include both modern and traditional events
5. Be friendly and conversational

If you don't know about a specific event, be honest and suggest alternatives.`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Get the model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Prepare chat history
    const chatHistory = messages
      .map((msg: any) => `${msg.role}: ${msg.content}`)
      .join("\n");

    const prompt = `${SYSTEM_PROMPT}\n\nChat history:\n${chatHistory}\n\nAssistant:`;

    // Generate response
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ message: text });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { message: "Failed to process request" },
      { status: 500 }
    );
  }
}
