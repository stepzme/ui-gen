"use client";

import { Settings, Monitor, Smartphone } from "lucide-react";
import { Label } from "@/components/label";
import { Input } from "@/components/input";
import { Textarea } from "@/components/textarea";
import { Button } from "@/components/button";
import { Badge } from "@/components/badge";
import { Separator } from "@/components/separator";
import { Text } from "@/components/text";
import { Switch } from "@/components/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/select";
import { ComponentDocs } from "./component-docs";
import { useComponentDocs } from "@/hooks/use-component-docs";
import { SelectedElement, ComponentNode, Artboard } from "@/types/page-builder";
import { getSandboxConfig } from "@/lib/component-sandbox-config";

interface PropertiesPanelProps {
  selectedElement: SelectedElement | null;
  onUpdateElement: (elementId: string, updates: Partial<ComponentNode>) => void;
  onUpdateArtboard: (artboardId: string, updates: Partial<Artboard>) => void;
  mode: 'builder' | 'sandbox';
  selectedSandboxComponent?: string | null;
}

export function PropertiesPanel({ selectedElement, onUpdateElement, onUpdateArtboard, mode, selectedSandboxComponent }: PropertiesPanelProps) {
  const { docsConfig, loading, error } = useComponentDocs();

  // В sandbox режиме показываем документацию компонента
  if (mode === 'sandbox') {
    return (
      <div className="flex flex-col w-[calc(100vw-24rem)] h-full bg-background-primary border border-border-secondary/50 rounded-lg shadow-lg">
        <div className="p-4 border-b border-border-secondary">
          <Text size="h5" weight="semibold" className="flex items-center gap-2">
            Документация
          </Text>
        </div>
        <div className="flex-1 overflow-y-auto px-80 py-24 scrollbar-hide">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <Text size="body" textColor="muted">Загрузка документации...</Text>
            </div>
          ) : error ? (
            <div className="space-y-4">
              <Text size="h6" weight="semibold" className="text-foreground-critical">Ошибка загрузки</Text>
              <Text size="body" textColor="muted">{error}</Text>
            </div>
          ) : selectedSandboxComponent ? (
            (() => {
              const documentation = docsConfig[selectedSandboxComponent];
              return documentation ? (
                <ComponentDocs documentation={documentation} componentId={selectedSandboxComponent} />
              ) : (
                <div className="space-y-4">
                  <Text size="h6" weight="semibold">Компонент не найден</Text>
                  <Text size="body" textColor="muted">
                    Документация для компонента "{selectedSandboxComponent}" не найдена.
                  </Text>
                </div>
              );
            })()
          ) : (
            <div className="space-y-4">
              <Text size="h6" weight="semibold">Выберите компонент</Text>
              <Text size="body" textColor="muted">
                Выберите компонент из списка слева, чтобы просмотреть его документацию.
              </Text>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Если ничего не выбрано
  if (!selectedElement) {
    return (
      <div className="flex w-80 flex-col flex-1 h-full bg-background-primary border border-border-secondary/50 rounded-lg shadow-lg">
        <div className="p-4 border-b border-border-primary">
          <Text size="h5" weight="semibold" className="flex items-center gap-2">
            Свойства
          </Text>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-2">
            <Text size="body" textColor="muted">
              Выберите элемент для редактирования
            </Text>
          </div>
        </div>
      </div>
    );
  }

  const handlePropChange = (key: string, value: any) => {
    if (selectedElement.type === 'component' && selectedElement.node) {
      onUpdateElement(selectedElement.id, { 
        props: {
          ...selectedElement.node.props,
          [key]: value
        }
      });
    }
  };

  const handleArtboardPropChange = (key: string, value: any) => {
    onUpdateArtboard(selectedElement.id, { [key]: value });
  };

  return (
    <div className="flex w-80 flex-col flex-1 h-full bg-background-primary border border-border-secondary/50 rounded-lg shadow-lg">
      <div className="p-4 border-b border-border-primary">
        <Text size="h5" weight="semibold" className="flex items-center gap-2">
          Свойства
        </Text>
        {selectedElement.type === 'component' && (
          <Badge semantic="info" active={false} className="mt-2">
            {selectedElement.node?.type || 'Component'}
          </Badge>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {selectedElement.type === 'artboard' ? (
          <ArtboardProperties
            selectedElement={selectedElement}
            onPropChange={handleArtboardPropChange}
          />
        ) : (
          <ComponentProperties
            selectedElement={selectedElement}
            onPropChange={handlePropChange}
            onUpdateElement={onUpdateElement}
          />
        )}
      </div>
    </div>
  );
}

function ArtboardProperties({ selectedElement, onPropChange }: { selectedElement: SelectedElement; onPropChange: (key: string, value: any) => void }) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="name">Название</Label>
        <Input
          id="name"
          placeholder="Название артборда"
          value={selectedElement.name || ''}
          onChange={(e) => onPropChange('name', e.target.value)}
        />
      </div>

      <div>
        <Label>Тип устройства</Label>
        <div className="flex items-center gap-2 mt-2">
          <Button
            variant={selectedElement.artboardType === 'desktop' ? 'primary' : 'secondary'}
            semantic={selectedElement.artboardType === 'desktop' ? 'default' : 'default'}
            size="sm"
            className="flex-1"
            onClick={() => onPropChange('type', 'desktop')}
          >
            <Monitor className="h-4 w-4 mr-2" />
            Desktop
          </Button>
          <Button
            variant={selectedElement.artboardType === 'mobile' ? 'primary' : 'secondary'}
            semantic={selectedElement.artboardType === 'mobile' ? 'default' : 'default'}
            size="sm"
            className="flex-1"
            onClick={() => onPropChange('type', 'mobile')}
          >
            <Smartphone className="h-4 w-4 mr-2" />
            Mobile
          </Button>
        </div>
      </div>

      <div>
        <Label htmlFor="height">Высота</Label>
        <div className="flex items-center gap-2">
          <Input
            id="height"
            type="number"
            placeholder={selectedElement.height?.toString() || "812"}
            value={selectedElement.height || ''}
            min={0}
            max={100000}
            disabled={selectedElement.autoHeight}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (!isNaN(value) && value > 0 && value <= 100000) {
                const minHeight = selectedElement.artboardType === 'mobile' ? 800 : 900;
                const maxHeight = 100000;
                const finalHeight = value < minHeight ? minHeight : (value > maxHeight ? maxHeight : value);
                onPropChange('height', finalHeight);
                // Если ввели значение, выключаем auto height
                if (selectedElement.autoHeight) {
                  onPropChange('autoHeight', false);
                }
              }
            }}
          />
          <Button
            variant={selectedElement.autoHeight ? 'primary' : 'secondary'}
            semantic="default"
            size="sm"
            onClick={() => onPropChange('autoHeight', !selectedElement.autoHeight)}
            title={selectedElement.autoHeight ? "Фиксированная высота" : "Автоматическая высота"}
          >
            A
          </Button>
        </div>
      </div>

      <div>
        <Label htmlFor="status">Статус</Label>
        <Select
          value={selectedElement.status || 'draft'}
          onValueChange={(value) => onPropChange('status', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Выберите статус" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="review">Review</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="published">Published</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

function ComponentProperties({ 
  selectedElement, 
  onPropChange, 
  onUpdateElement
}: { 
  selectedElement: SelectedElement; 
  onPropChange: (key: string, value: any) => void; 
  onUpdateElement: (elementId: string, updates: Partial<ComponentNode>) => void;
}) {
  if (!selectedElement.node) return null;

  const component = selectedElement.node;
  const allProps = component.props;

  // Список пропсов, которые должны быть Select
  const SELECT_PROPS = [
    'variant', 'semantic', 'size', 'type', 'orientation', 'side', 
    'weight', 'textColor', 'radius', 'aspectRatio', 'objectFit',
    'titleSize', 'descriptionSize', 'titleWeight', 'descriptionWeight',
    'titleColor', 'descriptionColor', 'avatarSize'
  ];

  // Получаем варианты для пропа из sandbox конфигурации
  const getSelectOptions = (propName: string): string[] => {
    const componentType = component.type;
    const sandboxConfig = getSandboxConfig(componentType);
    
    if (!sandboxConfig?.generateVariants) {
      return [];
    }
    
    // Создаем фиктивный компонент для генерации вариантов
    const mockComponent = {
      id: componentType,
      name: componentType,
      category: 'test',
      component: () => null,
      defaultProps: {}
    };
    
    try {
      const sections = sandboxConfig.generateVariants(mockComponent);
      
      // Собираем все уникальные значения для данного пропа
      const values = new Set<string>();
      
      sections.forEach((section: any) => {
        section.variants.forEach((variant: any) => {
          if (variant.props[propName]) {
            values.add(variant.props[propName] as string);
          }
        });
      });
      
      return Array.from(values);
    } catch (error) {
      console.warn(`Failed to get options for ${componentType}.${propName}:`, error);
      return [];
    }
  };

  // Определяем тип контрола
  const getControlType = (propName: string, val: any): 'text' | 'number' | 'boolean' | 'select' => {
    if (typeof val === 'boolean') return 'boolean';
    if (typeof val === 'number') return 'number';
    if (SELECT_PROPS.includes(propName)) return 'select';
    return 'text';
  };

  // Рендерим контрол для пропа
  const renderPropControl = (propName: string, propValue: any) => {
    const controlType = getControlType(propName, propValue);

    switch (controlType) {
      case 'boolean':
        return (
          <div className="flex items-center justify-between">
            <Label htmlFor={propName}>
              {propName.charAt(0).toUpperCase() + propName.slice(1)}
            </Label>
            <Switch
              id={propName}
              checked={propValue || false}
              onCheckedChange={(checked: boolean) => onPropChange(propName, checked)}
            />
          </div>
        );
        
      case 'number':
        return (
          <div>
            <Label htmlFor={propName}>
              {propName.charAt(0).toUpperCase() + propName.slice(1)}
            </Label>
            <Input
              id={propName}
              type="number"
              value={propValue || 0}
              onChange={(e) => onPropChange(propName, parseInt(e.target.value) || 0)}
            />
          </div>
        );
        
      case 'select':
        const selectOptions = getSelectOptions(propName);
        return (
          <div>
            <Label htmlFor={propName}>
              {propName.charAt(0).toUpperCase() + propName.slice(1)}
            </Label>
            <Select
              value={propValue || ''}
              onValueChange={(value) => onPropChange(propName, value)}
            >
              <SelectTrigger>
                <SelectValue placeholder={`Select ${propName}`} />
              </SelectTrigger>
              <SelectContent>
                {selectOptions.length > 0 ? (
                  selectOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value={propValue || ''}>
                    {propValue || 'No options'}
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
        );
        
      default: // text
        return (
          <div>
            <Label htmlFor={propName}>
              {propName.charAt(0).toUpperCase() + propName.slice(1)}
            </Label>
            <Input
              id={propName}
              value={propValue || ''}
              onChange={(e) => onPropChange(propName, e.target.value)}
            />
          </div>
        );
    }
  };

  return (
    <div className="space-y-4">
      {/* Full Width Toggle */}
      <div className="flex h-auto items-center justify-between">
        <Label htmlFor="fullWidth">Full Width</Label>
        <Switch
          id="fullWidth"
          checked={component.fullWidth || false}
          onCheckedChange={(checked: boolean) => onUpdateElement(selectedElement.id, { fullWidth: checked })}
        />
      </div>

      <Separator />

      {/* Автоматически генерируемые контролы для всех пропсов */}
      {Object.entries(allProps).map(([propName, propValue]) => (
        <div key={propName}>
          {renderPropControl(propName, propValue)}
          </div>
      ))}
    </div>
  );
}