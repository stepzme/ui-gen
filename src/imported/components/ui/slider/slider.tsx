import * as React from 'react'
import { styled, type CSS } from '@/imported/styles/stitches.config'

export interface SliderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * Начальное значение
   */
  initial?: number | number[]
  /**
   * Значение для controlled компонента
   */
  value?: number | number[]
  /**
   * Минимальное значение
   */
  min: number
  /**
   * Максимальное значение
   */
  max: number
  /**
   * Шаг
   */
  step: number
  /**
   * Флаг для включения range слайдера
   * @default false
   */
  isRange?: boolean
  /**
   * Коллбэк, вызывается при изменении value
   */
  onChange?: (value: number | number[]) => void
  /**
   * Стили для трека
   */
  trackStyle?: CSS
  /**
   * Стили для thumb
   */
  thumbStyle?: CSS
  /**
   * Стили для прогресса
   */
  progressStyle?: CSS
  /**
   * Коллбэк при начале перетаскивания
   */
  onDragStart?: () => void
  /**
   * Коллбэк при окончании перетаскивания
   */
  onDragStop?: () => void
  /**
   * Коллбэк при клике на трек
   */
  onTrackClick?: (value: number) => void
  /**
   * Суффикс для aria-valuetext
   */
  ariaValueTextSuffix?: string
  /**
   * Кастомные стили через Stitches
   */
  css?: CSS
}

// Функции для вычисления позиций и значений
const calculatePercentage = (value: number, min: number, max: number) => {
  return ((value - min) / (max - min)) * 100
}

const calculateValue = (percentage: number, min: number, max: number) => {
  return ((max - min) / 100) * percentage + min
}

const clamp = (value: number, min: number, max: number) => {
  return Math.max(min, Math.min(max, value))
}

const SliderContainer = styled('div', {
  position: 'relative',
  borderRadius: '$infinite',
  cursor: 'pointer',
  touchAction: 'pan-y',
  userSelect: 'none',
  padding: '$x3 0',
  width: '100%',
})

const SliderTrack = styled('div', {
  position: 'relative',
  width: '100%',
  height: '$x1',
  borderRadius: '$infinite',
  backgroundColor: 'var(--semantic-primary-12)',
})

const SliderProgress = styled('div', {
  transform: 'translateY(-50%)',
  borderRadius: '$infinite',
  position: 'absolute',
  height: '$x1',
  background: 'var(--semantic-brand-primary)',
  top: '50%',
})

const SliderThumb = styled('div', {
  boxSizing: 'border-box',
  width: '$x5',
  height: '$x5',
  borderRadius: '50%',
  position: 'absolute',
  transform: 'translate(-50%, -50%)',
  background: 'var(--semantic-constant-primary)',
  border: `${1}px solid`,
  borderColor: 'var(--semantic-brand-primary)',
  cursor: 'pointer',
  top: '50%',
  '&::before': {
    display: 'block',
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '$x9',
    height: '$x9',
  },
  '&:focus-visible': {
    outline: '2px solid var(--semantic-brand-primary)',
    outlineOffset: '2px',
  },
})

const SliderInput = styled('input', {
  border: '0px',
  clip: 'rect(0px, 0px, 0px, 0px)',
  height: '100%',
  margin: '-1px',
  overflow: 'hidden',
  padding: '0px',
  position: 'absolute',
  whiteSpace: 'nowrap',
  width: '100%',
  direction: 'ltr',
})

export const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      initial,
      value,
      min,
      max,
      step = 1,
      isRange = false,
      onChange,
      trackStyle,
      thumbStyle,
      progressStyle,
      onDragStart,
      onDragStop,
      onTrackClick,
      ariaValueTextSuffix,
      css,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState<number | number[]>(() => {
      if (value !== undefined) return value
      if (initial !== undefined) return initial
      return isRange ? [min, max] : min
    })
    
    const trackRef = React.useRef<HTMLDivElement>(null)
    const isControlled = value !== undefined
    
    const currentValue = isControlled ? value : internalValue
    
    React.useEffect(() => {
      if (isControlled && value !== undefined) {
        setInternalValue(value)
      }
    }, [value, isControlled])
    
    const handleChange = (newValue: number | number[], index?: number) => {
      if (!isControlled) {
        setInternalValue(newValue)
      }
      onChange?.(newValue)
    }
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number = 0) => {
      const newValue = Number(e.target.value)
      
      if (isRange && Array.isArray(currentValue)) {
        const newValues = [...currentValue]
        newValues[index] = clamp(newValue, min, max)
        
        // Для range слайдера проверяем, что значения не пересекаются
        if (index === 0 && newValues[0] > newValues[1]) {
          newValues[0] = newValues[1]
        } else if (index === 1 && newValues[1] < newValues[0]) {
          newValues[1] = newValues[0]
        }
        
        handleChange(newValues)
      } else {
        handleChange(clamp(newValue, min, max))
      }
    }
    
    const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!trackRef.current || !onTrackClick) return
      
      const rect = trackRef.current.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const percentage = (clickX / rect.width) * 100
      const newValue = calculateValue(percentage, min, max)
      const clampedValue = clamp(Math.round(newValue / step) * step, min, max)
      
      onTrackClick(clampedValue)
      
      if (isRange && Array.isArray(currentValue)) {
        // Определяем, к какому thumb ближе клик
        const value0 = calculatePercentage(currentValue[0], min, max)
        const value1 = calculatePercentage(currentValue[1], min, max)
        const distance0 = Math.abs(percentage - value0)
        const distance1 = Math.abs(percentage - value1)
        
        const newValues = [...currentValue]
        if (distance0 < distance1) {
          newValues[0] = clampedValue
          if (newValues[0] > newValues[1]) {
            newValues[0] = newValues[1]
          }
        } else {
          newValues[1] = clampedValue
          if (newValues[1] < newValues[0]) {
            newValues[1] = newValues[0]
          }
        }
        handleChange(newValues)
      } else {
        handleChange(clampedValue)
      }
    }
    
    const getPercentage = (val: number) => {
      return calculatePercentage(val, min, max)
    }
    
    const getProgressStyle = () => {
      if (isRange && Array.isArray(currentValue)) {
        const left = getPercentage(currentValue[0])
        const right = getPercentage(currentValue[1])
        return {
          left: `${left}%`,
          width: `${right - left}%`,
        }
      } else {
        const numValue = typeof currentValue === 'number' ? currentValue : currentValue[0]
        return {
          left: '0%',
          width: `${getPercentage(numValue)}%`,
        }
      }
    }
    
    return (
      <SliderContainer ref={ref} css={css} {...props}>
        <SliderTrack
          ref={trackRef}
          onClick={handleTrackClick}
          css={trackStyle}
        >
          <SliderProgress css={{ ...getProgressStyle(), ...progressStyle }} />
          
          {isRange && Array.isArray(currentValue) ? (
            <>
              <SliderThumb
                css={{
                  left: `${getPercentage(currentValue[0])}%`,
                  ...thumbStyle,
                }}
              >
                <SliderInput
                  type="range"
                  min={min}
                  max={max}
                  step={step}
                  value={currentValue[0]}
                  onChange={(e) => handleInputChange(e, 0)}
                  aria-valuenow={currentValue[0]}
                  aria-valuetext={ariaValueTextSuffix ? `${currentValue[0]} ${ariaValueTextSuffix}` : undefined}
                  onMouseDown={onDragStart}
                  onMouseUp={onDragStop}
                  onTouchStart={onDragStart}
                  onTouchEnd={onDragStop}
                />
              </SliderThumb>
              <SliderThumb
                css={{
                  left: `${getPercentage(currentValue[1])}%`,
                  ...thumbStyle,
                }}
              >
                <SliderInput
                  type="range"
                  min={min}
                  max={max}
                  step={step}
                  value={currentValue[1]}
                  onChange={(e) => handleInputChange(e, 1)}
                  aria-valuenow={currentValue[1]}
                  aria-valuetext={ariaValueTextSuffix ? `${currentValue[1]} ${ariaValueTextSuffix}` : undefined}
                  onMouseDown={onDragStart}
                  onMouseUp={onDragStop}
                  onTouchStart={onDragStart}
                  onTouchEnd={onDragStop}
                />
              </SliderThumb>
            </>
          ) : (
            <SliderThumb
              css={{
                left: `${getPercentage(typeof currentValue === 'number' ? currentValue : currentValue[0])}%`,
                ...thumbStyle,
              }}
            >
              <SliderInput
                type="range"
                min={min}
                max={max}
                step={step}
                value={typeof currentValue === 'number' ? currentValue : currentValue[0]}
                onChange={(e) => handleInputChange(e)}
                aria-valuenow={typeof currentValue === 'number' ? currentValue : currentValue[0]}
                aria-valuetext={ariaValueTextSuffix ? `${typeof currentValue === 'number' ? currentValue : currentValue[0]} ${ariaValueTextSuffix}` : undefined}
                onMouseDown={onDragStart}
                onMouseUp={onDragStop}
                onTouchStart={onDragStart}
                onTouchEnd={onDragStop}
              />
            </SliderThumb>
          )}
        </SliderTrack>
      </SliderContainer>
    )
  }
)

Slider.displayName = 'Slider'

