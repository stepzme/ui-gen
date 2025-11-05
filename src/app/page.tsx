import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import * as data from "@/lib/data";

export default async function Home() {
  const session = await getServerSession(authOptions as any);
  if (!session) {
    redirect("/login");
  }
  
  const userId = (session as any)?.user?.id;
  if (!userId) {
    redirect("/login");
  }
  
  // Check if user has workspaces
  const workspaces = await data.listWorkspacesForUser(userId);
  if (workspaces.length === 0) {
    // No workspaces - will show create workspace form
    redirect("/workspace/new");
  }
  
  // Redirect to first workspace dashboard
  redirect(`/workspace/${workspaces[0].id}`);
}