"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Product = {
  id: string;
  name: string;
  price: string;
  imageDataUrl?: string; // base64 image for demo
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem("gym_products");
    if (raw) setProducts(JSON.parse(raw));
  }, []);

  const clearAll = () => {
    localStorage.removeItem("gym_products");
    setProducts([]);
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-5xl px-4 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Gym Products Demo Store</h1>
            <p className="text-slate-600 text-sm">
              Simple Next.js demo (products + image upload using localStorage)
            </p>
          </div>

          <div className="flex gap-2">
            <Link
              href="/add"
              className="rounded-lg bg-blue-600 px-4 py-2 text-white text-sm font-medium hover:bg-blue-700"
            >
              + Add Product
            </Link>
            <button
              onClick={clearAll}
              className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-slate-100"
            >
              Clear All
            </button>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-4 py-8">
        {products.length === 0 ? (
          <div className="rounded-xl border bg-white p-6">
            <h2 className="text-lg font-semibold">No products yet</h2>
            <p className="text-slate-600 mt-1">
              Click <b>Add Product</b> to add your first gym item.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <div key={p.id} className="rounded-xl border bg-white overflow-hidden">
                <div className="aspect-[4/3] bg-slate-100 flex items-center justify-center">
                  {p.imageDataUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.imageDataUrl}
                      alt={p.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-slate-500 text-sm">No image</span>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-semibold">{p.name}</h3>
                  <p className="text-slate-600 text-sm mt-1">Price: {p.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}