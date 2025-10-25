export interface PropDocumentation {
  name: string
  type: string
  required: boolean
  defaultValue?: string
  description: string
  example?: string
}

export interface ExampleCode {
  title: string
  description: string
  code: string
  language: 'tsx' | 'jsx' | 'ts' | 'js'
}

export interface VariantDocumentation {
  name: string
  description: string
  usage: string
  example?: string
}

export interface AccessibilityNote {
  title: string
  description: string
  implementation?: string
}

export interface BestPractice {
  title: string
  description: string
  do: string[]
  dont: string[]
}

export interface ComponentDocumentation {
  // Основная информация
  title: string
  description: string
  category: string
  
  // API Reference
  props: PropDocumentation[]
  
  // Примеры использования
  examples: ExampleCode[]
  
  // Варианты компонента
  variants: VariantDocumentation[]
  
  // Accessibility
  accessibility: AccessibilityNote[]
  
  // Best Practices
  bestPractices: BestPractice[]
  
  // Дополнительная информация
  relatedComponents?: string[]
  designTokens?: string[]
  notes?: string[]
}

export interface ComponentDocsConfig {
  [componentId: string]: ComponentDocumentation
}
