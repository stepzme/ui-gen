import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function requireSession() {
  const session = await getServerSession(authOptions as any);
  if (!session) {
    return null;
  }
  return session as any;
}

export function canWriteFromSession(session: any): boolean {
  const role = (session as any)?.role || "VIEWER";
  return role === "OWNER" || role === "ADMIN" || role === "EDITOR";
}

export function getSessionUserId(session: any): string {
  // Use UUID from user.id as primary identifier
  return (session as any)?.user?.id || "";
}

