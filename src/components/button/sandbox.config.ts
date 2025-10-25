import type { SandboxSection } from "@/lib/component-sandbox-config";

export const buttonSandboxConfig = {
  generateVariants: (component: any): SandboxSection[] => {
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

    // Icon buttons
    sections.push({
      title: 'Icon Buttons',
      variants: [
        {
          label: 'Small Icon',
          props: {
            ...component.defaultProps,
            size: 'icon-sm',
            children: '⚙️'
          }
        },
        {
          label: 'Default Icon',
          props: {
            ...component.defaultProps,
            size: 'icon',
            children: '⚙️'
          }
        },
        {
          label: 'Large Icon',
          props: {
            ...component.defaultProps,
            size: 'icon-lg',
            children: '⚙️'
          }
        }
      ]
    });

    return sections;
  }
};
