"use client";

import React, { useState, useEffect, useRef } from "react";

interface InlineEditorProps {
  value: string;
  onSave: (newValue: string) => void;
  onCancel: () => void;
  className?: string;
  multiline?: boolean;
  placeholder?: string;
}

export function InlineEditor({ 
  value, 
  onSave, 
  onCancel, 
  className = "",
  multiline = false,
  placeholder = ""
}: InlineEditorProps) {
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      // Выделяем весь текст для быстрого редактирования
      inputRef.current.select();
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      onSave(editValue);
    } else if (e.key === 'Enter' && multiline && e.ctrlKey) {
      e.preventDefault();
      onSave(editValue);
    } else if (e.key === 'Escape') {
      onCancel();
    }
  };

  const handleBlur = () => {
    onSave(editValue);
  };

  const baseClasses = "w-full bg-transparent border-none outline-none resize-none";
  const combinedClasses = `${baseClasses} ${className}`;

  if (multiline) {
    return (
      <textarea
        ref={inputRef as React.RefObject<HTMLTextAreaElement>}
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        className={combinedClasses}
        placeholder={placeholder}
        rows={3}
      />
    );
  }

  return (
    <input
      ref={inputRef as React.RefObject<HTMLInputElement>}
      value={editValue}
      onChange={(e) => setEditValue(e.target.value)}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      className={combinedClasses}
      placeholder={placeholder}
    />
  );
}
