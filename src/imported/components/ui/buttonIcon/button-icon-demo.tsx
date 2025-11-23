"use client"

import { useState } from "react"
import { ButtonIcon, type ButtonIconProps } from "./buttonIcon"
import type { Typography } from "./buttonIcon"
import { useTheme } from "@/hooks/use-theme"

const TYPOGRAPHY_OPTIONS: Typography[] = ["bodyS", "bodyM", "bodyL"]

export default function ButtonIconDemo() {
  const { isDark, toggleTheme } = useTheme()

  const [typography, setTypography] = useState<Typography>("bodyM")
  const [withPadding, setWithPadding] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [iconVariant, setIconVariant] = useState("placeholder")
  const [ariaLabel, setAriaLabel] = useState("Demo icon button")
  const [dataTestId, setDataTestId] = useState("")

  const buttonProps: ButtonIconProps = {
    typography,
    withPadding,
    isActive,
    disabled,
    icon: iconVariant || undefined,
    "data-test-id": dataTestId || undefined,
    "aria-label": ariaLabel,
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
              ButtonIcon Component Demo
            </h1>
            <p style={{ margin: 0, color: 'var(--colors-text-secondary)' }}>
              Настройка и тестирование свойства ButtonIcon
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '1.5rem', border: '1px solid var(--colors-elevation0-borderNormal)', borderRadius: '0.5rem', backgroundColor: 'var(--colors-background1-primary)' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', margin: 0 }}>Props</h2>

          {/* Typography */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: '500' }}>typography</label>
            <select
              value={typography}
              onChange={(event) => setTypography(event.target.value as Typography)}
              style={{
                padding: '0.5rem',
                borderRadius: '0.375rem',
                border: '1px solid var(--colors-elevation0-borderNormal)',
                backgroundColor: 'var(--colors-background0-primary)',
                color: 'var(--colors-text-primary)',
                fontSize: '0.875rem',
              }}
            >
              {TYPOGRAPHY_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* withPadding */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="checkbox"
              id="withPadding"
              checked={withPadding}
              onChange={(event) => setWithPadding(event.target.checked)}
              style={{ width: '1rem', height: '1rem', cursor: 'pointer' }}
            />
            <label htmlFor="withPadding" style={{ fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer' }}>
              withPadding
            </label>
          </div>

          {/* isActive */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="checkbox"
              id="isActive"
              checked={isActive}
              onChange={(event) => setIsActive(event.target.checked)}
              style={{ width: '1rem', height: '1rem', cursor: 'pointer' }}
            />
            <label htmlFor="isActive" style={{ fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer' }}>
              isActive
            </label>
          </div>

          {/* disabled */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="checkbox"
              id="disabled"
              checked={disabled}
              onChange={(event) => setDisabled(event.target.checked)}
              style={{ width: '1rem', height: '1rem', cursor: 'pointer' }}
            />
            <label htmlFor="disabled" style={{ fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer' }}>
              disabled
            </label>
          </div>

          {/* icon variant */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: '500' }}>icon (variant)</label>
            <input
              type="text"
              value={iconVariant}
              onChange={(event) => setIconVariant(event.target.value)}
              placeholder="placeholder"
              style={{
                padding: '0.5rem',
                borderRadius: '0.375rem',
                border: '1px solid var(--colors-elevation0-borderNormal)',
                backgroundColor: 'var(--colors-background0-primary)',
                color: 'var(--colors-text-primary)',
                fontSize: '0.875rem',
              }}
            />
          </div>

          {/* aria-label */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: '500' }}>aria-label</label>
            <input
              type="text"
              value={ariaLabel}
              onChange={(event) => setAriaLabel(event.target.value)}
              placeholder="Demo icon button"
              style={{
                padding: '0.5rem',
                borderRadius: '0.375rem',
                border: '1px solid var(--colors-elevation0-borderNormal)',
                backgroundColor: 'var(--colors-background0-primary)',
                color: 'var(--colors-text-primary)',
                fontSize: '0.875rem',
              }}
            />
          </div>

          {/* data-test-id */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: '500' }}>data-test-id</label>
            <input
              type="text"
              value={dataTestId}
              onChange={(event) => setDataTestId(event.target.value)}
              placeholder="ButtonIcon"
              style={{
                padding: '0.5rem',
                borderRadius: '0.375rem',
                border: '1px solid var(--colors-elevation0-borderNormal)',
                backgroundColor: 'var(--colors-background0-primary)',
                color: 'var(--colors-text-primary)',
                fontSize: '0.875rem',
              }}
            />
          </div>
        </div>

        {/* Preview */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.5rem', border: '1px solid var(--colors-elevation0-borderNormal)', borderRadius: '0.5rem', backgroundColor: 'var(--colors-background1-primary)' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', margin: 0 }}>Preview</h2>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <ButtonIcon {...buttonProps} />
          </div>
          <p style={{ margin: 0, color: 'var(--colors-text-secondary)' }}>
            Если иконка с указанным именем отсутствует в реестре, будет показан fallback с вопросительным знаком.
          </p>
        </div>
      </div>
    </div>
  )
}

