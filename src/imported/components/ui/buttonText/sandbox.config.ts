import type { SandboxSection } from "@/lib/components/component-sandbox-config";

const COLOR_SCHEMES = [
  "brand",
  "success",
  "info",
  "warning",
  "critical",
  "draft",
  "constant",
  "primary",
] as const;

const TYPOGRAPHY_OPTIONS = ["bodyS", "bodyM", "bodyL"] as const;

export const buttonTextSandboxConfig = {
  generateVariants: (component: any): SandboxSection[] => {
    const baseProps = component.defaultProps ?? {};

    return [
      {
        title: "Цветовые схемы",
        variants: COLOR_SCHEMES.map((colorScheme) => ({
          label: colorScheme,
          props: {
            ...baseProps,
            colorScheme,
          },
        })),
      },
      {
        title: "Размеры",
        variants: TYPOGRAPHY_OPTIONS.map((typography) => ({
          label: typography,
          props: {
            ...baseProps,
            typography,
          },
        })),
      },
      {
        title: "Состояния",
        variants: [
          {
            label: "Default",
            props: {
              ...baseProps,
            },
          },
          {
            label: "Disabled",
            props: {
              ...baseProps,
              disabled: true,
            },
          },
          {
            label: "Full Width",
            props: {
              ...baseProps,
              fullWidth: true,
            },
          },
        ],
      },
    ];
  },
};

