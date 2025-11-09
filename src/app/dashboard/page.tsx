import { redirect } from "next/navigation";

export default function DashboardPage() {
  // Redirect to home page which will handle workspace routing
  redirect("/");
}


