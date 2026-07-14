export interface NewsItem {
  id: string;
  publication: string;
  description: string;
  url: string;
  logo?: string;
  highlight?: string;
}

export const newsItems: NewsItem[] = [
  {
    id: "the-print",
    publication: "The Print",
    description:
      "Krishna Home Studio featured in national coverage for its award-winning contribution to premium interior design and curated living spaces.",
    url: "https://theprint.in/ani-press-releases/blindwink-unveils-the-awardees-of-the-5th-edition-of-india-design-awards-2023/1536884/",
    logo: "/assets/old-site/download-1.png",
    highlight: "Award recognition",
  },
  {
    id: "daily-hunt",
    publication: "Daily Hunt",
    description:
      "A digital-first platform spotlighting the studio’s recognition in the India Design Awards and its growing influence in luxury fittings.",
    url: "https://m.dailyhunt.in/news/india/english/ani67917250816496966-epaper-anieng/blindwink+unveils+the+awardees+of+the+5th+edition+of+india+design+awards+2023-newsid-n493309094",
    logo: "/assets/old-site/download-2.png",
    highlight: "Design feature",
  },
  {
    id: "business-standard",
    publication: "Business Standard",
    description:
      "The studio’s growing presence in high-end architectural hardware and bathware was highlighted in business media coverage.",
    url: "https://www.business-standard.com/amp/content/press-releases-ani/blindwink-unveils-the-awardees-of-the-5th-edition-of-india-design-awards-2023-123042400875_1.html",
    logo: "/assets/old-site/download-3.png",
    highlight: "Business spotlight",
  },
  {
    id: "ani-news",
    publication: "ANI News",
    description:
      "Regional and national media celebrated the studio’s recognition in the luxury design sphere and its footprint across premium interiors.",
    url: "https://aninews.in/news/business/business/blindwink-unveils-the-awardees-of-the-5th-edition-of-india-design-awards-2023-20230424183435/",
    logo: "/assets/old-site/download-7.png",
    highlight: "Media feature",
  },
  {
    id: "design-awards",
    publication: "India Design Awards",
    description:
      "A milestone recognition that positioned Krishna Home Studio among the most admired names in contemporary interior solutions.",
    url: "https://www.indiadesignawards.com/",
    logo: "/assets/old-site/WhatsApp-Image-2024-05-18-at-5.51.39-PM.jpeg",
    highlight: "Industry accolade",
  },
];
