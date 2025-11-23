import { NextResponse } from "next/server";
import * as data from "@/lib/data";
import { requireSession, getSessionUserId } from "@/lib/auth/auth-util";

type Params = { params: Promise<{ workspaceId: string }> };

export async function GET(request: Request, { params }: Params) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
  const { workspaceId } = await params;
  const userId = getSessionUserId(session);
  
  const url = new URL(request.url);
  const limit = parseInt(url.searchParams.get("limit") || "16");
  const offset = parseInt(url.searchParams.get("offset") || "0");
  
  const recent = await data.getRecentDocuments(userId, workspaceId, limit, offset);
  
  // Add user role for each document (canMove if OWNER)
  const recentWithRole = await Promise.all(
    recent.map(async (doc: any) => {
      const docRole = await data.getProjectRole(doc.projectId, userId);
      return {
        ...doc,
        userRole: docRole,
        canMove: docRole === 'OWNER'
      };
    })
  );
  
  return NextResponse.json({ items: recentWithRole, hasMore: recent.length === limit });
}

