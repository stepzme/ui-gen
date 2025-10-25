"use client";

import React, { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { Search } from "lucide-react";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Cell } from "@/components/cell";
import { Badge } from "@/components/badge";
import { Text } from "@/components/text";
import { componentDefinitions, getCategoryIcon, getCategoryColor } from "@/lib/component-definitions";

interface ComponentsPanelProps {
  mode: 'builder' | 'sandbox';
  selectedSandboxComponent?: string | null;
  onSelectSandboxComponent?: (componentId: string) => void;
}

interface DraggableComponentProps {
  component: typeof componentDefinitions[0];
}

function DraggableComponent({ component }: DraggableComponentProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: component.id,
  });

  const CategoryIcon = getCategoryIcon(component.category);
  const categoryColor = getCategoryColor(component.category);

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`cursor-grab active:cursor-grabbing ${isDragging ? 'opacity-50' : ''}`}
    >
      <Cell
        leftIcon={<CategoryIcon className="h-4 w-4" />}
        title={component.name}
        description={component.category}
        titleSize="body"
        descriptionSize="caption"
        titleWeight="medium"
        descriptionWeight="normal"
        titleColor="default"
        descriptionColor="muted"
        iconColor={categoryColor}
        className="p-3 rounded-md hover:bg-background-secondary/50 transition-colors border border-transparent"
      />
    </div>
  );
}

export function ComponentsPanel({ mode, selectedSandboxComponent, onSelectSandboxComponent }: ComponentsPanelProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(componentDefinitions.map(comp => comp.category)));

  const filteredComponents = componentDefinitions.filter(component => {
    const matchesSearch = component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         component.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || component.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col w-80 h-full bg-background-primary border border-border-secondary/50 rounded-lg shadow-lg">
      {/* Header */}
      <div className="p-4 border-b border-border-secondary/50">
        <div className="flex items-center justify-between mb-4">
          <Text size="h5" weight="semibold">Компоненты</Text>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground-secondary h-4 w-4" />
          <Input
            placeholder="Поиск"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="py-4 pr-0 border-b border-border-secondary/50">
        <div className="flex gap-2 px-4 overflow-x-auto overflow-y-visible scrollbar-thin scrollbar-thumb-foreground-secondary/20 scrollbar-track-transparent py-1">
          <Button
            variant={selectedCategory === null ? 'primary' : 'secondary'}
            semantic="default"
            size="sm"
            onClick={() => setSelectedCategory(null)}
            className="flex-shrink-0"
          >
            Все
          </Button>
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'primary' : 'secondary'}
              semantic="default"
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="flex-shrink-0"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

       {/* Components List */}
       <div className="flex-1 overflow-y-auto scrollbar-thin p-2">
         <div className="space-y-2">
           {mode === 'builder' ? (
             // Builder mode - draggable components
             filteredComponents.map(component => (
               <DraggableComponent key={component.id} component={component} />
             ))
           ) : (
             // Sandbox mode - clickable navigation
             filteredComponents.map(component => (
               <button
                 key={component.id}
                 onClick={() => onSelectSandboxComponent?.(component.id)}
                 className={`w-full p-3 rounded-lg text-left transition-colors ${
                   selectedSandboxComponent === component.id
                     ? 'bg-background-secondary/50 border border-transparent'
                     : 'hover:bg-background-secondary/50 border border-transparent'
                 }`}
               >
                 <div className="flex items-center gap-3">
                   <div 
                     className={`w-10 h-10 rounded-md flex items-center justify-center flex-shrink-0 ${
                       getCategoryColor(component.category) === 'primary' ? 'bg-primary/10 text-primary' :
                       getCategoryColor(component.category) === 'success' ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400' :
                       getCategoryColor(component.category) === 'info' ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' :
                       'bg-background-secondary text-foreground-success'
                     }`}
                   >
                     {React.createElement(getCategoryIcon(component.category), { className: "h-4 w-4" })}
                   </div>
                   <div>
                     <Text size="body" weight="medium">{component.name}</Text>
                     <Text size="caption" textColor="muted">{component.category}</Text>
                   </div>
                 </div>
               </button>
             ))
           )}
         </div>
       </div>

      {filteredComponents.length === 0 && (
        <div className="p-4 text-center text-foreground-secondary">
          <Text size="body" textColor="muted">No components found</Text>
        </div>
      )}
    </div>
  );
}


