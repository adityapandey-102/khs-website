import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import WhatsAppButton from "@/components/WhatsAppButton/WhatsAppButton";

export const metadata: Metadata = {
  title: {
    default: "Krishna Home Studio | Premium Bathware & Hardware, Bengaluru",
    template: "%s | Krishna Home Studio",
  },
  description:
    "Bengaluru's trusted destination for premium bathroom fittings, sanitaryware, vanities, hardware and spa solutions. Discover luxury that's affordable at Krishna Home Studio.",
  keywords:
    "bathware, bathroom fittings, sanitaryware, vanity, shower, faucets, hardware, Bengaluru, Krishna Home Studio",
  openGraph: {
    siteName: "Krishna Home Studio",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://krishnahomestudio.com/wp-content/uploads/2024/04/cropped-khs-logo.webp",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
