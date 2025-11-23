"use client"

import { useState } from "react"
import { Switch } from "./switch"
import type { Typography } from "./switch"
import { useTheme } from "@/hooks/use-theme"
import { Typography as TypographyComponent } from "@/imported/components/meta/typography"

export default function SwitchDemo() {
  const { isDark, toggleTheme } = useTheme()
  
  const [isActive, setIsActive] = useState(false)
  const [label, setLabel] = useState('Включить уведомления')
  const [description, setDescription] = useState('')
  const [warning, setWarning] = useState('')
  const [hasError, setHasError] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [typography, setTypography] = useState<Typography>('bodyM')

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
              Switch Component Demo
            </h1>
            <p style={{ margin: 0, color: 'var(--colors-text-secondary)' }}>
              Тестирование компонента Switch с переключением всех пропсов
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
                Label:
                <input
                  type="text"
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
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
                Description:
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
                Warning/Error Text:
                <input
                  type="text"
                  value={warning}
                  onChange={(e) => setWarning(e.target.value)}
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
                Typography:
                <select
                  value={typography}
                  onChange={(e) => setTypography(e.target.value as Typography)}
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
                  <option value="bodyS">bodyS</option>
                  <option value="bodyM">bodyM</option>
                  <option value="bodyL">bodyL</option>
                </select>
              </label>
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                style={{
                  width: '1.25rem',
                  height: '1.25rem',
                  cursor: 'pointer',
                }}
              />
              <span style={{ fontSize: '0.875rem' }}>Is Active</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={hasError}
                onChange={(e) => setHasError(e.target.checked)}
                style={{
                  width: '1.25rem',
                  height: '1.25rem',
                  cursor: 'pointer',
                }}
              />
              <span style={{ fontSize: '0.875rem' }}>Has Error</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={disabled}
                onChange={(e) => setDisabled(e.target.checked)}
                style={{
                  width: '1.25rem',
                  height: '1.25rem',
                  cursor: 'pointer',
                }}
              />
              <span style={{ fontSize: '0.875rem' }}>Disabled</span>
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
            <Switch
              isActive={isActive}
              onChange={(checked) => setIsActive(checked)}
              label={label || undefined}
              description={description || undefined}
              warning={warning || undefined}
              hasError={hasError}
              disabled={disabled}
              typography={typography}
            />
          </div>

          {/* Basic Examples */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <TypographyComponent typography="bodyM_paragraph_normal">
              Basic Examples:
            </TypographyComponent>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Switch label="Unchecked switch" />
              <Switch label="Checked switch" isActive />
              <Switch label="Disabled unchecked" disabled />
              <Switch label="Disabled checked" isActive disabled />
            </div>
          </div>

          {/* With Description */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <TypographyComponent typography="bodyM_paragraph_normal">
              With Description:
            </TypographyComponent>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Switch
                label="Enable notifications"
                description="Receive push notifications on your device"
              />
              <Switch
                label="Auto-save documents"
                description="Automatically save your work every 5 minutes"
                isActive
              />
            </div>
          </div>

          {/* With Warning/Error */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <TypographyComponent typography="bodyM_paragraph_normal">
              With Warning/Error:
            </TypographyComponent>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Switch
                label="Enable experimental feature"
                warning="This feature is in beta and may be unstable"
                hasError
              />
              <Switch
                label="Allow third-party cookies"
                description="Required for some features to work"
                warning="This may affect your privacy"
                hasError
              />
            </div>
          </div>

          {/* Typography Sizes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <TypographyComponent typography="bodyM_paragraph_normal">
              Typography Sizes:
            </TypographyComponent>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Switch label="Small switch" typography="bodyS" />
              <Switch label="Medium switch (default)" typography="bodyM" />
              <Switch label="Large switch" typography="bodyL" />
            </div>
          </div>

          {/* Without Label */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <TypographyComponent typography="bodyM_paragraph_normal">
              Without Label (for custom layouts):
            </TypographyComponent>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Switch />
              <span style={{ fontSize: '0.875rem' }}>Custom label text</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

