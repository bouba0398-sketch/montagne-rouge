import { redirect } from "next/navigation";

// Old enrollment form → new guided flow
export default function DemandeRedirect() {
  redirect("/inscriptions/nouvelle-inscription");
}
