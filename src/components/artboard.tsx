"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useDroppable } from "@dnd-kit/core";
import { Monitor, Smartphone, Settings, Trash2, Move, ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/button";
import { Badge } from "@/components/badge";
import { Text } from "@/components/text";
import { Artboard, SelectedElement } from "@/types/page-builder";
import { ComponentRenderer } from "./component-renderer";
import { componentDefinitions } from "@/lib/component-definitions";

interface ArtboardComponentProps {
  artboard: Artboard;
  onSelectElement: (element: SelectedElement) => void;
  selectedElement: SelectedElement | null;
  onDeleteElement?: (elementId: string) => void;
  onMoveArtboard?: (artboardId: string, x: number, y: number) => void;
  onMoveComponentUp?: (elementId: string) => void;
  onMoveComponentDown?: (elementId: string) => void;
  editingElement?: {
    id: string;
    prop: string;
    value: string;
  } | null;
  onStartEditing?: (componentId: string, prop: string, value: string) => void;
  onSaveEditing?: (componentId: string, prop: string, newValue: string) => void;
  onCancelEditing?: () => void;
}

export function ArtboardComponent({ artboard, onSelectElement, selectedElement, onDeleteElement, onMoveArtboard, onMoveComponentUp, onMoveComponentDown, editingElement, onStartEditing, onSaveEditing, onCancelEditing }: ArtboardComponentProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: `artboard-${artboard.id}`,
  });

  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const artboardRef = useRef<HTMLDivElement>(null);

  const isSelected = selectedElement?.type === 'artboard' && selectedElement.id === artboard.id;

  const handleArtboardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectElement({
      type: 'artboard',
      id: artboard.id,
      name: artboard.name,
      status: artboard.status
    });
  };

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    // Start dragging when clicking on the artboard header
    if ((e.target as HTMLElement).closest('[data-artboard-header]') ||
        (e.target as HTMLElement).closest('[data-move-button]')) {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  }, [position]);


  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Global mouse event handlers for artboard dragging
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging && onMoveArtboard) {
        e.preventDefault();
        const newPosition = {
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y
        };
        setPosition(newPosition);
        onMoveArtboard(artboard.id, newPosition.x, newPosition.y);
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
  }, [isDragging, dragStart, artboard.id, onMoveArtboard]);

  return (
    <div 
      className="flex flex-col items-start"
      style={{ 
        transform: `translate(${position.x}px, ${position.y}px)`,
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Artboard Header */}
      <div 
        data-artboard-header
        className={`flex items-center gap-1 mb-1 px-3 py-1 border-1 rounded-lg hover:bg-background-primary transition-colors cursor-pointer ${
          isSelected ? 'border-1 border-border-brand bg-background-primary' : 'border-transparent'
        }`}
        style={{ width: artboard.width }}
        onClick={handleArtboardClick}
      >
        <Text size="h6" weight="medium" className="w-full">{artboard.name}</Text>
        <Badge 
          variant={artboard.status === 'published' ? 'primary' : 
                  artboard.status === 'approved' ? 'success' : 
                  artboard.status === 'review' ? 'warning' : 'secondary'}
          accent={false}
          className="text-xs"
        >
          {artboard.status}
        </Badge>
        {onDeleteElement && (
          <Button
            variant="ghost"
            semantic="critical"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteElement(artboard.id);
            }}
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Artboard Container */}
      <div
        ref={setNodeRef}
        className={`
          relative border border-dashed border-border-primary rounded-lg transition-colors
          ${isOver ? 'border-border-critical' : 'border-border-brand'}
          ${isSelected ? 'border-border-critical' : 'border-border-brand'}
        `}
        style={{
          width: artboard.width,
          height: artboard.height,
          minWidth: artboard.width,
          minHeight: artboard.height,
        }}
        onClick={handleArtboardClick}
      >
        {/* Artboard Content */}
        <div
          className="w-full h-full bg-background-primary rounded-lg overflow-visible flex flex-col"
          style={{ gap: `${artboard.gap}px`, padding: '16px' }}
        >
          {artboard.children.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <div className="text-center">
                <Text size="caption">Drop components here</Text>
                <Text size="footnote" className="mt-1">or click to select artboard</Text>
              </div>
            </div>
          ) : (
            artboard.children.map((child) => {
              const componentDef = componentDefinitions.find(comp => comp.id === child.type);
              if (!componentDef) return null;

              const isChildSelected = selectedElement?.type === 'component' && selectedElement.id === child.id;

              return (
                  <div
                    key={child.id}
                    className={`
                      relative group
                      ${isChildSelected ? '' : ''}
                      ${child.fullWidth ? 'w-full' : 'w-auto'}
                    `}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectElement({
                        type: 'component',
                        id: child.id,
                        node: child
                      });
                    }}
                  >
                    {/* Full Width Indicator - removed to avoid visual artifacts */}

                    {/* Move Up button - Left side */}
                    {onMoveComponentUp && (
                      <Button
                        variant="secondary"
                        semantic="default"
                        size="sm"
                        className={`absolute top-1/2 -left-23 w-8 z-10 transition-opacity -translate-y-1/2 ${
                          isChildSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                        }`}
                        onMouseDown={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          console.log('Moving component up:', child.id);
                          onMoveComponentUp(child.id);
                        }}
                      >
                        <ChevronUp className="h-1 w-1" />
                      </Button>
                    )}

                    {/* Move Down button - Left side */}
                    {onMoveComponentDown && (
                      <Button
                        variant="secondary"
                        semantic="default"
                        size="sm"
                        className={`absolute top-1/2 -left-14 w-8 z-10 transition-opacity -translate-y-1/2 ${
                          isChildSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                        }`}
                        onMouseDown={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          console.log('Moving component down:', child.id);
                          onMoveComponentDown(child.id);
                        }}
                      >
                        <ChevronDown className="h-1 w-1" />
                      </Button>
                    )}

                    {/* Delete button - Right side */}
                    {onDeleteElement && (
                      <Button
                        variant="secondary"
                        semantic="default"
                        size="sm"
                        className={`absolute top-1/2 -right-14 w-8 z-10 transition-opacity -translate-y-1/2 ${
                          isChildSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                        }`}
                        onMouseDown={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          console.log('Deleting component:', child.id);
                          onDeleteElement(child.id);
                        }}
                      >
                        <Trash2 className="h-1 w-1" />
                      </Button>
                    )}
                    
                    <ComponentRenderer
                      component={componentDef}
                      props={{
                        ...child.props,
                        className: child.fullWidth 
                          ? `${child.props.className || ''} w-full ${isChildSelected ? '' : ''}`.trim()
                          : `${child.props.className || ''} ${isChildSelected ? '' : ''}`.trim()
                      }}
                      componentId={child.id}
                      editingElement={editingElement}
                      onStartEditing={onStartEditing}
                      onSaveEditing={onSaveEditing}
                      onCancelEditing={onCancelEditing}
                    >
                      {child.children}
                    </ComponentRenderer>
                  
                  {/* Selection indicator - simplified */}
                  {isChildSelected && (
                    <div className="absolute -m-2 inset-0 border-2 border-blue-500 rounded-xl pointer-events-none" />
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Drop indicator */}
        {isOver && (
          <div className="absolute inset-0 bg-primary/10 border border-blue-500 border-dashed rounded-lg flex items-center justify-center">
            <Text size="body" textColor="primary" weight="medium">Drop component here</Text>
          </div>
        )}
      </div>
    </div>
  );
}
