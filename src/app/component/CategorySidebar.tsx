"use client"

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CategorySidebar() {
  const [categories, setCategories] = useState<any[]>([]);

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


  const parents = categories.filter((c) => c.parent === null);
  const children = categories.filter((c) => c.parent !== null);
   console.log(children,"fddff")

  return (
    <div className="w-64 p-4 border">
      {parents.map((parent) => (
        <div key={parent.id} className="mb-4">
          
          {/* category tầng 1 */}
          <Link
            href={`/product/${parent.id}`}
            className="text-gray-600 hover:text-black"
          >
            {parent.categoryName}
          </Link>

          {/* category tầng 2 */}
          <div className="ml-3 flex flex-col gap-1">
            {children
              .filter((child) => child.parent.id === parent.id)
              .map((child) => (
                <span key={child.id}>
                  <Link
                    href={`/product/${child.id}`}
                    className="text-gray-600 hover:text-black"
                  >
                    {child.categoryName}
                  </Link>
                </span>
              ))}
          </div>

        </div>
      ))}
    </div>
  );
}