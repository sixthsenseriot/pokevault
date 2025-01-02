import { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const cards = await query("SELECT * FROM pokemon_cards ORDER BY created_at DESC");
    res.status(200).json(cards);
  } else if (req.method === "POST") {
    const { set_number, name, image_url } = req.body;
    const result = await query(
      "INSERT INTO pokemon_cards (set_number, name, image_url) VALUES ($1, $2, $3) RETURNING *",
      [set_number, name, image_url]
    );
    res.status(201).json(result[0]);
  } else {
    res.status(405).end();
  }
}
