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
  theme?: "light" | "dark";
}

// Custom Node type для артбордов в flow режиме - компактное представление
function ArtboardNode({ data, selected }: NodeProps) {
  const artboard = data.artboard;
  const handlers = data.handlers;
  const theme = data.theme || "dark";
  const isSelected = selected;
  
  // Компактное представление для flow - показываем только заголовок и миниатюру
  return (
    <div 
      className={`rounded-lg border-2 shadow-lg transition-all cursor-pointer ${
        isSelected 
          ? 'border-blue-500 shadow-blue-500/20' 
          : 'border-neutral-700 hover:border-neutral-600'
      } ${theme === 'light' ? 'bg-white' : 'bg-neutral-900'}`}
      style={{
        width: artboard.width || 320,
        minHeight: 120,
        position: 'relative',
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (handlers?.onSelectElement) {
          handlers.onSelectElement({
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
      }}
    >
      {/* Заголовок страницы */}
      <div className={`px-3 py-2 border-b ${
        theme === 'light' ? 'border-neutral-200 bg-neutral-50' : 'border-neutral-700 bg-neutral-800'
      }`}>
        <div className="flex items-center justify-between">
          <h3 className={`text-sm font-semibold truncate ${
            theme === 'light' ? 'text-neutral-900' : 'text-neutral-50'
          }`}>
            {artboard.name}
          </h3>
          {artboard.type === 'mobile' && (
            <span className={`text-xs px-1.5 py-0.5 rounded ${
              theme === 'light' ? 'bg-blue-100 text-blue-700' : 'bg-blue-900/30 text-blue-300'
            }`}>
              Mobile
            </span>
          )}
        </div>
      </div>
      
      {/* Миниатюра/превью содержимого */}
      <div 
        className={`p-2 ${
          theme === 'light' ? 'bg-white' : 'bg-neutral-900'
        }`}
        style={{ minHeight: 80 }}
      >
        {/* Упрощенное превью элементов */}
        {artboard.children && artboard.children.length > 0 ? (
          <div className="space-y-1">
            {artboard.children.slice(0, 3).map((child: any) => (
              <div 
                key={child.id}
                className={`h-4 rounded ${
                  theme === 'light' ? 'bg-neutral-200' : 'bg-neutral-700'
                }`}
                style={{ width: `${Math.min(100, (child.props?.width || 80))}%` }}
              />
            ))}
            {artboard.children.length > 3 && (
              <div className={`text-xs ${
                theme === 'light' ? 'text-neutral-500' : 'text-neutral-400'
              }`}>
                +{artboard.children.length - 3} more
              </div>
            )}
          </div>
        ) : (
          <div className={`text-xs text-center py-4 ${
            theme === 'light' ? 'text-neutral-400' : 'text-neutral-500'
          }`}>
            Empty page
          </div>
        )}
      </div>
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
  theme = "dark",
}: FlowCanvasProps) {
  const reactFlowInstance = useReactFlow();
  const [isInteractive, setIsInteractive] = React.useState(true);

  // Конвертируем артборды в nodes с автолейаутом
  const nodeData = useMemo(() => {
    const nodeWidth = 320;
    const nodeHeight = 120;
    const spacing = 100;
    const cols = Math.ceil(Math.sqrt(artboards.length));
    
    return artboards.map((artboard, index) => {
      // Если есть сохраненная позиция, используем её, иначе автолейаут
      const savedPosition = artboard.position;
      let position = savedPosition;
      
      if (!savedPosition || (savedPosition.x === 0 && savedPosition.y === 0)) {
        // Автоматическое размещение в сетке
        const row = Math.floor(index / cols);
        const col = index % cols;
        position = {
          x: 100 + col * (nodeWidth + spacing),
          y: 100 + row * (nodeHeight + spacing),
        };
      }
      
      return {
        id: artboard.id,
        type: 'artboard',
        position,
        data: { 
          artboard,
          theme,
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
        width: nodeWidth,
        height: nodeHeight,
      };
    });
  }, [artboards, theme, selectedElement, onSelectElement, onDeleteElement, onMoveArtboard, onMoveComponentUp, onMoveComponentDown, editingElement, onStartEditing, onSaveEditing, onCancelEditing]);

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
    <div className={`w-full h-full ${theme === 'light' ? 'bg-neutral-100' : 'bg-neutral-950'}`} style={{ height: '100%', minHeight: '400px' }}>
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
        defaultEdgeOptions={{
          style: { strokeWidth: 2, stroke: theme === 'light' ? '#3b82f6' : '#60a5fa' },
          type: 'smoothstep',
          animated: true,
        }}
        connectionLineStyle={{ strokeWidth: 2, stroke: theme === 'light' ? '#3b82f6' : '#60a5fa' }}
      >
        <Background 
          color={theme === 'light' ? '#e5e7eb' : '#666'} 
          gap={20} 
          size={1}
        />
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
