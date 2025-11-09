"use client"

import { ComponentDocumentation } from "@/lib/components/component-docs/types"
import { Icon } from "@/components/ui/icon"
import React, { useState } from "react"
import { useComponentDefinitions } from "@/hooks/use-component-definitions"
import { generateComponentSandbox } from "@/lib/components/component-sandbox-config"
import { getCategoryBadgeColor } from "@/lib/components/component-docs/categories"

// Импортируем компоненты статически
import { Button } from '@/components/ui/button';
import { ButtonIcon } from '@/components/ui/buttonIcon';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Text } from '@/components/ui/text';
import { Avatar } from '@/components/ui/avatar';
import { Cell } from '@/components/ui/cell';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Dialog } from '@/components/ui/dialog';
import { DropdownMenu } from '@/components/ui/dropdown-menu';
import { Image } from '@/components/ui/image';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Sheet } from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip } from '@/components/ui/tooltip';

// Маппинг компонентов
const componentMap: Record<string, React.ComponentType<any>> = {
  button: Button,
  buttonIcon: ButtonIcon,
  input: Input,
  badge: Badge,
  text: Text,
  avatar: Avatar,
  cell: Cell,
  collapsible: Collapsible,
  dialog: Dialog,
  'dropdown-menu': DropdownMenu,
  image: Image,
  label: Label,
  select: Select,
  separator: Separator,
  sheet: Sheet,
  skeleton: Skeleton,
  switch: Switch,
  textarea: Textarea,
  tooltip: Tooltip,
};

interface ComponentDocsProps {
  documentation: ComponentDocumentation
  componentId?: string
}

export function ComponentDocs({ documentation, componentId }: ComponentDocsProps) {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(['description', 'props']))
  const { componentDefinitions } = useComponentDefinitions();

  // Получаем компонент и генерируем sandbox
  const selectedComponentDef = componentId 
    ? componentDefinitions.find(comp => comp.id === componentId)
    : null;
  
  // Получаем компонент из маппинга
  const selectedComponent = componentId ? componentMap[componentId] : null;
  
  const sandboxSections = componentId ? generateComponentSandbox(componentId, componentDefinitions) : null;

  const toggleSection = (section: string) => {
    setOpenSections(prev => {
      const newSet = new Set(prev)
      if (newSet.has(section)) {
        newSet.delete(section)
      } else {
        newSet.add(section)
      }
      return newSet
    })
  }

  const renderCodeBlock = (code: string, language: string) => (
    <pre className="bg-background-secondary/50 rounded-md p-3 text-xs font-mono overflow-x-auto">
      <code className={`language-${language}`}>{code}</code>
    </pre>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-4">
          <Text size="h2" weight="semibold">{documentation.title}</Text>
          <Badge semantic={getCategoryBadgeColor(documentation.category)} active={false}>{documentation.category}</Badge>
        </div>
        <Text size="body" textColor="muted">{documentation.description}</Text>
      </div>

      <Separator />

      {/* API Reference */}
      <Collapsible open={openSections.has('props')} onOpenChange={() => toggleSection('props')}>
        <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
          <Text size="h5" weight="medium">API Reference</Text>
          {openSections.has('props') ? <Icon variant="chevron_down" className="size-4" /> : <Icon variant="chevron_right" className="size-4" />}
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border-secondary">
                  <th className="text-left p-3 font-medium text-sm text-foreground-secondary">Prop</th>
                  <th className="text-left p-3 font-medium text-sm text-foreground-secondary">Type</th>
                  <th className="text-left p-3 font-medium text-sm text-foreground-secondary">Default</th>
                  <th className="text-left p-3 font-medium text-sm text-foreground-secondary">Description</th>
                </tr>
              </thead>
              <tbody>
                {documentation.props
                  .sort((a, b) => {
                    // Сначала обязательные пропсы, потом опциональные
                    if (a.required && !b.required) return -1;
                    if (!a.required && b.required) return 1;
                    // Затем по алфавиту
                    return a.name.localeCompare(b.name);
                  })
                  .map((prop, index) => (
                  <tr key={index} className="border-b border-border-secondary/50 hover:bg-background-secondary/50">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Text size="body" weight="medium" className="font-mono">{prop.name}</Text>
                        {prop.required && (
                          <Badge semantic="critical" active={false}>
                            required
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="p-3">
                      <Text size="body" className="font-mono text-foreground-secondary">{prop.type}</Text>
                    </td>
                    <td className="p-3">
                      {prop.defaultValue ? (
                        <Text size="body" className="font-mono text-foreground-secondary">{prop.defaultValue}</Text>
                      ) : (
                        <Text size="body" textColor="muted">-</Text>
                      )}
                    </td>
                    <td className="p-3">
                      <Text size="body" textColor="muted">{prop.description}</Text>
                      {prop.example && (
                        <div className="mt-2">
                          {renderCodeBlock(prop.example, "tsx")}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      {/* Examples */}
      <Collapsible open={openSections.has('examples')} onOpenChange={() => toggleSection('examples')}>
        <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
          <Text size="h5" weight="medium">Примеры</Text>
          {openSections.has('examples') ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2">
          <div className="space-y-4">
            {documentation.examples.map((example, index) => (
              <div key={index} className="space-y-2">
                <Text size="body" weight="medium">{example.title}</Text>
                <Text size="caption" textColor="muted">{example.description}</Text>
                {renderCodeBlock(example.code, example.language)}
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      {/* Variants */}
      <Collapsible open={openSections.has('variants')} onOpenChange={() => toggleSection('variants')}>
        <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
          <Text size="h5" weight="medium">Варианты</Text>
          {openSections.has('variants') ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2">
          <div className="space-y-6">
            {/* Default State */}
            {selectedComponentDef && (
              <div>
                <Text size="h6" weight="medium" className="mb-3">Default</Text>
                <div className="p-4 bg-background-secondary/30 rounded-lg border border-border-secondary/50">
                  {selectedComponent ? (
                    React.createElement(selectedComponent, selectedComponentDef?.defaultProps || {})
                  ) : (
                    <Text size="body" textColor="muted">
                      Компонент недоступен для предварительного просмотра
                    </Text>
                  )}
                </div>
              </div>
            )}

            {/* Auto-generated Sandbox Sections */}
            {sandboxSections && sandboxSections.map((section, idx) => (
              <div key={idx}>
                <Text size="h6" weight="medium" className="mb-3 text-foreground-secondary">{section.title}</Text>
                <div className={
                  section.title === 'Sizes' 
                    ? "flex flex-wrap gap-4 items-center"
                    : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4"
                }>
                  {section.variants.map((variant, vIdx) => (
                    <div key={vIdx}>
                      <Text size="caption" weight="medium" className="mb-2">
                        {variant.label}
                      </Text>
                      <div className="p-3 bg-background-secondary/30 rounded-lg border border-border-secondary/50">
                        {selectedComponent ? (
                          React.createElement(selectedComponent, variant.props)
                        ) : (
                          <Text size="body" textColor="muted">
                            Компонент недоступен
                          </Text>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Fallback - Documentation Variants */}
            {!sandboxSections && documentation.variants.map((variant, index) => (
              <div key={index}>
                <Text size="h6" weight="medium" className="mb-3">{variant.name}</Text>
                <Text size="caption" textColor="muted" className="mb-3">{variant.description}</Text>
                
                {/* Code Example */}
                {variant.example && (
                  <div>
                    <Text size="caption" weight="medium" className="mb-2">Код:</Text>
                    {renderCodeBlock(variant.example, "tsx")}
                  </div>
                )}

                {/* Usage Guidelines */}
                {variant.usage && (
                  <div className="mt-2">
                    <Text size="caption" weight="medium" className="mb-1">Использование:</Text>
                    <Text size="caption" textColor="muted">{variant.usage}</Text>
                  </div>
                )}
              </div>
            ))}

            {/* No variants available */}
            {!sandboxSections && documentation.variants.length === 0 && (
              <div className="text-center text-foreground-secondary">
                <Text size="body" textColor="muted">
                  Варианты для этого компонента пока не доступны
                </Text>
              </div>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      {/* Accessibility */}
      <Collapsible open={openSections.has('accessibility')} onOpenChange={() => toggleSection('accessibility')}>
        <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
          <Text size="h5" weight="medium">Accessibility</Text>
          {openSections.has('accessibility') ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2">
          <div className="space-y-3">
            {documentation.accessibility.map((note, index) => (
              <div key={index} className="border border-border-secondary/50 rounded-md p-3">
                <Text size="body" weight="medium" className="mb-1">{note.title}</Text>
                <Text size="caption" textColor="muted" className="mb-2">{note.description}</Text>
                {note.implementation && (
                  <Text size="caption">{note.implementation}</Text>
                )}
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      {/* Best Practices */}
      <Collapsible open={openSections.has('bestPractices')} onOpenChange={() => toggleSection('bestPractices')}>
        <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
          <Text size="h5" weight="medium">Best Practices</Text>
          {openSections.has('bestPractices') ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2">
          <div className="space-y-4">
            {documentation.bestPractices.map((practice, index) => (
              <div key={index} className="border border-border-secondary/50 rounded-md p-3">
                <Text size="body" weight="medium" className="mb-1">{practice.title}</Text>
                <Text size="caption" textColor="muted" className="mb-3">{practice.description}</Text>
                
                <div className="space-y-2">
                  <div>
                    <Text size="caption" weight="medium" className="text-foreground-success mb-1">✓ Do:</Text>
                    <ul className="list-disc list-inside space-y-1">
                      {practice.do.map((item, i) => (
                        <li key={i}>
                          <Text size="caption">{item}</Text>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <Text size="caption" weight="medium" className="text-foreground-critical mb-1">✗ Don't:</Text>
                    <ul className="list-disc list-inside space-y-1">
                      {practice.dont.map((item, i) => (
                        <li key={i}>
                          <Text size="caption">{item}</Text>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Notes */}
      {documentation.notes && (
        <>
          <Separator />
          <div className="bg-background-info/10 border border-border-info/50 rounded-md p-3">
            <Text size="caption" weight="medium" className="text-foreground-info mb-1">💡 Note</Text>
            <Text size="caption" textColor="muted">{documentation.notes.join(' ')}</Text>
          </div>
        </>
      )}
    </div>
  )
}
