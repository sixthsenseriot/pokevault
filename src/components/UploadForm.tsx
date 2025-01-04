"use client";

import { useState } from "react";

const UploadForm = () => {
  const [name, setName] = useState("");
  const [setNumber, setSetNumber] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !setNumber || !imageFile) {
      setMessage("All fields are required.");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onload = async () => {
      const base64Image = reader.result?.toString().split(",")[1];

      const payload = {
        name,
        set_number: setNumber,
        imageFile: { data: base64Image },
      };

      try {
        const response = await fetch("/api/createCard", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error("Failed to upload card");
        }

        setMessage("Card uploaded successfully!");
      } catch (error) {
        if (error instanceof Error) {
          setMessage("Error uploading card: " + error.message);
        } else {
          setMessage("An unexpected error occurred");
        }
      }
    };
  };

  return (
    <div className="upload-form">
      <h1>Upload Pokémon Card</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Pokémon Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Set Number</label>
          <input
            type="text"
            value={setNumber}
            onChange={(e) => setSetNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Card Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
            required
          />
        </div>
        <button type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UploadForm;
