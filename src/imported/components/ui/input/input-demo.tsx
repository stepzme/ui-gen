"use client"

import { useState } from "react"
import { Input } from "./input"
import type { TextAlign } from "./input"
import { useTheme } from "@/hooks/use-theme"
import { Icon } from "@/imported/components/ui/icon"
import { Typography } from "@/imported/components/meta/typography"

export default function InputDemo() {
  const { isDark, toggleTheme } = useTheme()
  
  const [value, setValue] = useState('')
  const [placeholder, setPlaceholder] = useState('Введите текст')
  const [label, setLabel] = useState('Метка поля')
  const [description, setDescription] = useState('')
  const [errorText, setErrorText] = useState('')
  const [additionalText, setAdditionalText] = useState('')
  const [textAlign, setTextAlign] = useState<TextAlign>('left')
  const [disabled, setDisabled] = useState(false)
  const [readOnly, setReadOnly] = useState(false)
  const [warning, setWarning] = useState(false)
  const [hideInputField, setHideInputField] = useState(false)
  const [tight, setTight] = useState(false)
  const [showLeftSide, setShowLeftSide] = useState(false)
  const [showRightSide, setShowRightSide] = useState(false)

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
              Input Component Demo
            </h1>
            <p style={{ margin: 0, color: 'var(--colors-text-secondary)' }}>
              Тестирование компонента Input с переключением всех пропсов
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
              cursor: 'pointer'
            }}
          >
            {isDark ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>

        {/* Controls */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem',
          padding: '1.5rem',
          backgroundColor: 'var(--colors-background1-primary)',
          borderRadius: '0.5rem',
          border: '1px solid var(--colors-elevation0-borderNormal)'
        }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>
              Value
            </label>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                borderRadius: '0.375rem',
                border: '1px solid var(--colors-elevation0-borderNormal)',
                backgroundColor: 'var(--colors-background0-primary)',
                color: 'var(--colors-text-primary)'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>
              Placeholder
            </label>
            <input
              type="text"
              value={placeholder}
              onChange={(e) => setPlaceholder(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                borderRadius: '0.375rem',
                border: '1px solid var(--colors-elevation0-borderNormal)',
                backgroundColor: 'var(--colors-background0-primary)',
                color: 'var(--colors-text-primary)'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>
              Label
            </label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                borderRadius: '0.375rem',
                border: '1px solid var(--colors-elevation0-borderNormal)',
                backgroundColor: 'var(--colors-background0-primary)',
                color: 'var(--colors-text-primary)'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>
              Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Описание поля"
              style={{
                width: '100%',
                padding: '0.5rem',
                borderRadius: '0.375rem',
                border: '1px solid var(--colors-elevation0-borderNormal)',
                backgroundColor: 'var(--colors-background0-primary)',
                color: 'var(--colors-text-primary)'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>
              Error Text
            </label>
            <input
              type="text"
              value={errorText}
              onChange={(e) => setErrorText(e.target.value)}
              placeholder="Текст ошибки"
              style={{
                width: '100%',
                padding: '0.5rem',
                borderRadius: '0.375rem',
                border: '1px solid var(--colors-elevation0-borderNormal)',
                backgroundColor: 'var(--colors-background0-primary)',
                color: 'var(--colors-text-primary)'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>
              Additional Text
            </label>
            <input
              type="text"
              value={additionalText}
              onChange={(e) => setAdditionalText(e.target.value)}
              placeholder="Дополнительный текст"
              style={{
                width: '100%',
                padding: '0.5rem',
                borderRadius: '0.375rem',
                border: '1px solid var(--colors-elevation0-borderNormal)',
                backgroundColor: 'var(--colors-background0-primary)',
                color: 'var(--colors-text-primary)'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>
              Text Align
            </label>
            <select
              value={textAlign}
              onChange={(e) => setTextAlign(e.target.value as TextAlign)}
              style={{
                width: '100%',
                padding: '0.5rem',
                borderRadius: '0.375rem',
                border: '1px solid var(--colors-elevation0-borderNormal)',
                backgroundColor: 'var(--colors-background0-primary)',
                color: 'var(--colors-text-primary)'
              }}
            >
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={disabled}
                onChange={(e) => setDisabled(e.target.checked)}
              />
              <span>Disabled</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={readOnly}
                onChange={(e) => setReadOnly(e.target.checked)}
              />
              <span>Read Only</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={warning}
                onChange={(e) => setWarning(e.target.checked)}
              />
              <span>Warning</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={hideInputField}
                onChange={(e) => setHideInputField(e.target.checked)}
              />
              <span>Hide Input Field</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={tight}
                onChange={(e) => setTight(e.target.checked)}
              />
              <span>Tight</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={showLeftSide}
                onChange={(e) => setShowLeftSide(e.target.checked)}
              />
              <span>Show Left Side</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={showRightSide}
                onChange={(e) => setShowRightSide(e.target.checked)}
              />
              <span>Show Right Side</span>
            </label>
          </div>
        </div>

        {/* Demo */}
        <div style={{
          padding: '2rem',
          backgroundColor: 'var(--colors-background1-primary)',
          borderRadius: '0.5rem',
          border: '1px solid var(--colors-elevation0-borderNormal)'
        }}>
          <h2 style={{ marginTop: 0, marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: '600' }}>
            Компонент
          </h2>
          <div style={{ maxWidth: '400px' }}>
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={placeholder}
              label={label}
              description={description || undefined}
              errorText={errorText || undefined}
              additionalText={additionalText || undefined}
              textAlign={textAlign}
              disabled={disabled}
              readOnly={readOnly}
              warning={warning}
              hideInputField={hideInputField}
              tight={tight}
              leftSide={showLeftSide ? <Icon icon="search" /> : undefined}
              rightSide={showRightSide ? <Icon icon="close" /> : undefined}
            />
          </div>
        </div>

        {/* Examples */}
        <div style={{
          padding: '2rem',
          backgroundColor: 'var(--colors-background1-primary)',
          borderRadius: '0.5rem',
          border: '1px solid var(--colors-elevation0-borderNormal)'
        }}>
          <h2 style={{ marginTop: 0, marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: '600' }}>
            Примеры использования
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Basic */}
            <div>
              <Typography typography="headlineS" style={{ marginBottom: '1rem' }}>Базовый инпут</Typography>
              <div style={{ maxWidth: '400px' }}>
                <Input
                  placeholder="Введите текст"
                  label="Имя"
                />
              </div>
            </div>

            {/* With value */}
            <div>
              <Typography typography="headlineS" style={{ marginBottom: '1rem' }}>С заполненным значением</Typography>
              <div style={{ maxWidth: '400px' }}>
                <Input
                  value="Заполненное значение"
                  label="Email"
                />
              </div>
            </div>

            {/* With description */}
            <div>
              <Typography typography="headlineS" style={{ marginBottom: '1rem' }}>С описанием</Typography>
              <div style={{ maxWidth: '400px' }}>
                <Input
                  placeholder="Введите пароль"
                  label="Пароль"
                  description="Минимум 8 символов"
                />
              </div>
            </div>

            {/* With error */}
            <div>
              <Typography typography="headlineS" style={{ marginBottom: '1rem' }}>С ошибкой</Typography>
              <div style={{ maxWidth: '400px' }}>
                <Input
                  value="неверное значение"
                  label="Email"
                  errorText="Неверный формат email"
                  warning
                />
              </div>
            </div>

            {/* Disabled */}
            <div>
              <Typography typography="headlineS" style={{ marginBottom: '1rem' }}>Отключенный</Typography>
              <div style={{ maxWidth: '400px' }}>
                <Input
                  value="Недоступно для редактирования"
                  label="Статус"
                  disabled
                />
              </div>
            </div>

            {/* Read only */}
            <div>
              <Typography typography="headlineS" style={{ marginBottom: '1rem' }}>Только для чтения</Typography>
              <div style={{ maxWidth: '400px' }}>
                <Input
                  value="Только для чтения"
                  label="ID"
                  readOnly
                />
              </div>
            </div>

            {/* With icons */}
            <div>
              <Typography typography="headlineS" style={{ marginBottom: '1rem' }}>С иконками</Typography>
              <div style={{ maxWidth: '400px' }}>
                <Input
                  placeholder="Поиск"
                  label="Поиск"
                  leftSide={<Icon icon="search" />}
                  rightSide={<Icon icon="close" />}
                />
              </div>
            </div>

            {/* Text align */}
            <div>
              <Typography typography="headlineS" style={{ marginBottom: '1rem' }}>Выравнивание текста</Typography>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
                <Input
                  placeholder="Слева"
                  label="Left"
                  textAlign="left"
                />
                <Input
                  placeholder="По центру"
                  label="Center"
                  textAlign="center"
                />
                <Input
                  placeholder="Справа"
                  label="Right"
                  textAlign="right"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}




