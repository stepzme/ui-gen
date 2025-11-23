"use client"

import { useState } from "react"
import { Checkbox } from "./checkbox"
import type { Typography } from "./checkbox"
import { useTheme } from "@/hooks/use-theme"
import { Typography as TypographyComponent } from "@/imported/components/meta/typography"

export default function CheckboxDemo() {
  const { isDark, toggleTheme } = useTheme()
  
  const [checked, setChecked] = useState(false)
  const [indeterminate, setIndeterminate] = useState(false)
  const [label, setLabel] = useState('Согласен с условиями')
  const [description, setDescription] = useState('')
  const [warning, setWarning] = useState('')
  const [hasError, setHasError] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [typography, setTypography] = useState<Typography>('bodyM')

  const handleCheckedChange = (newChecked: boolean) => {
    setChecked(newChecked)
    if (newChecked) {
      setIndeterminate(false)
    }
  }

  const handleIndeterminateToggle = () => {
    setIndeterminate(!indeterminate)
    if (!indeterminate) {
      setChecked(false)
    }
  }

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
              Checkbox Component Demo
            </h1>
            <p style={{ margin: 0, color: 'var(--colors-text-secondary)' }}>
              Тестирование компонента Checkbox с переключением всех пропсов
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
                checked={checked}
                onChange={(e) => handleCheckedChange(e.target.checked)}
                style={{
                  width: '1.25rem',
                  height: '1.25rem',
                  cursor: 'pointer',
                }}
              />
              <span style={{ fontSize: '0.875rem' }}>Checked</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={indeterminate}
                onChange={handleIndeterminateToggle}
                style={{
                  width: '1.25rem',
                  height: '1.25rem',
                  cursor: 'pointer',
                }}
              />
              <span style={{ fontSize: '0.875rem' }}>Indeterminate</span>
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
            <Checkbox
              checked={indeterminate ? 'indeterminate' : checked}
              onChange={handleCheckedChange}
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
              <Checkbox label="Unchecked checkbox" />
              <Checkbox label="Checked checkbox" checked />
              <Checkbox label="Indeterminate checkbox" checked="indeterminate" />
              <Checkbox label="Disabled unchecked" disabled />
              <Checkbox label="Disabled checked" checked disabled />
            </div>
          </div>

          {/* With Description */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <TypographyComponent typography="bodyM_paragraph_normal">
              With Description:
            </TypographyComponent>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Checkbox
                label="Subscribe to newsletter"
                description="Receive weekly updates about new features"
              />
              <Checkbox
                label="Enable notifications"
                description="Get notified about important events"
                checked
              />
            </div>
          </div>

          {/* With Warning/Error */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <TypographyComponent typography="bodyM_paragraph_normal">
              With Warning/Error:
            </TypographyComponent>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Checkbox
                label="Accept terms and conditions"
                warning="You must accept the terms to continue"
                hasError
              />
              <Checkbox
                label="Enable feature"
                description="This feature is experimental"
                warning="This may cause unexpected behavior"
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
              <Checkbox label="Small checkbox" typography="bodyS" />
              <Checkbox label="Medium checkbox (default)" typography="bodyM" />
              <Checkbox label="Large checkbox" typography="bodyL" />
            </div>
          </div>

          {/* Without Label */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <TypographyComponent typography="bodyM_paragraph_normal">
              Without Label (for custom layouts):
            </TypographyComponent>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Checkbox />
              <span style={{ fontSize: '0.875rem' }}>Custom label text</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

