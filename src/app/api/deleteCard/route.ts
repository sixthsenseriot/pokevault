import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../db/drizzle";
import { pokemonCards } from "../../../db/schema";
import { eq } from "drizzle-orm";

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { message: "Card ID is required" },
        { status: 400 }
      );
    }

    const deletedCard = await db
      .delete(pokemonCards)
      .where(eq(pokemonCards.id, id))
      .returning();

    if (deletedCard.length === 0) {
      return NextResponse.json({ message: "Card not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Card deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting card:", error);
    return NextResponse.json(
      { message: "Failed to delete card" },
      { status: 500 }
    );
  }
}

