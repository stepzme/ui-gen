import type { SandboxSection } from "@/lib/components/component-sandbox-config";

const TYPOGRAPHY_OPTIONS = ["bodyS", "bodyM", "bodyL"] as const;

export const buttonIconSandboxConfig = {
  generateVariants: (component: any): SandboxSection[] => {
    const baseProps = component.defaultProps ?? {};

    return [
      {
        title: "Размеры",
        variants: TYPOGRAPHY_OPTIONS.map((typography) => ({
          label: typography,
          props: {
            ...baseProps,
            icon: "placeholder",
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
              icon: "placeholder",
            },
          },
          {
            label: "Active",
            props: {
              ...baseProps,
              icon: "placeholder",
              isActive: true,
            },
          },
          {
            label: "Disabled",
            props: {
              ...baseProps,
              icon: "placeholder",
              disabled: true,
            },
          },
        ],
      },
      {
        title: "Отступы",
        variants: [
          {
            label: "Без паддингов",
            props: {
              ...baseProps,
              icon: "placeholder",
              withPadding: false,
            },
          },
          {
            label: "С паддингами",
            props: {
              ...baseProps,
              icon: "placeholder",
              withPadding: true,
            },
          },
        ],
      },
    ];
  },
};

