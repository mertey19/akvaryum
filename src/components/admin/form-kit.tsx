"use client";
import { useActionState } from "react";
import type { ActionState } from "@/app/yonetim/actions";

type SaveAction = (
  state: ActionState,
  formData: FormData,
) => Promise<ActionState>;

export function SaveForm({
  action,
  payload,
  hidden = {},
  submitLabel = "Kaydet",
  children,
}: {
  action: SaveAction;
  payload: unknown;
  hidden?: Record<string, string>;
  submitLabel?: string;
  children: React.ReactNode;
}) {
  const [state, formAction, pending] = useActionState(action, null);
  return (
    <form action={formAction} className="admin-form">
      <input type="hidden" name="payload" value={JSON.stringify(payload)} />
      {Object.entries(hidden).map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} />
      ))}
      {children}
      <div className="admin-savebar">
        <button className="button" disabled={pending}>
          {pending ? "Kaydediliyor…" : submitLabel}
        </button>
        {state && !pending && (
          <p role="status" className={state.ok ? "admin-ok" : "admin-error"}>
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}

export function ConfirmForm({
  action,
  fields,
  message,
  label,
}: {
  action: (formData: FormData) => Promise<void>;
  fields: Record<string, string>;
  message: string;
  label: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!window.confirm(message)) e.preventDefault();
      }}
    >
      {Object.entries(fields).map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} />
      ))}
      <button className="admin-danger">{label}</button>
    </form>
  );
}

type FieldBase = { label: string; hint?: string };

export function TextInput({
  label,
  hint,
  value,
  onChange,
  ...rest
}: FieldBase & {
  value: string;
  onChange: (value: string) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">) {
  return (
    <label className="admin-field">
      <span>{label}</span>
      <input {...rest} value={value} onChange={(e) => onChange(e.target.value)} />
      {hint && <small>{hint}</small>}
    </label>
  );
}

export function TextArea({
  label,
  hint,
  value,
  onChange,
  rows = 3,
}: FieldBase & {
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}) {
  return (
    <label className="admin-field">
      <span>{label}</span>
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {hint && <small>{hint}</small>}
    </label>
  );
}

export function Select({
  label,
  hint,
  value,
  onChange,
  options,
}: FieldBase & {
  value: string;
  onChange: (value: string) => void;
  options: ReadonlyArray<readonly [string, string]>;
}) {
  return (
    <label className="admin-field">
      <span>{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map(([optionValue, optionLabel]) => (
          <option key={optionValue} value={optionValue}>
            {optionLabel}
          </option>
        ))}
      </select>
      {hint && <small>{hint}</small>}
    </label>
  );
}

export function Checkbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="admin-check">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      {label}
    </label>
  );
}

export type ItemAction = "up" | "down" | "remove";

export function applyItemAction<T>(list: T[], index: number, action: ItemAction) {
  if (action === "remove") return list.filter((_, i) => i !== index);
  const target = action === "up" ? index - 1 : index + 1;
  if (target < 0 || target >= list.length) return list;
  const next = [...list];
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}

export function ItemControls({
  index,
  count,
  label,
  onAction,
}: {
  index: number;
  count: number;
  label: string;
  onAction: (action: ItemAction) => void;
}) {
  return (
    <div className="admin-controls">
      <button
        type="button"
        aria-label={`${label} yukarı taşı`}
        disabled={index === 0}
        onClick={() => onAction("up")}
      >
        ↑
      </button>
      <button
        type="button"
        aria-label={`${label} aşağı taşı`}
        disabled={index === count - 1}
        onClick={() => onAction("down")}
      >
        ↓
      </button>
      <button
        type="button"
        aria-label={`${label} kaldır`}
        onClick={() => onAction("remove")}
      >
        Kaldır
      </button>
    </div>
  );
}

export function StringList({
  label,
  hint,
  values,
  onChange,
  multiline = false,
  addLabel,
}: FieldBase & {
  values: string[];
  onChange: (values: string[]) => void;
  multiline?: boolean;
  addLabel: string;
}) {
  const setAt = (index: number, value: string) =>
    onChange(values.map((v, i) => (i === index ? value : v)));
  return (
    <fieldset>
      <legend>{label}</legend>
      {hint && <p className="admin-hint">{hint}</p>}
      {values.map((value, index) => (
        <div className="admin-list-item" key={index}>
          {multiline ? (
            <textarea
              aria-label={`${label} ${index + 1}`}
              rows={3}
              value={value}
              onChange={(e) => setAt(index, e.target.value)}
            />
          ) : (
            <input
              aria-label={`${label} ${index + 1}`}
              value={value}
              onChange={(e) => setAt(index, e.target.value)}
            />
          )}
          <ItemControls
            index={index}
            count={values.length}
            label={`${label} ${index + 1}`}
            onAction={(action) =>
              onChange(applyItemAction(values, index, action))
            }
          />
        </div>
      ))}
      <button
        type="button"
        className="admin-add"
        onClick={() => onChange([...values, ""])}
      >
        {addLabel}
      </button>
    </fieldset>
  );
}
