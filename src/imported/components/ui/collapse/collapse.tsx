import * as React from 'react'
import { styled, type CSS } from '@/imported/styles/stitches.config'

export interface CollapseProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Контент элемента
   */
  children: React.ReactNode
  /**
   * Флаг открытия коллапса
   */
  isOpen: boolean
  /**
   * Время исполнения анимации
   * @default 200
   */
  timeout?: number
  /**
   * Флаг включения горизонтального коллапса
   * @default false
   */
  isHorizontal?: boolean
  /**
   * Кастомные стили через Stitches
   */
  css?: CSS
}

const CollapseContainer = styled('div', {
  overflow: 'hidden',
  
  variants: {
    isHorizontal: {
      true: {
        width: 0,
      },
      false: {
        height: 0,
      },
    },
    status: {
      exited: {
        display: 'none',
      },
      entered: {},
    },
  },
  compoundVariants: [
    {
      isHorizontal: true,
      status: 'entered',
      css: {
        overflow: 'visible',
        width: 'min-content',
      },
    },
    {
      isHorizontal: false,
      status: 'entered',
      css: {
        overflow: 'visible',
        height: 'auto',
      },
    },
  ],
})

export const Collapse = React.forwardRef<HTMLDivElement, CollapseProps>(
  (
    {
      children,
      isOpen,
      timeout = 200,
      isHorizontal = false,
      css,
      ...props
    },
    ref
  ) => {
    const [dimension, setDimension] = React.useState<number | null>(null)
    const [status, setStatus] = React.useState<'exited' | 'entering' | 'entered' | 'exiting'>(
      isOpen ? 'entered' : 'exited'
    )
    const contentRef = React.useRef<HTMLDivElement>(null)
    
    React.useEffect(() => {
      if (isOpen) {
        setStatus('entering')
        // Измеряем размер контента
        if (contentRef.current) {
          const size = isHorizontal
            ? contentRef.current.scrollWidth
            : contentRef.current.scrollHeight
          setDimension(size)
        }
        // Переходим в entered после измерения
        const timer = setTimeout(() => {
          setStatus('entered')
          setDimension(null)
        }, 0)
        return () => clearTimeout(timer)
      } else {
        setStatus('exiting')
        // Измеряем текущий размер перед закрытием
        if (contentRef.current) {
          const size = isHorizontal
            ? contentRef.current.scrollWidth
            : contentRef.current.scrollHeight
          setDimension(size)
        }
        // Устанавливаем в 0 для анимации закрытия
        const timer = setTimeout(() => {
          setDimension(0)
        }, 0)
        // Переходим в exited после анимации
        const exitTimer = setTimeout(() => {
          setStatus('exited')
          setDimension(null)
        }, timeout)
        return () => {
          clearTimeout(timer)
          clearTimeout(exitTimer)
        }
      }
    }, [isOpen, isHorizontal, timeout])
    
    const dimensionProperty = isHorizontal ? 'width' : 'height'
    const dimensionValue = dimension !== null ? `${dimension}px` : undefined
    
    return (
      <CollapseContainer
        ref={ref}
        isHorizontal={isHorizontal}
        status={status === 'exited' ? 'exited' : 'entered'}
        css={{
          [dimensionProperty]: dimensionValue,
          transition: `${dimensionProperty} ${timeout}ms ease-in-out`,
          ...css,
        }}
        {...props}
      >
        <div ref={contentRef}>
          {children}
        </div>
      </CollapseContainer>
    )
  }
)

Collapse.displayName = 'Collapse'

