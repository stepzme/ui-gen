import type { SandboxSection } from "@/lib/component-sandbox-config";

export const iconSandboxConfig = {
  generateVariants: (component: any): SandboxSection[] => {
    const sizes = ['sm', 'md', 'lg'];
    const semantics = ['default', 'accent', 'success', 'warning', 'info', 'critical'];
    const containerStates = [true, false];

    const sections: SandboxSection[] = [];

    // Sizes
    sections.push({
      title: 'Sizes',
      variants: sizes.map(size => ({
        label: size === 'md' ? 'Default' : size.toUpperCase(),
        props: {
          ...component.defaultProps,
          size
        }
      }))
    });

    // Semantic colors (without container)
    sections.push({
      title: 'Semantic Colors',
      variants: semantics.map(semantic => ({
        label: semantic.charAt(0).toUpperCase() + semantic.slice(1),
        props: {
          ...component.defaultProps,
          semantic
        }
      }))
    });

    // With container
    sections.push({
      title: 'With Container',
      variants: semantics.map(semantic => ({
        label: semantic.charAt(0).toUpperCase() + semantic.slice(1),
        props: {
          ...component.defaultProps,
          semantic,
          container: true
        }
      }))
    });

    // Container states
    sections.push({
      title: 'Container States',
      variants: containerStates.map(hasContainer => ({
        label: hasContainer ? 'With Container' : 'Without Container',
        props: {
          ...component.defaultProps,
          semantic: 'accent',
          container: hasContainer
        }
      }))
    });

    // Size variations with container
    sections.push({
      title: 'Sizes with Container',
      variants: sizes.map(size => ({
        label: size === 'md' ? 'Default' : size.toUpperCase(),
        props: {
          ...component.defaultProps,
          size,
          container: true,
          semantic: 'accent'
        }
      }))
    });

    return sections;
  }
};

