import * as React from 'react'
import { createPortal } from 'react-dom'
import { styled, type CSS } from '@/imported/styles/stitches.config'
import { Container } from '@/imported/components/meta/container'
import { Typography } from '@/imported/components/meta/typography'
import { Overlay } from '@/imported/components/ui/overlay'
import { ButtonIcon } from '@/imported/components/ui/buttonIcon'
import { Icon } from '@/imported/components/ui/icon'

export type ModalSize = 'xs' | 's' | 'm' | 'l' | 'xl'

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Содержимое
   */
  children?: React.ReactNode
  /**
   * Флаг отображения модального окна
   */
  isOpen: boolean
  /**
   * Коллбэк, вызываемый при закрытии
   */
  onClose?: () => void
  /**
   * Размер модального окна
   * @default 'm'
   */
  size?: ModalSize
  /**
   * Должен ли компонент закрываться при клике вне области
   * @default true
   */
  closeOnClickAway?: boolean
  /**
   * Показывать размытый фон
   * @default true
   */
  showBlurredBackground?: boolean
  /**
   * Заголовок
   */
  title?: React.ReactNode
  /**
   * Описание
   */
  description?: React.ReactNode
  /**
   * Футер
   */
  footer?: React.ReactNode
  /**
   * Внутренние отступы контента
   * @default false
   */
  hasContentPadding?: boolean
  /**
   * Прокручиваемый контент
   * @default false
   */
  scrollable?: boolean
  /**
   * Обработчик клика на фон
   */
  onOverlayClick?: () => void
  /**
   * Кастомные стили через Stitches
   */
  css?: CSS
}

const ModalContainer = styled(Container, {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  gap: '$x2',
  left: '50%',
  top: '50%',
  zIndex: 1001,
  width: '90%',
  boxSizing: 'border-box',
  transform: 'translate(-50%, -50%)',
  padding: '$x2 $x0',
  background: 'var(--semantic-elevation1-bodyNormal)',
  borderRadius: '$x4',
  maxHeight: '90vh',
  
  variants: {
    size: {
      xs: {
        width: '320px',
      },
      s: {
        width: '480px',
      },
      m: {
        width: '640px',
      },
      l: {
        width: '768px',
      },
      xl: {
        width: '980px',
      },
    },
    scrollable: {
      true: {
        overflow: 'auto',
      },
      false: {
        overflow: 'visible',
      },
    },
  },
  defaultVariants: {
    size: 'm',
  },
})

const ModalHeader = styled(Container, {
  padding: '$x4 $x5',
  display: 'flex',
  alignItems: 'flex-start',
  columnGap: '$x2',
  position: 'relative',
  flexShrink: 0,
})

const ModalTitleContainer = styled(Container, {
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  rowGap: '$x1',
})

const ModalTitle = styled(Typography, {
  id: 'modal-title',
})

const ModalDescription = styled(Typography, {
  color: 'var(--semantic-text-secondary)',
  id: 'modal-description',
})

const ModalContent = styled(Container, {
  flexGrow: 1,
  minHeight: 100,
  
  variants: {
    hasContentPadding: {
      true: {
        padding: '0 $x5',
      },
      false: {
        padding: 0,
      },
    },
    scrollable: {
      true: {
        overflow: 'auto',
        maxHeight: 'calc(90vh - 200px)',
      },
    },
  },
  defaultVariants: {
    hasContentPadding: false,
  },
})

const ModalFooter = styled(Container, {
  display: 'flex',
  justifyContent: 'flex-end',
  columnGap: '$x3',
  padding: '$x4 $x5',
  flexShrink: 0,
})

export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      children,
      isOpen,
      onClose,
      size = 'm',
      closeOnClickAway = true,
      showBlurredBackground = true,
      title,
      description,
      footer,
      hasContentPadding = false,
      scrollable = false,
      onOverlayClick,
      css,
      ...props
    },
    ref
  ) => {
    const [mounted, setMounted] = React.useState(false)
    
    React.useEffect(() => {
      setMounted(true)
    }, [])
    
    const handleOverlayClick = () => {
      if (closeOnClickAway) {
        onOverlayClick?.()
        onClose?.()
      }
    }
    
    if (!mounted || !isOpen) {
      return null
    }
    
    const content = (
      <>
        {showBlurredBackground && (
          <Overlay isOpen={isOpen} onClick={handleOverlayClick} />
        )}
        <ModalContainer
          ref={ref}
          size={size}
          scrollable={scrollable}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? 'modal-title' : undefined}
          aria-describedby={description ? 'modal-description' : undefined}
          css={css}
          {...props}
        >
          {(title || description || onClose) && (
            <ModalHeader>
              <ModalTitleContainer>
                {title && (
                  <ModalTitle typography="headlineM" asTag="h2">
                    {title}
                  </ModalTitle>
                )}
                {description && (
                  <ModalDescription typography="bodyS">
                    {description}
                  </ModalDescription>
                )}
              </ModalTitleContainer>
              {onClose && (
                <ButtonIcon
                  variant="transparent"
                  onClick={onClose}
                  aria-label="Закрыть"
                  css={{
                    position: 'absolute',
                    right: '$x5',
                    top: '$x5',
                  }}
                >
                  <Icon variant="circle_cross" />
                </ButtonIcon>
              )}
            </ModalHeader>
          )}
          
          {children && (
            <ModalContent hasContentPadding={hasContentPadding} scrollable={scrollable}>
              {children}
            </ModalContent>
          )}
          
          {footer && (
            <ModalFooter>
              {footer}
            </ModalFooter>
          )}
        </ModalContainer>
      </>
    )
    
    return createPortal(content, document.body)
  }
)

Modal.displayName = 'Modal'

