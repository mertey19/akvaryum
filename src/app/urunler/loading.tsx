export default function Loading() {
  return (
    <div
      className="container section catalog-skeleton"
      role="status"
      aria-live="polite"
    >
      <div className="loading-line" />
      <p>Sayfa yükleniyor…</p>
      <div className="skeleton-heading" aria-hidden="true" />
      <div className="product-grid" aria-hidden="true">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div className="skeleton-card" key={i} />
        ))}
      </div>
    </div>
  );
}
