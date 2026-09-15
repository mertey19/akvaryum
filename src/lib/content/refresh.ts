import { revalidatePath, updateTag } from "next/cache";
import { CONTENT_TAG } from "../repository";

// Server Actions only: expire cached content immediately and rebuild every page.
export function refreshSiteContent() {
  updateTag(CONTENT_TAG);
  revalidatePath("/", "layout");
}
