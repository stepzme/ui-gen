import { NextResponse } from "next/server";
import * as data from "@/lib/data";
import { requireSession, getSessionUserId } from "@/lib/auth/auth-util";

export async function GET(request: Request) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
  const userId = getSessionUserId(session);
  const favorites = await data.getFavoritesWithDetails(userId);
  
  return NextResponse.json(favorites);
}

export async function POST(request: Request) {
  try {
    const session = await requireSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    
    const userId = getSessionUserId(session);
    const json = await request.json().catch(() => null);
    
    if (!json || !json.entityType || !json.entityId) {
      return NextResponse.json({ error: "Invalid body. entityType and entityId required" }, { status: 400 });
    }
    
    // Check if it's a personal project - don't allow adding to favorites
    if (json.entityType === "PROJECT") {
      const project = await data.getProjectById(json.entityId);
      if (project?.isPersonal) {
        return NextResponse.json({ error: "Cannot add personal project to favorites" }, { status: 400 });
      }
    }
    
    await data.addFavorite(userId, json.entityType, json.entityId);
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error: any) {
    console.error("Failed to add favorite:", error);
    return NextResponse.json({ error: error.message || "Failed to add favorite" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await requireSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    
    const userId = getSessionUserId(session);
    const json = await request.json().catch(() => null);
    
    if (!json || !json.entityType || !json.entityId) {
      return NextResponse.json({ error: "Invalid body. entityType and entityId required" }, { status: 400 });
    }
    
    await data.removeFavorite(userId, json.entityType, json.entityId);
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error("Failed to remove favorite:", error);
    return NextResponse.json({ error: error.message || "Failed to remove favorite" }, { status: 500 });
  }
}

