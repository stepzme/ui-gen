"use client";

import { useState } from "react";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from "@dnd-kit/core";
import { Artboard, ComponentDefinition, SelectedElement, ComponentNode } from "@/types/page-builder";
import { ComponentsPanel } from "./components-panel";
import { Canvas } from "./canvas";
import { PropertiesPanel } from "./properties-panel";
import { SandboxShowcase } from "./sandbox-showcase";
import { Header } from "./header";
import { componentDefinitions } from "@/lib/component-definitions";

export default function PageBuilder() {
  const [artboards, setArtboards] = useState<Artboard[]>([]);
  const [selectedElement, setSelectedElement] = useState<SelectedElement | null>(null);
  const [activeComponent, setActiveComponent] = useState<ComponentDefinition | null>(null);
  const [mode, setMode] = useState<'builder' | 'sandbox'>('builder');
  const [selectedSandboxComponent, setSelectedSandboxComponent] = useState<string | null>(null);
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
          children: []
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
    const newArtboard: Artboard = {
      id: `artboard-${Date.now()}`,
      name: `${type === 'desktop' ? 'Desktop' : 'Mobile'} Artboard ${artboards.length + 1}`,
      width: type === 'desktop' ? 1440 : 375,
      height: type === 'desktop' ? 900 : 812,
      type,
      gap: 16,
      status: 'draft',
      children: []
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
    setArtboards(prev => prev.map(artboard => 
      artboard.id === artboardId ? { ...artboard, ...updates } : artboard
    ));
    
    // Update selectedElement if it's the current artboard
    if (selectedElement?.type === 'artboard' && selectedElement.id === artboardId) {
      setSelectedElement(prev => prev ? { 
        ...prev, 
        name: updates.name ?? prev.name,
        status: updates.status ?? prev.status
      } : null);
    }
  };

  const handleDeleteElement = (elementId: string) => {
    console.log('handleDeleteElement called with:', elementId);
    console.log('Current artboards:', artboards);
    console.log('Selected element:', selectedElement);
    
    // Check if it's an artboard
    const artboard = artboards.find(ab => ab.id === elementId);
    if (artboard) {
      console.log('Deleting artboard:', artboard.name);
      // Confirm deletion of artboard
      const confirmed = window.confirm(
        `Are you sure you want to delete the artboard "${artboard.name}"? This action cannot be undone.`
      );
      if (confirmed) {
        setArtboards(prev => prev.filter(ab => ab.id !== elementId));
      }
    } else {
      console.log('Deleting component from artboards');
      // Delete component from artboards
      setArtboards(prev => prev.map(artboard => ({
        ...artboard,
        children: artboard.children.filter(child => child.id !== elementId)
      })));
    }
    
    // Clear selection if deleted element was selected
    if (selectedElement?.id === elementId) {
      setSelectedElement(null);
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
    // This is handled by the artboard component's local state
    // We could store positions in the artboard data if needed
    console.log(`Moving artboard ${artboardId} to position (${x}, ${y})`);
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
    // Найти артборд с этим компонентом и обновить его
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

    setEditingElement(null);
  };

  const handleCancelEditing = () => {
    setEditingElement(null);
  };

  return (
    <div className="flex flex-col h-screen w-screen relative bg-background-primary overflow-hidden">
      {/* Header */}
      <Header activeTab={mode} onTabChange={handleModeChange} />
      
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        {/* Sandbox Showcase - показывается только в sandbox режиме */}
        {mode === 'sandbox' && (
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-3/5 z-30">
            <SandboxShowcase 
              selectedComponent={selectedSandboxComponent}
            />
          </div>
        )}

        {/* Canvas as background layer */}
        <Canvas
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
        <div className="absolute right-4 top-20 bottom-4 z-20">
          <PropertiesPanel
            selectedElement={selectedElement}
            onUpdateElement={handleUpdateElement}
            onUpdateArtboard={handleUpdateArtboard}
            mode={mode}
            selectedSandboxComponent={selectedSandboxComponent}
          />
        </div>

        <DragOverlay>
          {activeComponent ? (
            <div className="p-2 bg-primary text-primary-foreground rounded-md shadow-lg">
              {activeComponent.name}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
