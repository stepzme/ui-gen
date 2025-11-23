"use client"

import { useState } from "react"
import { Avatar, type GradientType, type ColorScheme, type IconSize } from "./avatar"
import { useTheme } from "@/hooks/use-theme"

const GRADIENT_OPTIONS: GradientType[] = [
  'orangeTeal',
  'tealRuby',
  'limePurple',
  'pinkSaphire',
  'aquaGreen',
  'rubyAqua',
  'saphirePurple',
  'yellowPurple',
  'blueTeal',
  'purpleOrange',
  'tealLime',
  'yellowOrange',
  'pinkPurple',
  'purpleAqua',
  'redPurple',
  'aquaSaphire',
  'blueRed',
  'purpleGreen',
  'orangeLime',
  'aquaYellow',
  'blueAqua',
  'saphirePink',
]

const COLOR_SCHEME_OPTIONS: ColorScheme[] = ['brand', 'primary', 'gradient']
const ICON_SIZE_OPTIONS: IconSize[] = ['small', 'medium']

export default function AvatarDemo() {
  const { isDark, toggleTheme } = useTheme()
  const [width, setWidth] = useState("40px")
  const [height, setHeight] = useState("40px")
  const [colorScheme, setColorScheme] = useState<ColorScheme>("primary")
  const [gradient, setGradient] = useState<GradientType | undefined>(undefined)
  const [iconSize, setIconSize] = useState<IconSize>("medium")
  const [isSquare, setIsSquare] = useState(false)
  const [content, setContent] = useState("A")

  const effectiveColorScheme = gradient ? 'gradient' : colorScheme

  return (
    <div 
      style={{ 
        minHeight: '100vh',
        padding: '2rem',
        backgroundColor: 'var(--colors-background0-primary)', 
        color: 'var(--colors-text-primary)'
      }}
    >
      <div style={{ maxWidth: '72rem', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', margin: 0, marginBottom: '0.5rem' }}>
              Avatar Component Demo
            </h1>
            <p style={{ margin: 0, color: 'var(--colors-text-secondary)' }}>
              Тестирование компонента Avatar с переключением всех пропсов
            </p>
          </div>
          <button
            onClick={toggleTheme}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              border: '1px solid var(--colors-elevation0-borderNormal)',
              backgroundColor: 'var(--colors-background1-primary)',
              color: 'var(--colors-text-primary)',
              fontSize: '0.875rem',
              cursor: 'pointer',
              outline: 'none',
              fontWeight: '500',
            }}
          >
            {isDark ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
          {/* Controls Panel */}
          <div 
            style={{ 
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              padding: '1.5rem',
              borderRadius: '0.5rem',
              backgroundColor: 'var(--colors-background1-primary)',
              border: '1px solid var(--colors-elevation0-borderNormal)'
            }}
          >
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>Контролы</h2>

            {/* Width */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label htmlFor="width" style={{ fontSize: '0.875rem', fontWeight: '500' }}>
                Ширина (width)
              </label>
              <input
                id="width"
                type="text"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                placeholder="40px"
                style={{
                  padding: '0.5rem 0.75rem',
                  borderRadius: '0.375rem',
                  border: '1px solid var(--colors-elevation0-borderNormal)',
                  backgroundColor: 'var(--colors-background0-primary)',
                  color: 'var(--colors-text-primary)',
                  fontSize: '0.875rem',
                  outline: 'none',
                }}
              />
            </div>

            {/* Height */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label htmlFor="height" style={{ fontSize: '0.875rem', fontWeight: '500' }}>
                Высота (height)
              </label>
              <input
                id="height"
                type="text"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="40px"
                style={{
                  padding: '0.5rem 0.75rem',
                  borderRadius: '0.375rem',
                  border: '1px solid var(--colors-elevation0-borderNormal)',
                  backgroundColor: 'var(--colors-background0-primary)',
                  color: 'var(--colors-text-primary)',
                  fontSize: '0.875rem',
                  outline: 'none',
                }}
              />
            </div>

            {/* Color Scheme */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label htmlFor="colorScheme" style={{ fontSize: '0.875rem', fontWeight: '500' }}>
                Цветовая схема (colorScheme)
              </label>
              <select
                id="colorScheme"
                value={colorScheme}
                onChange={(e) => {
                  const value = e.target.value as ColorScheme
                  setColorScheme(value)
                  if (value !== 'gradient') {
                    setGradient(undefined)
                  }
                }}
                style={{
                  padding: '0.5rem 0.75rem',
                  borderRadius: '0.375rem',
                  border: '1px solid var(--colors-elevation0-borderNormal)',
                  backgroundColor: 'var(--colors-background0-primary)',
                  color: 'var(--colors-text-primary)',
                  fontSize: '0.875rem',
                  outline: 'none',
                  cursor: 'pointer',
                }}
              >
                {COLOR_SCHEME_OPTIONS.map((scheme) => (
                  <option key={scheme} value={scheme}>
                    {scheme}
                  </option>
                ))}
              </select>
            </div>

            {/* Gradient (only if colorScheme is gradient) */}
            {colorScheme === 'gradient' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label htmlFor="gradient" style={{ fontSize: '0.875rem', fontWeight: '500' }}>
                  Градиент (gradient)
                </label>
                <select
                  id="gradient"
                  value={gradient || ''}
                  onChange={(e) => setGradient(e.target.value as GradientType || undefined)}
                  style={{
                    padding: '0.5rem 0.75rem',
                    borderRadius: '0.375rem',
                    border: '1px solid var(--colors-elevation0-borderNormal)',
                    backgroundColor: 'var(--colors-background0-primary)',
                    color: 'var(--colors-text-primary)',
                    fontSize: '0.875rem',
                    outline: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <option value="">Выберите градиент</option>
                  {GRADIENT_OPTIONS.map((grad) => (
                    <option key={grad} value={grad}>
                      {grad}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Icon Size */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label htmlFor="iconSize" style={{ fontSize: '0.875rem', fontWeight: '500' }}>
                Размер иконки (iconSize)
              </label>
              <select
                id="iconSize"
                value={iconSize}
                onChange={(e) => setIconSize(e.target.value as IconSize)}
                style={{
                  padding: '0.5rem 0.75rem',
                  borderRadius: '0.375rem',
                  border: '1px solid var(--colors-elevation0-borderNormal)',
                  backgroundColor: 'var(--colors-background0-primary)',
                  color: 'var(--colors-text-primary)',
                  fontSize: '0.875rem',
                  outline: 'none',
                  cursor: 'pointer',
                }}
              >
                {ICON_SIZE_OPTIONS.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>

            {/* Is Square */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <label htmlFor="isSquare" style={{ fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer' }}>
                Квадратный (isSquare)
              </label>
              <input
                id="isSquare"
                type="checkbox"
                checked={isSquare}
                onChange={(e) => setIsSquare(e.target.checked)}
                style={{
                  width: '1.25rem',
                  height: '1.25rem',
                  cursor: 'pointer',
                }}
              />
            </div>

            {/* Content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label htmlFor="content" style={{ fontSize: '0.875rem', fontWeight: '500' }}>
                Контент (children)
              </label>
              <input
                id="content"
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="A"
                maxLength={2}
                style={{
                  padding: '0.5rem 0.75rem',
                  borderRadius: '0.375rem',
                  border: '1px solid var(--colors-elevation0-borderNormal)',
                  backgroundColor: 'var(--colors-background0-primary)',
                  color: 'var(--colors-text-primary)',
                  fontSize: '0.875rem',
                  outline: 'none',
                }}
              />
              <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--colors-text-secondary)' }}>
                Введите текст или одну букву для аватара
              </p>
            </div>
          </div>

          {/* Preview Panel */}
          <div 
            style={{ 
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              padding: '1.5rem',
              borderRadius: '0.5rem',
              backgroundColor: 'var(--colors-background1-primary)',
              border: '1px solid var(--colors-elevation0-borderNormal)'
            }}
          >
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>Предпросмотр</h2>

            {/* Main Preview */}
            <div 
              style={{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '3rem',
                borderRadius: '0.5rem',
                backgroundColor: 'var(--colors-background0-primary)',
                minHeight: '300px'
              }}
            >
              <Avatar
                width={width}
                height={height}
                colorScheme={effectiveColorScheme}
                gradient={gradient}
                iconSize={iconSize}
                isSquare={isSquare}
              >
                <span 
                  style={{ 
                    fontSize: iconSize === 'small' ? '0.875rem' : '1rem',
                    fontWeight: '600',
                  }}
                >
                  {content}
                </span>
              </Avatar>
            </div>

            {/* Code Preview */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '600', margin: 0 }}>Код:</h3>
              <pre 
                style={{ 
                  padding: '1rem',
                  borderRadius: '0.5rem',
                  overflowX: 'auto',
                  fontSize: '0.875rem',
                  backgroundColor: 'var(--colors-background0-primary)',
                  border: '1px solid var(--colors-elevation0-borderNormal)',
                  fontFamily: 'monospace',
                  margin: 0,
                }}
              >
                {`<Avatar
  width="${width}"
  height="${height}"
  colorScheme="${effectiveColorScheme}"
${gradient ? `  gradient="${gradient}"` : ''}
  iconSize="${iconSize}"
  isSquare={${isSquare}}
>
  ${content}
</Avatar>`}
              </pre>
            </div>

            {/* Multiple Sizes Preview */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '600', margin: 0 }}>Разные размеры:</h3>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1rem', flexWrap: 'wrap' }}>
                {['24px', '32px', '40px', '48px', '64px', '80px'].map((size) => (
                  <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                    <Avatar
                      width={size}
                      height={size}
                      colorScheme={effectiveColorScheme}
                      gradient={gradient}
                      iconSize={iconSize}
                      isSquare={isSquare}
                    >
                      <span 
                        style={{ 
                          fontSize: iconSize === 'small' ? '0.875rem' : '1rem',
                          fontWeight: '600',
                        }}
                      >
                        {content}
                      </span>
                    </Avatar>
                    <span style={{ fontSize: '0.75rem', color: 'var(--colors-text-secondary)' }}>
                      {size}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Square vs Round Preview */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '600', margin: 0 }}>Квадратный vs Круглый:</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                  <Avatar
                    width="64px"
                    height="64px"
                    colorScheme={effectiveColorScheme}
                    gradient={gradient}
                    iconSize={iconSize}
                    isSquare={false}
                  >
                    <span 
                      style={{ 
                        fontSize: iconSize === 'small' ? '0.875rem' : '1rem',
                        fontWeight: '600',
                      }}
                    >
                      {content}
                    </span>
                  </Avatar>
                  <span style={{ fontSize: '0.75rem', color: 'var(--colors-text-secondary)' }}>
                    Круглый
                  </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                  <Avatar
                    width="64px"
                    height="64px"
                    colorScheme={effectiveColorScheme}
                    gradient={gradient}
                    iconSize={iconSize}
                    isSquare={true}
                  >
                    <span 
                      style={{ 
                        fontSize: iconSize === 'small' ? '0.875rem' : '1rem',
                        fontWeight: '600',
                      }}
                    >
                      {content}
                    </span>
                  </Avatar>
                  <span style={{ fontSize: '0.75rem', color: 'var(--colors-text-secondary)' }}>
                    Квадратный
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

