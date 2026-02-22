"use client";

import Link from "next/link";
import { useState } from "react";

type Product = {
  id: string;
  name: string;
  price: string;
  imageDataUrl?: string;
};

export default function AddProductPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageDataUrl, setImageDataUrl] = useState<string | undefined>(undefined);
  const [msg, setMsg] = useState<string>("");

  const handleImage = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImageDataUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const saveProduct = () => {
    if (!name.trim() || !price.trim()) {
      setMsg("Please enter product name and price.");
      return;
    }

    const newProduct: Product = {
      id: crypto.randomUUID(),
      name: name.trim(),
      price: price.trim(),
      imageDataUrl,
    };

    const raw = localStorage.getItem("gym_products");
    const current: Product[] = raw ? JSON.parse(raw) : [];
    current.unshift(newProduct);

    localStorage.setItem("gym_products", JSON.stringify(current));
    setMsg("✅ Product saved! Go back to Home to see it.");

    // reset fields
    setName("");
    setPrice("");
    setImageDataUrl(undefined);
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-3xl px-4 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Add Gym Product</h1>
            <p className="text-slate-600 text-sm">Upload an image + save product</p>
          </div>

          <Link
            href="/"
            className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-slate-100"
          >
            ← Back
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-3xl px-4 py-8">
        <div className="rounded-xl border bg-white p-6 space-y-4">
          <div>
            <label className="text-sm font-medium">Product Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Dumbbells Set"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Price</label>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 4500 PKR"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Product Image</label>
            <input
              type="file"
              accept="image/*"
              className="mt-1 w-full"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImage(file);
              }}
            />
            <p className="text-xs text-slate-500 mt-1">
              (Demo mode: image is saved in browser localStorage)
            </p>
          </div>

          <div className="rounded-lg border bg-slate-50 p-3">
            <p className="text-sm font-medium mb-2">Preview</p>
            <div className="aspect-[4/3] bg-white border rounded-lg flex items-center justify-center overflow-hidden">
              {imageDataUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={imageDataUrl} alt="preview" className="h-full w-full object-cover" />
              ) : (
                <span className="text-slate-500 text-sm">No image selected</span>
              )}
            </div>
          </div>

          {msg && <p className="text-sm">{msg}</p>}

          <button
            onClick={saveProduct}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white text-sm font-medium hover:bg-blue-700"
          >
            Save Product
          </button>
        </div>
      </section>
    </main>
  );
}