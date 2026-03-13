"use client";

import { useEffect, useState } from "react";

interface Category {
  id: number;
  categoryName: string;
}

interface Brand {
  id: number;
  brandName: string;
}

export default function CreateProductForm() {

  const [productCode, setProductCode] = useState("");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");

  const [gender, setGender] = useState("");

  const [images, setImages] = useState<File[]>([]);

  const [parentCategories, setParentCategories] = useState<Category[]>([]);
  const [childCategories, setChildCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);

  const [parentId, setParentId] = useState<number | null>(null);
  const [childId, setChildId] = useState<number | null>(null);
  const [brandId, setBrandId] = useState<number | null>(null);

  // =============================
  // Load parent category
  // =============================
  useEffect(() => {
    fetch("/api/v1/categories/parents")
      .then((res) => res.json())
      .then(setParentCategories)
      .catch(console.error);
  }, []);

  // =============================
  // Load brands
  // =============================
  useEffect(() => {
    fetch("/api/v1/brands")
      .then((res) => res.json())
      .then(setBrands)
      .catch(console.error);
  }, []);

  // =============================
  // Parent change
  // =============================
  const handleParentChange = async (value: number | null) => {

    setParentId(value);
    setChildId(null);
    setChildCategories([]);

    if (!value) return;

    try {

      const res = await fetch(`/api/v1/categories/child/${value}`);
      const data = await res.json();

      setChildCategories(Array.isArray(data) ? data : []);

    } catch (error) {
      console.error(error);
    }
  };

  // =============================
  // Child change
  // =============================
  const handleChildChange = (value: number | null) => {
    setChildId(value);
  };

  // =============================
  // Brand change
  // =============================
  const handleBrandChange = (value: number | null) => {
    setBrandId(value);
  };

  // =============================
  // Image upload
  // =============================
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    if (!e.target.files) return;

    setImages(Array.from(e.target.files));
  };

  // =============================
  // Submit
  // =============================
  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    const formData = new FormData();

    formData.append("productCode", productCode);
    formData.append("productName", productName);
    formData.append("price", price);
    formData.append("gender", gender);

    if (childId !== null) {
      formData.append("categoryId", String(childId));
    }

    if (brandId !== null) {
      formData.append("brandId", String(brandId));
    }

    if (images.length != 0) images.forEach((img) => formData.append("images", img));
   
    try {

      const res = await fetch("/api/v1/products", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error();

      alert("Create product success");

    } catch {
      alert("Create product failed");
    }
  };

  // =============================
  // Render
  // =============================
  return (
    <form onSubmit={handleSubmit}>

      <h2>Create Product</h2>

      <div>
        <label>Product Code</label>
        <input
          type="text"
          value={productCode}
          onChange={(e) => setProductCode(e.target.value)}
        />
      </div>

      <div>
        <label>Product Name</label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
      </div>

      {/* Price */}
      <div>
        <label>Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      {/* Gender */}
      <div>
        <label>Gender</label>

        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >

          <option value="">Select gender</option>
          <option value="BOY">Nam</option>
          <option value="GIRL">Nữ</option>
          <option value="UNISEX">Unisex</option>

        </select>

      </div>

      {/* Brand */}
      <div>

        <label>Brand</label>

        <select
          value={brandId ?? ""}
          onChange={(e) =>
            handleBrandChange(
              e.target.value ? Number(e.target.value) : null
            )
          }
        >

          <option value="">Select brand</option>

          {brands.map((b) => (
            <option key={b.id} value={b.id}>
              {b.brandName}
            </option>
          ))}

        </select>

      </div>

      {/* Parent Category */}
      <div>

        <label>Parent Category</label>

        <select
          value={parentId ?? ""}
          onChange={(e) =>
            handleParentChange(
              e.target.value ? Number(e.target.value) : null
            )
          }
        >

          <option value="">Select parent category</option>

          {parentCategories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.categoryName}
            </option>
          ))}

        </select>

      </div>

      {/* Child Category */}
      {(childCategories.length != 0) && (

        <div>

          <label>Child Category</label>

          <select
            value={childId ?? ""}
            onChange={(e) =>
              handleChildChange(
                e.target.value ? Number(e.target.value) : null
              )
            }
          >

            <option value="">Select child category</option>

            {childCategories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.categoryName}
              </option>
            ))}

          </select>

        </div>
      )}

      {/* Images */}
      <div>

        <label>Images</label>

        <input
          type="file"
          multiple
          onChange={handleImageChange}
        />

      </div>

      <button type="submit">Create Product</button>

    </form>
  );
}