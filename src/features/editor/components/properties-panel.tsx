"use client";

import React, { useCallback } from "react";
import { Settings, Monitor, Smartphone, Dice1 } from "lucide-react";
import { Button } from "@/imported/components/ui/button";
import { Badge } from "@/imported/components/ui/badge";
import { Typography } from "@/imported/components/meta/typography";
import { SelectIcon } from "./select-icon";
import { ComponentDocs } from "./component-docs";
import { useComponentDocs } from "@/hooks/use-component-docs";
import { SelectedElement, ComponentNode, Artboard } from "@/types/page-builder";
import { getSandboxConfig } from "@/lib/components/component-sandbox-config";

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
          <Typography typography="headlineS" className="flex items-center gap-2">
            Документация
          </Typography>
        </div>
        <div className="flex-1 overflow-y-auto px-80 py-24 scrollbar-hide">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <Typography typography="bodyM_paragraph_normal" style={{ color: 'var(--semantic-text-secondary)' }}>Загрузка документации...</Typography>
            </div>
          ) : error ? (
            <div className="space-y-4">
              <Typography typography="headlineXXS" style={{ color: 'var(--semantic-text-critical)' }}>Ошибка загрузки</Typography>
              <Typography typography="bodyM_paragraph_normal" style={{ color: 'var(--semantic-text-secondary)' }}>{error}</Typography>
            </div>
          ) : selectedSandboxComponent ? (
            (() => {
              const documentation = docsConfig[selectedSandboxComponent];
              return documentation ? (
                <ComponentDocs documentation={documentation} componentId={selectedSandboxComponent} />
              ) : (
                <div className="space-y-4">
                  <Typography typography="headlineXXS">Компонент не найден</Typography>
                  <Typography typography="bodyM_paragraph_normal" style={{ color: 'var(--semantic-text-secondary)' }}>
                    Документация для компонента "{selectedSandboxComponent}" не найдена.
                  </Typography>
                </div>
              );
            })()
          ) : (
            <div className="space-y-4">
              <Typography typography="headlineXXS">Выберите компонент</Typography>
              <Typography typography="bodyM_paragraph_normal" style={{ color: 'var(--semantic-text-secondary)' }}>
                Выберите компонент из списка слева, чтобы просмотреть его документацию.
              </Typography>
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
          <Typography typography="headlineS" className="flex items-center gap-2">
            Свойства
          </Typography>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-2">
            <Typography typography="bodyM_paragraph_normal" style={{ color: 'var(--semantic-text-secondary)' }}>
              Выберите элемент для редактирования
            </Typography>
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

  const handleArtboardPropChange = useCallback((key: string, value: any) => {
    onUpdateArtboard(selectedElement.id, { [key]: value });
  }, [selectedElement.id, onUpdateArtboard]);

  return (
    <div className="flex w-80 flex-col flex-1 h-full bg-background-primary border border-border-secondary/50 rounded-lg shadow-lg">
      <div className="p-4 border-b border-border-primary">
        <Typography typography="headlineS" className="flex items-center gap-2">
          Свойства
        </Typography>
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

const ArtboardProperties = React.memo(({ selectedElement, onPropChange }: { selectedElement: SelectedElement; onPropChange: (key: string, value: any) => void }) => {
  return (
    <div className="space-y-4">
      
      <div className="flex items-center gap-2">
        <Typography typography="bodyS_tight_medium" className="w-2/3">Статус</Typography>
          <Select
          value={selectedElement.status || 'draft'}
          onValueChange={(value) => onPropChange('status', value)}
          >
            <SelectTrigger>
            <SelectValue placeholder="Выберите статус" />
            </SelectTrigger>
            <SelectContent>
            <SelectItem value="draft"><Badge semantic="default" active={false}>В работе</Badge></SelectItem>
            <SelectItem value="review"><Badge semantic="warning" active={false}>На ревью</Badge></SelectItem>
            <SelectItem value="approved"><Badge semantic="success" active={false}>Ревью пройдено</Badge></SelectItem>
            <SelectItem value="published"><Badge semantic="accent" active={false}>Готово</Badge></SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
        <Typography typography="bodyS_tight_medium" className="w-2/3">Высота</Typography>
        <div className="flex w-full items-center gap-2">
          
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
            size="default"
            onClick={() => onPropChange('autoHeight', !selectedElement.autoHeight)}
            title={selectedElement.autoHeight ? "Фиксированная высота" : "Автоматическая высота"}
          >
            Auto
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Typography typography="bodyS_tight_medium" className="w-2/3">Устройство</Typography>
        <div className="flex items-center w-full gap-2">
          <Button
            variant={selectedElement.artboardType === 'desktop' ? 'primary' : 'secondary'}
            semantic={selectedElement.artboardType === 'desktop' ? 'default' : 'default'}
            size="sm"
            className="flex-1"
            onClick={() => onPropChange('type', 'desktop')}
        >
            Desktop
          </Button>
          <Button
            variant={selectedElement.artboardType === 'mobile' ? 'primary' : 'secondary'}
            semantic={selectedElement.artboardType === 'mobile' ? 'default' : 'default'}
            size="sm"
            className="flex-1"
            onClick={() => onPropChange('type', 'mobile')}
          >
            Mobile
          </Button>
        </div>
      </div>


      {selectedElement.artboardType === 'mobile' && (
        <>
          <Separator />
          <div>
            <Typography typography="headlineS" className="mb-3">Навбар</Typography>
          </div>
          
          <div className="flex items-center gap-2">
            <Typography typography="bodyS_tight_medium" className="w-2/3">Платформа</Typography>
            <div className="flex items-center w-full gap-2">
              <Button
                variant={selectedElement.navbarVariant === 'ios' ? 'primary' : 'secondary'}
                semantic={selectedElement.navbarVariant === 'ios' ? 'default' : 'default'}
                size="sm"
                className="flex-1"
                onClick={() => onPropChange('navbarVariant', 'ios')}
              >
                iOS
              </Button>
              <Button
                variant={selectedElement.navbarVariant === 'android' ? 'primary' : 'secondary'}
                semantic={selectedElement.navbarVariant === 'android' ? 'default' : 'default'}
                size="sm"
                className="flex-1"
                onClick={() => onPropChange('navbarVariant', 'android')}
              >
                Android
              </Button>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mt-2">
              <Typography typography="bodyS_tight_medium" className="w-2/3">
                Навбар
              </Typography>
              <Switch
                id="navbarShowNavigation"
                checked={selectedElement.navbarShowNavigation ?? true}
                onCheckedChange={(checked) => onPropChange('navbarShowNavigation', checked)}
              />
            </div>
          </div>

          {(selectedElement.navbarShowNavigation ?? true) && (
            <>

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <Typography typography="bodyS_tight_medium" className="w-2/3">Тайтл</Typography>
                  <Switch
                    id="navbarShowTitle"
                    checked={selectedElement.navbarShowTitle ?? true}
                    onCheckedChange={(checked) => onPropChange('navbarShowTitle', checked)}
                  />
                </div>
                {(selectedElement.navbarShowTitle ?? true) && (
                  <Input
                    id="navbarTitle"
                    placeholder="Заголовок навбара"
                    value={selectedElement.navbarTitle || ''}
                    onChange={(e) => onPropChange('navbarTitle', e.target.value)}
                    className="w-full"
                  />
                )}
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <Typography typography="bodyS_tight_medium" className="w-2/3">Описание</Typography>
                  <Switch
                    id="navbarShowDescription"
                    checked={selectedElement.navbarShowDescription ?? true}
                    onCheckedChange={(checked) => onPropChange('navbarShowDescription', checked)}
                  />
                </div>
                {(selectedElement.navbarShowDescription ?? true) && (
                  <Input
                    id="navbarDescription"
                    placeholder="Описание навбара"
                    value={selectedElement.navbarDescription || ''}
                    onChange={(e) => onPropChange('navbarDescription', e.target.value)}
                    className="w-full"
                  />
                )}
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <Typography typography="bodyS_tight_medium" className="w-2/3">Правая кнопка</Typography>
                  <Switch
                    id="navbarShowRightButton"
                    checked={selectedElement.navbarShowRightButton ?? true}
                    onCheckedChange={(checked) => onPropChange('navbarShowRightButton', checked)}
                  />
                </div>
                {(selectedElement.navbarShowRightButton ?? true) && (
                  <SelectIcon
                    value={selectedElement.navbarRightIcon || 'three_dots_vert'}
                    onValueChange={(value) => onPropChange('navbarRightIcon', value)}
                    placeholder="Выберите иконку..."
                    className="w-full"
                  />
                )}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
});

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
      return [];
    }
  };

  // Определяем тип контрола
  const getControlType = (propName: string, val: any): 'text' | 'number' | 'boolean' | 'select' | 'icon' => {
    if (typeof val === 'boolean') return 'boolean';
    if (typeof val === 'number') return 'number';
    // Специальная обработка для icon в buttonIcon
    if (propName === 'icon' && component.type === 'buttonIcon') return 'icon';
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
        
      case 'icon':
        return (
          <div>
            <Label htmlFor={propName}>
              {propName.charAt(0).toUpperCase() + propName.slice(1)}
            </Label>
            <SelectIcon
              value={propValue || ''}
              onValueChange={(value) => onPropChange(propName, value)}
              placeholder="Select icon..."
            />
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
      {Object.entries(allProps)
        .filter(([propName]) => {
          // Исключаем size для buttonIcon
          if (component.type === 'buttonIcon' && propName === 'size') {
            return false;
          }
          return true;
        })
        .map(([propName, propValue]) => (
        <div key={propName}>
          {renderPropControl(propName, propValue)}
          </div>
      ))}
    </div>
  );
}