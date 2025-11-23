"use client"

import { useState } from "react"
import { Textarea } from "./textarea"
import type { TextAlign } from "./textarea"
import { useTheme } from "@/hooks/use-theme"
import { Typography as TypographyComponent } from "@/imported/components/meta/typography"

export default function TextareaDemo() {
  const { isDark, toggleTheme } = useTheme()
  
  const [value, setValue] = useState('')
  const [placeholder, setPlaceholder] = useState('Введите текст')
  const [label, setLabel] = useState('Метка поля')
  const [description, setDescription] = useState('')
  const [errorText, setErrorText] = useState('')
  const [textAlign, setTextAlign] = useState<TextAlign>('left')
  const [disabled, setDisabled] = useState(false)
  const [readOnly, setReadOnly] = useState(false)
  const [warning, setWarning] = useState(false)
  const [tight, setTight] = useState(false)
  const [maxLength, setMaxLength] = useState<number | undefined>(200)
  const [showCounter, setShowCounter] = useState(false)
  const [minRows, setMinRows] = useState(3)
  const [maxRows, setMaxRows] = useState<number | undefined>(undefined)

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
              Textarea Component Demo
            </h1>
            <p style={{ margin: 0, color: 'var(--colors-text-secondary)' }}>
              Тестирование компонента Textarea с переключением всех пропсов
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
                Placeholder:
                <input
                  type="text"
                  value={placeholder}
                  onChange={(e) => setPlaceholder(e.target.value)}
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
                Error Text:
                <input
                  type="text"
                  value={errorText}
                  onChange={(e) => setErrorText(e.target.value)}
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
                Text Align:
                <select
                  value={textAlign}
                  onChange={(e) => setTextAlign(e.target.value as TextAlign)}
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
                  <option value="left">left</option>
                  <option value="right">right</option>
                  <option value="center">center</option>
                </select>
              </label>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>
                Max Length:
                <input
                  type="number"
                  value={maxLength || ''}
                  onChange={(e) => setMaxLength(e.target.value ? parseInt(e.target.value) : undefined)}
                  placeholder="No limit"
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
                Min Rows:
                <input
                  type="number"
                  value={minRows}
                  onChange={(e) => setMinRows(parseInt(e.target.value) || 3)}
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
                Max Rows (auto-resize):
                <input
                  type="number"
                  value={maxRows || ''}
                  onChange={(e) => setMaxRows(e.target.value ? parseInt(e.target.value) : undefined)}
                  placeholder="No limit"
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

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
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

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={readOnly}
                onChange={(e) => setReadOnly(e.target.checked)}
                style={{
                  width: '1.25rem',
                  height: '1.25rem',
                  cursor: 'pointer',
                }}
              />
              <span style={{ fontSize: '0.875rem' }}>Read Only</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={warning}
                onChange={(e) => setWarning(e.target.checked)}
                style={{
                  width: '1.25rem',
                  height: '1.25rem',
                  cursor: 'pointer',
                }}
              />
              <span style={{ fontSize: '0.875rem' }}>Warning</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={tight}
                onChange={(e) => setTight(e.target.checked)}
                style={{
                  width: '1.25rem',
                  height: '1.25rem',
                  cursor: 'pointer',
                }}
              />
              <span style={{ fontSize: '0.875rem' }}>Tight</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={showCounter}
                onChange={(e) => setShowCounter(e.target.checked)}
                style={{
                  width: '1.25rem',
                  height: '1.25rem',
                  cursor: 'pointer',
                }}
              />
              <span style={{ fontSize: '0.875rem' }}>Show Counter</span>
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
            <Textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={placeholder}
              label={label || undefined}
              description={description || undefined}
              errorText={errorText || undefined}
              textAlign={textAlign}
              disabled={disabled}
              readOnly={readOnly}
              warning={warning}
              tight={tight}
              maxLength={maxLength}
              showCounter={showCounter}
              minRows={minRows}
              maxRows={maxRows}
            />
          </div>

          {/* Basic Examples */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <TypographyComponent typography="bodyM_paragraph_normal">
              Basic Examples:
            </TypographyComponent>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Textarea
                label="Basic textarea"
                placeholder="Enter your text here"
              />
              <Textarea
                label="With description"
                description="This is a description text"
                placeholder="Enter your text here"
              />
              <Textarea
                label="With error"
                errorText="This field is required"
                placeholder="Enter your text here"
              />
            </div>
          </div>

          {/* With Counter */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <TypographyComponent typography="bodyM_paragraph_normal">
              With Character Counter:
            </TypographyComponent>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Textarea
                label="Textarea with counter"
                placeholder="Type something..."
                maxLength={100}
                showCounter
              />
            </div>
          </div>

          {/* Auto-resize */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <TypographyComponent typography="bodyM_paragraph_normal">
              Auto-resize (maxRows: 5):
            </TypographyComponent>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Textarea
                label="Auto-resizing textarea"
                placeholder="Type multiple lines to see auto-resize..."
                minRows={2}
                maxRows={5}
              />
            </div>
          </div>

          {/* States */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <TypographyComponent typography="bodyM_paragraph_normal">
              States:
            </TypographyComponent>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Textarea
                label="Disabled"
                placeholder="This is disabled"
                disabled
                value="Disabled value"
              />
              <Textarea
                label="Read Only"
                placeholder="This is read only"
                readOnly
                value="Read only value"
              />
              <Textarea
                label="Warning"
                placeholder="This has warning state"
                warning
              />
            </div>
          </div>

          {/* Text Alignment */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <TypographyComponent typography="bodyM_paragraph_normal">
              Text Alignment:
            </TypographyComponent>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Textarea
                label="Left aligned"
                placeholder="Text aligned to left"
                textAlign="left"
              />
              <Textarea
                label="Center aligned"
                placeholder="Text aligned to center"
                textAlign="center"
              />
              <Textarea
                label="Right aligned"
                placeholder="Text aligned to right"
                textAlign="right"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

