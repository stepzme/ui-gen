import { NextResponse } from "next/server";
import { db } from "@/src/lib/mock-db";
import { requireSession } from "@/src/app/api/_util/auth";

type Params = { params: { id: string; edgeId: string } };

export async function DELETE(_: Request, { params }: Params) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  db.deleteFlowEdge(params.id, params.edgeId);
  return NextResponse.json({ id: params.edgeId, deleted: true });
}


