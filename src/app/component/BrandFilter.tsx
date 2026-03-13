"use client";

import { useEffect, useState } from "react";

interface Brand {
  id: number;
  brandName: string;
}

type Props = {
  selected: string[];
  onChange: (values: string[]) => void;
};

export default function BrandFilter({ selected, onChange }: Props) {

  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    fetch("/api/v1/brands")
      .then(res => res.json())
      .then(setBrands);
  }, []);

  const toggle = (id: string) => {

    if (selected.includes(id)) {
      onChange(selected.filter(v => v !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  return (
    <div>

      <h4>Brand</h4>

      {brands.map(b => (
        <label key={b.id}>

          <input
            type="checkbox"
            checked={selected.includes(String(b.id))}
            onChange={() => toggle(String(b.id))}
          />

          {b.brandName}

        </label>
      ))}

    </div>
  );
}