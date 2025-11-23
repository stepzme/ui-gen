import * as React from 'react'
import { styled, type CSS, typographyStyles } from '@/imported/styles/stitches.config'
import { Container } from '@/imported/components/meta/container'
import { Typography } from '@/imported/components/meta/typography'
import { Tooltip, type Placement, type Typography as TooltipTypography } from '@/imported/components/ui/tooltip'
import { Link } from '@/imported/components/ui/link'
import { ButtonIcon } from '@/imported/components/ui/buttonIcon'
import { Icon } from '@/imported/components/ui/icon'

export type HintTypography = 'bodyS' | 'bodyM' | 'bodyL'
export type HintSize = 'small' | 'medium' | 'large'

export interface HintProps {
  /**
   * Элемент, на котором будет открываться Хинт
   */
  children: React.ReactNode
  /**
   * Основной текст хинта
   */
  text?: string
  /**
   * Заголовок
   */
  title?: string
  /**
   * Текст синей кнопки хинта
   */
  actionText?: string
  /**
   * Обработчик нажатия на actionText
   */
  onClick?: () => void
  /**
   * Позиционирование
   * @default 'auto'
   */
  placement?: Placement
  /**
   * Размер типографики
   * @default 'bodyM'
   */
  typography?: HintTypography
  /**
   * Размер (deprecated, используйте typography)
   * @deprecated
   */
  size?: HintSize
  /**
   * Показывать ли иконку закрытия
   * @default true
   */
  closeIcon?: boolean
  /**
   * Закрывать по клику вовне
   * @default true
   */
  closeOnClickAway?: boolean
  /**
   * Пропсы всплывающего окна
   */
  tooltipProps?: Partial<any>
  /**
   * Пропсы триггера хинта
   */
  controlProps?: React.ButtonHTMLAttributes<HTMLButtonElement>
  /**
   * Пропсы кнопки закрытия
   */
  closeButtonProps?: Partial<any>
  /**
   * Пропсы кнопки действия
   */
  actionProps?: Partial<any>
  /**
   * Кастомные стили через Stitches
   */
  css?: CSS
  /**
   * ID элемента для авто-тестов
   */
  'data-test-id'?: string
  /**
   * className
   */
  className?: string
}

const HintControl = styled('button', {
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',
  padding: 0,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
})

const HintContent = styled(Container, {
  display: 'flex',
  flexDirection: 'column',
  gap: '$x2',
  maxWidth: '320px',
})

const HintHeader = styled(Container, {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: '$x2',
})

const HintTitle = styled(Typography, {
  ...typographyStyles.bodyM_tight_medium,
  color: 'var(--semantic-text-primary)',
  flex: 1,
})

const HintText = styled(Typography, {
  ...typographyStyles.bodyS_paragraph_normal,
  color: 'var(--semantic-text-secondary)',
})

const HintFooter = styled(Container, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '$x2',
})

// Функция для маппинга size -> typography (deprecated)
const sizeToTypography = (size?: HintSize): HintTypography => {
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

export const Hint = React.forwardRef<HTMLButtonElement, HintProps>(
  (
    {
      children,
      text,
      title,
      actionText,
      onClick,
      placement = 'auto',
      typography,
      size,
      closeIcon = true,
      closeOnClickAway = true,
      tooltipProps,
      controlProps,
      closeButtonProps,
      actionProps,
      css,
      'data-test-id': dataTestId,
      className,
    },
    ref
  ) => {
    const [visible, setVisible] = React.useState(false)
    const controlRef = React.useRef<HTMLButtonElement>(null)

    const effectiveTypography = typography || sizeToTypography(size) || 'bodyM'

    const handleClose = React.useCallback(() => {
      setVisible(false)
      if (controlRef.current) {
        controlRef.current.focus()
      }
    }, [])

    const handleControlClick = React.useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        setVisible((prev) => !prev)
        controlProps?.onClick?.(e)
      },
      [controlProps]
    )

    // Обработчик клика вне элемента
    React.useEffect(() => {
      if (!visible || !closeOnClickAway) return

      const handleClickOutside = (event: MouseEvent) => {
        if (controlRef.current && !controlRef.current.contains(event.target as Node)) {
          handleClose()
        }
      }

      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [visible, closeOnClickAway, handleClose])

    const content = (
      <HintContent>
        {(title || closeIcon) && (
          <HintHeader>
            {title && <HintTitle typography={effectiveTypography}>{title}</HintTitle>}
            {closeIcon && (
              <ButtonIcon
                icon="circle_cross"
                onClick={handleClose}
                aria-label="Закрыть подсказку"
                typography={effectiveTypography}
                {...closeButtonProps}
              />
            )}
          </HintHeader>
        )}
        {text && <HintText typography="bodyS">{text}</HintText>}
        {actionText && (
          <HintFooter>
            <Link
              onClick={(e) => {
                e.preventDefault()
                onClick?.()
              }}
              colorScheme="brand"
              typography={effectiveTypography}
              {...actionProps}
            >
              {actionText}
            </Link>
          </HintFooter>
        )}
      </HintContent>
    )

    return (
      <Tooltip
        placement={placement}
        visible={visible}
        disabled={false}
        content={content}
        typography={effectiveTypography as TooltipTypography}
        {...tooltipProps}
        className={className}
      >
        <HintControl
          ref={ref || controlRef}
          type="button"
          onClick={handleControlClick}
          data-test-id={dataTestId}
          {...controlProps}
        >
          {children}
        </HintControl>
      </Tooltip>
    )
  }
)

Hint.displayName = 'Hint'

