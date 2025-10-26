"use client";

import React, { useCallback, useMemo, useEffect } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Background,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  NodeProps,
  ReactFlowProvider,
  useReactFlow,
  Handle,
  Position,
  EdgeProps,
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
      style={{
        width: artboard.width,
        height: 'auto',
        border: selected ? '2px solid #3b82f6' : 'none',
        borderRadius: '8px',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Handle для исходящих связей */}
      <Handle
        type="source"
        position={Position.Right}
        style={{
          background: '#555',
          width: '12px',
          height: '12px',
        }}
      />
      
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
      
      {/* Handle для входящих связей */}
      <Handle
        type="target"
        position={Position.Left}
        style={{
          background: '#555',
          width: '12px',
          height: '12px',
        }}
      />
    </div>
  );
}

const nodeTypes = {
  artboard: ArtboardNode,
};

// Внутренний компонент
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
  const reactFlowInstance = useReactFlow();

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

  const initialEdges: Edge[] = [];
  const [nodes, setNodes, onNodesChange] = useNodesState(nodeData);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Обновляем nodes когда artboards меняются
  useEffect(() => {
    setNodes(nodeData);
  }, [nodeData, setNodes]);

  // Обработчики
  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

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

  // Zoom handlers
  const handleZoomIn = () => reactFlowInstance.zoomIn();
  const handleZoomOut = () => reactFlowInstance.zoomOut();

  return (
    <div className="w-full h-full">
      {/* Controls */}
      <div className="absolute top-4 left-4 z-10 flex gap-2 rounded-lg bg-background-primary p-2 shadow-lg">
        <Button
          onClick={handleZoomOut}
          variant="secondary"
          semantic="default"
          size="sm"
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button
          onClick={handleZoomIn}
          variant="secondary"
          semantic="default"
          size="sm"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
      </div>

      {/* Add Artboard Buttons */}
      {onAddArtboard && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2 rounded-lg bg-background-primary p-2 shadow-lg">
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
        minZoom={0.1}
        maxZoom={2}
        nodesDraggable={true}
        nodesConnectable={true}
        // Настройки для соединения
        connectionLineStyle={{ stroke: '#888', strokeWidth: 2 }}
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
