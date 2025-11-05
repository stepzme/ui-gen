import { NextResponse } from "next/server";
import { createDocumentBody } from "@/src/types/document";
import { db } from "@/src/lib/mock-db";

export async function GET() { return NextResponse.json({ items: db.listDocuments() }); }

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = createDocumentBody.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid body", issues: parsed.error.issues }, { status: 400 });
  }
  const doc = db.createDocument(parsed.data.projectId, parsed.data.name, parsed.data.slug);
  return NextResponse.json(doc, { status: 201 });
}


