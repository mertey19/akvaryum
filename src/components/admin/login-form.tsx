"use client";
import { useActionState } from "react";
import { login } from "@/app/yonetim/actions";

export function LoginForm() {
  const [state, action, pending] = useActionState(login, null);
  return (
    <form action={action} className="admin-form">
      <label className="admin-field">
        <span>Şifre</span>
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          required
        />
      </label>
      <button className="button" disabled={pending}>
        {pending ? "Giriş yapılıyor…" : "Giriş yap"}
      </button>
      {state && !state.ok && (
        <p role="alert" className="admin-error">
          {state.message}
        </p>
      )}
    </form>
  );
}
