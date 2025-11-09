import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { styled, type VariantProps, config } from '@/styles/stitches.config'
import { typography } from '@/styles/typography'

/**
 * Button.Container - базовый компонент для layout, typography и spacing
 * Отвечает за структуру кнопки без цветов и вариантов
 */
const ButtonContainer = styled('button', {
  position: 'relative',
  display: 'inline-flex',
  flexDirection: 'row',
  alignItems: 'center',
  columnGap: '$sizes.x300', // 12px - gap между элементами
  justifyContent: 'center',
  background: 'none',
  border: 'none',
  outlineOffset: 2,
  cursor: 'pointer',
  width: '100%',
  WebkitTapHighlightColor: 'transparent',
  userSelect: 'none',

    variants: {
    typography: {
      bodyS: {
        borderRadius: '$radii.x200', // 8px
        ...typography.bodyS_tight_medium,
        '& svg': {
          fontSize: '$sizes.x400', // 16px
        },
      },
      bodyM: {
        borderRadius: '$radii.x300', // 12px
        ...typography.bodyM_tight_medium,
        '& svg': {
          fontSize: '$sizes.x500', // 20px
        },
      },
      bodyL: {
        borderRadius: '$radii.x400', // 16px
        ...typography.bodyL_tight_medium,
        '& svg': {
          fontSize: '$sizes.x600', // 24px
        },
      },
    },

    fullWidth: {
      adaptive: {
        '@sm': {
          width: 'auto',
        },
      },
      enable: {},
      disable: {
        width: 'auto',
      },
    },

    extraPadding: {
      true: {},
    },

    paddingSize: {
      medium: {},
      small: {},
      tiny: {},
    },

    rounded: {
      true: {},
    },
  },

    compoundVariants: [
    // Typography + PaddingSize combinations
    {
      typography: 'bodyS',
      paddingSize: 'medium',
      css: {
        padding: '$sizes.x300', // 12px
      },
    },
    {
      typography: 'bodyS',
      paddingSize: 'small',
      css: {
        padding: '$sizes.x200', // 8px
      },
    },
    {
      typography: 'bodyS',
      paddingSize: 'tiny',
      css: {
        padding: '$sizes.x100', // 4px
        borderRadius: '$radii.x100', // 4px
      },
    },
    {
      typography: 'bodyM',
      paddingSize: 'medium',
      css: {
        padding: '$sizes.x400', // 16px
      },
    },
    {
      typography: 'bodyM',
      paddingSize: 'small',
      css: {
        padding: '$sizes.x300', // 12px
      },
    },
    {
      typography: 'bodyM',
      paddingSize: 'tiny',
      css: {
        padding: '$sizes.x200', // 8px
        borderRadius: '$radii.x200', // 8px
      },
    },
    {
      typography: 'bodyL',
      paddingSize: 'medium',
      css: {
        padding: '$sizes.x500', // 20px
      },
    },
    {
      typography: 'bodyL',
      paddingSize: 'small',
      css: {
        padding: '$sizes.x400', // 16px
      },
    },
    {
      typography: 'bodyL',
      paddingSize: 'tiny',
      css: {
        padding: '$sizes.x300', // 12px
        borderRadius: '$radii.x200', // 8px
      },
    },

    // ExtraPadding adjustments
    {
      typography: 'bodyS',
      paddingSize: 'medium',
      extraPadding: true,
      css: {
        paddingLeft: '$sizes.x500', // 20px
        paddingRight: '$sizes.x500', // 20px
      },
    },
    {
      typography: 'bodyS',
      paddingSize: 'small',
      extraPadding: true,
      css: {
        paddingLeft: '$sizes.x400', // 16px
        paddingRight: '$sizes.x400', // 16px
      },
    },
    {
      typography: 'bodyS',
      paddingSize: 'tiny',
      extraPadding: true,
      css: {
        paddingLeft: '$sizes.x300', // 12px
        paddingRight: '$sizes.x300', // 12px
      },
    },
    {
      typography: 'bodyM',
      paddingSize: 'medium',
      extraPadding: true,
      css: {
        paddingLeft: '$sizes.x600', // 24px
        paddingRight: '$sizes.x600', // 24px
      },
    },
    {
      typography: 'bodyM',
      paddingSize: 'small',
      extraPadding: true,
      css: {
        paddingLeft: '$sizes.x500', // 20px
        paddingRight: '$sizes.x500', // 20px
      },
    },
    {
      typography: 'bodyM',
      paddingSize: 'tiny',
      extraPadding: true,
      css: {
        paddingLeft: '$sizes.x400', // 16px
        paddingRight: '$sizes.x400', // 16px
      },
    },
    {
      typography: 'bodyL',
      paddingSize: 'medium',
      extraPadding: true,
      css: {
        paddingLeft: '$sizes.x700', // 28px
        paddingRight: '$sizes.x700', // 28px
      },
    },
    {
      typography: 'bodyL',
      paddingSize: 'small',
      extraPadding: true,
      css: {
        paddingLeft: '$sizes.x600', // 24px
        paddingRight: '$sizes.x600', // 24px
      },
    },
    {
      typography: 'bodyL',
      paddingSize: 'tiny',
      extraPadding: true,
      css: {
        paddingLeft: '$sizes.x500', // 20px
        paddingRight: '$sizes.x500', // 20px
      },
    },

    // Rounded variant
    {
      typography: 'bodyS',
      rounded: true,
      css: {
        borderRadius: '$radii.infinite',
      },
    },
    {
      typography: 'bodyM',
      rounded: true,
      css: {
        borderRadius: '$radii.infinite',
      },
    },
    {
      typography: 'bodyL',
      rounded: true,
      css: {
        borderRadius: '$radii.infinite',
      },
    },
  ],

  defaultVariants: {
    typography: 'bodyM',
    paddingSize: 'medium',
    fullWidth: 'adaptive',
  },
})

ButtonContainer.displayName = 'Button.Container'

/**
 * Button - расширяет Container, добавляет variant и colorScheme
 * Отвечает за цвета и стили вариантов кнопки
 */
const ButtonStyled = styled(ButtonContainer, {
  '&:disabled': {
    cursor: 'not-allowed',
  },

  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: '$colors["brand-primary"]',
    outlineOffset: '1px',
  },

  variants: {
    isLoading: {
      true: {
        color: '$colors["transparent-primary"] !important',
        '& svg': {
          fill: '$colors["transparent-primary"] !important',
        },
      },
    },

    $disabled: {
      true: {
        cursor: 'not-allowed',
      },
    },

    variant: {
      filled: {
        color: '$colors["button-filled-text"]',
        '& svg': {
          fill: '$colors["button-filled-icon"]',
        },
      },
      outlined: {},
      tonned: {},
      transparent: {},
    },

    colorScheme: {
      brand: {},
      success: {},
      info: {},
      warning: {},
      critical: {},
      draft: {},
      constant: {},
      primary: {},
    },
  },

  compoundVariants: [
    // Filled variant combinations
    {
      variant: 'filled',
      colorScheme: 'brand',
      css: {
        background: '$colors["button-filled-brand-body-normal"]',
        color: '$colors["brand-text-primary"]',
        '& svg': {
          fill: '$colors["brand-icon-primary"]',
        },
        '@media (hover: hover)': {
          '&:hover': {
            background: '$colors["button-filled-brand-body-hover"]',
          },
        },
        '&:active': {
          background: '$colors["button-filled-brand-body-click"]',
        },
      },
    },
    {
      variant: 'filled',
      colorScheme: 'success',
      css: {
        background: '$colors["button-filled-success-body-normal"]',
        '@media (hover: hover)': {
          '&:hover': {
            background: '$colors["button-filled-success-body-hover"]',
          },
        },
        '&:active': {
          background: '$colors["button-filled-success-body-click"]',
        },
      },
    },
    {
      variant: 'filled',
      colorScheme: 'info',
      css: {
        background: '$colors["button-filled-info-body-normal"]',
        '@media (hover: hover)': {
          '&:hover': {
            background: '$colors["button-filled-info-body-hover"]',
          },
        },
        '&:active': {
          background: '$colors["button-filled-info-body-click"]',
        },
      },
    },
    {
      variant: 'filled',
      colorScheme: 'warning',
      css: {
        background: '$colors["button-filled-warning-body-normal"]',
        '@media (hover: hover)': {
          '&:hover': {
            background: '$colors["button-filled-warning-body-hover"]',
          },
        },
        '&:active': {
          background: '$colors["button-filled-warning-body-click"]',
        },
      },
    },
    {
      variant: 'filled',
      colorScheme: 'critical',
      css: {
        background: '$colors["button-filled-critical-body-normal"]',
        '@media (hover: hover)': {
          '&:hover': {
            background: '$colors["button-filled-critical-body-hover"]',
          },
        },
        '&:active': {
          background: '$colors["button-filled-critical-body-click"]',
        },
      },
    },
    {
      variant: 'filled',
      colorScheme: 'draft',
      css: {
        background: '$colors["button-filled-neutral-body-normal"]',
        '@media (hover: hover)': {
          '&:hover': {
            background: '$colors["button-filled-neutral-body-hover"]',
          },
        },
        '&:active': {
          background: '$colors["button-filled-neutral-body-click"]',
        },
      },
    },
    {
      variant: 'filled',
      colorScheme: 'constant',
      css: {
        color: '$colors["button-filled-constant-text"]',
        background: '$colors["button-filled-constant-body-normal"]',
        '& svg': {
          fill: '$colors["button-filled-constant-icon"]',
        },
        '@media (hover: hover)': {
          '&:hover': {
            background: '$colors["button-filled-constant-body-hover"]',
          },
        },
        '&:active': {
          background: '$colors["button-filled-constant-body-click"]',
        },
      },
    },
    {
      variant: 'filled',
      colorScheme: 'primary',
      css: {
        color: '$colors["button-filled-primary-text"]',
        background: '$colors["button-filled-primary-body-normal"]',
        '& svg': {
          fill: '$colors["button-filled-primary-icon"]',
        },
        '@media (hover: hover)': {
          '&:hover': {
            background: '$colors["button-filled-primary-body-hover"]',
          },
        },
        '&:active': {
          background: '$colors["button-filled-primary-body-click"]',
        },
      },
    },

    // Disabled states
    {
      $disabled: true,
      variant: 'filled',
      css: {
        '&&, &&:active, &&:hover': {
          background: '$colors["neutral-32"]',
          color: '$colors["constant-70"]',
          '& svg': {
            fill: '$colors["constant-70"]',
          },
        },
      },
    },
    {
      $disabled: true,
      variant: 'filled',
      colorScheme: 'constant',
      css: {
        '&&, &&:active, &&:hover': {
          background: '$colors["constant-32"]',
          color: '$colors["primary-70"]',
          '& svg': {
            fill: '$colors["primary-70"]',
          },
        },
      },
    },
  ],

    defaultVariants: {
    variant: 'filled',
    colorScheme: 'brand',
    isLoading: false,
    $disabled: false,
  },
})

export interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof ButtonStyled>,
    VariantProps<typeof ButtonStyled> {
  asChild?: boolean
}

const Button = React.forwardRef<
  React.ElementRef<typeof ButtonStyled>,
  ButtonProps
>(({ asChild, children, disabled, isLoading, ...props }, ref) => {
  if (asChild) {
    return (
      <Slot ref={ref}>
        <ButtonStyled {...props} $disabled={disabled} isLoading={isLoading}>
          {children}
        </ButtonStyled>
      </Slot>
    )
  }

  return (
    <ButtonStyled
      ref={ref}
      {...props}
      disabled={disabled}
      $disabled={disabled}
      isLoading={isLoading}
      onClick={isLoading ? undefined : props.onClick}
    >
      {children}
    </ButtonStyled>
  )
})

Button.displayName = 'Button'

export { Button, ButtonContainer, ButtonStyled }
export type { ButtonProps }
