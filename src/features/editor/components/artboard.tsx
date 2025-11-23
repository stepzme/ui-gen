"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { DndContext, PointerSensor, useDroppable, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, useSortable, arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Trash2, ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/imported/components/ui/button";
import { Badge } from "@/imported/components/ui/badge";
import { Typography } from "@/imported/components/meta/typography";
import { Artboard, SelectedElement } from "@/types/page-builder";
import { ComponentRenderer } from "@/features/component-library/components/component-renderer";
import { useComponentDefinitions } from "@/hooks/use-component-definitions";
import { Navbar } from "./navbar";
import { InlineEditor } from "./inline-editor";

const getStatusLabel = (status: 'draft' | 'review' | 'approved' | 'published'): string => {
  const statusLabels: Record<string, string> = {
    draft: 'В работе',
    review: 'На ревью',
    approved: 'Ревью пройдено',
    published: 'Готово'
  };
  return statusLabels[status] || status;
};

interface EditingElement {
  id: string;
  prop: string;
  value: string;
}

interface CanvasTransform {
  x: number;
  y: number;
  scale: number;
}

interface ArtboardComponentProps {
  artboard: Artboard;
  canvasTransform?: CanvasTransform;
  disablePositioning?: boolean;
  onSelectElement: (element: SelectedElement) => void;
  selectedElement: SelectedElement | null;
  onDeleteElement?: (elementId: string) => void;
  onMoveArtboard?: (artboardId: string, x: number, y: number) => void;
  onMoveComponentUp?: (elementId: string) => void;
  onMoveComponentDown?: (elementId: string) => void;
  editingElement?: EditingElement | null;
  onStartEditing?: (componentId: string, prop: string, value: string) => void;
  onSaveEditing?: (componentId: string, prop: string, newValue: string) => void;
  onCancelEditing?: () => void;
  lockedElementIds?: Set<string>;
  onReorderElements?: (ids: string[]) => void;
  theme?: "light" | "dark";
}

export function ArtboardComponent({ artboard, canvasTransform = { x: 0, y: 0, scale: 1 }, disablePositioning = false, onSelectElement, selectedElement, onDeleteElement, onMoveArtboard, onMoveComponentUp, onMoveComponentDown, editingElement, onStartEditing, onSaveEditing, onCancelEditing, lockedElementIds, onReorderElements, theme = "dark" }: ArtboardComponentProps) {
  const { componentDefinitions } = useComponentDefinitions();
  const { isOver, setNodeRef } = useDroppable({
    id: `artboard-${artboard.id}`,
  });

  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  const position = useMemo(() => artboard.position || { x: 300, y: 300 }, [artboard.position]);

  const normalizedTransform = useMemo<CanvasTransform>(() => ({
    x: canvasTransform.x,
    y: canvasTransform.y,
    scale: canvasTransform.scale
  }), [canvasTransform.x, canvasTransform.y, canvasTransform.scale]);

  const isSelected = selectedElement?.type === 'artboard' && selectedElement.id === artboard.id;

  // DnD support for canvas ordering
  const sensors = useSensors(useSensor(PointerSensor));
  function handleDragEnd(event: any) {
    if (!onReorderElements) return;
    const ids = artboard.children.map((c) => c.id);
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = ids.indexOf(String(active.id));
    const newIndex = ids.indexOf(String(over.id));
    if (oldIndex === -1 || newIndex === -1) return;
    const next = arrayMove(ids, oldIndex, newIndex);
    onReorderElements(next);
  }

  function SortableWrapper({ id, children }: { id: string; children: React.ReactNode }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.85 : 1,
    } as React.CSSProperties;
    return (
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        {children}
      </div>
    );
  }

  const navbarHeight = useMemo(() => {
    if (artboard.type !== 'mobile') return 0;
    const variant = artboard.navbarVariant || 'ios';
    const statusBarHeight = variant === 'ios' ? 48 : 24;
    const navBarHeight = 56;
    return statusBarHeight + navBarHeight;
  }, [artboard.type, artboard.navbarVariant]);

  const handleArtboardClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const { type, id: _omitId, ...artboardData } = artboard;
    onSelectElement({
      type: 'artboard',
      id: artboard.id,
      ...artboardData,
      artboardType: type,
    });
  }, [artboard, onSelectElement]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('[data-artboard-header]')) {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
      const screenArtboardX = normalizedTransform.x + position.x * normalizedTransform.scale;
      const screenArtboardY = normalizedTransform.y + position.y * normalizedTransform.scale;
      const offsetX = (e.clientX - screenArtboardX) / normalizedTransform.scale;
      const offsetY = (e.clientY - screenArtboardY) / normalizedTransform.scale;
      setDragStart({ x: offsetX, y: offsetY });
    }
  }, [position.x, position.y, normalizedTransform]);

  useEffect(() => {
    if (!isDragging || !onMoveArtboard) {
      return;
    }

    const handleGlobalMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      const canvasMouseX = (e.clientX - normalizedTransform.x) / normalizedTransform.scale;
      const canvasMouseY = (e.clientY - normalizedTransform.y) / normalizedTransform.scale;
      const newPosition = {
        x: canvasMouseX - dragStart.x,
        y: canvasMouseY - dragStart.y
      };
      onMoveArtboard(artboard.id, newPosition.x, newPosition.y);
    };

    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleGlobalMouseMove);
    document.addEventListener('mouseup', handleGlobalMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, dragStart, artboard.id, onMoveArtboard, normalizedTransform]);

  return (
    <div 
      className="flex flex-col items-start"
      style={{ 
        ...(disablePositioning ? {} : { transform: `translate(${position.x}px, ${position.y}px)` }),
        ...(onMoveArtboard && !disablePositioning ? { cursor: isDragging ? 'grabbing' : 'grab' } : {})
      }}
      onMouseDown={disablePositioning ? undefined : handleMouseDown}
    >
      <div 
        data-artboard-header
        className={`flex items-center gap-1 mb-1 px-3 py-2 border-1 rounded-lg bg-background-primary/80 hover:bg-background-primary transition-colors cursor-pointer ${
          isSelected ? 'border-1 border-border-info bg-background-primary' : 'border-transparent'
        }`}
        style={{ width: artboard.width }}
        onClick={handleArtboardClick}
      >
        <div className="flex-1 min-w-0">
          {editingElement?.id === artboard.id && editingElement?.prop === 'name' ? (
            <div className="text-xs leading-relaxed font-medium text-foreground">
              <InlineEditor
                value={editingElement?.value || artboard.name}
                onSave={(newValue) => {
                  if (onSaveEditing) {
                    onSaveEditing(artboard.id, 'name', newValue);
                  }
                }}
                onCancel={() => {
                  if (onCancelEditing) {
                    onCancelEditing();
                  }
                }}
                className="truncate w-full bg-transparent border-none outline-none"
              />
            </div>
          ) : (
            <Typography 
              typography="bodyS_tight_medium" 
              className="truncate"
              onDoubleClick={(e) => {
                e.stopPropagation();
                if (onStartEditing) {
                  onStartEditing(artboard.id, 'name', artboard.name);
                }
              }}
              style={{ cursor: 'text' }}
            >
              {artboard.name}
            </Typography>
          )}
        </div>
        <Badge 
          semantic={artboard.status === 'published' ? 'accent' : 
                  artboard.status === 'approved' ? 'success' : 
                  artboard.status === 'review' ? 'warning' : 'default'}
          active={false}
          className="text-xs flex-shrink-0"
        >
          {getStatusLabel(artboard.status)}
        </Badge>
        {onDeleteElement && isSelected && (
          <Button
            variant="text"
            semantic="critical"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteElement(artboard.id);
            }}
            className="text-destructive hover:text-destructive hover:bg-destructive/10 flex-shrink-0"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div
        ref={setNodeRef}
        className="relative transition-colors"
        style={{
          width: artboard.width,
          height: artboard.autoHeight ? 'auto' : artboard.height,
          minWidth: artboard.width,
          minHeight: artboard.autoHeight ? undefined : artboard.height,
        }}
        onClick={handleArtboardClick}
      >
        {artboard.type === 'mobile' && (
          <div className="absolute top-0 left-0 right-0 z-10">
            <Navbar
              variant={artboard.navbarVariant || 'ios'}
              title={artboard.navbarTitle}
              description={artboard.navbarDescription}
              rightIcon={artboard.navbarRightIcon}
              showNavigation={artboard.navbarShowNavigation ?? true}
              showTitle={artboard.navbarShowTitle ?? true}
              showDescription={artboard.navbarShowDescription ?? true}
              showRightButton={artboard.navbarShowRightButton ?? true}
            />
          </div>
        )}
        <div
          className="w-full bg-background-primary flex flex-col"
          style={{ 
            gap: `${artboard.gap}px`, 
            padding: '16px',
            paddingTop: artboard.type === 'mobile' ? `${navbarHeight + 16}px` : '16px',
            minHeight: '100%',
            maxWidth: '100%',
            boxSizing: 'border-box'
          }}
        >
          {onReorderElements ? (
            <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
              <SortableContext items={artboard.children.map((c) => c.id)} strategy={verticalListSortingStrategy}>
                {artboard.children.map((child) => {
                  const componentDef = componentDefinitions.find(comp => comp.id === child.type);
                  if (!componentDef) return null;

                  const isChildSelected = selectedElement?.type === 'component' && selectedElement.id === child.id;
                  const isLocked = lockedElementIds?.has(child.id);
                  return (
                    <SortableWrapper key={child.id} id={child.id}>
                      <div
                        data-component-id={child.id}
                        className={`relative group ${child.fullWidth ? 'w-full' : 'w-auto'} max-w-full`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectElement({ type: 'component', id: child.id, node: child });
                        }}
                      >
                        {isLocked && (
                          <div className="absolute inset-0 z-[60] rounded-xl bg-black/10 pointer-events-none" />
                        )}
                        {onMoveComponentUp && (
                          <Button
                            variant="primary"
                            semantic="default"
                            size="sm"
                            className={`absolute top-1/2 -left-23 w-8 z-[100] transition-opacity -translate-y-1/2 ${
                              isChildSelected ? 'opacity-100' : 'opacity-0'
                            }`}
                            onClick={(e) => {
                              e.stopPropagation();
                              onMoveComponentUp(child.id);
                            }}
                          >
                            <ChevronUp className="h-1 w-1" />
                          </Button>
                        )}

                        {onMoveComponentDown && (
                          <Button
                            variant="primary"
                            semantic="default"
                            size="sm"
                            className={`absolute top-1/2 -left-14 w-8 z-[100] transition-opacity -translate-y-1/2 ${
                              isChildSelected ? 'opacity-100' : 'opacity-0'
                            }`}
                            onClick={(e) => {
                              e.stopPropagation();
                              onMoveComponentDown(child.id);
                            }}
                          >
                            <ChevronDown className="h-1 w-1" />
                          </Button>
                        )}

                        {onDeleteElement && (
                          <Button
                            variant="secondary"
                            semantic="critical"
                            size="sm"
                            className={`absolute top-1/2 -right-14 w-8 z-[100] transition-opacity -translate-y-1/2 ${
                              isChildSelected ? 'opacity-100' : 'opacity-0'
                            }`}
                            onClick={(e) => {
                              e.stopPropagation();
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
                            className: child.fullWidth ? `${child.props.className || ''} w-full`.trim() : (child.props.className || '').trim(),
                          }}
                          componentId={child.id}
                          editingElement={editingElement}
                          onStartEditing={onStartEditing}
                          onSaveEditing={onSaveEditing}
                          onCancelEditing={onCancelEditing}
                        >
                          {child.children}
                        </ComponentRenderer>
                        {(isChildSelected || isLocked) && (
                          <div className="absolute -m-2 inset-0 border-2 border-border-info rounded-xl pointer-events-none" />
                        )}
                      </div>
                    </SortableWrapper>
                  );
                })}
              </SortableContext>
            </DndContext>
          ) : (
            artboard.children.map((child) => {
              const componentDef = componentDefinitions.find(comp => comp.id === child.type);
              if (!componentDef) return null;

              const isChildSelected = selectedElement?.type === 'component' && selectedElement.id === child.id;

              const isLocked = lockedElementIds?.has(child.id);
              return (
                  <div
                    key={child.id}
                    data-component-id={child.id}
                    className={`relative group ${child.fullWidth ? 'w-full' : 'w-auto'} max-w-full`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectElement({
                        type: 'component',
                        id: child.id,
                        node: child
                      });
                    }}
                  >
                    {isLocked && (
                      <div className="absolute inset-0 z-[60] rounded-xl bg-black/10 pointer-events-none" />
                    )}
                    {onMoveComponentUp && (
                      <Button
                        variant="primary"
                        semantic="default"
                        size="sm"
                        className={`absolute top-1/2 -left-23 w-8 z-[100] transition-opacity -translate-y-1/2 ${
                          isChildSelected ? 'opacity-100' : 'opacity-0'
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onMoveComponentUp(child.id);
                        }}
                      >
                        <ChevronUp className="h-1 w-1" />
                      </Button>
                    )}

                    {onMoveComponentDown && (
                      <Button
                        variant="primary"
                        semantic="default"
                        size="sm"
                        className={`absolute top-1/2 -left-14 w-8 z-[100] transition-opacity -translate-y-1/2 ${
                          isChildSelected ? 'opacity-100' : 'opacity-0'
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onMoveComponentDown(child.id);
                        }}
                      >
                        <ChevronDown className="h-1 w-1" />
                      </Button>
                    )}

                    {onDeleteElement && (
                      <Button
                        variant="secondary"
                        semantic="critical"
                        size="sm"
                        className={`absolute top-1/2 -right-14 w-8 z-[100] transition-opacity -translate-y-1/2 ${
                          isChildSelected ? 'opacity-100' : 'opacity-0'
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
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
                          ? `${child.props.className || ''} w-full`.trim()
                          : (child.props.className || '').trim()
                      }}
                      componentId={child.id}
                      editingElement={editingElement}
                      onStartEditing={onStartEditing}
                      onSaveEditing={onSaveEditing}
                      onCancelEditing={onCancelEditing}
                    >
                      {child.children}
                    </ComponentRenderer>
                  
                  {(isChildSelected || isLocked) && (
                    <div className="absolute -m-2 inset-0 border-2 border-border-info rounded-xl pointer-events-none" />
                  )}
                </div>
              );
            })
          )}
        </div>

        {isOver && (
          <div className="absolute inset-0 bg-primary/10 border border-border-info border-dashed rounded-lg flex items-center justify-center">
            <Typography typography="bodyM_tight_medium" style={{ color: 'var(--semantic-primary-primary)' }}>Drop component here</Typography>
          </div>
        )}
      </div>
    </div>
  );
}
