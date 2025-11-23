import * as React from 'react'
import { createPortal } from 'react-dom'
import { styled, type CSS } from '@/imported/styles/stitches.config'
import { Container } from '@/imported/components/meta/container'
import { Typography } from '@/imported/components/meta/typography'
import { Overlay } from '@/imported/components/ui/overlay'
import { ButtonIcon } from '@/imported/components/ui/buttonIcon'
import { Icon } from '@/imported/components/ui/icon'

export interface BottomSheetProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Содержимое
   */
  children?: React.ReactNode
  /**
   * Флаг отображения шторки
   */
  isOpen: boolean
  /**
   * Коллбэк, вызываемый при закрытии
   */
  onClose?: () => void
  /**
   * Отступ от верхнего края
   * @default 60
   */
  topIndent?: number
  /**
   * Должен ли компонент сворачиваться при клике вне области
   * @default true
   */
  closeOnClickAway?: boolean
  /**
   * Показывать размытый фон
   * @default true
   */
  showBlurredBackground?: boolean
  /**
   * Полноэкранный режим
   * @default false
   */
  fixedHeight?: boolean
  /**
   * Обработчик клика на фон
   */
  onBackgroundClick?: () => void
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
   * Разделитель между Header и Content
   * @default false
   */
  divider?: boolean
  /**
   * Кастомные стили через Stitches
   */
  css?: CSS
}

const BottomSheetContainer = styled(Container, {
  position: 'fixed',
  left: 0,
  zIndex: 1001,
  display: 'flex',
  flexDirection: 'column',
  boxSizing: 'border-box',
  paddingTop: '$x2',
  paddingBottom: '$x6',
  gap: '$x2',
  width: '100%',
  background: 'var(--semantic-elevation1-bodyNormal)',
  color: 'var(--semantic-text-secondary)',
  transform: 'translateY(100%)',
  transition: 'transform 500ms cubic-bezier(0.4, 0.1, 0.3, 1)',
  
  variants: {
    fixedHeight: {
      true: {
        top: 0,
        height: '100dvh',
        maxHeight: '100vh',
      },
      false: {
        bottom: 0,
        borderTopLeftRadius: '$x6',
        borderTopRightRadius: '$x6',
      },
    },
    isOpen: {
      true: {
        transform: 'translateY(0)',
      },
    },
    divider: {
      true: {
        '& > *:first-child': {
          borderBottom: '1px solid var(--semantic-divider-thin)',
        },
      },
    },
  },
})

const BottomSheetHeader = styled(Container, {
  display: 'flex',
  alignItems: 'flex-start',
  columnGap: '$x2',
  paddingTop: '$x4',
  paddingBottom: '$x4',
  paddingLeft: '$x5',
  paddingRight: '$x5',
  position: 'relative',
})

const BottomSheetTitle = styled(Typography, {
  flexGrow: 1,
  paddingRight: '$x9',
})

const BottomSheetDescription = styled(Typography, {
  color: 'var(--semantic-text-secondary)',
})

const BottomSheetContent = styled(Container, {
  flexGrow: 1,
  overflow: 'auto',
  paddingLeft: '$x4',
  paddingRight: '$x4',
})

const BottomSheetFooter = styled(Container, {
  padding: '$x2 $x5',
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '$x3',
  flexShrink: 0,
})

const SwipeIndicator = styled('div', {
  position: 'absolute',
  top: '$x1',
  left: '50%',
  transform: 'translateX(-50%)',
  width: 50,
  height: '$x1',
  borderRadius: 30,
  backgroundColor: 'var(--semantic-constant-24)',
})

export const BottomSheet = React.forwardRef<HTMLDivElement, BottomSheetProps>(
  (
    {
      children,
      isOpen,
      onClose,
      topIndent = 60,
      closeOnClickAway = true,
      showBlurredBackground = true,
      fixedHeight = false,
      onBackgroundClick,
      title,
      description,
      footer,
      divider = false,
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
        onBackgroundClick?.()
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
        <BottomSheetContainer
          ref={ref}
          isOpen={isOpen}
          fixedHeight={fixedHeight}
          divider={divider}
          css={{
            maxHeight: fixedHeight ? '100vh' : `calc(100vh - ${topIndent}px)`,
            ...css,
          }}
          {...props}
        >
          {!fixedHeight && <SwipeIndicator />}
          
          {(title || description || onClose) && (
            <BottomSheetHeader>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '$x1', flexGrow: 1 }}>
                {title && (
                  <BottomSheetTitle typography="headlineM">
                    {title}
                  </BottomSheetTitle>
                )}
                {description && (
                  <BottomSheetDescription typography="bodyS">
                    {description}
                  </BottomSheetDescription>
                )}
              </div>
              {onClose && (
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
            </BottomSheetHeader>
          )}
          
          {children && (
            <BottomSheetContent>
              {children}
            </BottomSheetContent>
          )}
          
          {footer && (
            <BottomSheetFooter>
              {footer}
            </BottomSheetFooter>
          )}
        </BottomSheetContainer>
      </>
    )
    
    return createPortal(content, document.body)
  }
)

BottomSheet.displayName = 'BottomSheet'

