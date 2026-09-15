import Image from "next/image";

export function BrandLogo({
  src,
  className = "",
  sizes,
}: {
  src: string;
  className?: string;
  sizes: string;
}) {
  return (
    <span className={`brand-logo ${className}`.trim()} aria-hidden="true">
      <Image src={src} alt="" fill sizes={sizes} />
    </span>
  );
}
