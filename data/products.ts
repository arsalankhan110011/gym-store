export type Product = {
  id: string;
  name: string;
  price: string;
  image: string; // path inside /public
  category?: string;
};

export const products: Product[] = [
  {
    id: "p1",
    name: "Adjustable Dumbbells (Pair)",
    price: "PKR 12,500",
    image: "/products/dumbbells.png",
    category: "Weights",
  },
  {
    id: "p2",
    name: "Yoga Mat (Non-slip)",
    price: "PKR 1,800",
    image: "/products/yoga-mat.png",
    category: "Accessories",
  },
  {
    id: "p3",
    name: "Resistance Bands Set",
    price: "PKR 2,200",
    image: "/products/bands.png",
    category: "Accessories",
  },
];