"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="container empty-state" role="alert">
      <h1>Sayfa yüklenemedi.</h1>
      <p>Veriler alınırken bir sorun oluştu. Lütfen yeniden deneyin.</p>
      <button className="button" onClick={reset}>
        Yeniden dene
      </button>
    </div>
  );
}
