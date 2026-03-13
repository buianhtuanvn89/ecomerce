"use client";

import { useState } from "react";

export default function CreateBrandForm() {
  const [brandName, setBrandName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      const res = await fetch("/api/v1/brands", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          brandName,
         }),
      });

      if (!res.ok) {
        throw new Error("Create brand failed");
      }

      setMessage("Create brand success!");
      setBrandName("");

    } catch (error) {
      setMessage("Error creating brand");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md p-6 border rounded">
      <h2 className="text-xl font-bold mb-4">Create Brand</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Brand name"
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </form>

      {message && <p className="mt-3">{message}</p>}
    </div>
  );
}