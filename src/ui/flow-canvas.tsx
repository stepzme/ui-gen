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
} from 'reactflow';
import 'reactflow/dist/style.css';

import { Artboard } from '@/types/page-builder';
import { Monitor, Smartphone } from 'lucide-react';
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
function ArtboardNode({ data }: NodeProps) {
  const artboard = data.artboard;
  const handlers = data.handlers;

  return (
    <div 
      className="artboard-flow-node"
      style={{
        width: '100%',
        height: '100%',
      }}
      onPointerDown={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
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

export function FlowCanvas({
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

  return (
    <div className="w-full h-full relative">
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
        selectNodesOnDrag={false}
        nodesDraggable={true}
        nodesConnectable={false}
      >
        <Background color="#aaa" gap={20} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}

