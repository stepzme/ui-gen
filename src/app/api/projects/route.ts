import { NextResponse } from "next/server";
import { createProjectBody } from "@/src/types/document";
import { db } from "@/src/lib/mock-db";

export async function GET() { return NextResponse.json({ items: db.listProjects() }); }

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = createProjectBody.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid body", issues: parsed.error.issues }, { status: 400 });
  }
  const pr = db.createProject(parsed.data.workspaceId, parsed.data.name);
  return NextResponse.json(pr, { status: 201 });
}


