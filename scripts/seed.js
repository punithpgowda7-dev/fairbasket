const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const ProductSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  category: String,
  image: String, // Ensure this exists
  modelUrl: String,
  transparency: { tax: Number, shipping: Number, fee: Number }
});

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

async function seed() {
  if (!process.env.MONGODB_URI) {
    console.error("❌ Error: MONGODB_URI is missing in .env.local");
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGODB_URI);
  await Product.deleteMany({});
  
  console.log("🚀 Injecting Fixed Product List...");

  const products = [
    {
      title: "DJI Mini 4 Pro Drone (Fly More Combo)",
      description: "Weighing less than 249g, this drone captures 4K/60fps HDR video.",
      price: 109900,
      category: "Cameras",
      image: "https://images.unsplash.com/photo-1579829366248-204fe8413f31?q=80&w=1000&auto=format&fit=crop",
      transparency: { tax: 0.18, shipping: 0, fee: 2500 }
    },
    {
      title: "Sony WH-1000XM5 Wireless Headphones",
      description: "Industry-leading noise cancellation and exceptional sound quality.",
      price: 29990,
      category: "Audio",
      image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=1000&auto=format&fit=crop",
      transparency: { tax: 0.18, shipping: 150, fee: 500 }
    },
    {
      title: "Air Jordan 1 High OG 'Chicago'",
      description: "The sneaker that started it all. Classic red, white, and black colorway.",
      price: 16995,
      category: "Fashion",
      image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=1000&auto=format&fit=crop",
      transparency: { tax: 0.12, shipping: 250, fee: 300 }
    },
    {
      title: "MacBook Air 15-inch (M3 Chip)",
      description: "Strikingly thin and fast. The world's best 15-inch laptop.",
      price: 134900,
      category: "Laptops",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000&auto=format&fit=crop",
      transparency: { tax: 0.18, shipping: 0, fee: 2000 }
    },
    {
      title: "Apple Watch Ultra 2 (Titanium)",
      description: "The most rugged and capable Apple Watch. Titanium case and extra-long battery.",
      price: 89900,
      category: "Wearables",
      // FIXED IMAGE LINK BELOW:
      image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=1000&auto=format&fit=crop",
      transparency: { tax: 0.18, shipping: 0, fee: 1500 }
    },
    {
      title: "PlayStation 5 Console (Disc Edition)",
      description: "Lightning-fast loading with an ultra-high-speed SSD.",
      price: 54990,
      category: "Gaming",
      image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=1000&auto=format&fit=crop",
      transparency: { tax: 0.18, shipping: 300, fee: 800 }
    },
    {
      title: "Canon EOS R6 Mark II Mirrorless Camera",
      description: "Capture the perfect moment with 40fps continuous shooting.",
      price: 215995,
      category: "Cameras",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop",
      transparency: { tax: 0.18, shipping: 0, fee: 3500 }
    },
    {
      title: "Samsung Galaxy S24 Ultra (Titanium Gray)",
      description: "Unleash new ways to create, connect, and more with mobile AI.",
      price: 129999,
      category: "Smartphones",
      image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=1000&auto=format&fit=crop",
      transparency: { tax: 0.18, shipping: 0, fee: 2000 }
    }
  ];

  await Product.insertMany(products);
  console.log("✅ SUCCESS: Products Fixed & Images Updated!");
  process.exit();
}
seed();