"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import * as data from "@/lib/data";

// This is a placeholder - redirect to the actual editor page
export default function DocumentPage() {
  const params = useParams();
  const { data: session } = useSession();
  const documentId = params.id as string;
  
  useEffect(() => {
    // Track document view
    if (session?.user?.id && documentId) {
      data.trackDocumentView((session.user as any).id, documentId).catch(console.error);
    }
  }, [session, documentId]);
  
  // TODO: Load document and redirect to editor or show editor inline
  return (
    <div className="flex h-screen items-center justify-center bg-neutral-950 text-neutral-50">
      <div>Document Editor - {documentId}</div>
    </div>
  );
}

