import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
    ],
  },
  async headers() {
    return [
      {
        source: "/yonetim/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
  async redirects() {
    const oldGuides = [
      "ankara-merkez-ilcelerinde-akvaryum-planlama",
      "etimesgut-sincan-kahramankazan-pursaklar-akvaryum-rehberi",
      "akyurt-cubuk-kalecik-akvaryum-secimi",
      "ayas-beypazari-gudul-nallihan-akvaryum-planlama",
      "bala-evren-golbasi-haymana-polatli-sereflikochisar-akvaryum",
      "camlidere-elmadag-kizilcahamam-akvaryum-kurulumu",
    ];
    return oldGuides.map((slug) => ({
      source: `/rehber/${slug}`,
      destination: "/rehber#ankara-ilce-rehberleri",
      permanent: true,
    }));
  },
};

export default nextConfig;
