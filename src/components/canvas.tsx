"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useDroppable } from "@dnd-kit/core";
import { Plus, Monitor, Smartphone, Move, ZoomIn, ZoomOut, RotateCcw, Palette, Sun, Moon } from "lucide-react";
import { Button } from "@/components/button";
import { Badge } from "@/components/badge";
import { Text } from "@/components/text";
import { Artboard, SelectedElement } from "@/types/page-builder";
import { ArtboardComponent } from "./artboard";
import { componentDefinitions } from "@/lib/component-definitions";

interface CanvasProps {
  artboards: Artboard[];
  onAddArtboard: (type: 'desktop' | 'mobile') => void;
  onSelectElement: (element: SelectedElement) => void;
  selectedElement: SelectedElement | null;
  onDeleteElement?: (elementId: string) => void;
  onMoveArtboard?: (artboardId: string, x: number, y: number) => void;
  onMoveComponentUp?: (elementId: string) => void;
  onMoveComponentDown?: (elementId: string) => void;
  onDeselectElement?: () => void;
  editingElement?: {
    id: string;
    prop: string;
    value: string;
  } | null;
  onStartEditing?: (componentId: string, prop: string, value: string) => void;
  onSaveEditing?: (componentId: string, prop: string, newValue: string) => void;
  onCancelEditing?: () => void;
}

export function Canvas({ artboards, onAddArtboard, onSelectElement, selectedElement, onDeleteElement, onMoveArtboard, onMoveComponentUp, onMoveComponentDown, onDeselectElement, editingElement, onStartEditing, onSaveEditing, onCancelEditing }: CanvasProps) {
  const [canvasTransform, setCanvasTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isDark, setIsDark] = useState<boolean>(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    // Only start dragging if clicking on the canvas background, not on artboards
    const target = e.target as HTMLElement;
    if (target === canvasRef.current || 
        target.classList.contains('bg-dot-pattern') ||
        target.closest('.bg-dot-pattern')) {
      e.preventDefault();
      e.stopPropagation();
      
      // Remove focus from any focused element (like search input)
      if (document.activeElement && document.activeElement !== document.body) {
        (document.activeElement as HTMLElement).blur();
      }
      
      // Deselect any selected element when clicking on empty canvas
      if (onDeselectElement) {
        onDeselectElement();
      }
      
      setIsDragging(true);
      setDragStart({ x: e.clientX - canvasTransform.x, y: e.clientY - canvasTransform.y });
    }
  }, [canvasTransform, onDeselectElement]);


  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    const newScale = Math.max(0.1, Math.min(3, canvasTransform.scale * delta));
    
    // Calculate the zoom factor (for potential future use)
    // const zoomFactor = newScale / canvasTransform.scale;
    
    // Calculate the mouse position relative to the current transform
    const currentMouseX = (mouseX - canvasTransform.x) / canvasTransform.scale;
    const currentMouseY = (mouseY - canvasTransform.y) / canvasTransform.scale;
    
    // Calculate new position to keep the mouse point stationary
    const newX = mouseX - currentMouseX * newScale;
    const newY = mouseY - currentMouseY * newScale;
    
    setCanvasTransform({
      x: newX,
      y: newY,
      scale: newScale
    });
  }, [canvasTransform]);

  const handleZoomIn = () => {
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const newScale = Math.min(canvasTransform.scale * 1.2, 3);
    
    const currentCenterX = (centerX - canvasTransform.x) / canvasTransform.scale;
    const currentCenterY = (centerY - canvasTransform.y) / canvasTransform.scale;
    
    const newX = centerX - currentCenterX * newScale;
    const newY = centerY - currentCenterY * newScale;
    
    setCanvasTransform({
      x: newX,
      y: newY,
      scale: newScale
    });
  };

  const handleZoomOut = () => {
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const newScale = Math.max(canvasTransform.scale / 1.2, 0.1);
    
    const currentCenterX = (centerX - canvasTransform.x) / canvasTransform.scale;
    const currentCenterY = (centerY - canvasTransform.y) / canvasTransform.scale;
    
    const newX = centerX - currentCenterX * newScale;
    const newY = centerY - currentCenterY * newScale;
    
    setCanvasTransform({
      x: newX,
      y: newY,
      scale: newScale
    });
  };

  const handleResetView = () => {
    setCanvasTransform({ x: 0, y: 0, scale: 1 });
  };

  // Theme handling
  useEffect(() => {
    const root = document.documentElement;
    const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = stored ? stored === 'dark' : prefersDark;
    if (shouldBeDark) root.classList.add('dark'); else root.classList.remove('dark');
    setIsDark(root.classList.contains('dark'));
  }, []);

  const handleToggleTheme = () => {
    const root = document.documentElement;
    const nextDark = !root.classList.contains('dark');
    root.classList.toggle('dark', nextDark);
    localStorage.setItem('theme', nextDark ? 'dark' : 'light');
    setIsDark(nextDark);
  };

  // Global mouse event handlers
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        e.preventDefault();
        setCanvasTransform({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y,
          scale: canvasTransform.scale
        });
      }
    };

    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, dragStart, canvasTransform.scale]);

  return (
    <div className="absolute inset-0 w-full h-full bg-background-secondary/50 dark:bg-black/50">
      {/* Canvas Area */}
      <div 
        ref={canvasRef}
        className="w-full h-full overflow-hidden relative bg-dot-pattern"
        onMouseDown={handleMouseDown}
        onClick={() => {
          // Remove focus from any focused element when clicking on canvas
          if (document.activeElement && document.activeElement !== document.body) {
            (document.activeElement as HTMLElement).blur();
          }
        }}
        onWheel={handleWheel}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        {/* Floating Controls */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-100 flex items-center gap-2">
          {/* Navigation Controls */}
          <div className="flex items-center gap-2 rounded-lg">
            <Button
              onClick={handleToggleTheme}
              variant="secondary"
              semantic="default"
              size="sm"
              className="flex items-center gap-2"
              aria-label="Toggle theme"
              title="Toggle theme"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button
              onClick={handleZoomOut}
              variant="secondary" semantic="default"
              size="sm"
              className="flex items-center gap-2"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm text-foreground-secondary min-w-[60px] text-center">
              {Math.round(canvasTransform.scale * 100)}%
            </span>
            <Button
              onClick={handleZoomIn}
              variant="secondary" semantic="default"
              size="sm"
              className="flex items-center gap-2"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button
              onClick={handleResetView}
              variant="secondary" semantic="default"
              size="sm"
              className="flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            {/* Removed demo link button to deprecated /semantic-tokens-demo */}
          </div>
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-100 flex items-center gap-2">

          {/* Add Artboard Buttons */}
          <div className="flex gap-2 rounded-lg">
            <Button
              onClick={() => onAddArtboard('desktop')}
              variant="secondary" semantic="default"
              size="sm"
              className="flex items-center gap-2"
            >
              <Monitor className="h-4 w-4" />
              Add Desktop
            </Button>
            <Button
              onClick={() => onAddArtboard('mobile')}
              variant="secondary" semantic="default"
              size="sm"
              className="flex items-center gap-2"
            >
              <Smartphone className="h-4 w-4" />
              Add Mobile
            </Button>
          </div>
        </div>

        <div 
          className="absolute inset-0 p-6"
          style={{
            transform: `translate(${canvasTransform.x}px, ${canvasTransform.y}px) scale(${canvasTransform.scale})`,
            transformOrigin: '0 0',
          }}
        >
            <div className="space-y-6">
              {artboards.map(artboard => (
                <ArtboardComponent
                  key={artboard.id}
                  artboard={artboard}
                  onSelectElement={onSelectElement}
                  selectedElement={selectedElement}
                  onDeleteElement={onDeleteElement}
                  onMoveArtboard={onMoveArtboard}
                  onMoveComponentUp={onMoveComponentUp}
                  onMoveComponentDown={onMoveComponentDown}
                  editingElement={editingElement}
                  onStartEditing={onStartEditing}
                  onSaveEditing={onSaveEditing}
                  onCancelEditing={onCancelEditing}
                />
              ))}
            </div>
          </div>
      </div>
    </div>
  );
}
