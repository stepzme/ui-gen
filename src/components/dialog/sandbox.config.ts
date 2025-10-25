import type { SandboxSection } from "@/lib/component-sandbox-config";

export const dialogSandboxConfig = {
  generateVariants: (component: any): SandboxSection[] => {
    // TODO: Implement sandbox variants for dialog
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