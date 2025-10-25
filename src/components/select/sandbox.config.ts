import type { SandboxSection } from "@/lib/component-sandbox-config";

export const selectSandboxConfig = {
  generateVariants: (component: any): SandboxSection[] => {
    // TODO: Implement sandbox variants for select
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