"use client"

import { ComponentDocumentation } from "@/lib/components/component-docs/types"
import { ChevronDown, ChevronRight } from "lucide-react"
import React, { useState } from "react"
import { useComponentDefinitions } from "@/hooks/use-component-definitions"
import { generateComponentSandbox } from "@/lib/components/component-sandbox-config"
import { getCategoryBadgeColor } from "@/lib/components/component-docs/categories"

// Импортируем компоненты статически
import { Button } from '@/imported/components/ui/button';
import { ButtonIcon } from '@/imported/components/ui/buttonIcon';
import { Badge } from '@/imported/components/ui/badge';
import { Typography } from '@/imported/components/meta/typography';
import { Avatar } from '@/imported/components/ui/avatar';

// Маппинг компонентов
const componentMap: Record<string, React.ComponentType<any>> = {
  button: Button,
  buttonIcon: ButtonIcon,
  badge: Badge,
  text: Typography,
  avatar: Avatar,
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
          <Typography typography="headlineL">{documentation.title}</Typography>
          <Badge semantic={getCategoryBadgeColor(documentation.category)} active={false}>{documentation.category}</Badge>
        </div>
        <Typography typography="bodyM_paragraph_normal" style={{ color: 'var(--semantic-text-secondary)' }}>{documentation.description}</Typography>
      </div>

      <Separator />

      {/* API Reference */}
      <Collapsible open={openSections.has('props')} onOpenChange={() => toggleSection('props')}>
        <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
          <Typography typography="headlineS">API Reference</Typography>
          {openSections.has('props') ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}
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
                        <Typography typography="bodyM_tight_medium" className="font-mono">{prop.name}</Typography>
                        {prop.required && (
                          <Badge semantic="critical" active={false}>
                            required
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="p-3">
                      <Typography typography="bodyM_paragraph_normal" className="font-mono" style={{ color: 'var(--semantic-text-secondary)' }}>{prop.type}</Typography>
                    </td>
                    <td className="p-3">
                      {prop.defaultValue ? (
                        <Typography typography="bodyM_paragraph_normal" className="font-mono" style={{ color: 'var(--semantic-text-secondary)' }}>{prop.defaultValue}</Typography>
                      ) : (
                        <Typography typography="bodyM_paragraph_normal" style={{ color: 'var(--semantic-text-secondary)' }}>-</Typography>
                      )}
                    </td>
                    <td className="p-3">
                      <Typography typography="bodyM_paragraph_normal" style={{ color: 'var(--semantic-text-secondary)' }}>{prop.description}</Typography>
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
          <Typography typography="headlineS">Примеры</Typography>
          {openSections.has('examples') ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2">
          <div className="space-y-4">
            {documentation.examples.map((example, index) => (
              <div key={index} className="space-y-2">
                <Typography typography="bodyM_tight_medium">{example.title}</Typography>
                <Typography typography="bodyS_paragraph_normal" style={{ color: 'var(--semantic-text-secondary)' }}>{example.description}</Typography>
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
          <Typography typography="headlineS">Варианты</Typography>
          {openSections.has('variants') ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2">
          <div className="space-y-6">
            {/* Default State */}
            {selectedComponentDef && (
              <div>
                <Typography typography="headlineXXS" className="mb-3">Default</Typography>
                <div className="p-4 bg-background-secondary/30 rounded-lg border border-border-secondary/50">
                  {selectedComponent ? (
                    React.createElement(selectedComponent, selectedComponentDef?.defaultProps || {})
                  ) : (
                    <Typography typography="bodyM_paragraph_normal" style={{ color: 'var(--semantic-text-secondary)' }}>
                      Компонент недоступен для предварительного просмотра
                    </Typography>
                  )}
                </div>
              </div>
            )}

            {/* Auto-generated Sandbox Sections */}
            {sandboxSections && sandboxSections.map((section, idx) => (
              <div key={idx}>
                <Typography typography="headlineXXS" className="mb-3" style={{ color: 'var(--semantic-text-secondary)' }}>{section.title}</Typography>
                <div className={
                  section.title === 'Sizes' 
                    ? "flex flex-wrap gap-4 items-center"
                    : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4"
                }>
                  {section.variants.map((variant, vIdx) => (
                    <div key={vIdx}>
                      <Typography typography="bodyS_tight_medium" className="mb-2">
                        {variant.label}
                      </Typography>
                      <div className="p-3 bg-background-secondary/30 rounded-lg border border-border-secondary/50">
                        {selectedComponent ? (
                          React.createElement(selectedComponent, variant.props)
                        ) : (
                          <Typography typography="bodyM_paragraph_normal" style={{ color: 'var(--semantic-text-secondary)' }}>
                            Компонент недоступен
                          </Typography>
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
                <Typography typography="headlineXXS" className="mb-3">{variant.name}</Typography>
                <Typography typography="bodyS_paragraph_normal" style={{ color: 'var(--semantic-text-secondary)' }} className="mb-3">{variant.description}</Typography>
                
                {/* Code Example */}
                {variant.example && (
                  <div>
                    <Typography typography="bodyS_tight_medium" className="mb-2">Код:</Typography>
                    {renderCodeBlock(variant.example, "tsx")}
                  </div>
                )}

                {/* Usage Guidelines */}
                {variant.usage && (
                  <div className="mt-2">
                    <Typography typography="bodyS_tight_medium" className="mb-1">Использование:</Typography>
                    <Typography typography="bodyS_paragraph_normal" style={{ color: 'var(--semantic-text-secondary)' }}>{variant.usage}</Typography>
                  </div>
                )}
              </div>
            ))}

            {/* No variants available */}
            {!sandboxSections && documentation.variants.length === 0 && (
              <div className="text-center text-foreground-secondary">
                <Typography typography="bodyM_paragraph_normal" style={{ color: 'var(--semantic-text-secondary)' }}>
                  Варианты для этого компонента пока не доступны
                </Typography>
              </div>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      {/* Accessibility */}
      <Collapsible open={openSections.has('accessibility')} onOpenChange={() => toggleSection('accessibility')}>
        <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
          <Typography typography="headlineS">Accessibility</Typography>
          {openSections.has('accessibility') ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2">
          <div className="space-y-3">
            {documentation.accessibility.map((note, index) => (
              <div key={index} className="border border-border-secondary/50 rounded-md p-3">
                <Typography typography="bodyM_tight_medium" className="mb-1">{note.title}</Typography>
                <Typography typography="bodyS_paragraph_normal" style={{ color: 'var(--semantic-text-secondary)' }} className="mb-2">{note.description}</Typography>
                {note.implementation && (
                  <Typography typography="bodyS_paragraph_normal">{note.implementation}</Typography>
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
          <Typography typography="headlineS">Best Practices</Typography>
          {openSections.has('bestPractices') ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2">
          <div className="space-y-4">
            {documentation.bestPractices.map((practice, index) => (
              <div key={index} className="border border-border-secondary/50 rounded-md p-3">
                <Typography typography="bodyM_tight_medium" className="mb-1">{practice.title}</Typography>
                <Typography typography="bodyS_paragraph_normal" style={{ color: 'var(--semantic-text-secondary)' }} className="mb-3">{practice.description}</Typography>
                
                <div className="space-y-2">
                  <div>
                    <Typography typography="bodyS_tight_medium" style={{ color: 'var(--semantic-text-success)' }} className="mb-1">✓ Do:</Typography>
                    <ul className="list-disc list-inside space-y-1">
                      {practice.do.map((item, i) => (
                        <li key={i}>
                          <Typography typography="bodyS_paragraph_normal">{item}</Typography>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <Typography typography="bodyS_tight_medium" style={{ color: 'var(--semantic-text-critical)' }} className="mb-1">✗ Don't:</Typography>
                    <ul className="list-disc list-inside space-y-1">
                      {practice.dont.map((item, i) => (
                        <li key={i}>
                          <Typography typography="bodyS_paragraph_normal">{item}</Typography>
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
            <Typography typography="bodyS_tight_medium" style={{ color: 'var(--semantic-text-info)' }} className="mb-1">💡 Note</Typography>
            <Typography typography="bodyS_paragraph_normal" style={{ color: 'var(--semantic-text-secondary)' }}>{documentation.notes.join(' ')}</Typography>
          </div>
        </>
      )}
    </div>
  )
}
