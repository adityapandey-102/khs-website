import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/about-prakash-chaudhary", destination: "/about/founder", permanent: true },
      { source: "/product", destination: "/bathware", permanent: true },
      { source: "/shower-faucets", destination: "/bathware/shower-faucets", permanent: true },
      { source: "/washbasins-waterclosets-urinals", destination: "/bathware/washbasins-waterclosets-urinals", permanent: true },
      { source: "/countertop-basin", destination: "/bathware/countertop-basin", permanent: true },
      { source: "/standalone-basin", destination: "/bathware/standalone-basin", permanent: true },
      { source: "/vanity-mirrors", destination: "/bathware/vanity-mirrors", permanent: true },
      { source: "/kitchen-sinks-faucets", destination: "/bathware/kitchen-sinks-faucets", permanent: true },
      { source: "/shower-enclosures", destination: "/bathware/shower-enclosures", permanent: true },
      { source: "/booster-heat-pumps", destination: "/bathware/booster-heat-pumps", permanent: true },
      { source: "/pressure-pump-water-heater", destination: "/bathware/water-softeners-heaters", permanent: true },
      { source: "/bath-accessories", destination: "/bathware/bath-accessories", permanent: true },
      { source: "/spa-wellness", destination: "/bathware/spa-wellness", permanent: true },
      { source: "/blog", destination: "/media", permanent: true },
    ];
  },
};

export default nextConfig;
