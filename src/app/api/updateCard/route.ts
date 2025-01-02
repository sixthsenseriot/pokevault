import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../db/drizzle";
import { pokemonCards } from "../../../db/schema";
import { eq } from "drizzle-orm";

export async function PUT(req: NextRequest) {
  try {
    const { id, set_number, name, image_url } = await req.json();

    if (!id || !set_number || !name || !image_url) {
      return NextResponse.json(
        { message: "All fields are required (id, set_number, name, image_url)" },
        { status: 400 }
      );
    }

    const updatedCard = await db
      .update(pokemonCards)
      .set({ set_number, name, image_url })
      .where(eq(pokemonCards.id, id))
      .returning();

    if (updatedCard.length === 0) {
      return NextResponse.json({ message: "Card not found" }, { status: 404 });
    }

    return NextResponse.json(updatedCard[0], { status: 200 });
  } catch (error) {
    console.error("Error updating card:", error);
    return NextResponse.json(
      { message: "Failed to update card" },
      { status: 500 }
    );
  }
}

