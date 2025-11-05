import { NextResponse } from "next/server";
import { createWorkspaceBody } from "@/src/types/document";
import { db } from "@/src/lib/mock-db";

export async function GET() { return NextResponse.json({ items: db.listWorkspaces() }); }

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = createWorkspaceBody.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid body", issues: parsed.error.issues }, { status: 400 });
  }
  const ws = db.createWorkspace(parsed.data.name);
  return NextResponse.json(ws, { status: 201 });
}


