import * as React from 'react'
import { createPortal } from 'react-dom'
import { styled, type CSS } from '@/imported/styles/stitches.config'
import { Container } from '@/imported/components/meta/container'
import { Typography } from '@/imported/components/meta/typography'
import { Overlay } from '@/imported/components/ui/overlay'
import { ButtonIcon } from '@/imported/components/ui/buttonIcon'
import { Icon } from '@/imported/components/ui/icon'

export type DrawerPosition = 'left' | 'right'

export interface DrawerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Содержимое
   */
  children?: React.ReactNode
  /**
   * Флаг отображения drawer
   */
  isOpen: boolean
  /**
   * Коллбэк, вызываемый при закрытии
   */
  onClose?: () => void
  /**
   * Позиция drawer
   * @default 'left'
   */
  position?: DrawerPosition
  /**
   * Ширина drawer
   * @default 600
   */
  width?: number | string
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
   * Показывать иконку закрытия
   * @default true
   */
  showCloseIcon?: boolean
  /**
   * Кастомные стили через Stitches
   */
  css?: CSS
}

const DrawerContainer = styled(Container, {
  boxSizing: 'border-box',
  position: 'fixed',
  top: 0,
  bottom: 0,
  zIndex: 1001,
  backgroundColor: 'var(--semantic-background1-primary)',
  width: 600,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  boxShadow: 'var(--semantic-shadow-md)',
  transition: 'transform 500ms cubic-bezier(0.4, 0.1, 0.3, 1)',
  
  variants: {
    position: {
      right: {
        right: 0,
        transform: 'translateX(100%)',
      },
      left: {
        left: 0,
        transform: 'translateX(-100%)',
      },
    },
    isOpen: {
      true: {
        transform: 'translateX(0)',
      },
    },
  },
})

const DrawerHeader = styled(Container, {
  padding: '$x4 $x5',
  minHeight: '$x5',
  flexShrink: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '$x1',
  position: 'relative',
})

const DrawerTitle = styled(Typography, {
  flexGrow: 1,
})

const DrawerDescription = styled(Typography, {
  color: 'var(--semantic-text-secondary)',
})

const DrawerContent = styled(Container, {
  position: 'relative',
  flexGrow: 1,
  minHeight: 100,
  overflow: 'auto',
})

const DrawerFooter = styled(Container, {
  padding: '$x2 $x5',
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '$x3',
  flexShrink: 0,
})

export const Drawer = React.forwardRef<HTMLDivElement, DrawerProps>(
  (
    {
      children,
      isOpen,
      onClose,
      position = 'left',
      width = 600,
      closeOnClickAway = true,
      showBlurredBackground = true,
      title,
      description,
      footer,
      showCloseIcon = true,
      css,
      ...props
    },
    ref
  ) => {
    const [mounted, setMounted] = React.useState(false)
    
    React.useEffect(() => {
      setMounted(true)
    }, [])
    
    const handleBackgroundClick = () => {
      if (closeOnClickAway) {
        onClose?.()
      }
    }
    
    if (!mounted || !isOpen) {
      return null
    }
    
    const content = (
      <>
        {showBlurredBackground && (
          <Overlay isOpen={isOpen} onClick={handleBackgroundClick} />
        )}
        <DrawerContainer
          ref={ref}
          position={position}
          isOpen={isOpen}
          css={{
            width: typeof width === 'number' ? `${width}px` : width,
            ...css,
          }}
          {...props}
        >
          {(title || description || (onClose && showCloseIcon)) && (
            <DrawerHeader>
              {title && (
                <DrawerTitle typography="headlineM">
                  {title}
                </DrawerTitle>
              )}
              {description && (
                <DrawerDescription typography="bodyS">
                  {description}
                </DrawerDescription>
              )}
              {onClose && showCloseIcon && (
                <ButtonIcon
                  variant="transparent"
                  onClick={onClose}
                  aria-label="Закрыть"
                  css={{
                    position: 'absolute',
                    right: '$x5',
                    top: '$x4',
                  }}
                >
                  <Icon variant="circle_cross" />
                </ButtonIcon>
              )}
            </DrawerHeader>
          )}
          
          {children && (
            <DrawerContent>
              {children}
            </DrawerContent>
          )}
          
          {footer && (
            <DrawerFooter>
              {footer}
            </DrawerFooter>
          )}
        </DrawerContainer>
      </>
    )
    
    return createPortal(content, document.body)
  }
)

Drawer.displayName = 'Drawer'

