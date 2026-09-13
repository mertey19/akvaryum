import { siteConfig } from "@/lib/config";
export function StructuredData({ data }: { data: Record<string, unknown> }) {
  if (siteConfig.demo || !siteConfig.url) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          ...data,
        }).replace(/</g, "\\u003c"),
      }}
    />
  );
}
export function BreadcrumbData({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  return (
    <StructuredData
      data={{
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: `${siteConfig.url}${item.path}`,
        })),
      }}
    />
  );
}
