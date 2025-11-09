import { NextResponse } from "next/server";
import * as data from "@/lib/data";
import { requireSession, getSessionUserId } from "@/lib/auth/auth-util";

type Params = { params: Promise<{ workspaceId: string }> };

export async function GET(request: Request, { params }: Params) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
  const { workspaceId } = await params;
  const userId = getSessionUserId(session);
  
  const projects = await data.getWorkspaceProjects(workspaceId, userId);
  return NextResponse.json({ items: projects });
}

