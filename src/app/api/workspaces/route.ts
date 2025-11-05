import { NextResponse } from "next/server";
import { z } from "zod";
import { createWorkspaceBody } from "@/src/types/document";

export async function GET() {
  // TODO: fetch from DB
  return NextResponse.json({ items: [] });
}

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = createWorkspaceBody.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid body", issues: parsed.error.issues }, { status: 400 });
  }
  // TODO: create in DB
  return NextResponse.json({ id: "temp", name: parsed.data.name }, { status: 201 });
}


