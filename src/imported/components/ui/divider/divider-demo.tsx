"use client"

import { useState } from "react"
import { Divider } from "./divider"
import { useTheme } from "@/hooks/use-theme"

export default function DividerDemo() {
  const { isDark, toggleTheme } = useTheme()
  
  const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>('horizontal')
  const [thickness, setThickness] = useState('1px')
  const [length, setLength] = useState('100%')
  const [text, setText] = useState('')

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
              Divider Component Demo
            </h1>
            <p style={{ margin: 0, color: 'var(--colors-text-secondary)' }}>
              Тестирование компонента Divider с переключением всех пропсов
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
                Orientation:
                <select
                  value={orientation}
                  onChange={(e) => setOrientation(e.target.value as 'horizontal' | 'vertical')}
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
                  <option value="horizontal">Horizontal</option>
                  <option value="vertical">Vertical</option>
                </select>
              </label>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>
                Thickness:
                <input
                  type="text"
                  value={thickness}
                  onChange={(e) => setThickness(e.target.value)}
                  placeholder="1px"
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
                Length:
                <input
                  type="text"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
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
                Text (leave empty to hide):
                <input
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
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
            {orientation === 'horizontal' ? (
              <div style={{ width: '100%' }}>
                <Divider
                  orientation={orientation}
                  thickness={thickness}
                  length={length}
                  text={text || undefined}
                />
              </div>
            ) : (
              <div style={{ display: 'flex', height: '200px', gap: '1rem' }}>
                <div>Left content</div>
                <Divider
                  orientation={orientation}
                  thickness={thickness}
                  length={length}
                />
                <div>Right content</div>
              </div>
            )}
          </div>

          {/* Horizontal Dividers */}
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '1rem' }}>Horizontal Dividers</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <p style={{ margin: 0, marginBottom: '0.5rem' }}>Default (1px)</p>
                <Divider />
              </div>
              <div>
                <p style={{ margin: 0, marginBottom: '0.5rem' }}>Thick (2px)</p>
                <Divider thickness="2px" />
              </div>
              <div>
                <p style={{ margin: 0, marginBottom: '0.5rem' }}>Thin (0.5px)</p>
                <Divider thickness="0.5px" />
              </div>
              <div>
                <p style={{ margin: 0, marginBottom: '0.5rem' }}>With text</p>
                <Divider text="OR" />
              </div>
              <div>
                <p style={{ margin: 0, marginBottom: '0.5rem' }}>Short (50%)</p>
                <Divider length="50%" />
              </div>
            </div>
          </div>

          {/* Vertical Dividers */}
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '1rem' }}>Vertical Dividers</h3>
            <div style={{ display: 'flex', gap: '1rem', height: '100px', alignItems: 'center' }}>
              <div>Left</div>
              <Divider orientation="vertical" />
              <div>Center</div>
              <Divider orientation="vertical" thickness="2px" />
              <div>Right</div>
            </div>
          </div>

          {/* In Context */}
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '1rem' }}>In Context</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <h4 style={{ margin: 0, marginBottom: '0.5rem' }}>Section 1</h4>
                <p style={{ margin: 0, color: 'var(--colors-text-secondary)' }}>
                  This is the first section of content.
                </p>
              </div>
              <Divider />
              <div>
                <h4 style={{ margin: 0, marginBottom: '0.5rem' }}>Section 2</h4>
                <p style={{ margin: 0, color: 'var(--colors-text-secondary)' }}>
                  This is the second section of content.
                </p>
              </div>
              <Divider text="OR" />
              <div>
                <h4 style={{ margin: 0, marginBottom: '0.5rem' }}>Section 3</h4>
                <p style={{ margin: 0, color: 'var(--colors-text-secondary)' }}>
                  This is the third section of content.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

