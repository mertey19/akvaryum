import { SettingsEditor } from "@/components/admin/settings-editor";
import { requireAdmin } from "@/lib/admin/session";
import { readSiteContent } from "@/lib/content/store";

export default async function AdminSettings() {
  await requireAdmin();
  const { settings } = await readSiteContent();
  return (
    <>
      <h1>İşletme bilgileri ve metinler</h1>
      <SettingsEditor settings={settings} />
    </>
  );
}
