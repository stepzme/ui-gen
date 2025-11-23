import * as React from 'react'
import { styled, type CSS } from '@/imported/styles/stitches.config'
import { Icon, type IconVariant } from '@/imported/components/ui/icon'

export type Typography = 'bodyS' | 'bodyM' | 'bodyL'

export interface ButtonIconProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'disabled'> {
  /**
   * Контент кнопки. Если не задан, можно использовать `icon`.
   */
  children?: React.ReactNode
  /**
   * Имя иконки из реестра Icon. Используется, если не передан children.
   */
  icon?: IconVariant
  /**
   * Размер элемента
   * @default 'bodyM'
   */
  typography?: Typography
  /**
   * Добавляет внутренние отступы вокруг иконки
   * @default false
   */
  withPadding?: boolean
  /**
   * Состояние активности
   * @default false
   */
  isActive?: boolean
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
   * Кастомные стили через Stitches
   */
  css?: CSS
}

const ButtonIconContainer = styled('button', {
  // Layout из meta
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'none',
  border: 'none',
  outlineOffset: 2,
  padding: 0,
  cursor: 'pointer',
  WebkitTapHighlightColor: 'transparent',
  
  // Визуальные стили из UI
  color: 'var(--semantic-icon-primary)',
  transition: 'color 0.2s ease',
  borderRadius: '$x1',
  outline: 'none',

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
      color: 'var(--semantic-primary-60)',
    },
  },

  '&:active': {
    color: 'var(--semantic-primary-70)',
  },

  variants: {
    // Typography из meta
    typography: {
      bodyS: {
        fontSize: '$x4',
      },
      bodyM: {},
      bodyL: {},
    },
    // WithPadding из meta
    withPadding: {
      true: {},
      false: {},
    },
    // UI variants
    isActive: {
      true: {
        color: 'var(--semantic-primary-primary)',
      },
    },
    disabled: {
      true: {
        color: 'var(--semantic-neutral-40)',
        cursor: 'not-allowed',
        pointerEvents: 'none',
      },
    },
  },
  
  compoundVariants: [
    // Комбинации typography + withPadding из meta
    {
      typography: 'bodyM',
      withPadding: true,
      css: {
        fontSize: '$x4',
        padding: '$x05',
      },
    },
    {
      typography: 'bodyL',
      withPadding: true,
      css: {
        fontSize: '$x4',
        padding: '$x1',
      },
    },
    {
      typography: 'bodyM',
      withPadding: false,
      css: {
        fontSize: '$x5',
      },
    },
    {
      typography: 'bodyL',
      withPadding: false,
      css: {
        fontSize: '$x5',
        padding: '$x05',
      },
    },
  ],

  defaultVariants: {
    typography: 'bodyM',
    withPadding: false,
    isActive: false,
    disabled: false,
  },
})

export const ButtonIcon = React.forwardRef<HTMLButtonElement, ButtonIconProps>(
  (
    {
      children,
      icon,
      typography = 'bodyM',
      withPadding = false,
      isActive = false,
      disabled = false,
      'data-test-id': dataTestId,
      css,
      className,
      onClick,
      ...props
    },
    ref,
  ) => {
    const testId = dataTestId || 'ButtonIcon'
    const content = children ?? (icon ? <Icon variant={icon} /> : null)

    return (
      <ButtonIconContainer
        ref={ref}
        className={className}
        typography={typography}
        withPadding={withPadding}
        isActive={isActive}
        disabled={disabled}
        data-test-id={testId}
        aria-disabled={disabled}
        disabled={disabled}
        css={css}
        onClick={disabled ? undefined : onClick}
      {...props}
    >
        {content}
      </ButtonIconContainer>
  )
  },
)

ButtonIcon.displayName = 'ButtonIcon'

export { ButtonIconContainer }

