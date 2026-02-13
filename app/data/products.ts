// app/data/products.ts

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number; // Optional: if you want to show a discount
  image: string;
  category: string;
  rating?: number;
  reviews?: number;
}

export const products: Product[] = [
  // --- ELECTRONICS ---
  {
    id: 1,
    name: "Sony WH-1000XM5 Wireless Headphones",
    price: 348.00,
    originalPrice: 399.00,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    category: "Electronics",
    rating: 4.8,
    reviews: 1240
  },
  {
    id: 2,
    name: "Apple Watch Series 9",
    price: 399.00,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&q=80",
    category: "Electronics",
    rating: 4.9,
    reviews: 850
  },
  {
    id: 3,
    name: "MacBook Pro 14-inch M3",
    price: 1599.00,
    originalPrice: 1699.00,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca4?w=500&q=80",
    category: "Electronics",
    rating: 4.9,
    reviews: 320
  },
  {
    id: 4,
    name: "Canon EOS R5 Camera",
    price: 3899.00,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80",
    category: "Electronics",
    rating: 4.7,
    reviews: 150
  },

  // --- FASHION ---
  {
    id: 5,
    name: "Nike Air Max 270",
    price: 150.00,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
    category: "Fashion",
    rating: 4.6,
    reviews: 2100
  },
  {
    id: 6,
    name: "Levi's Denim Jacket",
    price: 89.50,
    originalPrice: 120.00,
    image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=500&q=80",
    category: "Fashion",
    rating: 4.5,
    reviews: 430
  },
  {
    id: 7,
    name: "Classic Ray-Ban Aviators",
    price: 163.00,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&q=80",
    category: "Fashion",
    rating: 4.8,
    reviews: 900
  },

  // --- HOME & LIFESTYLE ---
  {
    id: 8,
    name: "Ergonomic Office Chair",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=500&q=80",
    category: "Home",
    rating: 4.4,
    reviews: 120
  },
  {
    id: 9,
    name: "Smart LED Desk Lamp",
    price: 45.00,
    image: "https://images.unsplash.com/photo-1534073828943-f801091a7d58?w=500&q=80",
    category: "Home",
    rating: 4.3,
    reviews: 75
  },
  {
    id: 10,
    name: "Mechanical Gaming Keyboard",
    price: 129.00,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b91a603?w=500&q=80",
    category: "Electronics",
    rating: 4.7,
    reviews: 600
  }
];