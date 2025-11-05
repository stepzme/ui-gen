import { NextResponse } from "next/server";
import * as data from "@/lib/data";
import { canWriteFromSession, requireSession } from "@/lib/auth-util";

type Params = { params: { id: string; edgeId: string } };

export async function DELETE(_: Request, { params }: Params) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!canWriteFromSession(session)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  await data.deleteFlowEdge(params.id, params.edgeId);
  return NextResponse.json({ id: params.edgeId, deleted: true });
}


