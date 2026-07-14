// ============================================================
// DATA: Navigation
// ============================================================

export interface NavSubItem {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavSubItem[];
}

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "About Us", href: "/about" },
      { label: "About Founder", href: "/about/founder" },
    ],
  },
  {
    label: "Bathware",
    href: "/bathware",
    children: [
      { label: "Shower, Faucets & Extensions", href: "/bathware/shower-faucets" },
      { label: "Washbasins, Waterclosets & Urinals", href: "/bathware/washbasins-waterclosets-urinals" },
      { label: "Designer Countertop Basin", href: "/bathware/countertop-basin" },
      { label: "Designer Standalone Basin", href: "/bathware/standalone-basin" },
      { label: "Vanities, Mirrors & Cabinets", href: "/bathware/vanity-mirrors" },
      { label: "Kitchen, Faucets & Sinks", href: "/bathware/kitchen-sinks-faucets" },
      { label: "Shower Enclosures", href: "/bathware/shower-enclosures" },
      { label: "Booster & Heat Pumps", href: "/bathware/booster-heat-pumps" },
      { label: "Water Softeners, Heater & Purifiers", href: "/bathware/water-softeners-heaters" },
      { label: "Bathroom Accessories", href: "/bathware/bath-accessories" },
      { label: "Spa & Wellness", href: "/bathware/spa-wellness" },
    ],
  },
  { label: "Hardware", href: "/hardware" },
  { label: "Clientele", href: "/clientele" },
  { label: "Media", href: "/media" },
  { label: "Contact", href: "/contact" },
];
