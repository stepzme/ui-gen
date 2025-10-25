import type { SandboxSection } from "@/lib/component-sandbox-config";

export const avatarSandboxConfig = {
  generateVariants: (component: any): SandboxSection[] => {
    // TODO: Implement sandbox variants for avatar
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