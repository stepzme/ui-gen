import * as React from 'react'
import { styled, type CSS, typography as typographyStyles } from '@/imported/styles/stitches.config'

export type Typography = 'bodyS' | 'bodyM' | 'bodyL'

interface ColorSchemeMap {
  brand: string
  success: string
  info: string
  warning: string
  critical: string
  draft: string
  constant: string
  primary: string
}

const COLOR_SCHEME_KEYS: Array<keyof ColorSchemeMap> = [
  'brand',
  'success',
  'info',
  'warning',
  'critical',
  'draft',
  'constant',
  'primary',
]

function createColorSchemeStyles(prefix: string) {
  return {
    color: `var(--components-button-text-${prefix}-text-normal)`,
    '& svg': {
      fill: `var(--components-button-text-${prefix}-icon-normal)`,
    },
    '@media (hover: hover)': {
      '&:hover': {
        color: `var(--components-button-text-${prefix}-text-hover)`,
        '& svg': {
          fill: `var(--components-button-text-${prefix}-icon-hover)`,
        },
      },
    },
    '&:active': {
      color: `var(--components-button-text-${prefix}-text-click)`,
      '& svg': {
        fill: `var(--components-button-text-${prefix}-icon-click)`,
      },
    },
  } as const
}

export interface ButtonTextProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'> {
  children?: React.ReactNode
  colorScheme?: keyof ColorSchemeMap
  typography?: Typography
  fullWidth?: boolean
  disabled?: boolean
  'data-test-id'?: string
  css?: CSS
}

const ButtonTextContainer = styled('button', {
  // Layout из meta
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 0,
  gap: '$x2',
  background: 'none',
  border: 'none',
  outlineOffset: 2,
  WebkitTapHighlightColor: 'transparent',
  
  // Визуальные стили из UI
  cursor: 'pointer',
  outline: 'none',
  textDecoration: 'none',
  userSelect: 'none',
  WebkitUserSelect: 'none',
  MozUserSelect: 'none',

  '& svg': {
    width: '1em',
    height: '1em',
    fill: 'currentColor',
    transition: 'fill 0.2s ease',
  },

  '&:focus-visible': {
    outline: '2px solid var(--color-scheme-brand-primary)',
    outlineOffset: '1px',
    borderRadius: '2px',
  },

  '@media (hover: hover)': {
    '&:hover': {
      color: 'var(--components-button-text-brand-text-hover)',
      '& svg': {
        fill: 'var(--components-button-text-brand-icon-hover)',
      },
    },
  },

  '&:active': {
    color: 'var(--components-button-text-brand-text-click)',
    '& svg': {
      fill: 'var(--components-button-text-brand-icon-click)',
    },
  },

  variants: {
    // Typography из meta
    typography: {
      bodyS: {
        ...typographyStyles.bodyS_tight_medium,
        gap: '$x2',
      },
      bodyM: {
        ...typographyStyles.bodyM_tight_medium,
        gap: '$x3',
      },
      bodyL: {
        ...typographyStyles.bodyL_tight_medium,
        gap: '$x4',
      },
    },
    // FullWidth из meta
    fullWidth: {
      true: {
        width: '100%',
        flexShrink: 0,
      },
    },
    // UI variants
    colorScheme: Object.fromEntries(
      COLOR_SCHEME_KEYS.map((key) => [key, createColorSchemeStyles(key.replace('draft', 'neutral'))]),
    ) as Record<keyof ColorSchemeMap, ReturnType<typeof createColorSchemeStyles>>,
    disabled: {
      true: {
        cursor: 'not-allowed',
        pointerEvents: 'none',
        color: 'var(--semantic-neutral-40)',
        '& svg': {
          fill: 'var(--semantic-neutral-40)',
        },
        '@media (hover: hover)': {
          '&:hover': {
            color: 'var(--semantic-neutral-40)',
            '& svg': {
              fill: 'var(--semantic-neutral-40)',
            },
          },
        },
        '&:active': {
          color: 'var(--semantic-neutral-40)',
          '& svg': {
            fill: 'var(--semantic-neutral-40)',
          },
        },
      },
    },
  },

  compoundVariants: [
    {
      colorScheme: 'constant',
      disabled: true,
      css: {
        color: 'var(--semantic-constant-40)',
        '& svg': {
          fill: 'var(--semantic-constant-40)',
        },
      },
    },
  ],

  defaultVariants: {
    typography: 'bodyM',
    fullWidth: false,
    colorScheme: 'brand',
    disabled: false,
  },
})

export const ButtonText = React.forwardRef<HTMLButtonElement, ButtonTextProps>(
  (
    {
      children,
      colorScheme = 'brand',
      typography = 'bodyM',
      fullWidth = false,
      disabled = false,
      'data-test-id': dataTestId,
      css,
      className,
      onClick,
      ...props
    },
    ref,
  ) => {
    const testId = dataTestId || 'ButtonText'

    return (
      <ButtonTextContainer
        ref={ref}
        className={className}
        colorScheme={colorScheme}
        typography={typography}
        fullWidth={fullWidth}
        disabled={disabled}
        aria-disabled={disabled}
        data-test-id={testId}
        css={css}
        onClick={disabled ? undefined : onClick}
        {...props}
      >
        {children}
      </ButtonTextContainer>
    )
  },
)

ButtonText.displayName = 'ButtonText'

export { ButtonTextContainer }
