export interface NewsItem {
  id: string;
  publication: string;
  description: string;
  url: string;
  logo?: string;
}

export const newsItems: NewsItem[] = [
  {
    id: "the-print",
    publication: "The Print",
    description:
      "India's digital platform for the latest news and reports - Blindwink unveils the awardees of the 5th Edition of India Design Awards 2023.",
    url: "https://theprint.in/ani-press-releases/blindwink-unveils-the-awardees-of-the-5th-edition-of-india-design-awards-2023/1536884/",
    logo: "/assets/old-site/download-1.png",
  },
  {
    id: "daily-hunt",
    publication: "Daily Hunt",
    description:
      "A one-click platform for the latest updates on all trending topics - Blindwink unveils the awardees of India Design Awards 2023.",
    url: "https://m.dailyhunt.in/news/india/english/ani67917250816496966-epaper-anieng/blindwink+unveils+the+awardees+of+the+5th+edition+of+india+design+awards+2023-newsid-n493309094",
    logo: "/assets/old-site/download-2.png",
  },
  {
    id: "business-standard",
    publication: "Business Standard",
    description:
      "Publisher of India's leading business daily - Blindwink unveils the awardees of the 5th Edition of India Design Awards 2023.",
    url: "https://www.business-standard.com/amp/content/press-releases-ani/blindwink-unveils-the-awardees-of-the-5th-edition-of-india-design-awards-2023-123042400875_1.html",
    logo: "/assets/old-site/download-3.png",
  },
  {
    id: "ani-news",
    publication: "ANI News",
    description:
      "South Asia's Leading Multimedia News Agency - Blindwink unveils the awardees of India Design Awards 2023.",
    url: "https://aninews.in/news/business/business/blindwink-unveils-the-awardees-of-the-5th-edition-of-india-design-awards-202320230424183435/",
    logo: "/assets/old-site/download-7.png",
  },
];
