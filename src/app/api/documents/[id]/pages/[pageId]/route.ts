import { NextResponse } from "next/server";
import { updatePageBody } from "@/src/types/document";

type Params = { params: { id: string; pageId: string } };

export async function PATCH(request: Request, { params }: Params) {
  const json = await request.json().catch(() => null);
  const parsed = updatePageBody.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid body", issues: parsed.error.issues }, { status: 400 });
  }
  // TODO: update page
  return NextResponse.json({ id: params.pageId, documentId: params.id, ...parsed.data });
}

export async function DELETE(_: Request, { params }: Params) {
  // TODO: delete page
  return NextResponse.json({ id: params.pageId, documentId: params.id, deleted: true });
}


