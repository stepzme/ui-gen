"use client";

import React from "react";
import { ComponentNode } from "@/types/page-builder";
import { componentDefinitions } from "@/lib/component-definitions";
import { InlineEditor } from "./inline-editor";

interface ComponentRendererProps {
  component: typeof componentDefinitions[0];
  props: any;
  children?: ComponentNode[];
  componentId?: string;
  editingElement?: {
    id: string;
    prop: string;
    value: string;
  } | null;
  onStartEditing?: (componentId: string, prop: string, value: string) => void;
  onSaveEditing?: (componentId: string, prop: string, newValue: string) => void;
  onCancelEditing?: () => void;
}

export function ComponentRenderer({ 
  component, 
  props, 
  children, 
  componentId,
  editingElement,
  onStartEditing,
  onSaveEditing,
  onCancelEditing
}: ComponentRendererProps) {
  const Component = component.component;

  // Определяем, какой проп редактируется
  const isEditing = editingElement?.id === componentId;
  const editingProp = editingElement?.prop;

  // Функция для обработки двойного клика
  const handleDoubleClick = (prop: string, value: string) => {
    if (onStartEditing && componentId) {
      onStartEditing(componentId, prop, value);
    }
  };

  // Функция для сохранения редактирования
  const handleSave = (prop: string, newValue: string) => {
    if (onSaveEditing && componentId) {
      onSaveEditing(componentId, prop, newValue);
    }
  };

  // Функция для отмены редактирования
  const handleCancel = () => {
    if (onCancelEditing) {
      onCancelEditing();
    }
  };

  // Определяем, нужно ли показывать inline редактор
  const shouldShowInlineEditor = (prop: string) => {
    return isEditing && editingProp === prop;
  };

  // Создаем пропсы с поддержкой inline редактирования
  const createEditableProps = () => {
    const editableProps = { ...props };

    // Для Text компонентов - редактируем children
    if (component.id === 'text' && typeof props.children === 'string') {
      if (shouldShowInlineEditor('children')) {
        editableProps.children = (
          <InlineEditor
            value={editingElement?.value || ''}
            onSave={(newValue) => handleSave('children', newValue)}
            onCancel={handleCancel}
            className="w-full bg-transparent border-none outline-none"
          />
        );
      } else {
        editableProps.onDoubleClick = () => handleDoubleClick('children', props.children);
        editableProps.style = { ...editableProps.style, cursor: 'text' };
      }
    }

    // Для Button компонентов - редактируем children
    if (component.id === 'button' && typeof props.children === 'string') {
      if (shouldShowInlineEditor('children')) {
        editableProps.children = (
          <InlineEditor
            value={editingElement?.value || ''}
            onSave={(newValue) => handleSave('children', newValue)}
            onCancel={handleCancel}
            className="w-full bg-transparent border-none outline-none"
          />
        );
      } else {
        editableProps.onDoubleClick = () => handleDoubleClick('children', props.children);
        editableProps.style = { ...editableProps.style, cursor: 'text' };
      }
    }

    // Для Input компонентов - редактируем placeholder
    if (component.id === 'input' && props.placeholder) {
      if (shouldShowInlineEditor('placeholder')) {
        editableProps.placeholder = (
          <InlineEditor
            value={editingElement?.value || ''}
            onSave={(newValue) => handleSave('placeholder', newValue)}
            onCancel={handleCancel}
            className="w-full bg-transparent border-none outline-none"
          />
        );
      } else {
        editableProps.onDoubleClick = () => handleDoubleClick('placeholder', props.placeholder);
        editableProps.style = { ...editableProps.style, cursor: 'text' };
      }
    }

    // Для Textarea компонентов - редактируем children
    if (component.id === 'textarea' && typeof props.children === 'string') {
      if (shouldShowInlineEditor('children')) {
        editableProps.children = (
          <InlineEditor
            value={editingElement?.value || ''}
            onSave={(newValue) => handleSave('children', newValue)}
            onCancel={handleCancel}
            className="w-full bg-transparent border-none outline-none resize-none"
            multiline={true}
          />
        );
      } else {
        editableProps.onDoubleClick = () => handleDoubleClick('children', props.children);
        editableProps.style = { ...editableProps.style, cursor: 'text' };
      }
    }

    return editableProps;
  };

  // Handle components with text children
  if (typeof props.children === 'string') {
    return <Component {...createEditableProps()} />;
  }

  // Handle components with React children
  if (props.children) {
    return <Component {...createEditableProps()} />;
  }

  // Default render
  return <Component {...createEditableProps()} />;
}
