import { NextRequest, NextResponse } from "next/server";
import * as data from "@/lib/data";
import { requireSession } from "@/lib/auth/auth-util";
import { PrismaClient } from "@/generated/prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const q = (request.nextUrl.searchParams.get("q") || "").toLowerCase();
  const workspaceId = request.nextUrl.searchParams.get("workspaceId") || undefined;
  const userId = (session as any).user?.id || (session as any).user?.email || '';
  const projectsAll = await data.listProjectsForUser(userId);
  const documentsAll = await data.listDocumentsForUser(userId);
  
  // Filter projects
  const filteredProjects = projectsAll.filter((p: any) => (!workspaceId || p.workspaceId === workspaceId) && p.name.toLowerCase().includes(q));
  
  // Get document counts for projects
  const projectIds = filteredProjects.map((p: any) => p.id);
  const documentCounts = projectIds.length > 0
    ? await prisma.document.groupBy({
        by: ['projectId'],
        where: { projectId: { in: projectIds } },
        _count: { id: true },
      })
    : [];
  const documentCountsMap = new Map(documentCounts.map(d => [d.projectId, d._count.id]));
  
  const projects = filteredProjects.map((p: any) => ({
    id: p.id,
    name: p.name,
    workspaceId: p.workspaceId,
    documentCount: documentCountsMap.get(p.id) || 0,
  }));
  
  // Filter documents - they already have projectName from listDocumentsForUser
  const documents = documentsAll.filter((d: any) => d.name.toLowerCase().includes(q)).map((d: any) => ({
    id: d.id,
    name: d.name,
    projectId: d.projectId,
    projectName: d.projectName,
  }));
  
  return NextResponse.json({ projects, documents });
}


