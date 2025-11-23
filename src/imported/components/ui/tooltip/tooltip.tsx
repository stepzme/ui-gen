import * as React from 'react'
import { createPortal } from 'react-dom'
import { styled, type CSS, typography } from '@/imported/styles/stitches.config'

export type Typography = 'bodyS' | 'bodyM' | 'bodyL'
export type Placement = 
  | 'auto'
  | 'auto-start'
  | 'auto-end'
  | 'top' 
  | 'top-start' 
  | 'top-end'
  | 'bottom' 
  | 'bottom-start' 
  | 'bottom-end'
  | 'left' 
  | 'left-start' 
  | 'left-end'
  | 'right' 
  | 'right-start' 
  | 'right-end'

export interface TooltipProps {
  /**
   * Дочерний элемент, на который будет навешиваться тултип
   */
  children: React.ReactNode
  /**
   * Содержимое тултипа
   */
  content: React.ReactNode
  /**
   * Отключен ли тултип
   * @default false
   */
  disabled?: boolean
  /**
   * Принудительно показать тултип
   * @default false
   */
  visible?: boolean
  /**
   * Позиция тултипа
   * @default 'auto'
   */
  placement?: Placement
  /**
   * Размер через типографику
   * @default 'bodyM'
   */
  typography?: Typography
  /**
   * Контейнер для портала
   */
  portalRoot?: HTMLElement | null
  /**
   * Кастомные стили через Stitches
   */
  css?: CSS
  /**
   * ID для тестирования
   */
  dataTestId?: string
}

// Arrow - стрелка тултипа
const StyledArrow = styled('div', {
  visibility: 'hidden',
  position: 'absolute',
  width: '8px',
  height: '8px',
  background: 'inherit',
  
  '&:before': {
    position: 'absolute',
    width: '8px',
    height: '8px',
    background: 'inherit',
    borderRadius: '$x05', // 2px
    visibility: 'visible',
    content: '""',
    transform: 'rotate(45deg)',
  },
})

// Content - содержимое тултипа
const StyledContent = styled('div', {
  zIndex: 50,
  boxSizing: 'border-box',
  position: 'fixed',
  width: 'max-content',
  maxWidth: '300px',
  backgroundColor: 'var(--components-tooltip-body)',
  color: 'var(--components-tooltip-text)',
  transition: 'opacity 0.2s ease-in-out',
  pointerEvents: 'none',
  
  variants: {
    typography: {
      bodyS: {
        padding: '$x3', // 12px
        ...typography.bodyS_tight_normal,
        borderRadius: '$x2', // 8px
      },
      bodyM: {
        padding: '$x4', // 16px
        ...typography.bodyM_tight_normal,
        borderRadius: '$x3', // 12px
      },
      bodyL: {
        padding: '$x5', // 20px
        ...typography.bodyL_tight_normal,
        borderRadius: '$x4', // 16px
      },
    },
    placement: {
      top: {
        [`& ${StyledArrow}`]: {
          bottom: '-2.5px',
          left: '50%',
          transform: 'translateX(-50%)',
        },
      },
      'top-start': {
        [`& ${StyledArrow}`]: {
          bottom: '-2.5px',
          left: '12px',
        },
      },
      'top-end': {
        [`& ${StyledArrow}`]: {
          bottom: '-2.5px',
          right: '12px',
        },
      },
      bottom: {
        [`& ${StyledArrow}`]: {
          top: '-2.5px',
          left: '50%',
          transform: 'translateX(-50%)',
        },
      },
      'bottom-start': {
        [`& ${StyledArrow}`]: {
          top: '-2.5px',
          left: '12px',
        },
      },
      'bottom-end': {
        [`& ${StyledArrow}`]: {
          top: '-2.5px',
          right: '12px',
        },
      },
      left: {
        [`& ${StyledArrow}`]: {
          right: '-2.5px',
          top: '50%',
          transform: 'translateY(-50%)',
        },
      },
      'left-start': {
        [`& ${StyledArrow}`]: {
          right: '-2.5px',
          top: '12px',
        },
      },
      'left-end': {
        [`& ${StyledArrow}`]: {
          right: '-2.5px',
          bottom: '12px',
        },
      },
      right: {
        [`& ${StyledArrow}`]: {
          left: '-2.5px',
          top: '50%',
          transform: 'translateY(-50%)',
        },
      },
      'right-start': {
        [`& ${StyledArrow}`]: {
          left: '-2.5px',
          top: '12px',
        },
      },
      'right-end': {
        [`& ${StyledArrow}`]: {
          left: '-2.5px',
          bottom: '12px',
        },
      },
    },
  },
  
  defaultVariants: {
    typography: 'bodyM',
    placement: 'top',
  },
})

// Wrapper - обертка для триггера
const StyledWrapper = styled('div', {
  display: 'inline-block',
  position: 'relative',
  boxSizing: 'border-box',
  cursor: 'pointer',
  userSelect: 'none',
})

// Функция для вычисления позиции
function calculatePosition(
  triggerRect: DOMRect,
  tooltipRect: DOMRect,
  placement: Placement,
  offset: number = 8
): { top: number; left: number; placement: Placement } {
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight
  
  let finalPlacement: Placement = placement === 'auto' ? 'top' : placement
  
  // Упрощенная логика для auto
  if (placement === 'auto' || placement === 'auto-start' || placement === 'auto-end') {
    const spaceTop = triggerRect.top
    const spaceBottom = viewportHeight - triggerRect.bottom
    const spaceLeft = triggerRect.left
    const spaceRight = viewportWidth - triggerRect.right
    
    if (spaceBottom >= tooltipRect.height + offset) {
      finalPlacement = placement === 'auto-start' ? 'bottom-start' : placement === 'auto-end' ? 'bottom-end' : 'bottom'
    } else if (spaceTop >= tooltipRect.height + offset) {
      finalPlacement = placement === 'auto-start' ? 'top-start' : placement === 'auto-end' ? 'top-end' : 'top'
    } else if (spaceRight >= tooltipRect.width + offset) {
      finalPlacement = placement === 'auto-start' ? 'right-start' : placement === 'auto-end' ? 'right-end' : 'right'
    } else if (spaceLeft >= tooltipRect.width + offset) {
      finalPlacement = placement === 'auto-start' ? 'left-start' : placement === 'auto-end' ? 'left-end' : 'left'
    } else {
      finalPlacement = 'bottom'
    }
  }
  
  let top = 0
  let left = 0
  
  switch (finalPlacement) {
    case 'top':
    case 'top-start':
    case 'top-end':
      top = triggerRect.top - tooltipRect.height - offset
      if (finalPlacement === 'top' || finalPlacement === 'top-start') {
        left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2
      } else if (finalPlacement === 'top-start') {
        left = triggerRect.left
      } else {
        left = triggerRect.right - tooltipRect.width
      }
      break
    case 'bottom':
    case 'bottom-start':
    case 'bottom-end':
      top = triggerRect.bottom + offset
      if (finalPlacement === 'bottom' || finalPlacement === 'bottom-start') {
        left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2
      } else if (finalPlacement === 'bottom-start') {
        left = triggerRect.left
      } else {
        left = triggerRect.right - tooltipRect.width
      }
      break
    case 'left':
    case 'left-start':
    case 'left-end':
      left = triggerRect.left - tooltipRect.width - offset
      if (finalPlacement === 'left' || finalPlacement === 'left-start') {
        top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2
      } else if (finalPlacement === 'left-start') {
        top = triggerRect.top
      } else {
        top = triggerRect.bottom - tooltipRect.height
      }
      break
    case 'right':
    case 'right-start':
    case 'right-end':
      left = triggerRect.right + offset
      if (finalPlacement === 'right' || finalPlacement === 'right-start') {
        top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2
      } else if (finalPlacement === 'right-start') {
        top = triggerRect.top
      } else {
        top = triggerRect.bottom - tooltipRect.height
      }
      break
  }
  
  // Ограничиваем позицию границами viewport
  top = Math.max(offset, Math.min(top, viewportHeight - tooltipRect.height - offset))
  left = Math.max(offset, Math.min(left, viewportWidth - tooltipRect.width - offset))
  
  return { top, left, placement: finalPlacement }
}

export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      children,
      content,
      disabled = false,
      visible: controlledVisible,
      placement = 'auto',
      typography = 'bodyM',
      portalRoot,
      css,
      dataTestId,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = React.useState(false)
    const [position, setPosition] = React.useState<{ top: number; left: number; placement: Placement } | null>(null)
    const triggerRef = React.useRef<HTMLDivElement>(null)
    const contentRef = React.useRef<HTMLDivElement>(null)
    
    const visible = controlledVisible !== undefined ? controlledVisible : (!disabled && isVisible)
    
    const updatePosition = React.useCallback(() => {
      if (!triggerRef.current || !contentRef.current || !visible) return
      
      const triggerRect = triggerRef.current.getBoundingClientRect()
      const tooltipRect = contentRef.current.getBoundingClientRect()
      
      const pos = calculatePosition(triggerRect, tooltipRect, placement)
      setPosition(pos)
    }, [visible, placement])
    
    React.useEffect(() => {
      if (visible) {
        updatePosition()
        const handleScroll = () => updatePosition()
        const handleResize = () => updatePosition()
        
        window.addEventListener('scroll', handleScroll, true)
        window.addEventListener('resize', handleResize)
        
        return () => {
          window.removeEventListener('scroll', handleScroll, true)
          window.removeEventListener('resize', handleResize)
        }
      }
    }, [visible, updatePosition])
    
    const handleMouseEnter = () => {
      if (!disabled && controlledVisible === undefined) {
        setIsVisible(true)
      }
    }
    
    const handleMouseLeave = () => {
      if (controlledVisible === undefined) {
        setIsVisible(false)
      }
    }
    
    const handleMouseDown = () => {
      if (!disabled && controlledVisible === undefined) {
        setIsVisible(true)
      }
    }
    
    const portalContainer = portalRoot || (typeof document !== 'undefined' ? document.body : null)
    const finalPlacement = position?.placement || placement
    
    return (
      <>
        <StyledWrapper
          ref={triggerRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseDown={handleMouseDown}
          {...props}
        >
          {children}
        </StyledWrapper>
        {visible && portalContainer && createPortal(
          <StyledContent
            ref={(node) => {
              if (typeof ref === 'function') {
                ref(node)
              } else if (ref) {
                (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
              }
              contentRef.current = node
            }}
            typography={typography}
            placement={finalPlacement}
            css={{
              ...css,
              ...(position ? {
                top: `${position.top}px`,
                left: `${position.left}px`,
              } : { visibility: 'hidden' }),
            }}
            data-test-id={dataTestId || 'Tooltip'}
          >
            {content}
            <StyledArrow />
          </StyledContent>,
          portalContainer
        )}
      </>
    )
  }
)

Tooltip.displayName = 'Tooltip'
