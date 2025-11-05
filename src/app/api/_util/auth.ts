import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";

export async function requireSession() {
  const session = await getServerSession(authOptions as any);
  if (!session) {
    return null;
  }
  return session as any;
}


