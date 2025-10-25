import type { SandboxSection } from "@/lib/component-sandbox-config";

export const collapsibleSandboxConfig = {
  generateVariants: (component: any): SandboxSection[] => {
    // TODO: Implement sandbox variants for collapsible
    return [
      {
        title: 'Basic Variants',
        variants: [
          {
            label: 'Default',
            props: {
              ...component.defaultProps
            }
          }
        ]
      }
    ];
  }
};