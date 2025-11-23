import * as React from 'react'
import { styled, type CSS, typographyStyles } from '@/imported/styles/stitches.config'
import { Container } from '@/imported/components/meta/container'
import { Typography } from '@/imported/components/meta/typography'

export type SegmentedControlVariant = 'filled' | 'outlined'
export type SegmentedControlTypography = 'bodyS' | 'bodyM' | 'bodyL'
export type SegmentedControlSize = 'small' | 'medium' | 'large'
export type SegmentedControlPaddingSize = 'tiny' | 'small' | 'medium'

export interface SegmentedControlItem {
  key: string
  name?: string
  icon?: React.ReactNode
  hasDivider?: boolean
}

export interface SegmentedControlProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * Элементы управления
   */
  items: SegmentedControlItem[]
  /**
   * Выбранный элемент
   */
  selected?: string
  /**
   * Обработчик изменения
   */
  onChange: (value: string) => void
  /**
   * Вариант отображения
   * @default 'outlined'
   */
  variant?: SegmentedControlVariant
  /**
   * Размер типографики
   * @default 'bodyM'
   */
  typography?: SegmentedControlTypography
  /**
   * Размер (deprecated, используйте typography)
   * @deprecated
   */
  size?: SegmentedControlSize
  /**
   * Размер внутренних отступов
   * @default 'medium'
   */
  paddingSize?: SegmentedControlPaddingSize
  /**
   * Растянуть на всю ширину
   * @default false
   */
  fullWidth?: boolean
  /**
   * Растянуть на весь экран (deprecated, используйте fullWidth)
   * @deprecated
   */
  fluid?: boolean
  /**
   * HTML тег для текста
   * @default 'span'
   */
  asTag?: 'span' | 'div'
  /**
   * Кастомные стили через Stitches
   */
  css?: CSS
}

const SegmentedControlContainer = styled(Container, {
  display: 'inline-flex',
  alignItems: 'center',
  borderRadius: '$x2',
  backgroundColor: 'var(--semantic-divider-thin)',
  padding: '$x1',
  gap: 0,

  variants: {
    fullWidth: {
      true: {
        width: '100%',
        display: 'flex',
      },
      false: {},
    },
    variant: {
      filled: {},
      outlined: {},
    },
  },

  defaultVariants: {
    fullWidth: false,
    variant: 'outlined',
  },
})

const SegmentedControlButton = styled('button', {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '$x2',
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  borderRadius: '$x1',
  flex: 1,

  variants: {
    active: {
      true: {},
      false: {},
    },
    variant: {
      filled: {
        active: {
          true: {
            backgroundColor: 'var(--semantic-brand-primary)',
            color: 'var(--semantic-brand-text-primary)',
          },
          false: {
            color: 'var(--semantic-text-secondary)',
            '@media (hover: hover)': {
              '&:hover': {
                backgroundColor: 'var(--semantic-primary-4)',
              },
            },
          },
        },
      },
      outlined: {
        active: {
          true: {
            color: 'var(--semantic-brand-primary)',
          },
          false: {
            color: 'var(--semantic-text-secondary)',
            '@media (hover: hover)': {
              '&:hover': {
                backgroundColor: 'var(--semantic-primary-4)',
              },
            },
          },
        },
      },
    },
    typography: {
      bodyS: {
        ...typographyStyles.bodyS_tight_normal,
        padding: '$x1 $x2',
      },
      bodyM: {
        ...typographyStyles.bodyM_tight_normal,
        padding: '$x2 $x3',
      },
      bodyL: {
        ...typographyStyles.bodyL_tight_normal,
        padding: '$x3 $x4',
      },
    },
    paddingSize: {
      tiny: {
        padding: '$x1 $x2',
      },
      small: {
        padding: '$x2 $x3',
      },
      medium: {
        padding: '$x2 $x3',
      },
    },
  },

  defaultVariants: {
    active: false,
    variant: 'outlined',
    typography: 'bodyM',
    paddingSize: 'medium',
  },
})

const SegmentedControlDivider = styled('div', {
  backgroundColor: 'var(--semantic-divider-thin)',
  width: '1px',
  height: '100%',
})

// Функция для маппинга size -> typography (deprecated)
const sizeToTypography = (size?: SegmentedControlSize): SegmentedControlTypography => {
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

export const SegmentedControl = React.forwardRef<HTMLDivElement, SegmentedControlProps>(
  (
    {
      items,
      selected,
      onChange,
      variant = 'outlined',
      typography,
      size,
      paddingSize = 'medium',
      fullWidth,
      fluid,
      asTag = 'span',
      css,
      ...props
    },
    ref
  ) => {
    const effectiveTypography = typography || sizeToTypography(size) || 'bodyM'
    const effectiveFullWidth = fullWidth || fluid || false

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, key: string) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onChange(key)
      }
    }

    return (
      <SegmentedControlContainer
        ref={ref}
        role="radiogroup"
        variant={variant}
        fullWidth={effectiveFullWidth}
        css={css}
        {...props}
      >
        {items.map((item, index) => {
          const isActive = selected === item.key
          return (
            <React.Fragment key={item.key}>
              <SegmentedControlButton
                id={item.key}
                role="radio"
                type="button"
                aria-checked={isActive}
                active={isActive}
                variant={variant}
                typography={effectiveTypography}
                paddingSize={paddingSize}
                onClick={() => onChange(item.key)}
                onKeyDown={(e) => handleKeyDown(e, item.key)}
              >
                {item.icon}
                {item.name && (
                  <Typography
                    as={asTag}
                    typography={effectiveTypography}
                    css={{
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                      color: variant === 'filled' && isActive
                        ? 'var(--semantic-brand-text-primary)'
                        : isActive
                          ? 'var(--semantic-brand-primary)'
                          : 'inherit',
                    }}
                  >
                    {item.name}
                  </Typography>
                )}
              </SegmentedControlButton>
              {index < items.length - 1 && item.hasDivider !== false && (
                <SegmentedControlDivider />
              )}
            </React.Fragment>
          )
        })}
      </SegmentedControlContainer>
    )
  }
)

SegmentedControl.displayName = 'SegmentedControl'

