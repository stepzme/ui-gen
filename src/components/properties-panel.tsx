"use client";

import { Settings, Monitor, Smartphone } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Text } from "@/components/ui/text";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ComponentDocs } from "@/components/component-docs";
import { componentDocsConfig } from "@/lib/component-docs/config";
import { SelectedElement, ComponentNode, Artboard } from "@/types/page-builder";

interface PropertiesPanelProps {
  selectedElement: SelectedElement | null;
  onUpdateElement: (elementId: string, updates: Partial<ComponentNode>) => void;
  onUpdateArtboard: (artboardId: string, updates: Partial<Artboard>) => void;
  mode: 'builder' | 'sandbox';
  selectedSandboxComponent?: string | null;
}

export function PropertiesPanel({ selectedElement, onUpdateElement, onUpdateArtboard, mode, selectedSandboxComponent }: PropertiesPanelProps) {

  // В sandbox режиме показываем документацию компонента
  if (mode === 'sandbox') {
    return (
      <div className="flex flex-col w-80 h-full bg-background-primary border border-border-secondary/50 rounded-lg shadow-lg">
        <div className="p-4 border-b border-border-primary">
          <Text size="h5" weight="semibold" className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Документация
          </Text>
        </div>
        <div className="flex-1 overflow-y-auto p-4 scrollbar-hide">
          {selectedSandboxComponent ? (
            (() => {
              const documentation = componentDocsConfig[selectedSandboxComponent];
              return documentation ? (
                <ComponentDocs documentation={documentation} />
              ) : (
                <div className="space-y-4">
                  <Text size="h6" weight="semibold">Документация не найдена</Text>
                  <Text size="body" textColor="muted">
                    Документация для компонента "{selectedSandboxComponent}" пока не создана.
                  </Text>
                </div>
              );
            })()
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-foreground-secondary">
                <Settings className="h-6 w-6 mx-auto mb-4 opacity-50" />
                <Text size="body" textColor="muted">Выберите компонент для просмотра документации</Text>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Builder режим - обычная логика
  if (!selectedElement) {
    return (
      <div className="flex flex-col w-80 h-full bg-background-primary border border-border-secondary/50 rounded-lg shadow-lg">
        <div className="p-4 border-b border-border-primary">
          <Text size="h5" weight="semibold" className="flex items-center gap-2">
            Свойства
          </Text>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-foreground-secondary">
            <Settings className="h-6 w-6 mx-auto mb-4 opacity-50" />
            <Text size="body" textColor="muted">Выберите элемент, чтобы редактировать свойства</Text>
          </div>
        </div>
      </div>
    );
  }

  const handlePropChange = (key: string, value: any) => {
    if (selectedElement.type === 'component' && selectedElement.node) {
      onUpdateElement(selectedElement.id, { 
        props: { ...selectedElement.node.props, [key]: value } 
      });
    }
  };

  const handleArtboardPropChange = (key: string, value: any) => {
    onUpdateArtboard(selectedElement.id, { [key]: value });
  };

  return (
    <div className="flex flex-col w-80 h-full bg-background-primary border border-border-secondary/50 rounded-lg shadow-lg">
      <div className="p-4 border-b border-border-primary">
        <Text size="h5" weight="semibold" className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Свойства
        </Text>
        {selectedElement.type === 'artboard' && (
          <Badge semantic="default" active={false} className="mt-2">
            {selectedElement.name || 'Untitled Artboard'}
          </Badge>
        )}
        {selectedElement.type === 'component' && (
          <Badge semantic="default" active={false} className="mt-2">
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
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          placeholder="Artboard name"
          onChange={(e) => onPropChange('name', e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="status">Status</Label>
        <Select
          value={selectedElement.status || 'draft'}
          onValueChange={(value) => onPropChange('status', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="review">Review</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="published">Published</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="gap">Gap (px)</Label>
        <Input
          id="gap"
          type="number"
          placeholder="16"
          onChange={(e) => onPropChange('gap', parseInt(e.target.value) || 16)}
        />
      </div>

      <Separator />

      <div>
        <Text size="caption" weight="medium" className="mb-2">Dimensions</Text>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label htmlFor="width">Width</Label>
            <Input
              id="width"
              type="number"
              placeholder="1440"
              onChange={(e) => onPropChange('width', parseInt(e.target.value) || 1440)}
            />
          </div>
          <div>
            <Label htmlFor="height">Height</Label>
            <Input
              id="height"
              type="number"
              placeholder="900"
              onChange={(e) => onPropChange('height', parseInt(e.target.value) || 900)}
            />
          </div>
        </div>
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

  return (
    <div className="space-y-4">
      {/* Full Width Toggle */}
      <div className="flex items-center justify-between">
        <Label htmlFor="fullWidth">Full Width</Label>
        <Switch
          id="fullWidth"
          checked={component.fullWidth || false}
          onCheckedChange={(checked: boolean) => onUpdateElement(selectedElement.id, { fullWidth: checked })}
        />
      </div>

      <Separator />

      {/* Common props for all components */}
      <div>
        <Label htmlFor="className">CSS Classes</Label>
        <Input
          id="className"
          placeholder="custom-class"
          value={allProps.className || ''}
          onChange={(e) => onPropChange('className', e.target.value)}
        />
      </div>

      {/* Button specific props */}
      {component.type === 'button' && (
        <>
          <div>
            <Label htmlFor="children">Button Text</Label>
            <Input
              id="children"
              placeholder="Click me"
              value={allProps.children || ''}
              onChange={(e) => onPropChange('children', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="variant">Variant</Label>
            <Select
              value={allProps.variant || 'primary'}
              onValueChange={(value) => onPropChange('variant', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select variant" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="primary">Primary</SelectItem>
                <SelectItem value="destructive">Destructive</SelectItem>
                <SelectItem value="outline">Outline</SelectItem>
                <SelectItem value="secondary">Secondary</SelectItem>
                <SelectItem value="ghost">Ghost</SelectItem>
                <SelectItem value="link">Link</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="size">Size</Label>
            <Select
              value={allProps.size || 'default'}
              onValueChange={(value) => onPropChange('size', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="primary">Primary</SelectItem>
                <SelectItem value="sm">Small</SelectItem>
                <SelectItem value="lg">Large</SelectItem>
                <SelectItem value="icon">Icon</SelectItem>
                <SelectItem value="icon-sm">Icon Small</SelectItem>
                <SelectItem value="icon-lg">Icon Large</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="asChild">As Child</Label>
            <Switch
              id="asChild"
              checked={allProps.asChild || false}
              onCheckedChange={(checked: boolean) => onPropChange('asChild', checked)}
            />
          </div>
        </>
      )}

      {/* Input specific props */}
      {component.type === 'input' && (
        <>
          <div>
            <Label htmlFor="placeholder">Placeholder</Label>
            <Input
              id="placeholder"
              placeholder="Enter placeholder..."
              value={allProps.placeholder || ''}
              onChange={(e) => onPropChange('placeholder', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="type">Type</Label>
            <Select
              value={allProps.type || 'text'}
              onValueChange={(value) => onPropChange('type', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Text</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="password">Password</SelectItem>
                <SelectItem value="number">Number</SelectItem>
                <SelectItem value="tel">Tel</SelectItem>
                <SelectItem value="url">URL</SelectItem>
                <SelectItem value="search">Search</SelectItem>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="time">Time</SelectItem>
                <SelectItem value="datetime-local">DateTime Local</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="disabled">Disabled</Label>
            <Switch
              id="disabled"
              checked={allProps.disabled || false}
              onCheckedChange={(checked: boolean) => onPropChange('disabled', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="required">Required</Label>
            <Switch
              id="required"
              checked={allProps.required || false}
              onCheckedChange={(checked: boolean) => onPropChange('required', checked)}
            />
          </div>
        </>
      )}

      {/* Textarea specific props */}
      {component.type === 'textarea' && (
        <>
          <div>
            <Label htmlFor="children">Textarea Content</Label>
            <Textarea
              id="children"
              placeholder="Enter text content..."
              value={allProps.children || ''}
              onChange={(e) => onPropChange('children', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="placeholder">Placeholder</Label>
            <Input
              id="placeholder"
              placeholder="Enter placeholder..."
              value={allProps.placeholder || ''}
              onChange={(e) => onPropChange('placeholder', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="rows">Rows</Label>
            <Input
              id="rows"
              type="number"
              placeholder="3"
              value={allProps.rows || 3}
              onChange={(e) => onPropChange('rows', parseInt(e.target.value) || 3)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="disabled">Disabled</Label>
            <Switch
              id="disabled"
              checked={allProps.disabled || false}
              onCheckedChange={(checked: boolean) => onPropChange('disabled', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="required">Required</Label>
            <Switch
              id="required"
              checked={allProps.required || false}
              onCheckedChange={(checked: boolean) => onPropChange('required', checked)}
            />
          </div>
        </>
      )}

      {/* Text specific props */}
      {(component.type.startsWith('text-') || component.type === 'text-h1' || component.type === 'text-h2' || component.type === 'text-h3' || component.type === 'text-body' || component.type === 'text-caption' || component.type === 'text-footnote') && (
        <>
          <div>
            <Label htmlFor="children">Text Content</Label>
            <Textarea
              id="children"
              placeholder="Enter text content..."
              value={allProps.children || ''}
              onChange={(e) => onPropChange('children', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="size">Size</Label>
            <Select
              value={allProps.size || 'body'}
              onValueChange={(value) => onPropChange('size', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="h1">Heading 1</SelectItem>
                <SelectItem value="h2">Heading 2</SelectItem>
                <SelectItem value="h3">Heading 3</SelectItem>
                <SelectItem value="h4">Heading 4</SelectItem>
                <SelectItem value="h5">Heading 5</SelectItem>
                <SelectItem value="h6">Heading 6</SelectItem>
                <SelectItem value="body">Body</SelectItem>
                <SelectItem value="caption">Caption</SelectItem>
                <SelectItem value="footnote">Footnote</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="weight">Font Weight</Label>
            <Select
              value={allProps.weight || 'normal'}
              onValueChange={(value) => onPropChange('weight', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select weight" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="thin">Thin</SelectItem>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="semibold">Semibold</SelectItem>
                <SelectItem value="bold">Bold</SelectItem>
                <SelectItem value="extrabold">Extra Bold</SelectItem>
                <SelectItem value="black">Black</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="textColor">Text Color</Label>
            <Select
              value={allProps.textColor || 'default'}
              onValueChange={(value) => onPropChange('textColor', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select color" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="primary">Primary</SelectItem>
                <SelectItem value="muted">Muted</SelectItem>
                <SelectItem value="primary">Primary</SelectItem>
                <SelectItem value="secondary">Secondary</SelectItem>
                <SelectItem value="destructive">Destructive</SelectItem>
                <SelectItem value="accent">Accent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="as">HTML Tag</Label>
            <Input
              id="as"
              placeholder="p, div, span, etc."
              value={allProps.as || ''}
              onChange={(e) => onPropChange('as', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="bPadding">Bottom Padding (px)</Label>
            <Input
              id="bPadding"
              type="number"
              placeholder="0"
              value={allProps.bPadding || ''}
              onChange={(e) => onPropChange('bPadding', parseInt(e.target.value) || undefined)}
            />
          </div>

          <div>
            <Label htmlFor="tPadding">Top Padding (px)</Label>
            <Input
              id="tPadding"
              type="number"
              placeholder="0"
              value={allProps.tPadding || ''}
              onChange={(e) => onPropChange('tPadding', parseInt(e.target.value) || undefined)}
            />
          </div>
        </>
      )}

      {/* Cell specific props */}
      {component.type.startsWith('cell') && (
        <>
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Cell title"
              value={allProps.title || ''}
              onChange={(e) => onPropChange('title', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="Cell description"
              value={allProps.description || ''}
              onChange={(e) => onPropChange('description', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="leftIcon">Left Icon (emoji/text)</Label>
            <Input
              id="leftIcon"
              placeholder="📱"
              value={allProps.leftIcon || ''}
              onChange={(e) => onPropChange('leftIcon', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="rightIcon">Right Icon (emoji/text)</Label>
            <Input
              id="rightIcon"
              placeholder="→"
              value={allProps.rightIcon || ''}
              onChange={(e) => onPropChange('rightIcon', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="titleSize">Title Size</Label>
            <Select
              value={allProps.titleSize || 'body'}
              onValueChange={(value) => onPropChange('titleSize', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select title size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="h1">Heading 1</SelectItem>
                <SelectItem value="h2">Heading 2</SelectItem>
                <SelectItem value="h3">Heading 3</SelectItem>
                <SelectItem value="h4">Heading 4</SelectItem>
                <SelectItem value="h5">Heading 5</SelectItem>
                <SelectItem value="h6">Heading 6</SelectItem>
                <SelectItem value="body">Body</SelectItem>
                <SelectItem value="caption">Caption</SelectItem>
                <SelectItem value="footnote">Footnote</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="descriptionSize">Description Size</Label>
            <Select
              value={allProps.descriptionSize || 'caption'}
              onValueChange={(value) => onPropChange('descriptionSize', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select description size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="h1">Heading 1</SelectItem>
                <SelectItem value="h2">Heading 2</SelectItem>
                <SelectItem value="h3">Heading 3</SelectItem>
                <SelectItem value="h4">Heading 4</SelectItem>
                <SelectItem value="h5">Heading 5</SelectItem>
                <SelectItem value="h6">Heading 6</SelectItem>
                <SelectItem value="body">Body</SelectItem>
                <SelectItem value="caption">Caption</SelectItem>
                <SelectItem value="footnote">Footnote</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="titleWeight">Title Weight</Label>
            <Select
              value={allProps.titleWeight || 'medium'}
              onValueChange={(value) => onPropChange('titleWeight', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select title weight" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="thin">Thin</SelectItem>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="semibold">Semibold</SelectItem>
                <SelectItem value="bold">Bold</SelectItem>
                <SelectItem value="extrabold">Extra Bold</SelectItem>
                <SelectItem value="black">Black</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="descriptionWeight">Description Weight</Label>
            <Select
              value={allProps.descriptionWeight || 'normal'}
              onValueChange={(value) => onPropChange('descriptionWeight', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select description weight" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="thin">Thin</SelectItem>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="semibold">Semibold</SelectItem>
                <SelectItem value="bold">Bold</SelectItem>
                <SelectItem value="extrabold">Extra Bold</SelectItem>
                <SelectItem value="black">Black</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="titleColor">Title Color</Label>
            <Select
              value={allProps.titleColor || 'default'}
              onValueChange={(value) => onPropChange('titleColor', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select title color" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="primary">Primary</SelectItem>
                <SelectItem value="muted">Muted</SelectItem>
                <SelectItem value="primary">Primary</SelectItem>
                <SelectItem value="secondary">Secondary</SelectItem>
                <SelectItem value="destructive">Destructive</SelectItem>
                <SelectItem value="accent">Accent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="descriptionColor">Description Color</Label>
            <Select
              value={allProps.descriptionColor || 'muted'}
              onValueChange={(value) => onPropChange('descriptionColor', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select description color" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="primary">Primary</SelectItem>
                <SelectItem value="muted">Muted</SelectItem>
                <SelectItem value="primary">Primary</SelectItem>
                <SelectItem value="secondary">Secondary</SelectItem>
                <SelectItem value="destructive">Destructive</SelectItem>
                <SelectItem value="accent">Accent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="iconColor">Icon Color</Label>
            <Select
              value={allProps.iconColor || 'default'}
              onValueChange={(value) => onPropChange('iconColor', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select icon color" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="primary">Primary</SelectItem>
                <SelectItem value="muted">Muted</SelectItem>
                <SelectItem value="primary">Primary</SelectItem>
                <SelectItem value="secondary">Secondary</SelectItem>
                <SelectItem value="destructive">Destructive</SelectItem>
                <SelectItem value="accent">Accent</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="info">Info</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </>
      )}

      {/* Image specific props */}
      {component.type.startsWith('image') && (
        <>
          <div>
            <Label htmlFor="src">Image URL</Label>
            <Input
              id="src"
              placeholder="https://example.com/image.jpg"
              value={allProps.src || ''}
              onChange={(e) => onPropChange('src', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="alt">Alt Text</Label>
            <Input
              id="alt"
              placeholder="Image description"
              value={allProps.alt || ''}
              onChange={(e) => onPropChange('alt', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="width">Width (px)</Label>
            <Input
              id="width"
              type="number"
              placeholder="400"
              value={allProps.width || ''}
              onChange={(e) => onPropChange('width', parseInt(e.target.value) || undefined)}
            />
          </div>

          <div>
            <Label htmlFor="height">Height (px)</Label>
            <Input
              id="height"
              type="number"
              placeholder="300"
              value={allProps.height || ''}
              onChange={(e) => onPropChange('height', parseInt(e.target.value) || undefined)}
            />
          </div>

          <div>
            <Label htmlFor="aspectRatio">Aspect Ratio</Label>
            <Select
              value={allProps.aspectRatio || 'auto'}
              onValueChange={(value) => onPropChange('aspectRatio', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select aspect ratio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">Auto</SelectItem>
                <SelectItem value="square">Square</SelectItem>
                <SelectItem value="video">Video (16:9)</SelectItem>
                <SelectItem value="portrait">Portrait (3:4)</SelectItem>
                <SelectItem value="landscape">Landscape (4:3)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="objectFit">Object Fit</Label>
            <Select
              value={allProps.objectFit || 'cover'}
              onValueChange={(value) => onPropChange('objectFit', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select object fit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cover">Cover</SelectItem>
                <SelectItem value="contain">Contain</SelectItem>
                <SelectItem value="fill">Fill</SelectItem>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="scale-down">Scale Down</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="radius">Border Radius</Label>
            <Select
              value={allProps.radius || 'md'}
              onValueChange={(value) => onPropChange('radius', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select radius" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="sm">Small</SelectItem>
                <SelectItem value="md">Medium</SelectItem>
                <SelectItem value="lg">Large</SelectItem>
                <SelectItem value="xl">Extra Large</SelectItem>
                <SelectItem value="full">Full (Circle)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="loading">Loading</Label>
            <Select
              value={allProps.loading || 'lazy'}
              onValueChange={(value) => onPropChange('loading', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select loading" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lazy">Lazy</SelectItem>
                <SelectItem value="eager">Eager</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="placeholder">Placeholder</Label>
            <Select
              value={allProps.placeholder || 'empty'}
              onValueChange={(value) => onPropChange('placeholder', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select placeholder" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="empty">Empty</SelectItem>
                <SelectItem value="blur">Blur</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="blurDataURL">Blur Data URL</Label>
            <Input
              id="blurDataURL"
              placeholder="data:image/jpeg;base64,..."
              value={allProps.blurDataURL || ''}
              onChange={(e) => onPropChange('blurDataURL', e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="showControls">Show Controls</Label>
            <Switch
              id="showControls"
              checked={allProps.showControls || false}
              onCheckedChange={(checked: boolean) => onPropChange('showControls', checked)}
            />
          </div>
        </>
      )}

      {/* Badge specific props */}
      {component.type === 'badge' && (
        <>
          <div>
            <Label htmlFor="children">Badge Text</Label>
            <Input
              id="children"
              placeholder="Badge"
              value={allProps.children || ''}
              onChange={(e) => onPropChange('children', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="variant">Variant</Label>
            <Select
              value={allProps.variant || 'primary'}
              onValueChange={(value) => onPropChange('variant', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select variant" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="primary">Primary</SelectItem>
                <SelectItem value="secondary">Secondary</SelectItem>
                <SelectItem value="destructive">Destructive</SelectItem>
                <SelectItem value="outline">Outline</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="asChild">As Child</Label>
            <Switch
              id="asChild"
              checked={allProps.asChild || false}
              onCheckedChange={(checked: boolean) => onPropChange('asChild', checked)}
            />
          </div>
        </>
      )}

      {/* Separator specific props */}
      {component.type === 'separator' && (
        <>
          <div>
            <Label htmlFor="orientation">Orientation</Label>
            <Select
              value={allProps.orientation || 'horizontal'}
              onValueChange={(value) => onPropChange('orientation', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select orientation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="horizontal">Horizontal</SelectItem>
                <SelectItem value="vertical">Vertical</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="decorative">Decorative</Label>
            <Switch
              id="decorative"
              checked={allProps.decorative !== false}
              onCheckedChange={(checked: boolean) => onPropChange('decorative', checked)}
            />
          </div>
        </>
      )}

      {/* Label specific props */}
      {component.type === 'label' && (
        <>
          <div>
            <Label htmlFor="children">Label Text</Label>
            <Input
              id="children"
              placeholder="Label"
              value={allProps.children || ''}
              onChange={(e) => onPropChange('children', e.target.value)}
            />
          </div>
        </>
      )}


      {/* Avatar specific props */}
      {component.type === 'avatar' && (
        <>
          <div>
            <Label htmlFor="src">Avatar Image URL</Label>
            <Input
              id="src"
              placeholder="https://example.com/avatar.jpg"
              value={allProps.src || ''}
              onChange={(e) => onPropChange('src', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="alt">Alt Text</Label>
            <Input
              id="alt"
              placeholder="Avatar description"
              value={allProps.alt || ''}
              onChange={(e) => onPropChange('alt', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="fallback">Fallback Text</Label>
            <Input
              id="fallback"
              placeholder="U"
              value={allProps.fallback || ''}
              onChange={(e) => onPropChange('fallback', e.target.value)}
            />
          </div>
        </>
      )}

    </div>
  );
}
