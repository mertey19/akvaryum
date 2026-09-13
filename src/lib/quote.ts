export function grossVolume(
  width: number,
  depth: number,
  height: number,
  min = 10,
  max = 300,
) {
  if (
    [width, depth, height].some(
      (v) => !Number.isFinite(v) || v < min || v > max,
    )
  )
    return null;
  return (width * depth * height) / 1000;
}
export function whatsappLink(phone: string, message: string) {
  const clean = phone.replace(/[\s+()-]/g, "");
  return /^\d{10,15}$/.test(clean)
    ? `https://wa.me/${clean}?text=${encodeURIComponent(message)}`
    : null;
}
