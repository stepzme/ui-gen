import * as React from 'react'
import { styled, type CSS, typographyStyles } from '@/imported/styles/stitches.config'
import { Container } from '@/imported/components/meta/container'
import { Typography } from '@/imported/components/meta/typography'
import { Icon } from '@/imported/components/ui/icon'
import { ButtonIcon } from '@/imported/components/ui/buttonIcon'
import { Link } from '@/imported/components/ui/link'

export type InformerVariant = 'info' | 'success' | 'warning' | 'critical' | 'brand' | 'draft'
export type InformerColorScheme = InformerVariant
export type InformerTypography = 'bodyS' | 'bodyM' | 'bodyL'
export type InformerSize = 'small' | 'medium' | 'large'
export type InformerArrowPosition = 'left' | 'center' | 'right'

export interface InformerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Заголовок информера
   */
  title?: React.ReactNode
  /**
   * Основной текст
   */
  text?: React.ReactNode
  /**
   * Текст ссылки
   */
  actionText?: React.ReactNode
  /**
   * Обработчик нажатия на actionText
   */
  onClick?: () => void
  /**
   * Обработчик нажатия на крестик
   */
  onClose?: () => void
  /**
   * Иконка (true для дефолтной, или ReactNode для кастомной)
   */
  icon?: boolean | React.ReactNode
  /**
   * Стрелочка сверху информера (deprecated)
   * @deprecated
   */
  arrowPosition?: InformerArrowPosition
  /**
   * HTML тег для заголовка
   * @default 'h2'
   */
  titleTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'span'
  /**
   * Вариант информера
   * @default 'info'
   */
  variant?: InformerVariant
  /**
   * Цветовая схема
   */
  colorScheme?: InformerColorScheme
  /**
   * Размер типографики
   * @default 'bodyM'
   */
  typography?: InformerTypography
  /**
   * Размер (deprecated, используйте typography)
   * @deprecated
   */
  size?: InformerSize
  /**
   * Инвертированные цвета для primary
   * @default false
   */
  primaryInverted?: boolean
  /**
   * Кастомные стили через Stitches
   */
  css?: CSS
}

const InformerContainer = styled(Container, {
  display: 'flex',
  alignItems: 'flex-start',
  boxSizing: 'border-box',
  position: 'relative',
  width: '100%',
  wordBreak: 'break-word',
  justifyContent: 'space-between',
  padding: '$x4',
  borderRadius: '$x3',
  gap: '$x3',

  variants: {
    typography: {
      bodyS: {
        borderRadius: '$x2',
        padding: `$x0 $x3`,
        gap: '$x2',
      },
      bodyM: {
        borderRadius: '$x3',
        padding: `$x0 $x4`,
        gap: '$x3',
      },
      bodyL: {
        borderRadius: '$x4',
        padding: `$x0 $x5`,
        gap: '$x4',
      },
    },
    colorScheme: {
      info: {
        backgroundColor: 'var(--semantic-info-4)',
        color: 'var(--semantic-text-info)',
        '& svg': {
          fill: 'var(--semantic-info-primary)',
        },
      },
      success: {
        backgroundColor: 'var(--semantic-success-4)',
        color: 'var(--semantic-text-success)',
        '& svg': {
          fill: 'var(--semantic-success-primary)',
        },
      },
      warning: {
        backgroundColor: 'var(--semantic-warning-4)',
        color: 'var(--semantic-text-warning)',
        '& svg': {
          fill: 'var(--semantic-warning-primary)',
        },
      },
      critical: {
        backgroundColor: 'var(--semantic-critical-4)',
        color: 'var(--semantic-text-critical)',
        '& svg': {
          fill: 'var(--semantic-critical-primary)',
        },
      },
      brand: {
        backgroundColor: 'var(--semantic-brand-4)',
        color: 'var(--semantic-text-brand)',
        '& svg': {
          fill: 'var(--semantic-brand-primary)',
        },
      },
      draft: {
        backgroundColor: 'var(--semantic-neutral-4)',
        color: 'var(--semantic-text-secondary)',
        '& svg': {
          fill: 'var(--semantic-icon-secondary)',
        },
      },
    },
    hasIconClose: {
      true: {},
      false: {},
    },
    arrowPosition: {
      true: {},
      false: {},
    },
  },

  defaultVariants: {
    typography: 'bodyM',
    colorScheme: 'info',
    hasIconClose: false,
    arrowPosition: false,
  },
})

const InformerContent = styled(Container, {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: '100%',
  gap: '$x2',
})

const InformerTitle = styled(Typography, {
  ...typographyStyles.bodyM_tight_medium,
  width: '100%',
})

const InformerText = styled(Typography, {
  ...typographyStyles.bodyM_tight_normal,
  width: '100%',
})

const InformerActionContainer = styled(Container, {
  width: '100%',
  marginTop: '$x2',
})

const InformerIconContainer = styled(Container, {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '$x5',
  height: '$x5',
  flexShrink: 0,
  '& svg': {
    fontSize: '$x6',
  },
})

// Иконки по умолчанию
const defaultIcons: Record<InformerVariant, string> = {
  info: 'circle_info',
  success: 'circle_checkmark',
  warning: 'circle_exclamation',
  critical: 'circle_exclamation',
  brand: 'circle_checkmark',
  draft: 'clock_arrows',
}

// Функция для маппинга size -> typography (deprecated)
const sizeToTypography = (size?: InformerSize): InformerTypography => {
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

export const Informer = React.forwardRef<HTMLDivElement, InformerProps>(
  (
    {
      title,
      text,
      actionText,
      onClick,
      onClose,
      icon = true,
      arrowPosition,
      titleTag = 'h2',
      variant = 'info',
      colorScheme,
      typography,
      size,
      primaryInverted = false,
      css,
      ...props
    },
    ref
  ) => {
    const effectiveColorScheme = colorScheme || variant
    const effectiveTypography = typography || sizeToTypography(size) || 'bodyM'

    const renderIcon = () => {
      if (!icon) return null

      if (icon === true) {
        const iconVariant = defaultIcons[effectiveColorScheme]
        return (
          <InformerIconContainer>
            <Icon variant={iconVariant} />
          </InformerIconContainer>
        )
      }

      return <InformerIconContainer>{icon}</InformerIconContainer>
    }

    const TitleComponent = titleTag

    return (
      <InformerContainer
        ref={ref}
        typography={effectiveTypography}
        colorScheme={effectiveColorScheme}
        hasIconClose={!!onClose}
        arrowPosition={!!arrowPosition}
        role={effectiveColorScheme === 'warning' || variant === 'warning' ? 'alert' : undefined}
        aria-live={effectiveColorScheme === 'warning' || variant === 'warning' ? undefined : 'polite'}
        css={css}
        {...props}
      >
        {renderIcon()}
        <InformerContent>
          {title && (
            <TitleComponent>
              <InformerTitle typography={effectiveTypography}>{title}</InformerTitle>
            </TitleComponent>
          )}
          {text && <InformerText typography={effectiveTypography}>{text}</InformerText>}
          {actionText && (
            <InformerActionContainer>
              <Link onClick={onClick} colorScheme="brand" typography={effectiveTypography}>
                {actionText}
              </Link>
            </InformerActionContainer>
          )}
        </InformerContent>
        {onClose && (
          <ButtonIcon
            icon="circle_cross"
            onClick={onClose}
            aria-label="Закрыть"
            typography={effectiveTypography}
          />
        )}
      </InformerContainer>
    )
  }
)

Informer.displayName = 'Informer'

