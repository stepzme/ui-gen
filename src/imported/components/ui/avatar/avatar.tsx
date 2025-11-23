import * as React from 'react'
import { styled, type CSS } from '@/imported/styles/stitches.config'
import { Container } from '@/imported/components/meta/container'
import { config } from '@/imported/styles/stitches.config'

export type GradientType =
  | 'orangeTeal'
  | 'tealRuby'
  | 'limePurple'
  | 'pinkSaphire'
  | 'aquaGreen'
  | 'rubyAqua'
  | 'saphirePurple'
  | 'yellowPurple'
  | 'blueTeal'
  | 'purpleOrange'
  | 'tealLime'
  | 'yellowOrange'
  | 'pinkPurple'
  | 'purpleAqua'
  | 'redPurple'
  | 'aquaSaphire'
  | 'blueRed'
  | 'purpleGreen'
  | 'orangeLime'
  | 'aquaYellow'
  | 'blueAqua'
  | 'saphirePink'

export type ColorScheme = 'brand' | 'primary' | 'gradient'
export type IconSize = 'small' | 'medium'

// Дефолтный градиент
const DEFAULT_GRADIENT: GradientType = 'orangeTeal'

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Контент аватара
   */
  children: React.ReactNode
  /**
   * Ширина аватара
   */
  width: string
  /**
   * Высота аватара
   */
  height: string
  /**
   * Цвет фона
   * @default 'primary'
   */
  colorScheme?: ColorScheme
  /**
   * Тип градиента (если используется gradient)
   * @default 'orangeTeal'
   */
  gradient?: GradientType
  /**
   * Размер типографики для иконки
   * @default 'medium'
   */
  iconSize?: IconSize
  /**
   * Делает аватар квадратным
   * @default false
   */
  isSquare?: boolean
  /**
   * Кастомные стили через Stitches
   */
  css?: CSS
}

// Маппинг градиентов на CSS переменные
const GRADIENT_MAP: Record<GradientType, [string, string]> = {
  orangeTeal: ['--gradients-orange', '--gradients-teal'],
  tealRuby: ['--gradients-teal', '--gradients-ruby'],
  limePurple: ['--gradients-lime', '--gradients-purple'],
  pinkSaphire: ['--gradients-pink', '--gradients-saphire'],
  aquaGreen: ['--gradients-aqua', '--gradients-green'],
  rubyAqua: ['--gradients-ruby', '--gradients-aqua'],
  saphirePurple: ['--gradients-saphire', '--gradients-purple'],
  yellowPurple: ['--gradients-yellow', '--gradients-purple'],
  blueTeal: ['--gradients-blue', '--gradients-teal'],
  purpleOrange: ['--gradients-purple', '--gradients-orange'],
  tealLime: ['--gradients-teal', '--gradients-lime'],
  yellowOrange: ['--gradients-yellow', '--gradients-orange'],
  pinkPurple: ['--gradients-pink', '--gradients-purple'],
  purpleAqua: ['--gradients-purple', '--gradients-aqua'],
  redPurple: ['--gradients-red', '--gradients-purple'],
  aquaSaphire: ['--gradients-aqua', '--gradients-saphire'],
  blueRed: ['--gradients-blue', '--gradients-red'],
  purpleGreen: ['--gradients-purple', '--gradients-green'],
  orangeLime: ['--gradients-orange', '--gradients-lime'],
  aquaYellow: ['--gradients-aqua', '--gradients-yellow'],
  blueAqua: ['--gradients-blue', '--gradients-aqua'],
  saphirePink: ['--gradients-saphire', '--gradients-pink'],
}

// Вычисление borderRadius на основе размера
function calculateBorderRadius(size: number, isSquare: boolean): CSS['borderRadius'] {
  if (isSquare) {
    if (size >= 24 && size <= 35) return config.theme.radii.x2
    if (size >= 36 && size <= 59) return config.theme.radii.x3
    if (size >= 60 && size <= 71) return config.theme.radii.x4
    if (size >= 72) return config.theme.radii.x5
    return config.theme.radii.x2
  }
  return '50%'
}

// Создание градиента из CSS переменных
function createGradient(gradient: GradientType): string {
  const [color1Var, color2Var] = GRADIENT_MAP[gradient]
  return `linear-gradient(-135deg, var(${color1Var}) 0%, var(${color2Var}) 100%)`
}

// Внутренний контейнер для контента
const AvatarInner = styled(Container, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  
  variants: {
    colorScheme: {
      brand: {
        color: 'var(--semantic-brand-primary)',
      },
      primary: {
        color: 'var(--semantic-primary-primary)',
      },
      gradient: {
        color: 'var(--semantic-primary-primary)',
      },
    },
  },
  
  defaultVariants: {
    colorScheme: 'primary',
  },
})

// Основной контейнер аватара
const AvatarContainer = styled(Container, {
  position: 'relative',
  display: 'inline-flex',
  flexShrink: 0,
  overflow: 'hidden',
  
  variants: {
    colorScheme: {
      brand: {
        backgroundColor: 'var(--semantic-brand-8)',
      },
      primary: {
        backgroundColor: 'var(--semantic-primary-8)',
      },
      gradient: {},
    },
    iconSize: {
      small: {},
      medium: {},
    },
  },
  
  defaultVariants: {
    colorScheme: 'primary',
    iconSize: 'medium',
  },
})

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      children,
      width,
      height,
      colorScheme = 'primary',
      gradient,
      iconSize = 'medium',
      isSquare = false,
      css,
  className,
  ...props
    },
    ref
  ) => {
    // Вычисляем размер для определения borderRadius
    const size = parseInt(height || width || '40', 10)
    const borderRadius = calculateBorderRadius(size, isSquare)
    
    // Определяем colorScheme и градиент для компонента
    // Если gradient задан явно - используем его
    // Если gradient не задан, но colorScheme === 'gradient' - используем дефолтный градиент
    const effectiveGradient = gradient || (colorScheme === 'gradient' ? DEFAULT_GRADIENT : undefined)
    const effectiveColorScheme = effectiveGradient ? 'gradient' : colorScheme
    
  return (
      <AvatarContainer
        ref={ref}
        className={className}
        colorScheme={effectiveColorScheme}
        iconSize={iconSize}
        css={{
          width,
          height,
          borderRadius,
          // Применяем градиент только если он установлен, иначе backgroundColor будет из варианта
          ...(effectiveGradient
            ? {
                background: createGradient(effectiveGradient),
                backgroundColor: 'transparent', // Убираем backgroundColor из варианта при градиенте
              }
            : {}),
          ...css,
        }}
      {...props}
      >
        <AvatarInner colorScheme={effectiveColorScheme}>{children}</AvatarInner>
      </AvatarContainer>
  )
}
)

Avatar.displayName = 'Avatar'

export { AvatarContainer, AvatarInner }
