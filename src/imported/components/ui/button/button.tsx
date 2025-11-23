import * as React from 'react'
import { styled, type CSS, typography } from '@/imported/styles/stitches.config'
import { Loader } from '@/imported/components/meta/loader'

export type Variant = 'filled' | 'outlined' | 'tonned' | 'transparent'
export type ColorScheme = 'brand' | 'success' | 'info' | 'warning' | 'critical' | 'draft' | 'constant' | 'primary'
export type Typography = 'bodyS' | 'bodyM' | 'bodyL'
export type PaddingSize = 'tiny' | 'small' | 'medium'
export type FullWidth = 'adaptive' | 'enable' | 'disable'

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'> {
  /**
   * Контент кнопки
   */
  children: React.ReactNode
  /**
   * Тип фона
   * @default 'filled'
   */
  variant?: Variant
  /**
   * Цветовая схема
   * @default 'brand'
   */
  colorScheme?: ColorScheme
  /**
   * Цвет (deprecated, используйте colorScheme)
   * @deprecated
   */
  color?: ColorScheme
  /**
   * Размер элемента
   * @default 'bodyM'
   */
  typography?: Typography
  /**
   * Размер (deprecated, используйте typography)
   * @deprecated
   */
  size?: Typography
  /**
   * Дополнительный внутренний отступ
   * @default false
   */
  extraPadding?: boolean
  /**
   * Растягивать компонент на все доступное пространство
   * @default 'adaptive'
   */
  fullWidth?: FullWidth
  /**
   * Растягивать компонент (deprecated, используйте fullWidth)
   * @deprecated
   */
  wide?: FullWidth
  /**
   * Размер внутренних отступов
   * @default 'medium'
   */
  paddingSize?: PaddingSize
  /**
   * Скругление границ
   * @default false
   */
  rounded?: boolean
  /**
   * Состояние загрузки
   * @default false
   */
  isLoading?: boolean
  /**
   * Отключенное состояние
   * @default false
   */
  disabled?: boolean
  /**
   * ID элемента для авто-тестов
   */
  'data-test-id'?: string
  /**
   * ID элемента для авто-тестов (deprecated, используйте data-test-id)
   * @deprecated
   */
  dataTestId?: string
  /**
   * Кастомные стили через Stitches
   */
  css?: CSS
}

// Функция для создания border с тенью для outlined варианта
function getShadowBorder(width: number, color: string) {
  return {
    border: `${width}px solid ${color}`,
    boxShadow: `0 0 0 ${width}px ${color}`,
  }
}

// Контейнер для контента с Loader
const ButtonContent = styled('span', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
})

const ButtonLabel = styled('span', {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 'inherit',

  variants: {
    visuallyHidden: {
      true: {
        visibility: 'hidden',
      },
    },
  },
})

// Основной контейнер кнопки (layout и typography из meta + визуальные стили)
const ButtonContainer = styled('button', {
  // Layout из meta
  position: 'relative',
  display: 'inline-flex',
  flexDirection: 'row',
  alignItems: 'center',
  columnGap: '$x3',
  justifyContent: 'center',
  background: 'none',
  border: 'none',
  outlineOffset: 2,
  cursor: 'pointer',
  userSelect: 'none',
  width: '100%',
  WebkitTapHighlightColor: 'transparent',
  
  // Визуальные стили из UI
  '&:disabled': {
    cursor: 'not-allowed',
  },
  '&:focus-visible': {
    outline: '2px solid var(--color-scheme-brand-primary)',
    outlineOffset: '1px',
  },
  [`& ${Loader.Container}`]: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'inherit',
  },
  
  variants: {
    // Typography из meta
    typography: {
      bodyS: {
        borderRadius: '$x2',
        ...typography.bodyS_tight_medium,
        '& svg': {
          fontSize: '$x4',
        },
      },
      bodyM: {
        borderRadius: '$x3',
        ...typography.bodyM_tight_medium,
        '& svg': {
          fontSize: '$x5',
        },
      },
      bodyL: {
        borderRadius: '$x4',
        ...typography.bodyL_tight_medium,
        '& svg': {
          fontSize: '$x6',
        },
      },
    },
    // FullWidth из meta
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
    // ExtraPadding из meta
    extraPadding: {
      true: {},
    },
    // PaddingSize из meta
    paddingSize: {
      medium: {},
      small: {},
      tiny: {},
    },
    // Rounded из meta
    rounded: {
      true: {
        borderRadius: '$infinite !important',
      },
    },
    // UI variants
    isLoading: {
      true: {},
    },
    $disabled: {
      true: {
        cursor: 'not-allowed',
      },
    },
      variant: {
      filled: {
        color: 'var(--components-button-filled-text)',
        '& svg': {
          fill: 'var(--components-button-filled-icon)',
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
        background: 'var(--components-button-filled-brand-body-normal)',
        color: 'var(--color-scheme-brand-text-primary)',
        '& svg': {
          fill: 'var(--color-scheme-brand-icon-primary)',
        },
        '@media (hover: hover)': {
          '&:hover': {
            background: 'var(--components-button-filled-brand-body-hover)',
          },
        },
        '&:active': {
          background: 'var(--components-button-filled-brand-body-click)',
        },
      },
    },
    {
      variant: 'filled',
      colorScheme: 'success',
      css: {
        background: 'var(--components-button-filled-success-body-normal)',
        '@media (hover: hover)': {
          '&:hover': {
            background: 'var(--components-button-filled-success-body-hover)',
          },
        },
        '&:active': {
          background: 'var(--components-button-filled-success-body-click)',
        },
      },
    },
    {
      variant: 'filled',
      colorScheme: 'info',
      css: {
        background: 'var(--components-button-filled-info-body-normal)',
        '@media (hover: hover)': {
          '&:hover': {
            background: 'var(--components-button-filled-info-body-hover)',
          },
        },
        '&:active': {
          background: 'var(--components-button-filled-info-body-click)',
        },
      },
    },
    {
      variant: 'filled',
      colorScheme: 'warning',
      css: {
        background: 'var(--components-button-filled-warning-body-normal)',
        '@media (hover: hover)': {
          '&:hover': {
            background: 'var(--components-button-filled-warning-body-hover)',
          },
        },
        '&:active': {
          background: 'var(--components-button-filled-warning-body-click)',
        },
      },
    },
    {
      variant: 'filled',
      colorScheme: 'critical',
      css: {
        background: 'var(--components-button-filled-critical-body-normal)',
        '@media (hover: hover)': {
          '&:hover': {
            background: 'var(--components-button-filled-critical-body-hover)',
          },
        },
        '&:active': {
          background: 'var(--components-button-filled-critical-body-click)',
        },
      },
    },
    {
      variant: 'filled',
      colorScheme: 'draft',
      css: {
        background: 'var(--components-button-filled-neutral-body-normal)',
        '@media (hover: hover)': {
          '&:hover': {
            background: 'var(--components-button-filled-neutral-body-hover)',
          },
        },
        '&:active': {
          background: 'var(--components-button-filled-neutral-body-click)',
        },
      },
    },
    {
      variant: 'filled',
      colorScheme: 'constant',
      css: {
        color: 'var(--components-button-filled-constant-text)',
        background: 'var(--components-button-filled-constant-body-normal)',
        '& svg': {
          fill: 'var(--components-button-filled-constant-icon)',
        },
        '@media (hover: hover)': {
          '&:hover': {
            background: 'var(--components-button-filled-constant-body-hover)',
          },
        },
        '&:active': {
          background: 'var(--components-button-filled-constant-body-click)',
        },
      },
    },
    {
      variant: 'filled',
      colorScheme: 'primary',
      css: {
        color: 'var(--components-button-filled-primary-text)',
        background: 'var(--components-button-filled-primary-body-normal)',
        '& svg': {
          fill: 'var(--components-button-filled-primary-icon)',
        },
        '@media (hover: hover)': {
          '&:hover': {
            background: 'var(--components-button-filled-primary-body-hover)',
          },
        },
        '&:active': {
          background: 'var(--components-button-filled-primary-body-click)',
        },
      },
    },
    // Tonned variant combinations
    {
      variant: 'tonned',
      colorScheme: 'brand',
      css: {
        color: 'var(--semantic-brand-primary)',
        background: 'var(--components-button-tonned-brand-body-normal)',
        '& svg': {
          fill: 'var(--semantic-brand-primary)',
        },
        '@media (hover: hover)': {
          '&:hover': {
            background: 'var(--components-button-tonned-brand-body-hover)',
          },
        },
        '&:active': {
          background: 'var(--components-button-tonned-brand-body-click)',
        },
      },
    },
    {
      variant: 'tonned',
      colorScheme: 'success',
      css: {
        color: 'var(--components-button-tonned-success-text)',
        background: 'var(--components-button-tonned-success-body-normal)',
        '& svg': {
          fill: 'var(--components-button-tonned-success-icon)',
        },
        '@media (hover: hover)': {
          '&:hover': {
            background: 'var(--components-button-tonned-success-body-hover)',
          },
        },
        '&:active': {
          background: 'var(--components-button-tonned-success-body-click)',
        },
      },
    },
    {
      variant: 'tonned',
      colorScheme: 'info',
      css: {
        color: 'var(--components-button-tonned-info-text)',
        background: 'var(--components-button-tonned-info-body-normal)',
        '& svg': {
          fill: 'var(--components-button-tonned-info-icon)',
        },
        '@media (hover: hover)': {
          '&:hover': {
            background: 'var(--components-button-tonned-info-body-hover)',
          },
        },
        '&:active': {
          background: 'var(--components-button-tonned-info-body-click)',
        },
      },
    },
    {
      variant: 'tonned',
      colorScheme: 'warning',
      css: {
        color: 'var(--components-button-tonned-warning-text)',
        background: 'var(--components-button-tonned-warning-body-normal)',
        '& svg': {
          fill: 'var(--components-button-tonned-warning-icon)',
        },
        '@media (hover: hover)': {
          '&:hover': {
            background: 'var(--components-button-tonned-warning-body-hover)',
          },
        },
        '&:active': {
          background: 'var(--components-button-tonned-warning-body-click)',
        },
      },
    },
    {
      variant: 'tonned',
      colorScheme: 'critical',
      css: {
        color: 'var(--components-button-tonned-critical-text)',
        background: 'var(--components-button-tonned-critical-body-normal)',
        '& svg': {
          fill: 'var(--components-button-tonned-critical-icon)',
        },
        '@media (hover: hover)': {
          '&:hover': {
            background: 'var(--components-button-tonned-critical-body-hover)',
          },
        },
        '&:active': {
          background: 'var(--components-button-tonned-critical-body-click)',
        },
      },
    },
    {
      variant: 'tonned',
      colorScheme: 'draft',
      css: {
        color: 'var(--components-button-tonned-neutral-text)',
        background: 'var(--components-button-tonned-neutral-body-normal)',
        '& svg': {
          fill: 'var(--components-button-tonned-neutral-icon)',
        },
        '@media (hover: hover)': {
          '&:hover': {
            background: 'var(--components-button-tonned-neutral-body-hover)',
          },
        },
        '&:active': {
          background: 'var(--components-button-tonned-neutral-body-click)',
        },
      },
    },
    {
      variant: 'tonned',
      colorScheme: 'constant',
      css: {
        color: 'var(--components-button-tonned-constant-text)',
        background: 'var(--components-button-tonned-constant-body-normal)',
        '& svg': {
          fill: 'var(--components-button-tonned-constant-icon)',
        },
        '@media (hover: hover)': {
          '&:hover': {
            background: 'var(--components-button-tonned-constant-body-hover)',
          },
        },
        '&:active': {
          background: 'var(--components-button-tonned-constant-body-click)',
        },
      },
    },
    {
      variant: 'tonned',
      colorScheme: 'primary',
      css: {
        background: 'var(--components-button-tonned-primary-body-normal)',
        color: 'var(--components-button-tonned-primary-text)',
        '& svg': {
          fill: 'var(--components-button-tonned-primary-icon)',
        },
        '@media (hover: hover)': {
          '&:hover': {
            background: 'var(--components-button-tonned-primary-body-hover)',
          },
        },
        '&:active': {
          background: 'var(--components-button-tonned-primary-body-click)',
        },
      },
    },
    // Transparent variant combinations
    {
      variant: 'transparent',
      colorScheme: 'brand',
      css: {
        color: 'var(--semantic-brand-primary)',
        '& svg': {
          fill: 'var(--semantic-brand-primary)',
        },
        '@media (hover: hover)': {
          '&:hover': {
            background: 'var(--components-button-transparent-brand-body-hover)',
          },
        },
        '&:active': {
          background: 'var(--components-button-transparent-brand-body-click)',
        },
      },
    },
    {
      variant: 'transparent',
      colorScheme: 'success',
      css: {
        color: 'var(--components-button-transparent-success-text)',
        '& svg': {
          fill: 'var(--components-button-transparent-success-icon)',
        },
        '@media (hover: hover)': {
          '&:hover': {
            background: 'var(--components-button-transparent-success-body-hover)',
          },
        },
        '&:active': {
          background: 'var(--components-button-transparent-success-body-click)',
        },
      },
    },
    {
      variant: 'transparent',
      colorScheme: 'info',
      css: {
        color: 'var(--components-button-transparent-info-text)',
        '& svg': {
          fill: 'var(--components-button-transparent-info-icon)',
        },
        '@media (hover: hover)': {
          '&:hover': {
            background: 'var(--components-button-transparent-info-body-hover)',
          },
        },
        '&:active': {
          background: 'var(--components-button-transparent-info-body-click)',
        },
      },
    },
    {
      variant: 'transparent',
      colorScheme: 'warning',
      css: {
        color: 'var(--components-button-transparent-warning-text)',
        '& svg': {
          fill: 'var(--components-button-transparent-warning-icon)',
        },
        '@media (hover: hover)': {
          '&:hover': {
            background: 'var(--components-button-transparent-warning-body-hover)',
          },
        },
        '&:active': {
          background: 'var(--components-button-transparent-warning-body-click)',
        },
      },
    },
    {
      variant: 'transparent',
      colorScheme: 'critical',
      css: {
        color: 'var(--components-button-transparent-critical-text)',
        '& svg': {
          fill: 'var(--components-button-transparent-critical-icon)',
        },
        '@media (hover: hover)': {
          '&:hover': {
            background: 'var(--components-button-transparent-critical-body-hover)',
          },
        },
        '&:active': {
          background: 'var(--components-button-transparent-critical-body-click)',
        },
      },
    },
    {
      variant: 'transparent',
      colorScheme: 'draft',
      css: {
        color: 'var(--components-button-transparent-neutral-text)',
        '& svg': {
          fill: 'var(--components-button-transparent-neutral-icon)',
        },
        '@media (hover: hover)': {
          '&:hover': {
            background: 'var(--components-button-transparent-neutral-body-hover)',
          },
        },
        '&:active': {
          background: 'var(--components-button-transparent-neutral-body-click)',
        },
      },
    },
    {
      variant: 'transparent',
      colorScheme: 'constant',
      css: {
        background: 'var(--components-button-transparent-body-normal)',
        color: 'var(--components-button-transparent-constant-text)',
        '@media (hover: hover)': {
          '&:hover': {
            background: 'var(--components-button-transparent-constant-body-hover)',
          },
        },
        '&:active': {
          background: 'var(--components-button-transparent-constant-body-click)',
        },
        '& svg': {
          fill: 'var(--components-button-transparent-constant-icon)',
        },
      },
    },
    {
      variant: 'transparent',
      colorScheme: 'primary',
      css: {
        color: 'var(--components-button-transparent-primary-text)',
        '@media (hover: hover)': {
          '&:hover': {
            background: 'var(--components-button-transparent-primary-body-hover)',
          },
        },
        '&:active': {
          background: 'var(--components-button-transparent-primary-body-click)',
        },
        '& svg': {
          fill: 'var(--components-button-transparent-primary-icon)',
        },
      },
    },
    // Outlined variant combinations
    {
      variant: 'outlined',
      colorScheme: 'brand',
      css: {
        color: 'var(--semantic-brand-primary)',
        '& svg': {
          fill: 'var(--semantic-brand-primary)',
        },
        ...getShadowBorder(1, 'var(--components-button-outlined-brand-border-normal)'),
        '@media (hover: hover)': {
          '&:hover': {
            ...getShadowBorder(1, 'var(--components-button-outlined-brand-border-hover)'),
          },
        },
        '&:active': {
          ...getShadowBorder(1, 'var(--components-button-outlined-brand-border-click)'),
        },
      },
    },
    {
      variant: 'outlined',
      colorScheme: 'success',
      css: {
        color: 'var(--components-button-outlined-success-text)',
        '& svg': {
          fill: 'var(--components-button-outlined-success-icon)',
        },
        ...getShadowBorder(1, 'var(--components-button-outlined-success-border-normal)'),
        '@media (hover: hover)': {
          '&:hover': {
            ...getShadowBorder(1, 'var(--components-button-outlined-success-border-hover)'),
          },
        },
        '&:active': {
          ...getShadowBorder(1, 'var(--components-button-outlined-success-border-click)'),
        },
      },
    },
    {
      variant: 'outlined',
      colorScheme: 'info',
      css: {
        color: 'var(--components-button-outlined-info-text)',
        '& svg': {
          fill: 'var(--components-button-outlined-info-icon)',
        },
        ...getShadowBorder(1, 'var(--components-button-outlined-info-border-normal)'),
        '@media (hover: hover)': {
          '&:hover': {
            ...getShadowBorder(1, 'var(--components-button-outlined-info-border-hover)'),
          },
        },
        '&:active': {
          ...getShadowBorder(1, 'var(--components-button-outlined-info-border-click)'),
        },
      },
    },
    {
      variant: 'outlined',
      colorScheme: 'warning',
      css: {
        color: 'var(--components-button-outlined-warning-text)',
        '& svg': {
          fill: 'var(--components-button-outlined-warning-icon)',
        },
        ...getShadowBorder(1, 'var(--components-button-outlined-warning-border-normal)'),
        '@media (hover: hover)': {
          '&:hover': {
            ...getShadowBorder(1, 'var(--components-button-outlined-warning-border-hover)'),
          },
        },
        '&:active': {
          ...getShadowBorder(1, 'var(--components-button-outlined-warning-border-click)'),
        },
      },
    },
    {
      variant: 'outlined',
      colorScheme: 'critical',
      css: {
        color: 'var(--components-button-outlined-critical-text)',
        '& svg': {
          fill: 'var(--components-button-outlined-critical-icon)',
        },
        ...getShadowBorder(1, 'var(--components-button-outlined-critical-border-normal)'),
        '@media (hover: hover)': {
          '&:hover': {
            ...getShadowBorder(1, 'var(--components-button-outlined-critical-border-hover)'),
          },
        },
        '&:active': {
          ...getShadowBorder(1, 'var(--components-button-outlined-critical-border-click)'),
        },
      },
    },
    {
      variant: 'outlined',
      colorScheme: 'draft',
      css: {
        color: 'var(--components-button-outlined-neutral-text)',
        '& svg': {
          fill: 'var(--components-button-outlined-neutral-icon)',
        },
        ...getShadowBorder(1, 'var(--components-button-outlined-neutral-border-normal)'),
        '@media (hover: hover)': {
          '&:hover': {
            ...getShadowBorder(1, 'var(--components-button-outlined-neutral-border-hover)'),
          },
        },
        '&:active': {
          ...getShadowBorder(1, 'var(--components-button-outlined-neutral-border-click)'),
        },
      },
    },
    {
      variant: 'outlined',
      colorScheme: 'constant',
      css: {
        color: 'var(--components-button-outlined-constant-text)',
        '& svg': {
          fill: 'var(--components-button-outlined-constant-icon)',
        },
        ...getShadowBorder(1, 'var(--components-button-outlined-constant-border-normal)'),
        '@media (hover: hover)': {
          '&:hover': {
            ...getShadowBorder(1, 'var(--components-button-outlined-constant-border-hover)'),
          },
        },
        '&:active': {
          ...getShadowBorder(1, 'var(--components-button-outlined-constant-border-click)'),
        },
      },
    },
    {
      variant: 'outlined',
      colorScheme: 'primary',
      css: {
        color: 'var(--components-button-outlined-primary-text)',
        ...getShadowBorder(1, 'var(--components-button-outlined-primary-border-normal)'),
        '& svg': {
          fill: 'var(--components-button-outlined-primary-icon)',
        },
        '@media (hover: hover)': {
          '&:hover': {
            ...getShadowBorder(1, 'var(--components-button-outlined-primary-border-hover)'),
          },
        },
        '&:active': {
          ...getShadowBorder(1, 'var(--components-button-outlined-primary-border-click)'),
        },
      },
    },
    // Disabled states
    {
      $disabled: true,
      variant: 'filled',
      css: {
        '&&, &&:active, &&:hover': {
          background: 'var(--semantic-neutral-32)',
          color: 'var(--semantic-constant-70)',
          '& svg': {
            fill: 'var(--semantic-constant-70)',
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
          background: 'var(--semantic-constant-32)',
          color: 'var(--semantic-primary-70)',
          '& svg': {
            fill: 'var(--semantic-primary-70)',
          },
        },
      },
    },
    {
      $disabled: true,
      variant: 'tonned',
      css: {
        '&&, &&:active, &&:hover': {
          background: 'var(--semantic-neutral-4)',
          color: 'var(--semantic-neutral-40)',
          '& svg': {
            fill: 'var(--semantic-neutral-40)',
          },
        },
      },
    },
    {
      $disabled: true,
      variant: 'tonned',
      colorScheme: 'constant',
      css: {
        '&&, &&:active, &&:hover': {
          background: 'var(--semantic-constant-8)',
          color: 'var(--semantic-constant-40)',
          '& svg': {
            fill: 'var(--semantic-constant-40)',
          },
        },
      },
    },
    {
      $disabled: true,
      variant: 'transparent',
      css: {
        '&&, &&:active, &&:hover': {
          background: 'var(--components-button-transparent-body-normal)',
          color: 'var(--semantic-neutral-40)',
          '& svg': {
            fill: 'var(--semantic-neutral-40)',
          },
        },
      },
    },
    {
      $disabled: true,
      variant: 'transparent',
      colorScheme: 'constant',
      css: {
        '&&, &&:active, &&:hover': {
          background: 'var(--components-button-transparent-body-normal)',
          color: 'var(--semantic-constant-40)',
          '& svg': {
            fill: 'var(--semantic-constant-40)',
          },
        },
      },
    },
    {
      $disabled: true,
      variant: 'outlined',
      css: {
        '&&, &&:active, &&:hover': {
          background: 'var(--components-button-outlined-body)',
          color: 'var(--semantic-neutral-32)',
          ...getShadowBorder(1, 'var(--semantic-neutral-32)'),
          '& svg': {
            fill: 'var(--semantic-neutral-32)',
          },
        },
      },
    },
    {
      $disabled: true,
      variant: 'outlined',
      colorScheme: 'constant',
      css: {
        '&&, &&:active, &&:hover': {
          background: 'var(--components-button-outlined-body)',
          color: 'var(--semantic-constant-32)',
          ...getShadowBorder(1, 'var(--semantic-constant-32)'),
          '& svg': {
            fill: 'var(--semantic-constant-32)',
          },
        },
      },
    },
    // Комбинации typography + paddingSize из meta
    {
      typography: 'bodyS',
      paddingSize: 'medium',
      css: {
        padding: '$x3',
      },
    },
    {
      typography: 'bodyS',
      paddingSize: 'small',
      css: {
        padding: '$x2',
      },
    },
    {
      typography: 'bodyS',
      paddingSize: 'tiny',
      css: {
        padding: '$x1',
        borderRadius: '$x1',
      },
    },
    {
      typography: 'bodyM',
      paddingSize: 'medium',
      css: {
        padding: '$x4',
      },
    },
    {
      typography: 'bodyM',
      paddingSize: 'small',
      css: {
        padding: '$x3',
      },
    },
    {
      typography: 'bodyM',
      paddingSize: 'tiny',
      css: {
        padding: '$x2',
        borderRadius: '$x2',
      },
    },
    {
      typography: 'bodyL',
      paddingSize: 'medium',
      css: {
        padding: '$x5',
      },
    },
    {
      typography: 'bodyL',
      paddingSize: 'small',
      css: {
        padding: '$x4',
      },
    },
    {
      typography: 'bodyL',
      paddingSize: 'tiny',
      css: {
        padding: '$x3',
        borderRadius: '$x2',
      },
    },
    // Комбинации typography + paddingSize + extraPadding из meta
    {
      typography: 'bodyS',
      paddingSize: 'medium',
      extraPadding: true,
      css: {
        paddingLeft: '$x5',
        paddingRight: '$x5',
      },
    },
    {
      typography: 'bodyS',
      paddingSize: 'small',
      extraPadding: true,
      css: {
        paddingLeft: '$x4',
        paddingRight: '$x4',
      },
    },
    {
      typography: 'bodyS',
      paddingSize: 'tiny',
      extraPadding: true,
      css: {
        paddingLeft: '$x3',
        paddingRight: '$x3',
      },
    },
    {
      typography: 'bodyM',
      paddingSize: 'medium',
      extraPadding: true,
      css: {
        paddingLeft: '$x6',
        paddingRight: '$x6',
      },
    },
    {
      typography: 'bodyM',
      paddingSize: 'small',
      extraPadding: true,
      css: {
        paddingLeft: '$x5',
        paddingRight: '$x5',
      },
    },
    {
      typography: 'bodyM',
      paddingSize: 'tiny',
      extraPadding: true,
      css: {
        paddingLeft: '$x4',
        paddingRight: '$x4',
      },
    },
    {
      typography: 'bodyL',
      paddingSize: 'medium',
      extraPadding: true,
      css: {
        paddingLeft: '$x7',
        paddingRight: '$x7',
      },
    },
    {
      typography: 'bodyL',
      paddingSize: 'small',
      extraPadding: true,
      css: {
        paddingLeft: '$x6',
        paddingRight: '$x6',
      },
    },
    {
      typography: 'bodyL',
      paddingSize: 'tiny',
      extraPadding: true,
      css: {
        paddingLeft: '$x5',
        paddingRight: '$x5',
      },
    },
    // Комбинации paddingSize tiny + rounded из meta
    {
      paddingSize: 'tiny',
      rounded: true,
      css: {
        borderRadius: '$infinite',
      },
    },
  ],
  
  defaultVariants: {
    typography: 'bodyM',
    paddingSize: 'medium',
    fullWidth: 'adaptive',
    variant: 'filled',
    colorScheme: 'brand',
    isLoading: false,
    $disabled: false,
  },
})

// Функция для определения размера Loader на основе typography
function getLoaderSize(typography?: Typography): 'small' | 'medium' | 'large' {
  if (typography === 'bodyS') return 'small'
  if (typography === 'bodyL') return 'large'
  return 'medium'
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'filled',
      colorScheme,
      color,
      typography,
      size,
      fullWidth,
      wide,
      extraPadding = false,
      paddingSize = 'medium',
      rounded = false,
      isLoading = false,
      disabled = false,
      'data-test-id': dataTestIdProp,
      dataTestId,
      css,
      onClick,
      ...props
    },
    ref
  ) => {
    const effectiveColorScheme = colorScheme || color || 'brand'
    const effectiveTypography = typography || size || 'bodyM'
    const effectiveFullWidth = fullWidth || wide || 'adaptive'
    const finalDataTestId = dataTestIdProp || dataTestId || 'Button'
    const loaderSize = getLoaderSize(effectiveTypography)
    
    return (
      <ButtonContainer
        ref={ref}
        variant={variant}
        colorScheme={effectiveColorScheme}
        typography={effectiveTypography}
        extraPadding={extraPadding}
        fullWidth={effectiveFullWidth}
        paddingSize={paddingSize}
        rounded={rounded}
        isLoading={isLoading}
        $disabled={disabled}
        disabled={disabled || isLoading}
        data-test-id={finalDataTestId}
        aria-busy={isLoading}
        onClick={isLoading ? undefined : onClick}
        css={css}
        {...props}
      >
        {isLoading ? (
          <ButtonContent>
            <ButtonLabel visuallyHidden aria-hidden="true">
              {children}
            </ButtonLabel>
            <Loader.Container size={loaderSize} data-loader={true} role="status" aria-live="polite">
              <Loader.CircleBacking strokeWidth={2} stroke="currentColor" opacity={0.2} />
              <Loader.Line strokeWidth={2} stroke="currentColor" />
            </Loader.Container>
          </ButtonContent>
        ) : (
          children
        )}
      </ButtonContainer>
    )
  }
)

Button.displayName = 'Button'

export { ButtonContainer, ButtonContent, ButtonLabel }
