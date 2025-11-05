import { NextResponse } from "next/server";
import { createProjectBody } from "@/src/types/document";
import { db } from "@/src/lib/mock-db";
import { requireSession } from "@/src/app/api/_util/auth";

export async function GET() { return NextResponse.json({ items: db.listProjects() }); }

export async function POST(request: Request) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const json = await request.json().catch(() => null);
  const parsed = createProjectBody.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid body", issues: parsed.error.issues }, { status: 400 });
  }
  const pr = db.createProject(parsed.data.workspaceId, parsed.data.name);
  return NextResponse.json(pr, { status: 201 });
}


