"use client";

import React from "react";
import { Text } from "@/components/ui/text";
import { componentDefinitions } from "@/lib/component-definitions";
import { generateComponentSandbox, type SandboxSection } from "@/lib/component-sandbox-config";

interface SandboxShowcaseProps {
  selectedComponent: string | null;
  className?: string;
}

export function SandboxShowcase({ selectedComponent, className = "" }: SandboxShowcaseProps) {
  const selectedComponentDef = selectedComponent 
    ? componentDefinitions.find(comp => comp.id === selectedComponent)
    : null;

  if (!selectedComponentDef) {
    return (
      <div className={`p-8 bg-background-primary border border-border-secondary/50 rounded-lg ${className}`}>
        <div className="text-center">
          <Text size="h4" weight="medium" className="mb-2">Выберите компонент</Text>
          <Text size="body" textColor="muted">Выберите компонент из списка слева, чтобы посмотреть его состояния</Text>
        </div>
      </div>
    );
  }

  const sandboxSections = selectedComponent ? generateComponentSandbox(selectedComponent) : null;

  return (
    <div className={`p-6 bg-background-primary border border-border-secondary/50 rounded-lg ${className}`}>
      {/* Component Header */}
      <div className="mb-6">
        <Text size="h3" weight="bold" className="mb-2">
          {selectedComponentDef.name}
        </Text>
        <Text size="body" textColor="muted" className="mb-4">
          {selectedComponentDef.category}
        </Text>
        <div className="h-px bg-border-secondary/50" />
      </div>

      {/* Component Showcase */}
      <div className="space-y-6">
        {/* Default State */}
        <div>
          <Text size="h5" weight="semibold" className="mb-3">Default</Text>
          <div className="p-4 bg-background-secondary/30 rounded-lg border border-border-secondary/50">
            {React.createElement(selectedComponentDef.component, selectedComponentDef.defaultProps)}
          </div>
        </div>

        {/* Auto-generated Sections */}
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
                    {React.createElement(selectedComponentDef.component, variant.props)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Fallback если нет генерации */}
        {!sandboxSections && (
          <div className="text-center text-foreground-secondary">
            <Text size="body" textColor="muted">
              Автоматическая генерация вариантов пока не поддерживается для этого компонента
            </Text>
          </div>
        )}
      </div>
    </div>
  );
}
