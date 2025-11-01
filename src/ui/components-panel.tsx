"use client";

import React, { useState, useMemo } from "react";
import { useDraggable } from "@dnd-kit/core";
import { Search, ChevronDown, ChevronRight, Diamond, Code } from "lucide-react";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Text } from "@/components/text";
import { useComponentDefinitions } from "@/hooks/use-component-definitions";
import { ComponentDefinition } from "@/types/page-builder";

interface ComponentsPanelProps {
  mode: 'builder' | 'sandbox';
  selectedSandboxComponent?: string | null;
  onSelectSandboxComponent?: (componentId: string) => void;
}

interface DraggableComponentProps {
  component: ComponentDefinition;
}

interface AccordionCategoryProps {
  category: string;
  components: ComponentDefinition[];
  mode: 'builder' | 'sandbox';
  selectedSandboxComponent?: string | null;
  onSelectSandboxComponent?: (componentId: string) => void;
  isExpanded: boolean;
  onToggle: () => void;
}

function DraggableComponent({ component }: DraggableComponentProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: component.id,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`cursor-grab active:cursor-grabbing ${isDragging ? 'opacity-50' : ''}`}
    >
      <div className="w-full flex items-center gap-2 px-3 py-2 mt-1 rounded-lg hover:bg-background-secondary/50 transition-colors border border-transparent">
        <Diamond className="h-4 w-4 text-foreground-info" />
        <Text size="caption" weight="medium" className="text-foreground-primary">
          {component.name}
        </Text>
      </div>
    </div>
  );
}

function AccordionCategory({ 
  category, 
  components, 
  mode, 
  selectedSandboxComponent, 
  onSelectSandboxComponent, 
  isExpanded, 
  onToggle 
}: AccordionCategoryProps) {
  return (
    <div className="mb-2">
      {/* Category Header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-2 rounded-md hover:bg-background-secondary/30 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Text size="footnote" weight="medium" className="text-foreground-secondary">
            {category}
          </Text>
          <Text size="footnote" weight="medium" className="text-foreground-secondary/50">
            {components.length}
          </Text>
        </div>
        {isExpanded ? (
          <ChevronDown className="h-4 w-4 text-foreground-secondary/50" />
        ) : (
          <ChevronRight className="h-4 w-4 text-foreground-secondary/50" />
        )}
      </button>

      {/* Components List */}
      {isExpanded && (
        <div className="ml-2 space-y-1">
          {mode === 'builder' ? (
            // Builder mode - draggable components
            components.map(component => (
              <DraggableComponent key={component.id} component={component} />
            ))
          ) : (
            // Sandbox mode - clickable navigation
            components.map(component => (
              <button
                key={component.id}
                onClick={() => onSelectSandboxComponent?.(component.id)}
                className={`w-full flex items-center gap-2 px-3 py-2 mt-1 rounded-lg text-left transition-colors ${
                  selectedSandboxComponent === component.id
                    ? 'bg-background-secondary/50 border border-transparent'
                    : 'hover:bg-background-secondary/50 border border-transparent'
                }`}
              >
                <Code className="h-4 w-4 text-foreground-brand" />
                <Text size="caption" weight="medium" className="text-foreground-primary">
                  {component.name}
                </Text>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export function ComponentsPanel({ mode, selectedSandboxComponent, onSelectSandboxComponent }: ComponentsPanelProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [hasInitialized, setHasInitialized] = useState(false);
  const { componentDefinitions, loading, error } = useComponentDefinitions();

  // Инициализируем все категории как открытые при первом рендере
  React.useEffect(() => {
    if (!hasInitialized && componentDefinitions && componentDefinitions.length > 0) {
      const categories = Array.from(new Set(componentDefinitions.map(comp => comp.category)));
      setExpandedCategories(new Set(categories));
      setHasInitialized(true);
    }
  }, [componentDefinitions, hasInitialized]);

  // Мемоизация должна быть до условных возвратов (правила хуков React)
  const categories = useMemo(() => {
    if (!componentDefinitions || componentDefinitions.length === 0) {
      return [];
    }
    return Array.from(new Set(componentDefinitions.map(comp => comp.category)));
  }, [componentDefinitions]);

  const filteredComponents = useMemo(() => {
    if (!componentDefinitions || componentDefinitions.length === 0) {
      return [];
    }
    return componentDefinitions.filter(component => {
      const matchesSearch = component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           component.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || component.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [componentDefinitions, searchQuery, selectedCategory]);

  // Группируем компоненты по категориям для аккордеона
  const componentsByCategory = useMemo(() => {
    if (!filteredComponents || filteredComponents.length === 0) {
      return {} as Record<string, ComponentDefinition[]>;
    }
    return filteredComponents.reduce((acc, component) => {
      if (!acc[component.category]) {
        acc[component.category] = [];
      }
      acc[component.category].push(component);
      return acc;
    }, {} as Record<string, ComponentDefinition[]>);
  }, [filteredComponents]);

  if (loading) {
    return (
      <div className="w-80 h-full bg-background-primary border border-border-secondary/50 rounded-lg shadow-lg p-4">
        <Text size="body" textColor="muted">Загрузка компонентов...</Text>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-80 h-full bg-background-primary border border-border-secondary/50 rounded-lg shadow-lg p-4">
        <Text size="body" textColor="destructive">Ошибка загрузки: {error}</Text>
      </div>
    );
  }

  // Функции для управления аккордеонами
  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

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
           {selectedCategory === null ? (
             // Аккордеоны для фильтра "Все"
             Object.entries(componentsByCategory).map(([category, components]) => (
               <AccordionCategory
                 key={category}
                 category={category}
                 components={components}
                 mode={mode}
                 selectedSandboxComponent={selectedSandboxComponent}
                 onSelectSandboxComponent={onSelectSandboxComponent}
                 isExpanded={expandedCategories.has(category)}
                 onToggle={() => toggleCategory(category)}
               />
             ))
           ) : (
             // Обычный список для конкретной категории
             mode === 'builder' ? (
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
                   <Text size="body" weight="medium" className="text-foreground-primary">
                     {component.name}
                   </Text>
                 </button>
               ))
             )
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


