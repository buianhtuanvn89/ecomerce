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
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  const [parentCategories, setParentCategories] = useState<Category[]>([]);
  const [childCategories, setChildCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);

  const [parentId, setParentId] = useState<number | null>(null);
  const [childId, setChildId] = useState<number | null>(null);
  const [brandId, setBrandId] = useState<number | null>(null);

  const [salePrice, setSalePrice] = useState<number | "">("");
  const [saleStartDate, setSaleStartDate] = useState("");
  const [saleEndDate, setSaleEndDate] = useState("");
  const [ageRange, setAgeRange] = useState("");

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

    const files = e.target.files;
    if (!files) return;

    setImages(prev => [...prev, ...Array.from(files)]);
  };

  // =============================
  // Thumbnail upload
  // =============================
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const file = e.target.files?.[0];
    if (!file) return;
    setThumbnail(file);
  };

  // =============================
  // Handle images list
  // =============================
  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
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

    if (images.length !== 0) images.forEach((img) => formData.append("images", img));

    if (thumbnail) formData.append("thumbnail", thumbnail);

    formData.append("salePrice", salePrice ? salePrice.toString() : "");
    formData.append("saleStartDate", saleStartDate);
    formData.append("saleEndDate", saleEndDate);
    formData.append("ageRange", ageRange);

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
          style={{ display: "none" }}
          id="imageUpload"
        />

        <label
          htmlFor="imageUpload"
          style={{
            background: "#2563eb",
            color: "white",
            padding: "8px 16px",
            borderRadius: "6px",
            cursor: "pointer",
            display: "inline-block"
          }}
        >
          Them ảnh
        </label>

        <div style={{ display: "flex", gap: "10px", marginTop: "10px", flexWrap: "wrap" }}>
          {images.map((img, index) => (
            <div
              key={index}
              style={{
                position: "relative",
                width: "120px"
              }}
            >
              <img
                src={URL.createObjectURL(img)}
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "cover",
                  borderRadius: "6px"
                }}
              />

              <button
                type="button"
                onClick={() => removeImage(index)}
                style={{
                  position: "absolute",
                  top: "5px",
                  right: "5px",
                  background: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                  width: "24px",
                  height: "24px",
                  cursor: "pointer"
                }}
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label>Thumbnail</label>

        <input
          type="file"
          onChange={handleThumbnailChange}
          style={{ display: "none" }}
          id="thumbnailUpload"
        />

        <label
          htmlFor="thumbnailUpload"
          style={{
            background: "#2563eb",
            color: "white",
            padding: "8px 16px",
            borderRadius: "6px",
            cursor: "pointer",
            display: "inline-block"
          }}
        >
          Them ảnh
        </label>

        <div style={{ display: "flex", gap: "10px", marginTop: "10px", flexWrap: "wrap" }}>
          {(thumbnail) &&
            <div
              style={{
                position: "relative",
                width: "120px"
              }}
            >
              <img
                src={URL.createObjectURL(thumbnail)}
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "cover",
                  borderRadius: "6px"
                }}
              />

              <button
                type="button"
                onClick={() => setThumbnail(null)}
                style={{
                  position: "absolute",
                  top: "5px",
                  right: "5px",
                  background: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                  width: "24px",
                  height: "24px",
                  cursor: "pointer"
                }}
              >
                X
              </button>
            </div>
          }
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Sale Price</label>
        <input
          type="number"
          className="form-control"
          value={salePrice}
          onChange={(e) => setSalePrice(e.target.value ? Number(e.target.value) : "")}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Sale Start Date</label>
        <input
          type="datetime-local"
          className="form-control"
          value={saleStartDate}
          onChange={(e) => setSaleStartDate(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Sale End Date</label>
        <input
          type="datetime-local"
          className="form-control"
          value={saleEndDate}
          onChange={(e) => setSaleEndDate(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Age Range</label>
        <select
          className="form-control"
          value={ageRange}
          onChange={(e) => setAgeRange(e.target.value)}
        >
          <option value="">-- Select Age Range --</option>
          <option value="0-1">0 - 1</option>
          <option value="1-3">1 - 3</option>
          <option value="3-6">3 - 6</option>
          <option value="6-12">6 - 12</option>
          <option value="12+">12+</option>

        </select>
      </div>

      <button type="submit">Create Product</button>

    </form>
  );
}