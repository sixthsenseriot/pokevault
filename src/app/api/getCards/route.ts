import { NextResponse } from "next/server";
import { db } from "../../../db/drizzle";
import { pokemonCards } from "../../../db/schema";

export async function GET() {
  try {
    const allCards = await db.select().from(pokemonCards);
    return NextResponse.json(allCards); 
  } catch (error) {
    console.error('Error fetching cards:', error);
    return NextResponse.json(
      { message: "Failed to fetch cards" },
      { status: 500 }
    );
  }
}
