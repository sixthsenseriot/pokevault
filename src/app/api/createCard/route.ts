import { NextRequest, NextResponse } from "next/server";
import { uploadToS3 } from "../../../utils/s3";
import { db } from "../../../db/drizzle";
import { pokemonCards } from "../../../db/schema";

export async function POST(req: NextRequest) {
  try {
    const { name, set_number, imageFile } = await req.json();

    if (!name || set_number || !imageFile) {
      return NextResponse.json(
        { message: "All fields are required: (set_number, name, imageFile)" },
        { status: 400 }
      );
    }

    const imageFileBuffer = Buffer.from(imageFile.data, "base64");
    const imageFileName = `images/${set_number}.jpg`;

    await uploadToS3(imageFileName, imageFileBuffer, "image/jpeg");

    const newCard = await db.insert(pokemonCards).values({
      name,
      set_number,
      image_url: `https://pokecards-ketchum.s3.amazonaws.com/${imageFileName}`,
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
