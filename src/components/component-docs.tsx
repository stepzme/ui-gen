"use client"

import { ComponentDocumentation } from "@/lib/component-docs/types"
import { Text } from "@/components/text"
import { Badge } from "@/components/badge"
import { Separator } from "@/components/separator"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/collapsible"
import { ChevronDown, ChevronRight } from "lucide-react"
import { useState } from "react"

interface ComponentDocsProps {
  documentation: ComponentDocumentation
}

export function ComponentDocs({ documentation }: ComponentDocsProps) {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(['description', 'props']))

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
        <div className="flex items-center gap-2">
          <Text size="h5" weight="semibold">{documentation.title}</Text>
          <Badge semantic="info" active={false}>{documentation.category}</Badge>
        </div>
        <Text size="body" textColor="muted">{documentation.description}</Text>
      </div>

      {/* Description */}
      <Collapsible open={openSections.has('description')} onOpenChange={() => toggleSection('description')}>
        <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
          <Text size="h5" weight="medium">Описание</Text>
          {openSections.has('description') ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2">
          <Text size="body">{documentation.description}</Text>
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      {/* API Reference */}
      <Collapsible open={openSections.has('props')} onOpenChange={() => toggleSection('props')}>
        <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
          <Text size="h5" weight="medium">API Reference</Text>
          {openSections.has('props') ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2">
          <div className="space-y-3">
            {documentation.props.map((prop, index) => (
              <div key={index} className="border border-border-secondary/50 rounded-md p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Text size="body" weight="medium" className="font-mono">{prop.name}</Text>
                  <Badge 
                    semantic={prop.required ? "critical" : "info"} 
                    active={false}
                  >
                    {prop.required ? "required" : "optional"}
                  </Badge>
                  <Text size="caption" textColor="muted" className="font-mono">{prop.type}</Text>
                </div>
                <Text size="caption" textColor="muted" className="mb-2">{prop.description}</Text>
                {prop.defaultValue && (
                  <Text size="caption" textColor="muted">
                    Default: <span className="font-mono">{prop.defaultValue}</span>
                  </Text>
                )}
                {prop.example && (
                  <div className="mt-2">
                    {renderCodeBlock(prop.example, "tsx")}
                  </div>
                )}
              </div>
            ))}
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
          <div className="space-y-3">
            {documentation.variants.map((variant, index) => (
              <div key={index} className="border border-border-secondary/50 rounded-md p-3">
                <Text size="body" weight="medium" className="mb-1">{variant.name}</Text>
                <Text size="caption" textColor="muted" className="mb-2">{variant.description}</Text>
                <Text size="caption" className="mb-2">{variant.usage}</Text>
                {variant.example && (
                  <div className="mt-2">
                    {renderCodeBlock(variant.example, "tsx")}
                  </div>
                )}
              </div>
            ))}
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
