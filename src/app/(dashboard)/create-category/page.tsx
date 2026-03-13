"use client";

import { useEffect, useState } from "react";

type Category = {
  id: number;
  categoryName: string;
};

export default function CategoryForm() {
  const [name, setName] = useState("");
  const [parentId, setParentId] = useState<number | null>(null);
  const [parents, setParents] = useState<Category[]>([]);

  // fetch parent categories
  useEffect(() => {
    fetchParents();
    
  }, []);

  const fetchParents = async () => {
    try {
      const res = await fetch("/api/v1/categories/parents");

      const data = await res.json();
      console.log(data);
      setParents(data);
    } catch (error) {
      console.error("Lỗi fetch parent categories", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const body = {
      name,
      parentId,
    };

    try {
      const res = await fetch("/api/v1/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        alert("Tạo category thành công");
        // setName("");
        // setParentId(null);
        window.location.reload();
      } else {
        alert("Tạo category thất bại");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ width: "400px", margin: "50px auto" }}>
      <h2>Create Category</h2>

      <form onSubmit={handleSubmit}>
        {/* name */}
        <div style={{ marginBottom: "15px" }}>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
            required
          />
        </div>

        {/* parent */}
        <div style={{ marginBottom: "15px" }}>
          <label>Parent Category</label>

          <select
            value={parentId ?? ""}
            onChange={(e) =>
              setParentId(e.target.value ? Number(e.target.value) : null)
            }
            style={{ width: "100%", padding: "8px" }}
          >
            <option value="">-- Không có parent --</option>

            {parents.map((p) => (
              <option key={p.id} value={p.id}>
                {p.categoryName}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Create</button>
      </form>
    </div>
  );
}