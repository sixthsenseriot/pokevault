import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../db/drizzle";
import { pokemonCards } from "../../../db/schema";

export async function POST(req: NextRequest) {
  try {
    const { set_number, name, image_url } = await req.json();

    if (!set_number || !name || !image_url) {
      return NextResponse.json(
        { message: "All fields are required (set_number, name, image_url)" },
        { status: 400 }
      );
    }

    const newCard = await db.insert(pokemonCards).values({
      set_number,
      name,
      image_url,
    });

    return NextResponse.json(newCard, { status: 201 });
  } catch (error) {
    console.error("Error creating card:", error);
    return NextResponse.json(
      { message: "Failed to create card" },
      { status: 500 }
    );
  }
}
