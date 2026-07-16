export interface NewsItem {
  id: string;
  publication: string;
  description: string;
  url?: string;
  logo?: string;
  highlight?: string;
}

// Real, verified press/recognition items only. The four wire-service items
// below have confirmed real article URLs (about the India Design Awards
// 2023). The four "recognition" items below them have verified real logos
// from the actual old-site media library — where no specific verified
// article URL exists for one, `url` is simply omitted rather than guessed.
export const newsItems: NewsItem[] = [
  {
    id: "siliconindia",
    publication: "SiliconIndia StartupCity",
    description:
      "Krishna Home Studio was profiled by siliconindia StartupCity Magazine and recognised in its \"10 Best Interior Design Startups 2023\" listing, featuring founder Prakash Choudhary.",
    url: "/assets/khs/media-press/0002-scaled.jpg",
    logo: "/assets/khs/home/5-2.png",
    highlight: "10 Best Interior Design Startups 2023",
  },
  {
    id: "india-design-award",
    publication: "India Design Award",
    description:
      "Krishna Home Studio was recognised among the awardees of the 5th edition of the India Design Awards 2023.",
    url: "https://www.indiadesignawards.com/",
    logo: "/assets/khs/unassociated/Untitled-design-12.png",
    highlight: "India Design Awards 2023",
  },
  {
    id: "brandz-magazine",
    publication: "Brandz Magazine",
    description:
      "Krishna Home Studio was honoured as a Top 10 Leadership & Entrepreneurship Institute in India for 2023 by Brandz Magazine.",
    logo: "/assets/khs/home/3-2.png",
    highlight: "Top 10 Leadership & Entrepreneurship Institute",
  },
  {
    id: "india-founder-magazine",
    publication: "India Founder Magazine",
    description:
      "Founder Prakash Choudhary and Krishna Home Studio's growth story were featured in India Founder Magazine.",
    logo: "/assets/khs/unassociated/Untitled-design-5-1.png",
    highlight: "Founder feature",
  },
  {
    id: "the-print",
    publication: "The Print",
    description:
      "National coverage of the India Design Awards 2023, in which Krishna Home Studio was recognised among the awardees.",
    url: "https://theprint.in/ani-press-releases/blindwink-unveils-the-awardees-of-the-5th-edition-of-india-design-awards-2023/1536884/",
  },
  {
    id: "daily-hunt",
    publication: "Daily Hunt",
    description:
      "Digital-first coverage of the India Design Awards 2023 announcement, in which Krishna Home Studio was recognised among the awardees.",
    url: "https://m.dailyhunt.in/news/india/english/ani67917250816496966-epaper-anieng/blindwink+unveils+the+awardees+of+the+5th+edition+of+india+design+awards+2023-newsid-n493309094",
  },
  {
    id: "business-standard",
    publication: "Business Standard",
    description:
      "Business media coverage of the India Design Awards 2023 announcement, in which Krishna Home Studio was recognised among the awardees.",
    url: "https://www.business-standard.com/amp/content/press-releases-ani/blindwink-unveils-the-awardees-of-the-5th-edition-of-india-design-awards-2023-123042400875_1.html",
  },
  {
    id: "ani-news",
    publication: "ANI News",
    description:
      "National wire coverage of the India Design Awards 2023 announcement, in which Krishna Home Studio was recognised among the awardees.",
    url: "https://aninews.in/news/business/business/blindwink-unveils-the-awardees-of-the-5th-edition-of-india-design-awards-2023-20230424183435/",
  },
];
