"use client"

import { useState, useEffect } from "react"
import { Progress } from "./progress"
import type { ColorScheme } from "./progress"
import { useTheme } from "@/hooks/use-theme"
import { Typography as TypographyComponent } from "@/imported/components/meta/typography"

const COLOR_SCHEMES: ColorScheme[] = [
  'brand', 'success', 'info', 'warning', 'critical', 'neutral', 'constant'
]

export default function ProgressDemo() {
  const { isDark, toggleTheme } = useTheme()
  
  const [value, setValue] = useState(40)
  const [colorScheme, setColorScheme] = useState<ColorScheme>('brand')
  const [rect, setRect] = useState(false)
  const [animated, setAnimated] = useState(false)

  // Анимация для демонстрации
  useEffect(() => {
    if (!animated) return
    
    const interval = setInterval(() => {
      setValue((prev) => {
        if (prev >= 100) return 0
        return prev + 1
      })
    }, 50)
    
    return () => clearInterval(interval)
  }, [animated])

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
              Progress Component Demo
            </h1>
            <p style={{ margin: 0, color: 'var(--colors-text-secondary)' }}>
              Тестирование компонента Progress с переключением всех пропсов
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

        {/* Controls */}
        <div style={{
          padding: '1.5rem',
          borderRadius: '0.5rem',
          border: '1px solid var(--colors-elevation0-borderNormal)',
          backgroundColor: 'var(--colors-background1-primary)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', margin: 0 }}>Controls</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>
                Value: {value}%
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={value}
                  onChange={(e) => {
                    setValue(Number(e.target.value))
                    setAnimated(false)
                  }}
                  style={{
                    width: '100%',
                    marginTop: '0.5rem',
                  }}
                />
              </label>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>
                Color Scheme:
                <select
                  value={colorScheme}
                  onChange={(e) => setColorScheme(e.target.value as ColorScheme)}
                  style={{
                    width: '100%',
                    marginTop: '0.25rem',
                    padding: '0.5rem',
                    borderRadius: '0.375rem',
                    border: '1px solid var(--colors-elevation0-borderNormal)',
                    backgroundColor: 'var(--colors-background0-primary)',
                    color: 'var(--colors-text-primary)',
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                  }}
                >
                  {COLOR_SCHEMES.map(scheme => (
                    <option key={scheme} value={scheme}>{scheme}</option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={rect}
                onChange={(e) => setRect(e.target.checked)}
                style={{
                  width: '1.25rem',
                  height: '1.25rem',
                  cursor: 'pointer',
                }}
              />
              <span style={{ fontSize: '0.875rem' }}>Rect (no border radius)</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={animated}
                onChange={(e) => setAnimated(e.target.checked)}
                style={{
                  width: '1.25rem',
                  height: '1.25rem',
                  cursor: 'pointer',
                }}
              />
              <span style={{ fontSize: '0.875rem' }}>Animated</span>
            </label>
          </div>
        </div>

        {/* Examples */}
        <div style={{
          padding: '1.5rem',
          borderRadius: '0.5rem',
          border: '1px solid var(--colors-elevation0-borderNormal)',
          backgroundColor: 'var(--colors-background1-primary)',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem'
        }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', margin: 0 }}>Examples</h2>

          {/* Main Example */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <TypographyComponent typography="bodyM_paragraph_normal">
              Main Example (controlled):
            </TypographyComponent>
            <Progress
              value={value}
              colorScheme={colorScheme}
              rect={rect}
            />
            <TypographyComponent typography="bodyS_paragraph_normal" css={{ color: 'var(--colors-text-secondary)' }}>
              Value: {value}%
            </TypographyComponent>
          </div>

          {/* Different Values */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <TypographyComponent typography="bodyM_paragraph_normal">
              Different Values:
            </TypographyComponent>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <TypographyComponent typography="bodyS_paragraph_normal">
                  0%
                </TypographyComponent>
                <Progress value={0} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <TypographyComponent typography="bodyS_paragraph_normal">
                  25%
                </TypographyComponent>
                <Progress value={25} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <TypographyComponent typography="bodyS_paragraph_normal">
                  50%
                </TypographyComponent>
                <Progress value={50} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <TypographyComponent typography="bodyS_paragraph_normal">
                  75%
                </TypographyComponent>
                <Progress value={75} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <TypographyComponent typography="bodyS_paragraph_normal">
                  100%
                </TypographyComponent>
                <Progress value={100} />
              </div>
            </div>
          </div>

          {/* Color Schemes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <TypographyComponent typography="bodyM_paragraph_normal">
              Color Schemes:
            </TypographyComponent>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {COLOR_SCHEMES.map(scheme => (
                <div key={scheme} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <TypographyComponent typography="bodyS_paragraph_normal">
                    {scheme.charAt(0).toUpperCase() + scheme.slice(1)}
                  </TypographyComponent>
                  <Progress value={60} colorScheme={scheme} />
                </div>
              ))}
            </div>
          </div>

          {/* Rect vs Rounded */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <TypographyComponent typography="bodyM_paragraph_normal">
              Rect vs Rounded:
            </TypographyComponent>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <TypographyComponent typography="bodyS_paragraph_normal">
                  Rounded (default)
                </TypographyComponent>
                <Progress value={60} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <TypographyComponent typography="bodyS_paragraph_normal">
                  Rect (no border radius)
                </TypographyComponent>
                <Progress value={60} rect />
              </div>
            </div>
          </div>

          {/* In Context */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <TypographyComponent typography="bodyM_paragraph_normal">
              In Context (with labels):
            </TypographyComponent>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <TypographyComponent typography="bodyM_paragraph_normal">
                    Загрузка файла
                  </TypographyComponent>
                  <TypographyComponent typography="bodyM_paragraph_normal">
                    75%
                  </TypographyComponent>
                </div>
                <Progress value={75} />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <TypographyComponent typography="bodyM_paragraph_normal">
                    Установка обновлений
                  </TypographyComponent>
                  <TypographyComponent typography="bodyM_paragraph_normal">
                    45%
                  </TypographyComponent>
                </div>
                <Progress value={45} colorScheme="success" />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <TypographyComponent typography="bodyM_paragraph_normal">
                    Обработка данных
                  </TypographyComponent>
                  <TypographyComponent typography="bodyM_paragraph_normal">
                    90%
                  </TypographyComponent>
                </div>
                <Progress value={90} colorScheme="info" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

