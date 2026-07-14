export interface Product {
  id: string;
  name: string;
  brand: string;
  categorySlug: string;
  department: "bathware" | "hardware";
  image: string;
  shortDescription: string;
  features: string[];
  finishes: string[];
}

export const products: Product[] = [
  // --- BATHWARE: SHOWERS & FAUCETS ---
  {
    id: "bw-sf-001",
    name: "Artize Rain Joy Shower System",
    brand: "Artize",
    categorySlug: "showers-faucets",
    department: "bathware",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800",
    shortDescription: "A luxurious overhead shower experience featuring chromotherapy and multiple spray modes.",
    features: ["Chromotherapy Lighting", "Rain, Cascade & Massage Modes", "Thermostatic Control"],
    finishes: ["Chrome", "Matte Black", "Brushed Gold"]
  },
  {
    id: "bw-sf-002",
    name: "Kohler Anthem Digital Shower",
    brand: "Kohler",
    categorySlug: "showers-faucets",
    department: "bathware",
    image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&q=80&w=800",
    shortDescription: "Control your shower's temperature, pressure, and spray settings with precision digital technology.",
    features: ["Digital Touch Control", "Dual Temperature Zones", "Eco-Flow Settings"],
    finishes: ["Vibrant Titanium", "Polished Chrome", "Vibrant Brushed Nickel"]
  },
  {
    id: "bw-sf-003",
    name: "Grohe SmartControl Perfect Shower Set",
    brand: "Grohe",
    categorySlug: "showers-faucets",
    department: "bathware",
    image: "https://images.unsplash.com/photo-1604709177227-2e212dc9c8b7?auto=format&fit=crop&q=80&w=800",
    shortDescription: "Intuitive push-and-turn button technology for the ultimate personalized shower.",
    features: ["Push-Button Control", "TurboStat Technology", "CoolTouch Surface"],
    finishes: ["StarLight Chrome", "Hard Graphite", "Warm Sunset"]
  },
  {
    id: "bw-sf-004",
    name: "Hindware Italian Collection Faucet",
    brand: "Hindware",
    categorySlug: "showers-faucets",
    department: "bathware",
    image: "https://images.unsplash.com/photo-1552596489-cf2b369dbfbc?auto=format&fit=crop&q=80&w=800",
    shortDescription: "Sleek, minimalist design meets superior functionality in this premium basin mixer.",
    features: ["Ceramic Cartridge", "Water-Saving Aerator", "Solid Brass Construction"],
    finishes: ["Chrome", "Rose Gold", "Gunmetal"]
  },

  // --- BATHWARE: BASINS (Countertop & Standalone) ---
  {
    id: "bw-bc-001",
    name: "Kohler Artist Editions Derring Basin",
    brand: "Kohler",
    categorySlug: "countertop-basin",
    department: "bathware",
    image: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&q=80&w=800",
    shortDescription: "Handcrafted ceramic basin featuring intricate glaze patterns inspired by artisanal pottery.",
    features: ["Handcrafted Design", "Vitreous China", "Above-Counter Installation"],
    finishes: ["Bourbon Rutile", "Blaze", "Iron Red"]
  },
  {
    id: "bw-bc-002",
    name: "Grohe Eurocube Ceramic Vessel",
    brand: "Grohe",
    categorySlug: "countertop-basin",
    department: "bathware",
    image: "https://images.unsplash.com/photo-1613511475510-eb5ea0553768?auto=format&fit=crop&q=80&w=800",
    shortDescription: "Clean, geometric lines define this modern countertop basin, perfect for contemporary spaces.",
    features: ["PureGuard Anti-Bacterial Finish", "Crisp Cuboid Design", "Easy Clean Coating"],
    finishes: ["Alpine White"]
  },
  {
    id: "bw-bs-001",
    name: "Hindware Queo Free-Standing Pedestal",
    brand: "Queo by Hindware",
    categorySlug: "standalone-basin",
    department: "bathware",
    image: "https://images.unsplash.com/photo-1610667500582-7f9e8a719c83?auto=format&fit=crop&q=80&w=800",
    shortDescription: "A sculptural masterpiece that serves as the focal point of any luxury bathroom.",
    features: ["Monolithic Structure", "Seamless Finish", "Concealed Waste"],
    finishes: ["Matte White", "Glossy Black"]
  },

  // --- BATHWARE: TOILETS & WELLNESS ---
  {
    id: "bw-tw-001",
    name: "Kohler Numi 2.0 Intelligent Toilet",
    brand: "Kohler",
    categorySlug: "spa-wellness",
    department: "bathware",
    image: "https://images.unsplash.com/photo-1555543666-41f237bf3ff7?auto=format&fit=crop&q=80&w=800",
    shortDescription: "The ultimate in personal comfort with personalized cleansing, heated seat, and ambient lighting.",
    features: ["Auto Open/Close", "Heated Seat", "Integrated Bidet & Dryer", "Bluetooth Speakers"],
    finishes: ["White", "Honest Grey"]
  },
  {
    id: "bw-tw-002",
    name: "Grohe Sensia Arena Smart Toilet",
    brand: "Grohe",
    categorySlug: "spa-wellness",
    department: "bathware",
    image: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&q=80&w=800",
    shortDescription: "Japanese spa culture meets German engineering in this advanced shower toilet.",
    features: ["SkinClean Technology", "HygieneClean Glaze", "Smartphone App Control"],
    finishes: ["Alpine White"]
  },
  {
    id: "bw-tw-003",
    name: "Artize Bathtub with Air Massage",
    brand: "Artize",
    categorySlug: "spa-wellness",
    department: "bathware",
    image: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&q=80&w=800",
    shortDescription: "Immerse yourself in deep relaxation with thousands of heated air bubbles.",
    features: ["Air Jet Massage", "Freestanding Design", "Ergonomic Contour"],
    finishes: ["Glossy White", "Matte White"]
  },

  // --- HARDWARE: DOOR FITTINGS & LOCKS ---
  {
    id: "hw-df-001",
    name: "Häfele Premium Mortise Handle",
    brand: "Häfele",
    categorySlug: "door-fittings",
    department: "hardware",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800",
    shortDescription: "Solid brass mortise handle engineered for smooth operation and timeless appeal.",
    features: ["Solid Brass Core", "Tested for 200,000 cycles", "Corrosion Resistant"],
    finishes: ["Antique Brass", "Satin Nickel", "Polished Chrome"]
  },
  {
    id: "hw-sl-001",
    name: "Yale Assure Lock 2 with Wi-Fi",
    brand: "Yale",
    categorySlug: "smart-locks",
    department: "hardware",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=800",
    shortDescription: "Keyless entry smart lock that integrates seamlessly with your smart home ecosystem.",
    features: ["Biometric Fingerprint", "Remote Access", "Auto-Lock functionality"],
    finishes: ["Black Suede", "Satin Nickel", "Bronze"]
  },

  // --- HARDWARE: KITCHEN SYSTEMS ---
  {
    id: "hw-ks-001",
    name: "Blum LEGRABOX Drawer System",
    brand: "Blum",
    categorySlug: "kitchen-systems",
    department: "hardware",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=800",
    shortDescription: "Elegant box system for kitchens, featuring slim, straight side panels and ultra-smooth running action.",
    features: ["BLUMOTION Soft Close", "Slim 12.8mm Profile", "High Load Capacity"],
    finishes: ["Orion Grey", "Silk White", "Carbon Black"]
  },
  {
    id: "hw-ks-002",
    name: "Hettich Sensys Hinge System",
    brand: "Hettich",
    categorySlug: "kitchen-systems",
    department: "hardware",
    image: "https://images.unsplash.com/photo-1556910103-1c02745a872f?auto=format&fit=crop&q=80&w=800",
    shortDescription: "Award-winning concealed hinges with integrated soft-closing mechanism.",
    features: ["Integrated Soft Close", "Tool-less assembly", "Sleek cover caps"],
    finishes: ["Obsidian Black", "Nickel Plated"]
  }
];

export function getProductsByCategory(categorySlug: string) {
  return products.filter((p) => p.categorySlug === categorySlug);
}

export function getProductsByDepartment(department: "bathware" | "hardware") {
  return products.filter((p) => p.department === department);
}

export function getProductById(id: string) {
  return products.find((p) => p.id === id);
}
