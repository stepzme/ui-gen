import * as React from 'react'
import { styled, type CSS, typographyStyles } from '@/imported/styles/stitches.config'
import { Container } from '@/imported/components/meta/container'
import { Typography } from '@/imported/components/meta/typography'

export type SuggestTypography = 'bodyS' | 'bodyM' | 'bodyL'
export type SuggestSize = 'small' | 'medium' | 'large'

export interface SuggestProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Текст подсказки
   */
  label: string
  /**
   * Значение подсказки
   */
  value: string
  /**
   * Обработчик клика
   */
  onClick?: (value: string) => void
  /**
   * Выбрана ли подсказка
   * @default false
   */
  selected?: boolean
  /**
   * Иконка
   */
  icon?: React.ReactNode
  /**
   * Эмоджи
   */
  emoji?: React.ReactNode
  /**
   * Размер типографики
   * @default 'bodyM'
   */
  typography?: SuggestTypography
  /**
   * Размер (deprecated, используйте typography)
   * @deprecated
   */
  size?: SuggestSize
  /**
   * Кастомные стили через Stitches
   */
  css?: CSS
}

const SuggestContainer = styled(Container, {
  display: 'flex',
  alignItems: 'center',
  gap: '$x2',
  padding: '$x3 $x4',
  borderRadius: '$x2',
  border: '1px solid transparent',
  backgroundColor: 'var(--semantic-elevation-0-body)',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  textAlign: 'left',
  width: '100%',

  '@media (hover: hover)': {
    '&:hover': {
      backgroundColor: 'var(--semantic-primary-4)',
      borderColor: 'var(--semantic-elevation-0-border-hover)',
    },
  },

  '&:active': {
    backgroundColor: 'var(--semantic-primary-8)',
    borderColor: 'var(--semantic-elevation-0-border-click)',
  },

  '&:disabled': {
    pointerEvents: 'none',
    opacity: 0.5,
    cursor: 'auto',
  },

  variants: {
    selected: {
      true: {
        backgroundColor: 'var(--semantic-brand-8)',
        borderColor: 'var(--semantic-brand-primary)',
        color: 'var(--semantic-text-brand)',
        '@media (hover: hover)': {
          '&:hover': {
            backgroundColor: 'var(--semantic-brand-12)',
            borderColor: 'var(--semantic-brand-secondary)',
          },
        },
        '&:active': {
          backgroundColor: 'var(--semantic-brand-16)',
          borderColor: 'var(--semantic-brand-tertiary)',
        },
      },
      false: {},
    },
    typography: {
      bodyS: {
        ...typographyStyles.bodyS_tight_normal,
        padding: '$x2 $x3',
      },
      bodyM: {
        ...typographyStyles.bodyM_tight_normal,
        padding: '$x3 $x4',
      },
      bodyL: {
        ...typographyStyles.bodyL_tight_normal,
        padding: '$x4 $x5',
      },
    },
  },

  defaultVariants: {
    selected: false,
    typography: 'bodyM',
  },
})

// Функция для маппинга size -> typography (deprecated)
const sizeToTypography = (size?: SuggestSize): SuggestTypography => {
  switch (size) {
    case 'small':
      return 'bodyS'
    case 'medium':
      return 'bodyM'
    case 'large':
      return 'bodyL'
    default:
      return 'bodyM'
  }
}

export const Suggest = React.forwardRef<HTMLButtonElement, SuggestProps>(
  ({ label, value, onClick, selected = false, icon, emoji, typography, size, css, ...props }, ref) => {
    const effectiveTypography = typography || sizeToTypography(size) || 'bodyM'

    const handleClick = () => {
      onClick?.(value)
    }

    return (
      <SuggestContainer
        ref={ref}
        type="button"
        selected={selected}
        typography={effectiveTypography}
        onClick={handleClick}
        css={css}
        {...props}
      >
        {icon}
        {emoji && <Container>{emoji}</Container>}
        <Typography typography={effectiveTypography}>{label}</Typography>
      </SuggestContainer>
    )
  }
)

Suggest.displayName = 'Suggest'

