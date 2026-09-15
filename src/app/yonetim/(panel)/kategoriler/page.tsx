import { CategoriesEditor } from "@/components/admin/categories-editor";
import { requireAdmin } from "@/lib/admin/session";
import { readSiteContent } from "@/lib/content/store";

export default async function AdminCategories() {
  await requireAdmin();
  const { categories, menu, products } = await readSiteContent();
  const usage: Record<string, number> = {};
  for (const product of products)
    usage[product.categoryId] = (usage[product.categoryId] ?? 0) + 1;
  return (
    <>
      <h1>Kategoriler ve menü</h1>
      <CategoriesEditor categories={categories} menu={menu} usage={usage} />
    </>
  );
}
