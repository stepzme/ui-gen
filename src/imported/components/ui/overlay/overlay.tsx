import * as React from 'react'
import { styled, type CSS } from '@/imported/styles/stitches.config'

export interface OverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Открыт ли оверлей
   */
  isOpen: boolean
  /**
   * Обработчик клика на оверлей
   */
  onClick?: () => void
  /**
   * Кастомные стили через Stitches
   */
  css?: CSS
}

const OverlayContainer = styled('div', {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 1000,
  opacity: 0,
  transition: 'opacity 200ms ease-in-out',
  pointerEvents: 'none',
  
  variants: {
    isOpen: {
      true: {
        opacity: 1,
        pointerEvents: 'auto',
      },
    },
  },
})

export const Overlay = React.forwardRef<HTMLDivElement, OverlayProps>(
  ({ isOpen, onClick, css, ...props }, ref) => {
    return (
      <OverlayContainer
        ref={ref}
        isOpen={isOpen}
        onClick={onClick}
        css={css}
        {...props}
      />
    )
  }
)

Overlay.displayName = 'Overlay'

