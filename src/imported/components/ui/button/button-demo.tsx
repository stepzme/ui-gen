"use client"

import { useState } from "react"
import { Button } from "./button"
import type { Variant, ColorScheme, Typography, PaddingSize, FullWidth } from "./button"
import { useTheme } from "@/hooks/use-theme"

export default function ButtonDemo() {
  const { isDark, toggleTheme } = useTheme()
  
  const [variant, setVariant] = useState<Variant>('filled')
  const [colorScheme, setColorScheme] = useState<ColorScheme>('brand')
  const [typography, setTypography] = useState<Typography>('bodyM')
  const [extraPadding, setExtraPadding] = useState(false)
  const [fullWidth, setFullWidth] = useState<FullWidth>('adaptive')
  const [paddingSize, setPaddingSize] = useState<PaddingSize>('medium')
  const [rounded, setRounded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [dataTestId, setDataTestId] = useState('')
  const [children, setChildren] = useState('Button')

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
              Button Component Demo
            </h1>
            <p style={{ margin: 0, color: 'var(--colors-text-secondary)' }}>
              Тестирование компонента Button с переключением всех пропсов
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
          
          {/* Variant */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: '500' }}>variant</label>
            <select
              value={variant}
              onChange={(e) => setVariant(e.target.value as Variant)}
              style={{
                padding: '0.5rem',
                borderRadius: '0.375rem',
                border: '1px solid var(--colors-elevation0-borderNormal)',
                backgroundColor: 'var(--colors-background0-primary)',
                color: 'var(--colors-text-primary)',
                fontSize: '0.875rem',
              }}
            >
              <option value="filled">filled</option>
              <option value="outlined">outlined</option>
              <option value="tonned">tonned</option>
              <option value="transparent">transparent</option>
            </select>
          </div>

          {/* ColorScheme */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: '500' }}>colorScheme</label>
            <select
              value={colorScheme}
              onChange={(e) => setColorScheme(e.target.value as ColorScheme)}
              style={{
                padding: '0.5rem',
                borderRadius: '0.375rem',
                border: '1px solid var(--colors-elevation0-borderNormal)',
                backgroundColor: 'var(--colors-background0-primary)',
                color: 'var(--colors-text-primary)',
                fontSize: '0.875rem',
              }}
            >
              <option value="brand">brand</option>
              <option value="success">success</option>
              <option value="info">info</option>
              <option value="warning">warning</option>
              <option value="critical">critical</option>
              <option value="draft">draft</option>
              <option value="constant">constant</option>
              <option value="primary">primary</option>
            </select>
          </div>

          {/* Typography */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: '500' }}>typography</label>
            <select
              value={typography}
              onChange={(e) => setTypography(e.target.value as Typography)}
              style={{
                padding: '0.5rem',
                borderRadius: '0.375rem',
                border: '1px solid var(--colors-elevation0-borderNormal)',
                backgroundColor: 'var(--colors-background0-primary)',
                color: 'var(--colors-text-primary)',
                fontSize: '0.875rem',
              }}
            >
              <option value="bodyS">bodyS</option>
              <option value="bodyM">bodyM</option>
              <option value="bodyL">bodyL</option>
            </select>
          </div>

          {/* PaddingSize */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: '500' }}>paddingSize</label>
            <select
              value={paddingSize}
              onChange={(e) => setPaddingSize(e.target.value as PaddingSize)}
              style={{
                padding: '0.5rem',
                borderRadius: '0.375rem',
                border: '1px solid var(--colors-elevation0-borderNormal)',
                backgroundColor: 'var(--colors-background0-primary)',
                color: 'var(--colors-text-primary)',
                fontSize: '0.875rem',
              }}
            >
              <option value="tiny">tiny</option>
              <option value="small">small</option>
              <option value="medium">medium</option>
            </select>
          </div>

          {/* FullWidth */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: '500' }}>fullWidth</label>
            <select
              value={fullWidth}
              onChange={(e) => setFullWidth(e.target.value as FullWidth)}
              style={{
                padding: '0.5rem',
                borderRadius: '0.375rem',
                border: '1px solid var(--colors-elevation0-borderNormal)',
                backgroundColor: 'var(--colors-background0-primary)',
                color: 'var(--colors-text-primary)',
                fontSize: '0.875rem',
              }}
            >
              <option value="adaptive">adaptive</option>
              <option value="enable">enable</option>
              <option value="disable">disable</option>
            </select>
          </div>

          {/* ExtraPadding */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="checkbox"
              id="extraPadding"
              checked={extraPadding}
              onChange={(e) => setExtraPadding(e.target.checked)}
              style={{
                width: '1rem',
                height: '1rem',
                cursor: 'pointer',
              }}
            />
            <label htmlFor="extraPadding" style={{ fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer' }}>
              extraPadding
            </label>
          </div>

          {/* Rounded */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="checkbox"
              id="rounded"
              checked={rounded}
              onChange={(e) => setRounded(e.target.checked)}
              style={{
                width: '1rem',
                height: '1rem',
                cursor: 'pointer',
              }}
            />
            <label htmlFor="rounded" style={{ fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer' }}>
              rounded
            </label>
          </div>

          {/* IsLoading */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="checkbox"
              id="isLoading"
              checked={isLoading}
              onChange={(e) => setIsLoading(e.target.checked)}
              style={{
                width: '1rem',
                height: '1rem',
                cursor: 'pointer',
              }}
            />
            <label htmlFor="isLoading" style={{ fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer' }}>
              isLoading
            </label>
          </div>

          {/* Disabled */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="checkbox"
              id="disabled"
              checked={disabled}
              onChange={(e) => setDisabled(e.target.checked)}
              style={{
                width: '1rem',
                height: '1rem',
                cursor: 'pointer',
              }}
            />
            <label htmlFor="disabled" style={{ fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer' }}>
              disabled
            </label>
          </div>

          {/* DataTestId */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: '500' }}>data-test-id</label>
            <input
              type="text"
              value={dataTestId}
              onChange={(e) => setDataTestId(e.target.value)}
              placeholder="Button"
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

          {/* Children */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: '500' }}>children</label>
            <input
              type="text"
              value={children}
              onChange={(e) => setChildren(e.target.value)}
              placeholder="Button"
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
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
            <Button
              variant={variant}
              colorScheme={colorScheme}
              typography={typography}
              extraPadding={extraPadding}
              fullWidth={fullWidth}
              paddingSize={paddingSize}
              rounded={rounded}
              isLoading={isLoading}
              disabled={disabled}
              data-test-id={dataTestId || undefined}
            >
              {children}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}


