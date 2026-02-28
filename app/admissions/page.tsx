import { redirect } from "next/navigation";

// Canonical URL is now /inscriptions — keep old URL alive for SEO / bookmarks
export default function AdmissionsRedirect() {
  redirect("/inscriptions");
}
