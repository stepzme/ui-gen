import { NextResponse } from "next/server";
import * as data from "@/lib/data";
import { requireSession, getSessionUserId } from "@/lib/auth-util";

type Params = { params: Promise<{ id: string }> };

export async function POST(request: Request, { params }: Params) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
  const { id: documentId } = await params;
  const userId = getSessionUserId(session);
  
  // Track document view
  await data.trackDocumentView(userId, documentId);
  
  return NextResponse.json({ ok: true });
}

