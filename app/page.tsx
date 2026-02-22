import Image from "next/image";
import { products } from "../data/products";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-5xl px-4 py-5">
          <h1 className="text-3xl font-semibold">Gym Products Demo Store</h1>
          <p className="text-slate-600 text-sm mt-1">
            Static catalog (visitors can view only)
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-4 py-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <div key={p.id} className="rounded-xl border bg-white overflow-hidden">
              <div className="relative aspect-[4/3] bg-slate-100">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={p.id === "p1"}
                />
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-semibold leading-snug">{p.name}</h3>
                  {p.category && (
                    <span className="shrink-0 rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-700">
                      {p.category}
                    </span>
                  )}
                </div>
                <p className="text-slate-600 text-sm mt-2">Price: {p.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}