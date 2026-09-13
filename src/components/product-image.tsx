import Image from "next/image";
export function ProductImage({
  tile,
  alt,
  className = "",
  src,
}: {
  tile: number;
  alt: string;
  className?: string;
  src?: string;
}) {
  if (src && src !== "/images/products.webp")
    return (
      <Image
        className={`product-photo ${className}`}
        src={src}
        alt={alt}
        width={640}
        height={640}
        sizes="(max-width: 767px) 50vw, 33vw"
      />
    );
  return (
    <div
      role="img"
      aria-label={alt}
      className={`product-image tile-${tile} ${className}`}
      style={{
        backgroundPosition: `${(tile % 3) * 50}% ${Math.floor(tile / 3) * 100}%`,
      }}
    />
  );
}
