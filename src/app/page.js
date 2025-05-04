// app/page.tsx (or wherever your root route is defined)
import { redirect } from "next/navigation";

export default function Root() {
  redirect("/specialties/general-physician-internal-medicine");
}
