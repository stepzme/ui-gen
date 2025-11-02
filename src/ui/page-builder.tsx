"use client";

import { useState } from "react";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor } from "@dnd-kit/core";
import { Artboard, ComponentDefinition, SelectedElement, ComponentNode } from "@/types/page-builder";
import { ComponentsPanel } from "./components-panel";
import { FlowCanvas } from "./flow-canvas";
import { PropertiesPanel } from "./properties-panel";
import { Header } from "./header";
import { useComponentDefinitions } from "@/hooks/use-component-definitions";
import { DiamondPlus } from "lucide-react";
import { Text } from "@/components/text";
export default function PageBuilder() {
  // Настройка сенсора для dnd-kit - не блокируем wheel события
  const sensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 8,
    },
  });
  
  const [artboards, setArtboards] = useState<Artboard[]>([]);
  const [selectedElement, setSelectedElement] = useState<SelectedElement | null>(null);
  const [activeComponent, setActiveComponent] = useState<ComponentDefinition | null>(null);
  const [mode, setMode] = useState<'builder' | 'sandbox'>('builder');
  const [selectedSandboxComponent, setSelectedSandboxComponent] = useState<string | null>(null);
  const { componentDefinitions } = useComponentDefinitions();
  const [editingElement, setEditingElement] = useState<{
    id: string;
    prop: string;
    value: string;
  } | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const component = componentDefinitions.find((comp: ComponentDefinition) => comp.id === active.id);
    if (component) {
      setActiveComponent(component);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveComponent(null);

    if (!over) return;

    const component = componentDefinitions.find((comp: ComponentDefinition) => comp.id === active.id);
    if (!component) return;

    // If dropped on an artboard
    if (over.id.toString().startsWith('artboard-')) {
      const artboardId = over.id.toString().replace('artboard-', '');
      const artboard = artboards.find(ab => ab.id === artboardId);
      
      if (artboard) {
        const newNode: ComponentNode = {
          id: `${component.id}-${Date.now()}`,
          type: component.id,
          props: { ...component.defaultProps },
          children: [],
          fullWidth: true
        };

        setArtboards(prev => prev.map(ab => 
          ab.id === artboardId 
            ? { ...ab, children: [...ab.children, newNode] }
            : ab
        ));
      }
    }
  };

  const handleAddArtboard = (type: 'desktop' | 'mobile') => {
    // Вычисляем центр канваса
    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;
    const artboardWidth = type === 'desktop' ? 1440 : 375;
    const artboardHeight = type === 'desktop' ? 900 : 800;
    
    // Центрируем артборд на канвасе
    const centerX = (canvasWidth - artboardWidth) / 2;
    const centerY = (canvasHeight - artboardHeight) / 2;
    
    const newArtboard: Artboard = {
      id: `artboard-${Date.now()}`,
      name: 'Untitled',
      width: artboardWidth,
      height: artboardHeight,
      type,
      gap: 16,
      status: 'draft',
      children: [],
      position: { x: centerX, y: centerY },
      autoHeight: false,
      navbarVariant: type === 'mobile' ? 'ios' : undefined
    };

    setArtboards(prev => [...prev, newArtboard]);
  };

  const handleSelectElement = (element: SelectedElement) => {
    setSelectedElement(element);
  };

  const handleUpdateElement = (elementId: string, updates: Partial<ComponentNode>) => {
    setArtboards(prev => prev.map(artboard => ({
      ...artboard,
      children: artboard.children.map(child => 
        child.id === elementId ? { ...child, ...updates } : child
      )
    })));
    
    // Update selected element if it's the one being updated
    if (selectedElement?.type === 'component' && selectedElement.id === elementId) {
      setSelectedElement(prev => prev ? {
        ...prev,
        node: prev.node ? { ...prev.node, ...updates } : prev.node
      } : null);
    }
  };

  const handleUpdateArtboard = (artboardId: string, updates: Partial<Artboard>) => {
    // Если меняется тип артборда, обновляем его размеры
    if (updates.type) {
      const isMobile = updates.type === 'mobile';
      updates.width = isMobile ? 375 : 1440;
      updates.height = isMobile ? 800 : 900;
      // Если меняем на desktop, удаляем navbarVariant
      if (updates.type === 'desktop') {
        updates.navbarVariant = undefined;
      } else if (updates.type === 'mobile') {
        // При переключении на mobile, устанавливаем ios по умолчанию, если navbarVariant не задан
        const currentArtboard = artboards.find(ab => ab.id === artboardId);
        if (!updates.navbarVariant && (!currentArtboard?.navbarVariant || currentArtboard?.type === 'desktop')) {
          updates.navbarVariant = 'ios';
        }
      }
    }
    
    setArtboards(prev => prev.map(artboard => 
      artboard.id === artboardId ? { ...artboard, ...updates } : artboard
    ));
    
    // Update selectedElement if it's the current artboard
    if (selectedElement?.type === 'artboard' && selectedElement.id === artboardId) {
      let updatedNavbarVariant: 'ios' | 'android' | undefined;
      if (updates.type === 'desktop') {
        updatedNavbarVariant = undefined;
      } else if (updates.type === 'mobile') {
        updatedNavbarVariant = updates.navbarVariant ?? 'ios';
      } else {
        updatedNavbarVariant = updates.navbarVariant ?? selectedElement.navbarVariant;
      }
      
      setSelectedElement(prev => prev ? { 
        ...prev, 
        name: updates.name ?? prev.name,
        status: updates.status ?? prev.status,
        artboardType: updates.type ?? prev.artboardType,
        width: updates.width ?? prev.width,
        height: updates.height ?? prev.height,
        autoHeight: updates.autoHeight ?? prev.autoHeight,
        navbarVariant: updatedNavbarVariant,
        navbarTitle: updates.navbarTitle !== undefined ? updates.navbarTitle : prev.navbarTitle,
        navbarDescription: updates.navbarDescription !== undefined ? updates.navbarDescription : prev.navbarDescription,
        navbarRightIcon: updates.navbarRightIcon !== undefined ? updates.navbarRightIcon : prev.navbarRightIcon,
        navbarShowNavigation: updates.navbarShowNavigation !== undefined ? updates.navbarShowNavigation : prev.navbarShowNavigation,
        navbarShowTitle: updates.navbarShowTitle !== undefined ? updates.navbarShowTitle : prev.navbarShowTitle,
        navbarShowDescription: updates.navbarShowDescription !== undefined ? updates.navbarShowDescription : prev.navbarShowDescription,
        navbarShowRightButton: updates.navbarShowRightButton !== undefined ? updates.navbarShowRightButton : prev.navbarShowRightButton
      } : null);
    }
  };

  const handleDeleteElement = (elementId: string) => {
    // Check if it's an artboard
    const artboard = artboards.find(ab => ab.id === elementId);
    if (artboard) {
      // Confirm deletion of artboard
      const confirmed = window.confirm(
        `Are you sure you want to delete the artboard "${artboard.name}"? This action cannot be undone.`
      );
      if (confirmed) {
        setArtboards(prev => prev.filter(ab => ab.id !== elementId));
        // Clear selection if deleted element was selected
        if (selectedElement?.id === elementId) {
          setSelectedElement(null);
        }
      }
    } else {
      // Delete component from artboards
      setArtboards(prev => prev.map(artboard => ({
        ...artboard,
        children: artboard.children.filter(child => child.id !== elementId)
      })));
      
      // Clear selection if deleted element was selected
      if (selectedElement?.id === elementId) {
        setSelectedElement(null);
      }
    }
  };

  const handleMoveComponentUp = (elementId: string) => {
    setArtboards(prev => prev.map(artboard => {
      const children = [...artboard.children];
      const currentIndex = children.findIndex(child => child.id === elementId);
      
      if (currentIndex > 0) {
        // Swap with previous element
        [children[currentIndex], children[currentIndex - 1]] = [children[currentIndex - 1], children[currentIndex]];
        return { ...artboard, children };
      }
      
      return artboard;
    }));
  };

  const handleMoveComponentDown = (elementId: string) => {
    setArtboards(prev => prev.map(artboard => {
      const children = [...artboard.children];
      const currentIndex = children.findIndex(child => child.id === elementId);
      
      if (currentIndex < children.length - 1) {
        // Swap with next element
        [children[currentIndex], children[currentIndex + 1]] = [children[currentIndex + 1], children[currentIndex]];
        return { ...artboard, children };
      }
      
      return artboard;
    }));
  };

  const handleMoveArtboard = (artboardId: string, x: number, y: number) => {
    setArtboards(prev => prev.map(artboard => 
      artboard.id === artboardId 
        ? { ...artboard, position: { x, y } }
        : artboard
    ));
  };

  const handleDeselectElement = () => {
    setSelectedElement(null);
  };

  const handleModeChange = (newMode: 'builder' | 'sandbox') => {
    setMode(newMode);
    // При переключении в sandbox, сбрасываем выбранный элемент
    if (newMode === 'sandbox') {
      setSelectedElement(null);
    }
  };

  const handleStartEditing = (componentId: string, prop: string, value: string) => {
    setEditingElement({ id: componentId, prop, value });
  };

  const handleSaveEditing = (componentId: string, prop: string, newValue: string) => {
    // Проверяем, является ли это артбордом
    const artboard = artboards.find(ab => ab.id === componentId);
    if (artboard) {
      // Это артборд - обновляем его через handleUpdateArtboard
      handleUpdateArtboard(componentId, { [prop]: newValue });
    } else {
      // Это компонент - обновляем его как раньше
      setArtboards(prev => prev.map(artboard => ({
        ...artboard,
        children: artboard.children.map((component: ComponentNode) => 
          component.id === componentId 
            ? { ...component, props: { ...component.props, [prop]: newValue } }
            : component
        )
      })));

      // Обновить selectedElement если он редактируется
      if (selectedElement && selectedElement.type === 'component' && selectedElement.id === componentId) {
        setSelectedElement(prev => prev ? {
          ...prev,
          node: prev.node ? { ...prev.node, props: { ...prev.node.props, [prop]: newValue } } : prev.node
        } : null);
      }
    }

    setEditingElement(null);
  };

  const handleCancelEditing = () => {
    setEditingElement(null);
  };

  return (
    <div className="flex flex-col h-screen w-screen relative bg-background-primary overflow-hidden">
      {/* Header */}
      <Header activeTab={mode} onTabChange={handleModeChange} />
      
      {/* Canvas as background layer */}
      <DndContext sensors={[sensor]} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <FlowCanvas
          artboards={artboards}
          onAddArtboard={handleAddArtboard}
          onSelectElement={handleSelectElement}
          selectedElement={selectedElement}
          onDeleteElement={handleDeleteElement}
          onMoveArtboard={handleMoveArtboard}
          onMoveComponentUp={handleMoveComponentUp}
          onMoveComponentDown={handleMoveComponentDown}
          onDeselectElement={handleDeselectElement}
          editingElement={editingElement}
          onStartEditing={handleStartEditing}
          onSaveEditing={handleSaveEditing}
          onCancelEditing={handleCancelEditing}
        />

        {/* Left Sidebar - Components */}
        <div className="absolute left-4 top-20 bottom-4 z-20">
          <ComponentsPanel 
            mode={mode}
            selectedSandboxComponent={selectedSandboxComponent}
            onSelectSandboxComponent={setSelectedSandboxComponent}
          />
        </div>

        {/* Right Sidebar - Properties Panel */}
        {(selectedElement || mode === 'sandbox') && (
          <div className="absolute right-4 top-20 bottom-4 z-20">
            <PropertiesPanel
              selectedElement={selectedElement}
              onUpdateElement={handleUpdateElement}
              onUpdateArtboard={handleUpdateArtboard}
              mode={mode}
              selectedSandboxComponent={selectedSandboxComponent}
            />
          </div>
        )}

        <DragOverlay>
          {activeComponent ? (
            <div className="flex items-center gap-2 p-2 h-auto bg-background-secondary/50 text-foreground-primary rounded-lg">
              <DiamondPlus className="h-4 w-4 text-foreground-info" />
              <Text size="caption" weight="medium" className="text-foreground-primary">
                {activeComponent.name}
              </Text>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
