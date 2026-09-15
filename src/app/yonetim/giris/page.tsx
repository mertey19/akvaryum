import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/login-form";
import { adminConfigured, isAdmin } from "@/lib/admin/session";

export default async function LoginPage() {
  if (await isAdmin()) redirect("/yonetim");
  return (
    <main className="admin-login">
      <div className="admin-card">
        <span className="eyebrow">DSN AKVARYUM</span>
        <h1>Yönetim paneli</h1>
        {adminConfigured() ? (
          <LoginForm />
        ) : (
          <p className="admin-error">
            Giriş kapalı: Vercel ortam değişkenlerine ADMIN_PASSWORD eklenip
            site yeniden yayınlanmalı.
          </p>
        )}
      </div>
    </main>
  );
}
