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
    image: "https://krishnahomestudio.com/wp-content/uploads/2024/04/shower-faucets.jpg",
    description:
      "Premium shower systems, wall-mounted faucets, rain showers and hand-held extensions engineered for a spa-like experience.",
    type: "bathware",
  },
  {
    id: "washbasins-waterclosets-urinals",
    label: "Washbasins, Waterclosets & Urinals",
    shortLabel: "Washbasins & WCs",
    href: "/bathware/washbasins-waterclosets-urinals",
    image: "https://krishnahomestudio.com/wp-content/uploads/2024/04/washbasin.jpg",
    description:
      "Elegantly crafted sanitaryware — wall-hung, floor-mount, and concealed cistern options to suit every space.",
    type: "bathware",
  },
  {
    id: "countertop-basin",
    label: "Designer Countertop Basin",
    shortLabel: "Countertop Basin",
    href: "/bathware/countertop-basin",
    image: "https://krishnahomestudio.com/wp-content/uploads/2024/04/countertop-basin.jpg",
    description:
      "Sculptural countertop basins that serve as a centrepiece — available in ceramic, stone-resin, and marble finishes.",
    type: "bathware",
  },
  {
    id: "standalone-basin",
    label: "Designer Standalone Basin",
    shortLabel: "Standalone Basin",
    href: "/bathware/standalone-basin",
    image: "https://krishnahomestudio.com/wp-content/uploads/2024/04/standalone-basin.jpg",
    description:
      "Freestanding statement basins that define contemporary bathroom design with minimal footprint and maximum impact.",
    type: "bathware",
  },
  {
    id: "vanity-mirrors",
    label: "Vanities, Mirrors & Cabinets",
    shortLabel: "Vanity & Mirrors",
    href: "/bathware/vanity-mirrors",
    image: "https://krishnahomestudio.com/wp-content/uploads/2024/04/vanity-mirrors.jpg",
    description:
      "Bespoke vanity units with integrated storage, illuminated mirrors and medicine cabinets for the perfect morning ritual.",
    type: "bathware",
  },
  {
    id: "kitchen-sinks-faucets",
    label: "Kitchen, Faucets & Sinks",
    shortLabel: "Kitchen & Sinks",
    href: "/bathware/kitchen-sinks-faucets",
    image: "https://krishnahomestudio.com/wp-content/uploads/2024/04/kitchen-sink.jpg",
    description:
      "Professional-grade kitchen sinks and pull-out faucets that marry culinary function with refined aesthetics.",
    type: "bathware",
  },
  {
    id: "shower-enclosures",
    label: "Shower Enclosures",
    shortLabel: "Shower Enclosures",
    href: "/bathware/shower-enclosures",
    image: "https://krishnahomestudio.com/wp-content/uploads/2024/04/shower-enclosure.jpg",
    description:
      "Frameless and semi-frameless glass enclosures transforming any bathroom corner into a private sanctuary.",
    type: "bathware",
  },
  {
    id: "booster-heat-pumps",
    label: "Booster & Heat Pumps",
    shortLabel: "Booster & Heat Pumps",
    href: "/bathware/booster-heat-pumps",
    image: "https://krishnahomestudio.com/wp-content/uploads/2024/04/booster-pump.jpg",
    description:
      "High-efficiency pressure booster pumps and heat pumps ensuring consistent water pressure and temperature year-round.",
    type: "bathware",
  },
  {
    id: "water-softeners-heaters",
    label: "Water Softeners, Heater & Purifiers",
    shortLabel: "Water Softeners & Heaters",
    href: "/bathware/water-softeners-heaters",
    image: "https://krishnahomestudio.com/wp-content/uploads/2024/04/water-heater.jpg",
    description:
      "Advanced water treatment solutions including softeners, instantaneous heaters and multi-stage purifiers.",
    type: "bathware",
  },
  {
    id: "bath-accessories",
    label: "Bathroom Accessories",
    shortLabel: "Bathroom Accessories",
    href: "/bathware/bath-accessories",
    image: "https://krishnahomestudio.com/wp-content/uploads/2024/04/bath-accessories.jpg",
    description:
      "The finishing touches — towel rails, robe hooks, soap dispensers and toilet roll holders in premium finishes.",
    type: "bathware",
  },
  {
    id: "spa-wellness",
    label: "Spa & Wellness",
    shortLabel: "Spa & Wellness",
    href: "/bathware/spa-wellness",
    image: "https://krishnahomestudio.com/wp-content/uploads/2024/04/spa-wellness.jpg",
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
    image: "https://krishnahomestudio.com/wp-content/uploads/2024/04/door-handle.jpg",
    description:
      "Architectural lever handles, mortise locks, and digital smart locks in solid brass, SS and gold finishes.",
    type: "hardware",
  },
  {
    id: "hinges-channels",
    label: "Hinges & Channels",
    shortLabel: "Hinges & Channels",
    href: "/hardware",
    image: "https://krishnahomestudio.com/wp-content/uploads/2024/04/hinges.jpg",
    description:
      "Concealed hinges, soft-close channels, and heavy-duty slide systems for doors, cabinets and wardrobes.",
    type: "hardware",
  },
  {
    id: "security-systems",
    label: "Security Systems",
    shortLabel: "Security Systems",
    href: "/hardware",
    image: "https://krishnahomestudio.com/wp-content/uploads/2024/04/security.jpg",
    description:
      "Biometric access, video door phones, and CCTV-integrated entry solutions for modern homes.",
    type: "hardware",
  },
  {
    id: "glass-fittings",
    label: "Glass & Partition Fittings",
    shortLabel: "Glass Fittings",
    href: "/hardware",
    image: "https://krishnahomestudio.com/wp-content/uploads/2024/04/glass-fittings.jpg",
    description:
      "Spider fittings, patch fittings, glass clamps and railing systems for open-plan office and home spaces.",
    type: "hardware",
  },
  {
    id: "cabinet-hardware",
    label: "Cabinet & Furniture Hardware",
    shortLabel: "Cabinet Hardware",
    href: "/hardware",
    image: "https://krishnahomestudio.com/wp-content/uploads/2024/04/cabinet-hardware.jpg",
    description:
      "Knobs, pulls, lift systems, and organizers that bring order and luxury to every kitchen and wardrobe.",
    type: "hardware",
  },
];

export const allCategories = [...bathwareCategories, ...hardwareCategories];
