"use client"

import { useState } from "react"
import { Bubble, type ColorScheme, type Typography, type PinSide } from "./bubble"
import { useTheme } from "@/hooks/use-theme"

const COLOR_SCHEME_OPTIONS: ColorScheme[] = ['primary', 'brand', 'success', 'info', 'warning', 'critical', 'draft']
const TYPOGRAPHY_OPTIONS: Typography[] = ['bodyS', 'bodyM', 'bodyL']
const PIN_SIDE_OPTIONS: PinSide[] = ['left', 'right']

export default function BubbleDemo() {
  const { isDark, toggleTheme } = useTheme()
  const [content, setContent] = useState("Текст bubble")
  const [colorScheme, setColorScheme] = useState<ColorScheme>("brand")
  const [typography, setTypography] = useState<Typography>("bodyM")
  const [pinSide, setPinSide] = useState<PinSide>("left")
  const [dataTestId, setDataTestId] = useState("")

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
              Bubble Component Demo
            </h1>
            <p style={{ margin: 0, color: 'var(--colors-text-secondary)' }}>
              Тестирование компонента Bubble с переключением всех пропсов
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
                placeholder="Текст bubble"
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
                onChange={(e) => setColorScheme(e.target.value as ColorScheme)}
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

            {/* Typography */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label htmlFor="typography" style={{ fontSize: '0.875rem', fontWeight: '500' }}>
                Размер (typography)
              </label>
              <select
                id="typography"
                value={typography}
                onChange={(e) => setTypography(e.target.value as Typography)}
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
                {TYPOGRAPHY_OPTIONS.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>

            {/* Pin Side */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label htmlFor="pinSide" style={{ fontSize: '0.875rem', fontWeight: '500' }}>
                Сторона пина (pinSide)
              </label>
              <select
                id="pinSide"
                value={pinSide}
                onChange={(e) => setPinSide(e.target.value as PinSide)}
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
                {PIN_SIDE_OPTIONS.map((side) => (
                  <option key={side} value={side}>
                    {side}
                  </option>
                ))}
              </select>
            </div>

            {/* Data Test ID */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label htmlFor="dataTestId" style={{ fontSize: '0.875rem', fontWeight: '500' }}>
                Data Test ID (data-test-id)
              </label>
              <input
                id="dataTestId"
                type="text"
                value={dataTestId}
                onChange={(e) => setDataTestId(e.target.value)}
                placeholder="Bubble"
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
                Оставьте пустым для использования дефолтного значения "Bubble"
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
              <Bubble
                colorScheme={colorScheme}
                typography={typography}
                pinSide={pinSide}
                data-test-id={dataTestId || undefined}
              >
                {content}
              </Bubble>
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
                {`<Bubble
  colorScheme="${colorScheme}"
  typography="${typography}"
  pinSide="${pinSide}"
${dataTestId ? `  data-test-id="${dataTestId}"` : ''}
>
  ${content}
</Bubble>`}
              </pre>
            </div>

            {/* Color Schemes Preview */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '600', margin: 0 }}>Все цветовые схемы:</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flexWrap: 'wrap' }}>
                {COLOR_SCHEME_OPTIONS.map((scheme) => (
                  <Bubble
                    key={scheme}
                    colorScheme={scheme}
                    typography={typography}
                    pinSide={pinSide}
                  >
                    {scheme}
                  </Bubble>
                ))}
              </div>
            </div>

            {/* Typography Sizes Preview */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '600', margin: 0 }}>Размеры:</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'flex-start' }}>
                {TYPOGRAPHY_OPTIONS.map((size) => (
                  <Bubble
                    key={size}
                    colorScheme={colorScheme}
                    typography={size}
                    pinSide={pinSide}
                  >
                    {size} - {content}
                  </Bubble>
                ))}
              </div>
            </div>

            {/* Pin Sides Preview */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '600', margin: 0 }}>Стороны пина:</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'flex-start' }}>
                {PIN_SIDE_OPTIONS.map((side) => (
                  <Bubble
                    key={side}
                    colorScheme={colorScheme}
                    typography={typography}
                    pinSide={side}
                  >
                    {side} - {content}
                  </Bubble>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

