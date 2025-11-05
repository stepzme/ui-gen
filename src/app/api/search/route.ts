import { NextRequest, NextResponse } from "next/server";
import { db } from "@/src/lib/mock-db";

export async function GET(request: NextRequest) {
  const q = (request.nextUrl.searchParams.get("q") || "").toLowerCase();
  const workspaceId = request.nextUrl.searchParams.get("workspaceId");
  const projects = db.listProjects().filter((p: any) => (!workspaceId || p.workspaceId === workspaceId) && p.name.toLowerCase().includes(q));
  const documents = db.listDocuments().filter((d: any) => d.name.toLowerCase().includes(q));
  return NextResponse.json({ projects, documents });
}


