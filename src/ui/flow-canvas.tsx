"use client";

import React, { useCallback, useMemo, useEffect } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  EdgeProps,
  NodeProps,
  Handle,
  Position,
  ReactFlowProvider,
  useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { Artboard } from '@/types/page-builder';
import { Monitor, Smartphone, ZoomIn, ZoomOut } from 'lucide-react';
import { Button } from '@/components/button';
import { ArtboardComponent } from './artboard';

interface FlowCanvasProps {
  artboards: Artboard[];
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
      className="artboard-flow-node"
      style={{
        minWidth: artboard.width,
        maxWidth: artboard.width,
        minHeight: artboard.height,
        maxHeight: artboard.height,
        border: selected ? '2px solid #3b82f6' : 'none',
        borderRadius: '8px',
        background: 'transparent',
        padding: '2px',
      }}
    >
      <ArtboardComponent
        artboard={artboard}
        canvasTransform={{ x: 0, y: 0, scale: 1 }}
        disablePositioning={true}
        onSelectElement={handlers?.onSelectElement}
        selectedElement={handlers?.selectedElement}
        onDeleteElement={handlers?.onDeleteElement}
        onMoveArtboard={undefined} // Отключаем перетаскивание артборда, так как React Flow сам управляет
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

// Внутренний компонент с хуком
function FlowCanvasInner({
  artboards,
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
  // Используем хук для управления React Flow
  const { zoomIn, zoomOut, fitView } = useReactFlow();
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
      // Используем размеры артборда для ноды
      width: artboard.width,
      height: artboard.height,
    }));
  }, [artboards, selectedElement, onSelectElement, onDeleteElement, onMoveArtboard, onMoveComponentUp, onMoveComponentDown, editingElement, onStartEditing, onSaveEditing, onCancelEditing]);

  const initialEdges: Edge[] = [];

  const [nodes, setNodes, onNodesChange] = useNodesState(nodeData);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Обновляем nodes когда artboards меняются
  useEffect(() => {
    setNodes(nodeData);
  }, [nodeData, setNodes]);

  // Обработчик создания связи
  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );


  // Обработчик изменения позиции узла
  const onNodeDragStop = useCallback(
    (event: React.MouseEvent, node: Node) => {
      if (onMoveArtboard) {
        onMoveArtboard(node.id, node.position.x, node.position.y);
      }
    },
    [onMoveArtboard]
  );

  // Обработчик выбора узла
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

  const reactFlowInstance = useReactFlow();

  // Обработчик wheel для зума
  const onWheel = useCallback((event: React.WheelEvent) => {
    // Явно обрабатываем wheel события для зума
    event.preventDefault();
    const zoom = reactFlowInstance.getZoom();
    const delta = event.deltaY > 0 ? 0.9 : 1.1;
    const newZoom = Math.max(0.1, Math.min(2, zoom * delta));
    
    // Устанавливаем новый зум с учетом позиции мыши
    const rect = event.currentTarget.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    
    // Используем setCenter для зума вокруг точки мыши
    reactFlowInstance.setCenter(mouseX, mouseY, { zoom: newZoom });
  }, [reactFlowInstance]);

  return (
    <div 
      className="w-full h-full relative"
      style={{ touchAction: 'none' }}
      onWheel={onWheel}
    >
      {/* Controls and Add Artboard Buttons */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center z-10">
        {/* Zoom controls */}
        <div className="flex gap-2 rounded-lg bg-background-primary p-2 shadow-lg">
          <Button
            onClick={() => zoomOut()}
            variant="secondary"
            semantic="default"
            size="sm"
            className="flex items-center gap-2"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button
            onClick={() => zoomIn()}
            variant="secondary"
            semantic="default"
            size="sm"
            className="flex items-center gap-2"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>

        {/* Add Artboard Buttons */}
        {onAddArtboard && (
          <div className="flex gap-2 rounded-lg bg-background-primary p-2 shadow-lg">
            <Button
              onClick={() => onAddArtboard('desktop')}
              variant="secondary"
              semantic="default"
              size="sm"
              className="flex items-center gap-2"
            >
              <Monitor className="h-4 w-4" />
              Add Desktop
            </Button>
            <Button
              onClick={() => onAddArtboard('mobile')}
              variant="secondary"
              semantic="default"
              size="sm"
              className="flex items-center gap-2"
            >
              <Smartphone className="h-4 w-4" />
              Add Mobile
            </Button>
          </div>
        )}
      </div>
      
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDragStop={onNodeDragStop}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        snapToGrid={true}
        snapGrid={[20, 20]}
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
        minZoom={0.1}
        maxZoom={2}
        selectNodesOnDrag={false}
        nodesDraggable={true}
        nodesConnectable={false}
        // Позволяем dnd-kit работать внутри нод
        onNodeContextMenu={(e) => e.preventDefault()}
        preventScrolling={false}
        // Включаем зум через колесико
        zoomOnScroll={true}
        zoomOnPinch={true}
        zoomOnDoubleClick={false}
        // Явно включаем зум
        fitView={false}
      >
        <Background color="#aaa" gap={20} />
        <MiniMap />
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

