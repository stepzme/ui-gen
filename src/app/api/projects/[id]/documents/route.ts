import { NextResponse } from "next/server";
import * as data from "@/lib/data";
import { requireSession, getSessionUserId } from "@/lib/auth/auth-util";

type Params = { params: Promise<{ id: string }> };

export async function GET(request: Request, { params }: Params) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
  const { id: projectId } = await params;
  const userId = getSessionUserId(session);
  
  // Check if user has access to project
  const role = await data.getProjectRole(projectId, userId);
  if (!role) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  
  // Get all documents in project
  const documents = await data.listDocumentsForUser(userId);
  const projectDocuments = documents.filter((d: any) => d.projectId === projectId);
  
  return NextResponse.json({ items: projectDocuments });
}

