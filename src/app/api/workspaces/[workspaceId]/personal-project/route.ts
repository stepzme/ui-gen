import { NextResponse } from "next/server";
import * as data from "@/lib/data";
import { requireSession, getSessionUserId } from "@/lib/auth/auth-util";

type Params = { params: Promise<{ workspaceId: string }> };

export async function GET(request: Request, { params }: Params) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
  const { workspaceId } = await params;
  const userId = getSessionUserId(session);
  
  try {
    const personalProject = await data.getPersonalProject(workspaceId, userId);
    return NextResponse.json(personalProject);
  } catch (error: any) {
    if (error.message === "User is not a member of this workspace") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

