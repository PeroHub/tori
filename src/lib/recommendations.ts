import { Event } from "@/types";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getEventRecommendations(
  userPreferences: string,
  events: Event[]
) {
  try {
    const prompt = `Given the user preferences: "${userPreferences}" and the following events:
      ${events
        .map(
          (event) => `
        - ${event.title}
        - Category: ${event.category}
        - Description: ${event.description}
        - Location: ${event.location.address}
      `
        )
        .join("\n")}

      Return the IDs of the top 3 most relevant events for this user in order of relevance.
      Only return the event IDs separated by commas, nothing else.`;

    const response = await openai.completions.create({
      model: "text-davinci-003",
      prompt,
      max_tokens: 100,
      temperature: 0.5,
    });

    const eventIds = response.choices[0].text?.trim().split(",") || [];
    return events.filter((event) => eventIds.includes(event._id));
  } catch (error) {
    console.error("Error getting recommendations:", error);
    return [];
  }
}
