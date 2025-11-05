import { NextResponse } from "next/server";
import { createProjectBody } from "@/src/types/document";

export async function GET() {
  return NextResponse.json({ items: [] });
}

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = createProjectBody.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid body", issues: parsed.error.issues }, { status: 400 });
  }
  return NextResponse.json({ id: "temp", ...parsed.data }, { status: 201 });
}


