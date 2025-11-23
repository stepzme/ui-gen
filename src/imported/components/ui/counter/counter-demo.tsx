"use client"

import { useState } from "react"
import { Counter } from "./counter"
import { useTheme } from "@/hooks/use-theme"
import { Typography } from "@/imported/components/meta/typography"

export default function CounterDemo() {
  const { isDark, toggleTheme } = useTheme()
  
  const [value1, setValue1] = useState(0)
  const [value2, setValue2] = useState(5)
  const [value3, setValue3] = useState(10)
  const [value4, setValue4] = useState(0)
  const [size, setSize] = useState<'bodyS' | 'bodyM' | 'bodyL'>('bodyM')
  const [disabled, setDisabled] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [min, setMin] = useState<number | undefined>(undefined)
  const [max, setMax] = useState<number | undefined>(undefined)
  const [step, setStep] = useState(1)

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
              Counter Component Demo
            </h1>
            <p style={{ margin: 0, color: 'var(--colors-text-secondary)' }}>
              Тестирование компонента Counter с переключением всех пропсов
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
                Size:
                <select
                  value={size}
                  onChange={(e) => setSize(e.target.value as 'bodyS' | 'bodyM' | 'bodyL')}
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
                  <option value="bodyS">Body S</option>
                  <option value="bodyM">Body M</option>
                  <option value="bodyL">Body L</option>
                </select>
              </label>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>
                Step:
                <input
                  type="number"
                  value={step}
                  onChange={(e) => setStep(Number(e.target.value) || 1)}
                  min="1"
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
                Min (optional):
                <input
                  type="number"
                  value={min ?? ''}
                  onChange={(e) => setMin(e.target.value ? Number(e.target.value) : undefined)}
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
                Max (optional):
                <input
                  type="number"
                  value={max ?? ''}
                  onChange={(e) => setMax(e.target.value ? Number(e.target.value) : undefined)}
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
                  checked={disabled}
                  onChange={(e) => setDisabled(e.target.checked)}
                  style={{ cursor: 'pointer' }}
                />
                <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>Disabled</span>
              </label>
            </div>

            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={hasError}
                  onChange={(e) => setHasError(e.target.checked)}
                  style={{ cursor: 'pointer' }}
                />
                <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>Has Error</span>
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Counter
                value={value1}
                onChange={setValue1}
                size={size}
                disabled={disabled}
                hasError={hasError}
                min={min}
                max={max}
                step={step}
              />
              <Typography typography="bodyM_paragraph_normal" css={{ color: 'var(--colors-text-secondary)' }}>
                Value: {value1}
              </Typography>
            </div>
          </div>

          {/* Sizes */}
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '1rem' }}>Sizes</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <Typography typography="bodyS_paragraph_normal" css={{ color: 'var(--colors-text-secondary)' }}>
                  Body S
                </Typography>
                <Counter value={value2} onChange={setValue2} size="bodyS" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <Typography typography="bodyM_paragraph_normal" css={{ color: 'var(--colors-text-secondary)' }}>
                  Body M
                </Typography>
                <Counter value={value3} onChange={setValue3} size="bodyM" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <Typography typography="bodyL_paragraph_normal" css={{ color: 'var(--colors-text-secondary)' }}>
                  Body L
                </Typography>
                <Counter value={value4} onChange={setValue4} size="bodyL" />
              </div>
            </div>
          </div>

          {/* With Limits */}
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '1rem' }}>With Min/Max Limits</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
              <Counter value={5} onChange={() => {}} min={0} max={10} />
              <Typography typography="bodyM_paragraph_normal" css={{ color: 'var(--colors-text-secondary)' }}>
                Min: 0, Max: 10
              </Typography>
            </div>
          </div>

          {/* Disabled */}
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '1rem' }}>Disabled</h3>
            <Counter value={5} onChange={() => {}} disabled />
          </div>

          {/* With Step */}
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '1rem' }}>With Custom Step</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
              <Counter value={10} onChange={() => {}} step={5} />
              <Typography typography="bodyM_paragraph_normal" css={{ color: 'var(--colors-text-secondary)' }}>
                Step: 5
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

