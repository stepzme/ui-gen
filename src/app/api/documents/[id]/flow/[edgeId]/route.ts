import { NextResponse } from "next/server";
import * as data from "@/lib/data";
import { canWriteFromSession, requireSession } from "@/lib/auth-util";

type Params = { params: Promise<{ id: string; edgeId: string }> };

export async function DELETE(_: Request, { params }: Params) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!canWriteFromSession(session)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { id, edgeId } = await params;
  await data.deleteFlowEdge(id, edgeId);
  return NextResponse.json({ id: edgeId, deleted: true });
}


