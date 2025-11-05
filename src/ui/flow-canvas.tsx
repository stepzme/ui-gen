"use client";

import React, { useCallback, useMemo, useLayoutEffect } from 'react';
import ReactFlow, {
  Node,
  Edge as RFEdge,
  Background,
  useNodesState,
  NodeProps,
  ReactFlowProvider,
  useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { Artboard, ComponentNode } from '@/types/page-builder';
import { Plus, ZoomIn, ZoomOut, Lock, Unlock } from 'lucide-react';
import { Button } from '@/components/button';
import { ArtboardComponent } from './artboard';

interface FlowCanvasProps {
  artboards: Artboard[];
  edges?: Array<{ id: string; source: { kind: 'page'|'element'; id: string }; targetPageId: string; label?: string }>;
  onAddArtboard?: (type: 'desktop' | 'mobile') => void;
  onSelectElement?: (element: any) => void;
  selectedElement?: any;
  onDeleteElement?: (elementId: string) => void;
  onMoveArtboard?: (artboardId: string, x: number, y: number) => void;
  onMoveComponentUp?: (elementId: string) => void;
  onMoveComponentDown?: (elementId: string) => void;
  onDeselectElement?: () => void;
  editingElement?: any;
  onStartEditing?: (componentId: string, prop: string, value: string) => void;
  onSaveEditing?: (componentId: string, prop: string, newValue: string) => void;
  onCancelEditing?: () => void;
}

// Custom Node type для артбордов
function ArtboardNode({ data, selected }: NodeProps) {
  const artboard = data.artboard;
  const handlers = data.handlers;
  return (
    <div 
      style={{
        width: 'auto',
        height: 'auto',
        borderRadius: '8px',
        position: 'relative',
      }}
    >
      <ArtboardComponent
        artboard={artboard}
        canvasTransform={{ x: 0, y: 0, scale: 1 }}
        disablePositioning={true}
        onSelectElement={handlers?.onSelectElement}
        selectedElement={handlers?.selectedElement}
        onDeleteElement={handlers?.onDeleteElement}
        onMoveArtboard={undefined}
        onMoveComponentUp={handlers?.onMoveComponentUp}
        onMoveComponentDown={handlers?.onMoveComponentDown}
        editingElement={handlers?.editingElement}
        onStartEditing={handlers?.onStartEditing}
        onSaveEditing={handlers?.onSaveEditing}
        onCancelEditing={handlers?.onCancelEditing}
      />
    </div>
  );
}

const nodeTypes = {
  artboard: ArtboardNode,
};

// Кастомный Controls компонент
function CustomControls({ 
  onAddArtboard, 
  isInteractive, 
  onToggleInteractive 
}: { 
  onAddArtboard?: (type: 'desktop' | 'mobile') => void;
  isInteractive: boolean;
  onToggleInteractive: () => void;
}) {
  const reactFlowInstance = useReactFlow();

  const handleZoomIn = () => {
    reactFlowInstance.zoomIn();
  };

  const handleZoomOut = () => {
    reactFlowInstance.zoomOut();
  };

  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-1">
      {onAddArtboard && (
        <Button
          variant="primary"
          semantic="default"
          size="icon-sm"
          onClick={() => onAddArtboard('mobile')}
        >
          <Plus className="h-4 w-4" />
        </Button>
      )}
      <Button
          variant="primary"
          semantic="default"
          size="icon-sm"
          onClick={handleZoomIn}
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button
          variant="primary"
          semantic="default"
          size="icon-sm"
          onClick={handleZoomOut}
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button
          variant="primary"
          semantic="default"
          size="icon-sm"
          onClick={onToggleInteractive}
        >
          {isInteractive ? <Unlock className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
        </Button>
    </div>
  );
}

// Внутренний компонент
function FlowCanvasInner({
  artboards,
  edges,
  onAddArtboard,
  onSelectElement,
  selectedElement,
  onDeleteElement,
  onMoveArtboard,
  onMoveComponentUp,
  onMoveComponentDown,
  onDeselectElement,
  editingElement,
  onStartEditing,
  onSaveEditing,
  onCancelEditing,
}: FlowCanvasProps) {
  const reactFlowInstance = useReactFlow();
  const [isInteractive, setIsInteractive] = React.useState(true);

  // Конвертируем артборды в nodes
  const nodeData = useMemo(() => {
    return artboards.map((artboard) => ({
      id: artboard.id,
      type: 'artboard',
      position: artboard.position || { x: 100, y: 100 },
      data: { 
        artboard,
        handlers: {
          onSelectElement,
          selectedElement,
          onDeleteElement,
          onMoveArtboard,
          onMoveComponentUp,
          onMoveComponentDown,
          editingElement,
          onStartEditing,
          onSaveEditing,
          onCancelEditing,
        }
      },
      selected: selectedElement?.id === artboard.id,
      width: artboard.width,
      height: artboard.height,
    }));
  }, [artboards, selectedElement, onSelectElement, onDeleteElement, onMoveArtboard, onMoveComponentUp, onMoveComponentDown, editingElement, onStartEditing, onSaveEditing, onCancelEditing]);

  const [nodes, setNodes, onNodesChange] = useNodesState(nodeData);

  const rfEdges: RFEdge[] = useMemo(() => {
    const pageEdges = (edges || []).filter(e => e.source.kind === 'page');
    return pageEdges.map((e) => ({ id: e.id, source: e.source.id, target: e.targetPageId }));
  }, [edges]);

  // Обновляем nodes когда artboards меняются
  useLayoutEffect(() => {
    setNodes(nodeData);
  }, [nodeData, setNodes]);

  const onNodeDragStop = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      if (onMoveArtboard) {
        onMoveArtboard(node.id, node.position.x, node.position.y);
      }
    },
    [onMoveArtboard]
  );

  const onNodeClick = useCallback(
    (event: React.MouseEvent, node: Node) => {
      if (onSelectElement) {
        const artboard = artboards.find((ab) => ab.id === node.id);
        if (artboard) {
          onSelectElement({
            type: 'artboard',
            id: artboard.id,
            name: artboard.name,
            status: artboard.status,
            artboardType: artboard.type,
            width: artboard.width,
            height: artboard.height,
            autoHeight: artboard.autoHeight,
          });
        }
      }
    },
    [artboards, onSelectElement]
  );

  const onPaneClick = useCallback(
    (event: React.MouseEvent) => {
      // Снимаем выделение при клике на пустую область canvas
      if (onDeselectElement) {
        onDeselectElement();
      }
    },
    [onDeselectElement]
  );

  return (
    <div className="w-full h-full bg-background-secondary dark:bg-background-secondary/20">

      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={rfEdges}
        onNodeDragStop={onNodeDragStop}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        snapToGrid={true}
        snapGrid={[20, 20]}
        minZoom={0.1}
        maxZoom={2}
        nodesDraggable={isInteractive}
      >
        <Background color="#666" gap={20} />
        <CustomControls 
          onAddArtboard={onAddArtboard} 
          isInteractive={isInteractive}
          onToggleInteractive={() => setIsInteractive(!isInteractive)}
        />
      </ReactFlow>
    </div>
  );
}

// Экспортируемая обертка с провайдером
export function FlowCanvas(props: FlowCanvasProps) {
  return (
    <ReactFlowProvider>
      <FlowCanvasInner {...props} />
    </ReactFlowProvider>
  );
}
