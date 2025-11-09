"use client";

import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface ElementItemProps {
  id: string;
  name: string;
}

function SortableElementItem({ id, name }: ElementItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
  } as React.CSSProperties;

  return (
    <div ref={setNodeRef} style={style} className="flex items-center justify-between rounded border border-border-secondary px-2 py-1 text-sm bg-background-primary select-none">
      <span className="truncate text-foreground-primary">{name}</span>
      <button className="cursor-grab rounded border border-border-primary px-2 py-0.5 text-xs text-foreground-secondary hover:bg-background-secondary" aria-label="Drag handle" {...attributes} {...listeners}>≡</button>
    </div>
  );
}

export function ElementList({ elements, onReorder }: { elements: Array<{ id: string; type: string }>; onReorder: (ids: string[]) => void }) {
  const sensors = useSensors(useSensor(PointerSensor));
  const ids = elements.map((e) => e.id);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = ids.indexOf(String(active.id));
    const newIndex = ids.indexOf(String(over.id));
    const next = arrayMove(ids, oldIndex, newIndex);
    onReorder(next);
  }

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <SortableContext items={ids} strategy={verticalListSortingStrategy}>
        <div className="space-y-1">
          {elements.map((e) => (
            <SortableElementItem key={e.id} id={e.id} name={e.type} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}


