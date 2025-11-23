"use client"

import { useState } from "react"
import { Select } from "./select"
import type { SelectOption, TextAlign } from "./select"
import { useTheme } from "@/hooks/use-theme"
import { Typography as TypographyComponent } from "@/imported/components/meta/typography"
import { Icon } from "@/imported/components/ui/icon"

const defaultOptions: SelectOption[] = [
  { value: 'vtb', label: 'ВТБ' },
  { value: 'ros', label: 'Росбанк' },
  { value: 'alf', label: 'Альфа Банк' },
  { value: 'sbr', label: 'Сбер' },
  { value: 'usb', label: 'Урал-сиб' },
  { value: 'tnk', label: 'Тинькофф' },
  { value: 'otk', label: 'Открытие' },
  { value: 'crn', label: 'Кринж-банк', disabled: true },
]

const optionsWithIcons: SelectOption[] = [
  { value: 'vtb', label: 'ВТБ', icon: <Icon icon="building" /> },
  { value: 'ros', label: 'Росбанк', icon: <Icon icon="building" /> },
  { value: 'alf', label: 'Альфа Банк', icon: <Icon icon="building" /> },
  { value: 'sbr', label: 'Сбер', icon: <Icon icon="building" /> },
]

const optionsWithSubtitles: SelectOption[] = [
  { value: 'vtb', label: 'ВТБ', subtitle: 'Крупнейший банк' },
  { value: 'ros', label: 'Росбанк', subtitle: 'Надежный партнер' },
  { value: 'alf', label: 'Альфа Банк', subtitle: 'Инновации' },
  { value: 'sbr', label: 'Сбер', subtitle: 'Лидер рынка' },
]

export default function SelectDemo() {
  const { isDark, toggleTheme } = useTheme()
  
  const [value, setValue] = useState<string | undefined>(undefined)
  const [placeholder, setPlaceholder] = useState('Выберите банк')
  const [label, setLabel] = useState('Банк')
  const [description, setDescription] = useState('')
  const [errorText, setErrorText] = useState('')
  const [warningText, setWarningText] = useState('')
  const [additionalText, setAdditionalText] = useState('')
  const [textAlign, setTextAlign] = useState<TextAlign>('left')
  const [disabled, setDisabled] = useState(false)
  const [readOnly, setReadOnly] = useState(false)
  const [warning, setWarning] = useState(false)
  const [tight, setTight] = useState(false)
  const [optionsType, setOptionsType] = useState<'default' | 'icons' | 'subtitles'>('default')
  
  const currentOptions = optionsType === 'icons' 
    ? optionsWithIcons 
    : optionsType === 'subtitles' 
    ? optionsWithSubtitles 
    : defaultOptions

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
              Select Component Demo
            </h1>
            <p style={{ margin: 0, color: 'var(--colors-text-secondary)' }}>
              Тестирование компонента Select с переключением всех пропсов
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
                Warning Text:
                <input
                  type="text"
                  value={warningText}
                  onChange={(e) => setWarningText(e.target.value)}
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
                Additional Text:
                <input
                  type="text"
                  value={additionalText}
                  onChange={(e) => setAdditionalText(e.target.value)}
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
                Options Type:
                <select
                  value={optionsType}
                  onChange={(e) => setOptionsType(e.target.value as 'default' | 'icons' | 'subtitles')}
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
                  <option value="default">Default</option>
                  <option value="icons">With Icons</option>
                  <option value="subtitles">With Subtitles</option>
                </select>
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
            <Select
              options={currentOptions}
              value={value}
              onValueChange={setValue}
              placeholder={placeholder}
              label={label}
              description={description || undefined}
              errorText={errorText || undefined}
              warningText={warningText || undefined}
              additionalText={additionalText || undefined}
              textAlign={textAlign}
              disabled={disabled}
              readOnly={readOnly}
              warning={warning}
              tight={tight}
            />
            <TypographyComponent typography="bodyS_paragraph_normal" css={{ color: 'var(--colors-text-secondary)' }}>
              Selected value: {value || 'none'}
            </TypographyComponent>
          </div>

          {/* Basic Examples */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <TypographyComponent typography="bodyM_paragraph_normal">
              Basic Examples:
            </TypographyComponent>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Select
                options={defaultOptions}
                placeholder="Выберите банк"
                label="Банк"
              />
              <Select
                options={defaultOptions}
                value="vtb"
                placeholder="Выберите банк"
                label="Банк (с выбранным значением)"
              />
              <Select
                options={defaultOptions}
                placeholder="Выберите банк"
                label="Банк"
                disabled
              />
              <Select
                options={defaultOptions}
                value="vtb"
                placeholder="Выберите банк"
                label="Банк"
                readOnly
              />
            </div>
          </div>

          {/* With States */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <TypographyComponent typography="bodyM_paragraph_normal">
              With States:
            </TypographyComponent>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Select
                options={defaultOptions}
                placeholder="Выберите банк"
                label="Банк"
                description="Выберите один из доступных банков"
              />
              <Select
                options={defaultOptions}
                placeholder="Выберите банк"
                label="Банк"
                errorText="Это поле обязательно для заполнения"
              />
              <Select
                options={defaultOptions}
                placeholder="Выберите банк"
                label="Банк"
                warningText="Проверьте правильность выбора"
                warning
              />
              <Select
                options={defaultOptions}
                placeholder="Выберите банк"
                label="Банк"
                additionalText="Дополнительная информация"
              />
            </div>
          </div>

          {/* With Icons and Subtitles */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <TypographyComponent typography="bodyM_paragraph_normal">
              With Icons and Subtitles:
            </TypographyComponent>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Select
                options={optionsWithIcons}
                placeholder="Выберите банк"
                label="Банк с иконками"
              />
              <Select
                options={optionsWithSubtitles}
                placeholder="Выберите банк"
                label="Банк с подзаголовками"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

