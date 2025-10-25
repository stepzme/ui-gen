import type { ComponentDefinition } from "@/types/page-builder";
import { componentDefinitions } from "./component-definitions";

export interface SandboxVariant {
  label: string;
  props: Record<string, unknown>;
}

export interface SandboxSection {
  title: string;
  variants: SandboxVariant[];
}

export interface SandboxConfig {
  generateVariants?: (component: ComponentDefinition) => SandboxSection[];
}

// Helper function for text components
function generateTextVariants(component: ComponentDefinition): SandboxSection[] {
  const weights = ['thin', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black'];
  const textColors = ['default', 'muted', 'primary', 'secondary', 'destructive', 'accent'];

  const sections: SandboxSection[] = [];

  // Weights
  sections.push({
    title: 'Font Weights',
    variants: weights.map(weight => ({
      label: weight.charAt(0).toUpperCase() + weight.slice(1),
      props: {
        ...component.defaultProps,
        weight
      }
    }))
  });

  // Text Colors
  sections.push({
    title: 'Text Colors',
    variants: textColors.map(color => ({
      label: color.charAt(0).toUpperCase() + color.slice(1),
      props: {
        ...component.defaultProps,
        textColor: color
      }
    }))
  });

  return sections;
}

const componentSandboxConfigs: Record<string, SandboxConfig> = {
  button: {
    generateVariants: (component) => {
      const variants = ['primary', 'secondary', 'tertiary', 'text'];
      const semantics = ['default', 'accent', 'success', 'warning', 'info', 'critical'];
      const sizes = ['sm', 'default', 'lg'];

      const sections: SandboxSection[] = [];

      // Variants × Semantics
      for (const variant of variants) {
        sections.push({
          title: `${variant.charAt(0).toUpperCase() + variant.slice(1)} Variants`,
          variants: semantics.map(semantic => ({
            label: semantic.charAt(0).toUpperCase() + semantic.slice(1),
            props: {
              ...component.defaultProps,
              variant,
              semantic
            }
          }))
        });
      }

      // Sizes
      sections.push({
        title: 'Sizes',
        variants: sizes.map(size => ({
          label: size === 'default' ? 'Default' : size.toUpperCase(),
          props: {
            ...component.defaultProps,
            size
          }
        }))
      });

      return sections;
    }
  },
  badge: {
    generateVariants: (component) => {
      const semantics = ['default', 'accent', 'success', 'warning', 'info', 'critical'];
      const activeStates = [true, false];

      const sections: SandboxSection[] = [];

      // Semantic variants (active)
      sections.push({
        title: 'Semantic Variants (Active)',
        variants: semantics.map(semantic => ({
          label: semantic.charAt(0).toUpperCase() + semantic.slice(1),
          props: {
            ...component.defaultProps,
            semantic,
            active: true
          }
        }))
      });

      // Semantic variants (inactive)
      sections.push({
        title: 'Semantic Variants (Inactive)',
        variants: semantics.map(semantic => ({
          label: semantic.charAt(0).toUpperCase() + semantic.slice(1),
          props: {
            ...component.defaultProps,
            semantic,
            active: false
          }
        }))
      });

      // Active states
      sections.push({
        title: 'Active States',
        variants: activeStates.map(active => ({
          label: active ? 'Active' : 'Inactive',
          props: {
            ...component.defaultProps,
            semantic: 'accent',
            active
          }
        }))
      });

      // Interactive badges
      sections.push({
        title: 'Interactive Badges',
        variants: [
          {
            label: 'Interactive Default',
            props: {
              ...component.defaultProps,
              semantic: 'default',
              active: true,
              interactive: true
            }
          },
          {
            label: 'Interactive Accent',
            props: {
              ...component.defaultProps,
              semantic: 'accent',
              active: false,
              interactive: true
            }
          },
          {
            label: 'Interactive Success',
            props: {
              ...component.defaultProps,
              semantic: 'success',
              active: true,
              interactive: true
            }
          },
          {
            label: 'Interactive Warning',
            props: {
              ...component.defaultProps,
              semantic: 'warning',
              active: false,
              interactive: true
            }
          },
          {
            label: 'Interactive Info',
            props: {
              ...component.defaultProps,
              semantic: 'info',
              active: true,
              interactive: true
            }
          },
          {
            label: 'Interactive Critical',
            props: {
              ...component.defaultProps,
              semantic: 'critical',
              active: false,
              interactive: true
            }
          }
        ]
      });

      return sections;
    }
  },
  'text-h1': {
    generateVariants: (component) => {
      return generateTextVariants(component);
    }
  },
  'text-h2': {
    generateVariants: (component) => {
      return generateTextVariants(component);
    }
  },
  'text-h3': {
    generateVariants: (component) => {
      return generateTextVariants(component);
    }
  },
  'text-h4': {
    generateVariants: (component) => {
      return generateTextVariants(component);
    }
  },
  'text-h5': {
    generateVariants: (component) => {
      return generateTextVariants(component);
    }
  },
  'text-h6': {
    generateVariants: (component) => {
      return generateTextVariants(component);
    }
  },
  'text-body': {
    generateVariants: (component) => {
      return generateTextVariants(component);
    }
  },
  'text-caption': {
    generateVariants: (component) => {
      return generateTextVariants(component);
    }
  },
  'text-footnote': {
    generateVariants: (component) => {
      return generateTextVariants(component);
    }
  },
  input: {
    generateVariants: (component) => {
      const types = ['text', 'email', 'password', 'number', 'tel', 'url', 'search'];

      const sections: SandboxSection[] = [];

      // Input Types
      sections.push({
        title: 'Input Types',
        variants: types.map(type => ({
          label: type.charAt(0).toUpperCase() + type.slice(1),
          props: {
            ...component.defaultProps,
            type,
            placeholder: `Enter ${type}...`
          }
        }))
      });

      return sections;
    }
  },
  textarea: {
    generateVariants: (component) => {
      const rows = [2, 3, 4, 5, 6];

      const sections: SandboxSection[] = [];

      // Textarea Rows
      sections.push({
        title: 'Rows',
        variants: rows.map(rowCount => ({
          label: `${rowCount} ${rowCount === 1 ? 'row' : 'rows'}`,
          props: {
            ...component.defaultProps,
            rows: rowCount
          }
        }))
      });

      return sections;
    }
  }
};

export function getSandboxConfig(componentId: string): SandboxConfig | null {
  return componentSandboxConfigs[componentId] || null;
}

export function generateComponentSandbox(componentId: string): SandboxSection[] | null {
  const componentDef = componentDefinitions.find(comp => comp.id === componentId);
  
  if (!componentDef) return null;

  const config = getSandboxConfig(componentId);
  
  if (config?.generateVariants) {
    return config.generateVariants(componentDef);
  }

  return null;
}
