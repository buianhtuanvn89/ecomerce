"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Category {
  id: number;
  categoryName: string;
  parent : Category;
  children : Category[];
}

interface Brand {
  id: number;
  brandName: string;
}

interface ProductDetail {
  productCode: string;
  productName: string;
  price: number;
  gender: string;
  brand: Brand;
  category: Category;
  thumbnail: string;
  images : string[];
}

export default function EditProductForm() {

  const params = useParams();
  const id = params.id;

  const [productCode, setProductCode] = useState("");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState<number | null>(null);

  const [gender, setGender] = useState("");

  const [images, setImages] = useState<File[]>([]);
  const [oldImages, setOldImages] = useState<string[]>([]);

  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [oldThumbnail, setOldThumbnail] = useState<string | null >(null);


  const [parentCategories, setParentCategories] = useState<Category[]>([]);
  const [childCategories, setChildCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);

  const [parentId, setParentId] = useState<number | null>(null);
  const [childId, setChildId] = useState<number | null>(null);
  const [brandId, setBrandId] = useState<number | null>(null);

  // =============================
  // Load categories + brands
  // =============================
  useEffect(() => {

    fetch("/api/v1/categories/parents")
      .then(res => res.json())
      .then(setParentCategories);

    fetch("/api/v1/brands")
      .then(res => res.json())
      .then(setBrands);

  }, []);

  // =============================
  // Load product detail
  // =============================
  useEffect(() => {

    if (!id) return;

    fetch(`/api/v1/products/product-detail/${id}`)
      .then(res => res.json())
      .then((data: ProductDetail) => {

        setProductCode(data.productCode);
        setProductName(data.productName);
        setPrice(data.price);

        setGender(data.gender);

        setBrandId(data.brand.id);
        setParentId(data.category.parent.id);
        setChildId(data.category.id);

        setOldImages(data.images);
        setOldThumbnail(data.thumbnail);

      });

  }, [id]);

  // =============================
  // Load child category
  // =============================
  useEffect(() => {

    if (!parentId) return;

    fetch(`/api/v1/categories/child/${parentId}`)
      .then(res => res.json())
      .then(setChildCategories);

  }, [parentId]);

  // =============================
  // Parent change
  // =============================
  const handleParentChange = async (value: number | null) => {
   
    setChildId(null);
    setChildCategories([]);
    setParentId(value);

  }

  // =============================
  // Upload list images
  // =============================
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const files = e.target.files;
    if (!files) return;

    setImages(prev => [...prev, ...Array.from(files)]);
  };

  // =============================
  // Upload thumbnail
  // =============================
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const file = e.target.files?.[0];
    if (!file) return;

    setThumbnail(file);
  };

  // =============================
  // Remove image
  // =============================
  const removeNewImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  // =============================
  // Submit
  // =============================
  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    const formData = new FormData();

    formData.append("id", String(id));

    formData.append("productCode", productCode);
    formData.append("productName", productName);
    formData.append("price", String(price));
    formData.append("gender", gender);

    if (childId !== null) formData.append("categoryId", String(childId));
    if (brandId !== null) formData.append("brandId", String(brandId));

    if (images.length !== 0) images.forEach((img) => formData.append("images", img));

    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }

    try {

      const res = await fetch("/api/v1/products", {
        method: "PUT",
        body: formData
      });

      if (!res.ok) throw new Error();

      alert("Update success");

    } catch {

      alert("Update failed");

    }

  };

  console.log("thumb:",thumbnail)

  return (

    <form onSubmit={handleSubmit}>

      <h2>Edit Product</h2>

      {/* Product Code */}
      <input
        value={productCode}
        onChange={(e) => setProductCode(e.target.value)}
      />

      {/* Product Name */}
      <input
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />

      {/* Price */}
      <input
        type="number"
        value={price ?? ""}
        onChange={(e) => setPrice(Number(e.target.value))}
      />

      {/* Brand */}
      <div>

        <label>Brand</label>

        <select
          value={brandId ?? ""}
          onChange={(e) =>
            setBrandId(
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
              setChildId(
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

        <p> Old images: </p>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>

          {oldImages.map((img, index) => (

            <div key={index} style={{ position: "relative" }}>

              <img src={img} width={120} />

            </div>
          ))}
        </div>


        <p> New images: </p>
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
                onClick={() => removeNewImage(index)}
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


      {/* Thumbnail */}

      <div>
        <p>Old thumbnail:</p>  
        {oldThumbnail && (
          <img src={oldThumbnail} width={120} />
        )}

        <p>New thumbnail:</p>  

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

      <button type="submit">Update Product</button>

    </form>

  );
}