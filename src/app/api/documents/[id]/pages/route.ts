import { NextResponse } from "next/server";
import { createPageBody } from "@/src/types/document";

type Params = { params: { id: string } };

export async function GET(_: Request, { params }: Params) {
  const { id } = params;
  // TODO: fetch pages for document id
  return NextResponse.json({ documentId: id, items: [] });
}

export async function POST(request: Request, { params }: Params) {
  const { id } = params;
  const json = await request.json().catch(() => null);
  const parsed = createPageBody.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid body", issues: parsed.error.issues }, { status: 400 });
  }
  // TODO: create page
  return NextResponse.json({ id: "temp", documentId: id, ...parsed.data }, { status: 201 });
}


