import { NextRequest, NextResponse } from "next/server";
import * as data from "@/lib/data";
import { requireSession } from "@/lib/auth/auth-util";

export async function GET(request: NextRequest) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const q = (request.nextUrl.searchParams.get("q") || "").toLowerCase();
  const workspaceId = request.nextUrl.searchParams.get("workspaceId") || undefined;
  const userId = (session as any).user?.id || (session as any).user?.email || '';
  const projectsAll = await data.listProjectsForUser(userId);
  const documentsAll = await data.listDocumentsForUser(userId);
  const projects = projectsAll.filter((p: any) => (!workspaceId || p.workspaceId === workspaceId) && p.name.toLowerCase().includes(q));
  const documents = documentsAll.filter((d: any) => d.name.toLowerCase().includes(q));
  return NextResponse.json({ projects, documents });
}


