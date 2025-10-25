import type { SandboxSection } from "@/lib/component-sandbox-config";

export const sidebarSandboxConfig = {
  generateVariants: (component: any): SandboxSection[] => {
    // TODO: Implement sandbox variants for sidebar
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