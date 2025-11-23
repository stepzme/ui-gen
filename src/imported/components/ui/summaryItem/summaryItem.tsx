import * as React from 'react'
import { styled, type CSS, typographyStyles } from '@/imported/styles/stitches.config'
import { Container } from '@/imported/components/meta/container'
import { Typography } from '@/imported/components/meta/typography'
import { Divider } from '@/imported/components/ui/divider'

export type SummaryItemTextSize = 'medium' | 'regular'
export type SummaryItemAlign = 'left' | 'right' | 'center' | 'space-around' | 'space-between'
export type SummaryItemDirection = 'horizontal' | 'vertical'

export interface SummaryItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Заголовок
   */
  title?: React.ReactNode
  /**
   * Текст
   */
  text?: React.ReactNode
  /**
   * Подзаголовок
   */
  subtitle?: React.ReactNode
  /**
   * Направление контента
   * @default 'vertical'
   */
  direction?: SummaryItemDirection
  /**
   * Выравнивание
   */
  align?: SummaryItemAlign
  /**
   * Размер текста заголовка
   */
  textSize?: SummaryItemTextSize
  /**
   * Положение подзаголовка снизу
   * @default false
   */
  bottomSubtitle?: boolean
  /**
   * Показывать разделитель
   * @default false
   */
  hasDivider?: boolean
  /**
   * Кастомные стили через Stitches
   */
  css?: CSS
}

const SummaryItemContainer = styled(Container, {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: '$x1',

  variants: {
    direction: {
      vertical: {
        flexDirection: 'column',
      },
      horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
    },
    align: {
      left: {
        alignItems: 'flex-start',
        textAlign: 'left',
      },
      right: {
        alignItems: 'flex-end',
        textAlign: 'right',
      },
      center: {
        alignItems: 'center',
        textAlign: 'center',
      },
      'space-around': {
        justifyContent: 'space-around',
      },
      'space-between': {
        justifyContent: 'space-between',
      },
    },
  },
})

const SummaryItemTitle = styled(Typography, {
  ...typographyStyles.bodyM_tight_medium,
  color: 'var(--semantic-text-primary)',
})

const SummaryItemText = styled(Typography, {
  ...typographyStyles.bodyS_tight_normal,
  color: 'var(--semantic-text-secondary)',
})

const SummaryItemSubtitle = styled(Typography, {
  ...typographyStyles.bodyS_tight_normal,
  color: 'var(--semantic-text-secondary)',
})

export const SummaryItem = React.forwardRef<HTMLDivElement, SummaryItemProps>(
  (
    {
      title,
      text,
      subtitle,
      direction = 'vertical',
      align,
      textSize = 'medium',
      bottomSubtitle = false,
      hasDivider = false,
      css,
      ...props
    },
    ref
  ) => {
    return (
      <>
        <SummaryItemContainer ref={ref} direction={direction} align={align} css={css} {...props}>
          {title && <SummaryItemTitle>{title}</SummaryItemTitle>}
          {text && <SummaryItemText>{text}</SummaryItemText>}
          {!bottomSubtitle && subtitle && <SummaryItemSubtitle>{subtitle}</SummaryItemSubtitle>}
          {bottomSubtitle && subtitle && <SummaryItemSubtitle>{subtitle}</SummaryItemSubtitle>}
        </SummaryItemContainer>
        {hasDivider && <Divider />}
      </>
    )
  }
)

SummaryItem.displayName = 'SummaryItem'

