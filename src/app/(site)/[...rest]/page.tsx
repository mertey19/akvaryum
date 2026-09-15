import { notFound } from "next/navigation";

// Unknown URLs render the site's own 404 page with the header and footer.
export default function UnknownPage() {
  notFound();
}
