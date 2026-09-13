import Image from "next/image";
import { siteConfig } from "@/lib/config";

export function BrandLogo({
  className = "",
  sizes,
}: {
  className?: string;
  sizes: string;
}) {
  return (
    <span className={`brand-logo ${className}`.trim()} aria-hidden="true">
      <Image src={siteConfig.logoPath} alt="" fill sizes={sizes} />
    </span>
  );
}
