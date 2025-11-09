"use client";

import { useState, useRef, useEffect } from "react";
import { useDeletePage, useUpdatePage } from "@/hooks/api";

interface PageListItemProps {
  documentId: string;
  page: { id: string; name: string };
  isSelected?: boolean;
  onSelect?: (pageId: string) => void;
}

export function PageListItem({ documentId, page, isSelected, onSelect }: PageListItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(page.name);
  const inputRef = useRef<HTMLInputElement>(null);
  const updatePage = useUpdatePage(documentId, page.id);
  const deletePage = useDeletePage(documentId, page.id);

  useEffect(() => {
    if (isEditing && inputRef.current) inputRef.current.focus();
  }, [isEditing]);

  function handleSave() {
    if (name.trim() && name !== page.name) {
      updatePage.mutate({ name: name.trim() });
    }
    setIsEditing(false);
  }

  function handleCancel() {
    setName(page.name);
    setIsEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") handleCancel();
  }

  function handleDelete(e: React.MouseEvent) {
    e.stopPropagation();
    if (confirm(`Delete page "${page.name}"?`)) deletePage.mutate();
  }

  return (
    <div
      className={`group flex items-center gap-1 rounded px-2 py-1 text-sm hover:bg-background-secondary ${isSelected ? "bg-background-secondary" : ""}`}
      role="button"
      tabIndex={0}
      onClick={() => onSelect?.(page.id)}
      onDoubleClick={() => setIsEditing(true)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onSelect?.(page.id);
        if (e.key === "F2") setIsEditing(true);
      }}
      aria-label={`Select page ${page.name}`}
    >
      {isEditing ? (
        <input
          ref={inputRef}
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          className="flex-1 rounded bg-background-secondary px-1 py-0.5 text-sm text-foreground-primary outline-none focus:ring-2 focus:ring-ring-brand"
          aria-label="Edit page name"
        />
      ) : (
        <>
          <span className="flex-1 truncate text-foreground-primary">{page.name}</span>
          <button
            onClick={handleDelete}
            className="opacity-0 group-hover:opacity-100 rounded px-1 py-0.5 text-xs text-foreground-secondary hover:bg-background-secondary outline-none focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-ring-brand"
            aria-label={`Delete page ${page.name}`}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") handleDelete(e as any);
            }}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
}

