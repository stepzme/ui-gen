"use client"

import { useState } from "react"
import { Skeleton } from "./skeleton"
import { useTheme } from "@/hooks/use-theme"

export default function SkeletonDemo() {
  const { isDark, toggleTheme } = useTheme()
  
  const [variant, setVariant] = useState<'text' | 'circle' | 'rectangle'>('rectangle')
  const [width, setWidth] = useState<string>('100%')
  const [height, setHeight] = useState<string>('20px')
  const [borderRadius, setBorderRadius] = useState<string>('')
  const [active, setActive] = useState(true)
  const [withBorder, setWithBorder] = useState(false)

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
              Skeleton Component Demo
            </h1>
            <p style={{ margin: 0, color: 'var(--colors-text-secondary)' }}>
              Тестирование компонента Skeleton с переключением всех пропсов
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
                Variant:
                <select
                  value={variant}
                  onChange={(e) => setVariant(e.target.value as 'text' | 'circle' | 'rectangle')}
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
                  <option value="text">Text</option>
                  <option value="circle">Circle</option>
                  <option value="rectangle">Rectangle</option>
                </select>
              </label>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>
                Width:
                <input
                  type="text"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  placeholder="100%"
                  style={{
                    width: '100%',
                    marginTop: '0.25rem',
                    padding: '0.5rem',
                    borderRadius: '0.375rem',
                    border: '1px solid var(--colors-elevation0-borderNormal)',
                    backgroundColor: 'var(--colors-background0-primary)',
                    color: 'var(--colors-text-primary)',
                    fontSize: '0.875rem',
                  }}
                />
              </label>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>
                Height:
                <input
                  type="text"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="20px"
                  style={{
                    width: '100%',
                    marginTop: '0.25rem',
                    padding: '0.5rem',
                    borderRadius: '0.375rem',
                    border: '1px solid var(--colors-elevation0-borderNormal)',
                    backgroundColor: 'var(--colors-background0-primary)',
                    color: 'var(--colors-text-primary)',
                    fontSize: '0.875rem',
                  }}
                />
              </label>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>
                Border Radius (leave empty for default):
                <input
                  type="text"
                  value={borderRadius}
                  onChange={(e) => setBorderRadius(e.target.value)}
                  placeholder=""
                  style={{
                    width: '100%',
                    marginTop: '0.25rem',
                    padding: '0.5rem',
                    borderRadius: '0.375rem',
                    border: '1px solid var(--colors-elevation0-borderNormal)',
                    backgroundColor: 'var(--colors-background0-primary)',
                    color: 'var(--colors-text-primary)',
                    fontSize: '0.875rem',
                  }}
                />
              </label>
            </div>

            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={active}
                  onChange={(e) => setActive(e.target.checked)}
                  style={{ cursor: 'pointer' }}
                />
                <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>Active (Animation)</span>
              </label>
            </div>

            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={withBorder}
                  onChange={(e) => setWithBorder(e.target.checked)}
                  style={{ cursor: 'pointer' }}
                />
                <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>With Border</span>
              </label>
            </div>
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
          gap: '1.5rem'
        }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', margin: 0 }}>Examples</h2>
          
          {/* Current Configuration */}
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '1rem' }}>Current Configuration</h3>
            <Skeleton
              variant={variant}
              width={width}
              height={height}
              borderRadius={borderRadius || undefined}
              active={active}
              withBorder={withBorder}
            />
          </div>

          {/* Variants */}
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '1rem' }}>Variants</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <p style={{ margin: 0, marginBottom: '0.5rem', fontSize: '0.875rem' }}>Text</p>
                <Skeleton variant="text" width={300} height={16} />
              </div>
              <div>
                <p style={{ margin: 0, marginBottom: '0.5rem', fontSize: '0.875rem' }}>Circle</p>
                <Skeleton variant="circle" width={40} height={40} />
              </div>
              <div>
                <p style={{ margin: 0, marginBottom: '0.5rem', fontSize: '0.875rem' }}>Rectangle</p>
                <Skeleton variant="rectangle" width={200} height={100} />
              </div>
            </div>
          </div>

          {/* Text Skeleton */}
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '1rem' }}>Text Skeleton</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <Skeleton variant="text" width={510} height={16} />
              <Skeleton variant="text" width={536} height={16} />
              <Skeleton variant="text" width={200} height={16} />
            </div>
          </div>

          {/* Circle Skeleton */}
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '1rem' }}>Circle Skeleton</h3>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <Skeleton variant="circle" width={40} height={40} />
              <Skeleton variant="circle" width={60} height={60} />
              <Skeleton variant="circle" width={80} height={80} />
            </div>
          </div>

          {/* Rectangle Skeleton */}
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '1rem' }}>Rectangle Skeleton</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Skeleton variant="rectangle" width="100%" height={100} />
              <Skeleton variant="rectangle" width={300} height={150} />
            </div>
          </div>

          {/* With Border */}
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '1rem' }}>With Border</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Skeleton variant="text" width={300} height={16} withBorder />
              <Skeleton variant="circle" width={40} height={40} withBorder />
              <Skeleton variant="rectangle" width={200} height={100} withBorder />
            </div>
          </div>

          {/* Without Animation */}
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '1rem' }}>Without Animation</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <Skeleton variant="text" width={300} height={16} active={false} />
              <Skeleton variant="text" width={400} height={16} active={false} />
              <Skeleton variant="text" width={200} height={16} active={false} />
            </div>
          </div>

          {/* In Context - Card Skeleton */}
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '1rem' }}>In Context - Card Skeleton</h3>
            <div style={{
              padding: '1.5rem',
              borderRadius: '0.5rem',
              border: '1px solid var(--colors-elevation0-borderNormal)',
              backgroundColor: 'var(--colors-background1-primary)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              maxWidth: '400px'
            }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Skeleton variant="circle" width={48} height={48} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                  <Skeleton variant="text" width="80%" height={16} />
                  <Skeleton variant="text" width="60%" height={14} />
                </div>
              </div>
              <Skeleton variant="rectangle" width="100%" height={200} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <Skeleton variant="text" width="100%" height={16} />
                <Skeleton variant="text" width="90%" height={16} />
                <Skeleton variant="text" width="75%" height={16} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

