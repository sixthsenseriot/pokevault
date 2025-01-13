"use client";

import { useState, useEffect } from "react";

interface PokemonCard {
  id: number;
  name: string;
  set_number: string;
  image_url: string;
}

const DisplayCards = () => {
  const [data, setData] = useState<PokemonCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("api/getCards");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching cards: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>

  return (
    <div className="display-cards">
      <h1>Pokémon Card Collection</h1>
      <div className="cards-container">
        {data.map((item) => (
          <div key={item.id} className="card">
            <img src={item.image_url} alt={item.name} className="card-image" />
            <div className="card-info">
              <h3>{item.name}</h3>
              <p>Set Number: {item.set_number}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayCards;
