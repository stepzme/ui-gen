import type { SandboxSection } from "@/lib/component-sandbox-config";

export const buttonIconSandboxConfig = {
  generateVariants: (component: any): SandboxSection[] => {
    const variants = ['primary', 'secondary', 'tertiary', 'text'];
    const semantics = ['default', 'accent', 'success', 'warning', 'info', 'critical'];

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
            semantic,
            icon: 'gear'
          }
        }))
      });
    }

    return sections;
  }
};

