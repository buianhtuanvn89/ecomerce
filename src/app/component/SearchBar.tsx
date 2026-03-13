"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

export default function SearchBar() {
  const [keyword, setKeyword] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState<any[]>([]);

  const router = useRouter();

  useEffect(() => {
    async function getCategories() {
      try {
        const res = await fetch("/api/v1/categories");

        if (!res.ok) {
          throw new Error("Fetch category failed");
        }

        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error(err);
      }
    }

    getCategories();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (keyword.trim()) {
      params.append("q", keyword);
    }

    if (categoryId) {
      params.append("categoryId", categoryId);
    }

    router.push(`/search?${params.toString()}`);
  };

  const parents = categories.filter((c) => c.parent === null);
  const children = categories.filter((c) => c.parent !== null);

  return (
    <form onSubmit={handleSearch} className="flex gap-2 items-center">
      
      <select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        className="border px-3 py-2"
      >
        <option value="">All Category</option>

        {parents.map((parent) => (
          <React.Fragment key={parent.id}>
            <option value={parent.id}>
              {parent.categoryName}
            </option>

            {children
              .filter((child) => child.parent.id === parent.id)
              .map((child) => (
                <option key={child.id} value={child.id}>
                    --- {child.categoryName}
                </option>
              ))}
          </React.Fragment>
        ))}
        
      </select>

      <input
        type="text"
        placeholder="Search product..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="border px-3 py-2"
      />

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2"
      >
        Search
      </button>

    </form>
  );
}