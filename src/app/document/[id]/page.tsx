"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

// Reuse the existing editor component by redirecting to old route structure
export default function DocumentPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const documentId = params.id as string;
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Track document view via API
    if (session?.user?.id && documentId) {
      fetch(`/api/documents/${documentId}/track-view`, { method: "POST" }).catch(console.error);
    }
    
    // Fetch document to get workspace/project IDs for redirect
    fetch(`/api/documents/${documentId}`)
      .then(res => res.json())
      .then((doc: any) => {
        if (doc.workspaceId && doc.projectId) {
          // Redirect to old route structure that has the editor
          router.replace(`/${doc.workspaceId}/${doc.projectId}/${documentId}`);
        } else {
          setLoading(false);
        }
      })
      .catch(() => setLoading(false));
  }, [session, documentId, router]);
  
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background-primary text-foreground-primary">
        <div>Loading...</div>
      </div>
    );
  }
  
  return (
    <div className="flex h-screen items-center justify-center bg-background-primary text-foreground-primary">
      <div>Document not found or access denied</div>
    </div>
  );
}

