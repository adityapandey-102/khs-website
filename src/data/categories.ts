// ============================================================
// DATA: Categories
// ============================================================

export interface Category {
  id: string;
  label: string;
  shortLabel: string;
  href: string;
  image: string;
  description: string;
  type: "bathware" | "hardware";
}

export const bathwareCategories: Category[] = [
  {
    id: "shower-faucets",
    label: "Shower, Faucets & Extensions",
    shortLabel: "Shower & Faucets",
    href: "/bathware/shower-faucets",
    image: "/assets/old-site/Untitled-design-18.png",
    description:
      "Premium shower systems, wall-mounted faucets, rain showers and hand-held extensions engineered for a spa-like experience.",
    type: "bathware",
  },
  {
    id: "washbasins-waterclosets-urinals",
    label: "Washbasins, Waterclosets & Urinals",
    shortLabel: "Washbasins & WCs",
    href: "/bathware/washbasins-waterclosets-urinals",
    image: "/assets/old-site/81ghtkmBo-L._AC_UF10001000_QL80_.jpg",
    description:
      "Elegantly crafted sanitaryware — wall-hung, floor-mount, and concealed cistern options to suit every space.",
    type: "bathware",
  },
  {
    id: "countertop-basin",
    label: "Designer Countertop Basin",
    shortLabel: "Countertop Basin",
    href: "/bathware/countertop-basin",
    image: "/assets/old-site/pexels-julie-aagaard-2207894-768x1024.jpg",
    description:
      "Sculptural countertop basins that serve as a centrepiece — available in ceramic, stone-resin, and marble finishes.",
    type: "bathware",
  },
  {
    id: "standalone-basin",
    label: "Designer Standalone Basin",
    shortLabel: "Standalone Basin",
    href: "/bathware/standalone-basin",
    image: "/assets/old-site/unnamed-2.png",
    description:
      "Freestanding statement basins that define contemporary bathroom design with minimal footprint and maximum impact.",
    type: "bathware",
  },
  {
    id: "vanity-mirrors",
    label: "Vanities, Mirrors & Cabinets",
    shortLabel: "Vanity & Mirrors",
    href: "/bathware/vanity-mirrors",
    image: "/assets/old-site/dec23384735345.Y3JvcCwxMTUwLDkwMCwyNSww.jpg",
    description:
      "Bespoke vanity units with integrated storage, illuminated mirrors and medicine cabinets for the perfect morning ritual.",
    type: "bathware",
  },
  {
    id: "kitchen-sinks-faucets",
    label: "Kitchen, Faucets & Sinks",
    shortLabel: "Kitchen & Sinks",
    href: "/bathware/kitchen-sinks-faucets",
    image: "/assets/old-site/sink-1.webp",
    description:
      "Professional-grade kitchen sinks and pull-out faucets that marry culinary function with refined aesthetics.",
    type: "bathware",
  },
  {
    id: "shower-enclosures",
    label: "Shower Enclosures",
    shortLabel: "Shower Enclosures",
    href: "/bathware/shower-enclosures",
    image: "/assets/old-site/Untitled-design-19.png",
    description:
      "Frameless and semi-frameless glass enclosures transforming any bathroom corner into a private sanctuary.",
    type: "bathware",
  },
  {
    id: "booster-heat-pumps",
    label: "Booster & Heat Pumps",
    shortLabel: "Booster & Heat Pumps",
    href: "/bathware/booster-heat-pumps",
    image: "/assets/old-site/Grundfos.png",
    description:
      "High-efficiency pressure booster pumps and heat pumps ensuring consistent water pressure and temperature year-round.",
    type: "bathware",
  },
  {
    id: "water-softeners-heaters",
    label: "Water Softeners, Heater & Purifiers",
    shortLabel: "Water Softeners & Heaters",
    href: "/bathware/water-softeners-heaters",
    image: "/assets/old-site/AO-Smith.png",
    description:
      "Advanced water treatment solutions including softeners, instantaneous heaters and multi-stage purifiers.",
    type: "bathware",
  },
  {
    id: "bath-accessories",
    label: "Bathroom Accessories",
    shortLabel: "Bathroom Accessories",
    href: "/bathware/bath-accessories",
    image: "/assets/old-site/Untitled-design-12.png",
    description:
      "The finishing touches — towel rails, robe hooks, soap dispensers and toilet roll holders in premium finishes.",
    type: "bathware",
  },
  {
    id: "spa-wellness",
    label: "Spa & Wellness",
    shortLabel: "Spa & Wellness",
    href: "/bathware/spa-wellness",
    image: "/assets/old-site/massage-therapy-1731456_1280-1024x768.jpg",
    description:
      "Whirlpool bathtubs, steam generators, saunas and aromatherapy systems — your home, your retreat.",
    type: "bathware",
  },
];

export const hardwareCategories: Category[] = [
  {
    id: "door-handles",
    label: "Door Handles & Locks",
    shortLabel: "Door Handles",
    href: "/hardware",
    image: "/assets/old-site/Krishna-Home-Studio-Hardware-1-1024x576.png",
    description:
      "Architectural lever handles, mortise locks, and digital smart locks in solid brass, SS and gold finishes.",
    type: "hardware",
  },
  {
    id: "hinges-channels",
    label: "Hinges & Channels",
    shortLabel: "Hinges & Channels",
    href: "/hardware",
    image: "/assets/old-site/Krishna-Home-Studio-Hardware-5.png",
    description:
      "Concealed hinges, soft-close channels, and heavy-duty slide systems for doors, cabinets and wardrobes.",
    type: "hardware",
  },
  {
    id: "security-systems",
    label: "Security Systems",
    shortLabel: "Security Systems",
    href: "/hardware",
    image: "/assets/old-site/Krishna-Home-Studio-Hardware-1-1024x576.png",
    description:
      "Biometric access, video door phones, and CCTV-integrated entry solutions for modern homes.",
    type: "hardware",
  },
  {
    id: "safe-essentials",
    label: "Safe Essentials",
    shortLabel: "Safe Essentials",
    href: "/safe-essentials",
    image: "/assets/old-site/dec23384735345.Y3JvcCwxMTUwLDkwMCwyNSww.jpg",
    description:
      "Premium safes with reinforced construction, biometric access, mechanical locking and refined finishes for sophisticated home security.",
    type: "hardware",
  },
  {
    id: "glass-fittings",
    label: "Glass & Partition Fittings",
    shortLabel: "Glass Fittings",
    href: "/hardware",
    image: "/assets/old-site/Hafele.png",
    description:
      "Spider fittings, patch fittings, glass clamps and railing systems for open-plan office and home spaces.",
    type: "hardware",
  },
  {
    id: "cabinet-hardware",
    label: "Cabinet & Furniture Hardware",
    shortLabel: "Cabinet Hardware",
    href: "/hardware",
    image: "/assets/old-site/Krishna-Home-Studio-Hardware-5.png",
    description:
      "Knobs, pulls, lift systems, and organizers that bring order and luxury to every kitchen and wardrobe.",
    type: "hardware",
  },
];

export const allCategories = [...bathwareCategories, ...hardwareCategories];
