import type { SandboxSection } from "@/lib/components/component-sandbox-config";

export const badgeSandboxConfig = {
  generateVariants: (component: any): SandboxSection[] => {
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
};
