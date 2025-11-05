import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";

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
  return (session as any)?.user?.id || (session as any)?.user?.email || "";
}


