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
  {
    id: "bw-sf-005",
    name: "Jaquar Tiaara Single Lever Basin Mixer",
    brand: "Jaquar",
    categorySlug: "showers-faucets",
    department: "bathware",
    image: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&q=80&w=800",
    shortDescription: "Award-winning jewelry-inspired design that elevates the washbasin.",
    features: ["Unique Concentric Design", "Smooth Lever Operation", "Eco-friendly aerator"],
    finishes: ["Antique Bronze", "Chrome", "Gold Dust"]
  },

  // --- BATHWARE: WASHBASINS, WATERCLOSETS & URINALS ---
  {
    id: "bw-ww-001",
    name: "Kohler Veil Intelligent Toilet",
    brand: "Kohler",
    categorySlug: "washbasins-waterclosets-urinals",
    department: "bathware",
    image: "https://images.unsplash.com/photo-1555543666-41f237bf3ff7?auto=format&fit=crop&q=80&w=800",
    shortDescription: "Sleek, seamless, and intelligent. Offers integrated personal cleansing.",
    features: ["Touchless Flush", "Heated Seat", "UV Sanitization"],
    finishes: ["White", "Black"]
  },
  {
    id: "bw-ww-002",
    name: "Grohe Sensia Arena",
    brand: "Grohe",
    categorySlug: "washbasins-waterclosets-urinals",
    department: "bathware",
    image: "https://images.unsplash.com/photo-1584622781867-27b9c927f804?auto=format&fit=crop&q=80&w=800",
    shortDescription: "Smart shower toilet with self-cleaning technology and app control.",
    features: ["AquaCeramic", "PlasmaCluster", "Smartphone App"],
    finishes: ["Alpine White"]
  },
  {
    id: "bw-ww-003",
    name: "Hindware Element Wall Hung",
    brand: "Hindware",
    categorySlug: "washbasins-waterclosets-urinals",
    department: "bathware",
    image: "https://images.unsplash.com/photo-1613511475510-eb5ea0553768?auto=format&fit=crop&q=80&w=800",
    shortDescription: "Rimless wall-hung closet ensuring maximum hygiene and minimalist aesthetics.",
    features: ["Rimless Technology", "Soft Close Seat", "Water Saving Flush"],
    finishes: ["Star White"]
  },

  // --- BATHWARE: COUNTERTOP BASINS ---
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
    id: "bw-bc-003",
    name: "Jaquar Laguna Countertop",
    brand: "Jaquar",
    categorySlug: "countertop-basin",
    department: "bathware",
    image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&q=80&w=800",
    shortDescription: "Matte finish luxury basin designed by Matteo Thun & Antonio Rodriguez.",
    features: ["Matte Finish", "Thin Rim Technology", "Spacious Bowl"],
    finishes: ["Matte Black", "Matte White", "Earth"]
  },

  // --- BATHWARE: STANDALONE BASINS ---
  {
    id: "bw-bs-001",
    name: "Queo Free-Standing Pedestal",
    brand: "Queo",
    categorySlug: "standalone-basin",
    department: "bathware",
    image: "https://images.unsplash.com/photo-1610667500582-7f9e8a719c83?auto=format&fit=crop&q=80&w=800",
    shortDescription: "A sculptural masterpiece that serves as the focal point of any luxury bathroom.",
    features: ["Monolithic Structure", "Seamless Finish", "Concealed Waste"],
    finishes: ["Matte White", "Glossy Black"]
  },
  {
    id: "bw-bs-002",
    name: "Kohler Briolette Freestanding",
    brand: "Kohler",
    categorySlug: "standalone-basin",
    department: "bathware",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800",
    shortDescription: "Faceted glass styling creates a stunning play of light and shadow.",
    features: ["Spun Glass", "Textured Surface", "Freestanding Pillar"],
    finishes: ["Ice", "Translucent Black"]
  },

  // --- BATHWARE: VANITY & MIRRORS ---
  {
    id: "bw-vm-001",
    name: "Kohler Maxstow Wall-Hung Vanity",
    brand: "Kohler",
    categorySlug: "vanity-mirrors",
    department: "bathware",
    image: "https://images.unsplash.com/photo-1552596489-cf2b369dbfbc?auto=format&fit=crop&q=80&w=800",
    shortDescription: "Staggered storage design maximizes space while maintaining a sleek profile.",
    features: ["Moisture-Resistant Wood", "Soft-Close Drawers", "Integrated Pulls"],
    finishes: ["Glossy White", "Midnight Walnut"]
  },
  {
    id: "bw-vm-002",
    name: "Hafele Aquasys Smart Mirror",
    brand: "Häfele",
    categorySlug: "vanity-mirrors",
    department: "bathware",
    image: "https://images.unsplash.com/photo-1604709177227-2e212dc9c8b7?auto=format&fit=crop&q=80&w=800",
    shortDescription: "Anti-fog illuminated mirror with adjustable color temperatures.",
    features: ["Defogger", "Touch Sensor", "Dimmable LED"],
    finishes: ["Frameless", "Matte Black Frame"]
  },

  // --- BATHWARE: KITCHEN SINKS & FAUCETS ---
  {
    id: "bw-ks-001",
    name: "Franke Maris Quartz Sink",
    brand: "Franke",
    categorySlug: "kitchen-sinks-faucets",
    department: "bathware",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=800",
    shortDescription: "Extremely durable, scratch-resistant quartz sink with an elegant matte finish.",
    features: ["Sanitized® Coating", "Heat Resistant", "Sound Deadening"],
    finishes: ["Onyx", "Stone Grey", "Polar White"]
  },
  {
    id: "bw-ks-002",
    name: "Grohe Zedra Touch Kitchen Faucet",
    brand: "Grohe",
    categorySlug: "kitchen-sinks-faucets",
    department: "bathware",
    image: "https://images.unsplash.com/photo-1556910103-1c02745a872f?auto=format&fit=crop&q=80&w=800",
    shortDescription: "Start and stop the water flow with just a touch of your wrist or forearm.",
    features: ["EasyTouch Technology", "Pull-down Spray", "Magnetic Docking"],
    finishes: ["SuperSteel", "Chrome"]
  },
  {
    id: "bw-ks-003",
    name: "Hindware Armando Stainless Steel Sink",
    brand: "Hindware",
    categorySlug: "kitchen-sinks-faucets",
    department: "bathware",
    image: "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&q=80&w=800",
    shortDescription: "Handmade SS304 grade double bowl sink for heavy-duty kitchen use.",
    features: ["Anti-condensation Coating", "Noise Reduction Pads", "18 Gauge Steel"],
    finishes: ["Brushed Steel"]
  },

  // --- BATHWARE: SHOWER ENCLOSURES ---
  {
    id: "bw-se-001",
    name: "Jaquar Frameless Sliding Enclosure",
    brand: "Jaquar",
    categorySlug: "shower-enclosures",
    department: "bathware",
    image: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&q=80&w=800",
    shortDescription: "Minimalist 8mm toughened glass enclosure providing a seamless look.",
    features: ["Nano Clean Coating", "Brass Rollers", "Watertight Seals"],
    finishes: ["Clear Glass", "Frosted Glass"]
  },

  // --- BATHWARE: SPA & WELLNESS ---
  {
    id: "bw-sw-001",
    name: "Artize Bathtub with Air Massage",
    brand: "Artize",
    categorySlug: "spa-wellness",
    department: "bathware",
    image: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&q=80&w=800",
    shortDescription: "Immerse yourself in deep relaxation with thousands of heated air bubbles.",
    features: ["Air Jet Massage", "Freestanding Design", "Ergonomic Contour"],
    finishes: ["Glossy White", "Matte White"]
  },
  {
    id: "bw-sw-002",
    name: "Kohler Stillness Bath",
    brand: "Kohler",
    categorySlug: "spa-wellness",
    department: "bathware",
    image: "https://images.unsplash.com/photo-1555543666-41f237bf3ff7?auto=format&fit=crop&q=80&w=800",
    shortDescription: "Inspired by Japanese forest bathing, combining water, light, fog, and aromas.",
    features: ["Infinity Edge", "Hinoki Wood Grate", "Integrated Fog"],
    finishes: ["White"]
  },

  // --- HARDWARE: DOOR FITTINGS & HANDLES ---
  {
    id: "hw-df-001",
    name: "Häfele Premium Mortise Handle",
    brand: "Häfele",
    categorySlug: "door-handles",
    department: "hardware",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800",
    shortDescription: "Solid brass mortise handle engineered for smooth operation and timeless appeal.",
    features: ["Solid Brass Core", "Tested for 200,000 cycles", "Corrosion Resistant"],
    finishes: ["Antique Brass", "Satin Nickel", "Polished Chrome"]
  },
  {
    id: "hw-df-002",
    name: "Dorsët Architectural Pull Handle",
    brand: "Dorsët",
    categorySlug: "door-handles",
    department: "hardware",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=800",
    shortDescription: "Imposing 1200mm entrance pull handle that makes a grand statement.",
    features: ["SS316 Grade", "Concealed Fixing", "Ergonomic Grip"],
    finishes: ["Matte Black", "Rose Gold", "Satin Steel"]
  },

  // --- HARDWARE: SMART LOCKS & SECURITY ---
  {
    id: "hw-sl-001",
    name: "Yale Assure Lock 2 with Wi-Fi",
    brand: "Yale",
    categorySlug: "security-systems",
    department: "hardware",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=800",
    shortDescription: "Keyless entry smart lock that integrates seamlessly with your smart home ecosystem.",
    features: ["Biometric Fingerprint", "Remote Access", "Auto-Lock functionality"],
    finishes: ["Black Suede", "Satin Nickel", "Bronze"]
  },
  {
    id: "hw-sl-002",
    name: "Godrej Advantis Digital Lock",
    brand: "Godrej",
    categorySlug: "security-systems",
    department: "hardware",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800",
    shortDescription: "High-tech mortise lock with 360-degree fingerprint recognition.",
    features: ["RFID Card Access", "Spy Code Technology", "Mechanical Key Backup"],
    finishes: ["Space Grey", "Copper"]
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
    categorySlug: "hinges-channels",
    department: "hardware",
    image: "https://images.unsplash.com/photo-1556910103-1c02745a872f?auto=format&fit=crop&q=80&w=800",
    shortDescription: "Award-winning concealed hinges with integrated soft-closing mechanism.",
    features: ["Integrated Soft Close", "Tool-less assembly", "Sleek cover caps"],
    finishes: ["Obsidian Black", "Nickel Plated"]
  },
  {
    id: "hw-ks-003",
    name: "Häfele Corner Carousel System",
    brand: "Häfele",
    categorySlug: "kitchen-systems",
    department: "hardware",
    image: "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&q=80&w=800",
    shortDescription: "Maximize blind corner space with this fully extending swing-out tray system.",
    features: ["Anti-Slip Trays", "25kg Capacity per tray", "Height Adjustable"],
    finishes: ["Anthracite", "Chrome"]
  },

  // --- HARDWARE: SLIDING SYSTEMS ---
  {
    id: "hw-ss-001",
    name: "Hettich TopLine XL",
    brand: "Hettich",
    categorySlug: "sliding-systems",
    department: "hardware",
    image: "https://images.unsplash.com/photo-1556910103-1c02745a872f?auto=format&fit=crop&q=80&w=800",
    shortDescription: "Heavy-duty sliding door system for large, floor-to-ceiling wardrobe doors.",
    features: ["Concealed Running Gear", "Silent System", "Door weight up to 80kg"],
    finishes: ["Silver Anodized"]
  },

  // --- HARDWARE: WARDROBE ACCESSORIES ---
  {
    id: "hw-wa-001",
    name: "Blum AMBIA-LINE Inner Divider",
    brand: "Blum",
    categorySlug: "wardrobe-accessories",
    department: "hardware",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=800",
    shortDescription: "Flawless organization for wardrobe drawers with adjustable steel frames.",
    features: ["Magnetic Attachment", "Velvet Lined Options", "Modular Design"],
    finishes: ["Terra Black", "Orion Grey"]
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
