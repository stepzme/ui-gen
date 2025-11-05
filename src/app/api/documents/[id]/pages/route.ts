import { NextResponse } from "next/server";
import { createPageBody } from "@/src/types/document";
import { db } from "@/src/lib/mock-db";

type Params = { params: { id: string } };

export async function GET(_: Request, { params }: Params) {
  const { id } = params;
  return NextResponse.json({ documentId: id, items: db.listPages(id) });
}

export async function POST(request: Request, { params }: Params) {
  const { id } = params;
  const json = await request.json().catch(() => null);
  const parsed = createPageBody.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid body", issues: parsed.error.issues }, { status: 400 });
  }
  const created = db.createPage(id, parsed.data.name, parsed.data.device);
  return NextResponse.json(created, { status: 201 });
}


