// ============================================================
// DATA: Awards / USPs
// ============================================================

export interface Award {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export const awards: Award[] = [
  {
    id: "award-winning",
    icon: "Trophy",
    title: "Award Winning",
    description:
      "Krishna Home Studio — a top provider of sanitaryware solutions in Bengaluru — recognised for award-winning excellence, including the India Design Awards 2023.",
  },
  {
    id: "featured-in",
    icon: "Newspaper",
    title: "Featured In",
    description:
      "Featured in top publications. Honoured as a Top 10 Leadership & Entrepreneurship Institute in India for 2023 by Brandz Magazine.",
  },
  {
    id: "affordable-luxury",
    icon: "Gem",
    title: "Affordable Luxury",
    description:
      "We offer affordable luxury through top brand partnerships for your interior needs. Get the exact look your interiors deserve without breaking the bank.",
  },
  {
    id: "quality",
    icon: "ShieldCheck",
    title: "Quality Assured",
    description:
      "Quality is our core. We curate top brands — Hindware, Kohler, Grohe — for luxurious bathrooms, ensuring opulence and durability.",
  },
  {
    id: "customized-solutions",
    icon: "Settings",
    title: "Customised Solutions",
    description:
      "We understand that every client has different needs and goals, which is why we tailor our services to meet your specific requirements.",
  },
  {
    id: "after-sales",
    icon: "HeadphonesIcon",
    title: "After Sales Support",
    description:
      "Exceptional after-sales support. From installation to maintenance, rely on us for seamless experiences and lasting peace of mind.",
  },
];
