"use client"

import { useState } from "react"
import { Badge } from "./badge"
import type { BadgeTypography, BadgeIconPosition } from "./badge"
import { useTheme } from "@/hooks/use-theme"
import { Icon } from "@/imported/components/ui/icon"

export default function BadgeDemo() {
  const { isDark, toggleTheme } = useTheme()
  
  const [typography, setTypography] = useState<BadgeTypography>('bodyM')
  const [iconPosition, setIconPosition] = useState<BadgeIconPosition>('left')
  const [rounded, setRounded] = useState(false)
  const [hasIcon, setHasIcon] = useState(false)
  const [children, setChildren] = useState('Badge')

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
              Badge Component Demo
            </h1>
            <p style={{ margin: 0, color: 'var(--colors-text-secondary)' }}>
              Тестирование компонента Badge с переключением всех пропсов
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
          padding: '1.5rem', 
          backgroundColor: 'var(--colors-background1-primary)', 
          borderRadius: '0.5rem',
          border: '1px solid var(--colors-elevation0-borderNormal)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <h2 style={{ margin: 0, fontSize: '1.5rem' }}>Controls</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: '500' }}>Typography</label>
            <select
              value={typography}
              onChange={(e) => setTypography(e.target.value as BadgeTypography)}
              style={{
                padding: '0.5rem',
                borderRadius: '0.375rem',
                border: '1px solid var(--colors-elevation0-borderNormal)',
                backgroundColor: 'var(--colors-background0-primary)',
                color: 'var(--colors-text-primary)'
              }}
            >
              <option value="bodyS">bodyS</option>
              <option value="bodyM">bodyM</option>
              <option value="bodyL">bodyL</option>
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: '500' }}>Icon Position</label>
            <select
              value={iconPosition}
              onChange={(e) => setIconPosition(e.target.value as BadgeIconPosition)}
              style={{
                padding: '0.5rem',
                borderRadius: '0.375rem',
                border: '1px solid var(--colors-elevation0-borderNormal)',
                backgroundColor: 'var(--colors-background0-primary)',
                color: 'var(--colors-text-primary)'
              }}
            >
              <option value="left">left</option>
              <option value="right">right</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="checkbox"
              id="rounded"
              checked={rounded}
              onChange={(e) => setRounded(e.target.checked)}
            />
            <label htmlFor="rounded" style={{ fontSize: '0.875rem', fontWeight: '500' }}>Rounded</label>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="checkbox"
              id="hasIcon"
              checked={hasIcon}
              onChange={(e) => setHasIcon(e.target.checked)}
            />
            <label htmlFor="hasIcon" style={{ fontSize: '0.875rem', fontWeight: '500' }}>Has Icon</label>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: '500' }}>Children</label>
            <input
              type="text"
              value={children}
              onChange={(e) => setChildren(e.target.value)}
              style={{
                padding: '0.5rem',
                borderRadius: '0.375rem',
                border: '1px solid var(--colors-elevation0-borderNormal)',
                backgroundColor: 'var(--colors-background0-primary)',
                color: 'var(--colors-text-primary)'
              }}
            />
          </div>
        </div>

        {/* Examples */}
        <div style={{ 
          padding: '1.5rem', 
          backgroundColor: 'var(--colors-background1-primary)', 
          borderRadius: '0.5rem',
          border: '1px solid var(--colors-elevation0-borderNormal)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}>
          <h2 style={{ margin: 0, fontSize: '1.5rem' }}>Examples</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <h3 style={{ margin: 0, marginBottom: '0.5rem', fontSize: '1rem' }}>Current Configuration</h3>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <Badge
                  typography={typography}
                  iconPosition={iconPosition}
                  rounded={rounded}
                >
                  {hasIcon && iconPosition === 'left' && <Icon variant="check" />}
                  {children}
                  {hasIcon && iconPosition === 'right' && <Icon variant="check" />}
                </Badge>
              </div>
            </div>

            <div>
              <h3 style={{ margin: 0, marginBottom: '0.5rem', fontSize: '1rem' }}>Typography Variants</h3>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <Badge typography="bodyS">bodyS</Badge>
                <Badge typography="bodyM">bodyM</Badge>
                <Badge typography="bodyL">bodyL</Badge>
              </div>
            </div>

            <div>
              <h3 style={{ margin: 0, marginBottom: '0.5rem', fontSize: '1rem' }}>With Icons</h3>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <Badge iconPosition="left">
                  <Icon variant="check" />
                  Left Icon
                </Badge>
                <Badge iconPosition="right">
                  Right Icon
                  <Icon variant="check" />
                </Badge>
              </div>
            </div>

            <div>
              <h3 style={{ margin: 0, marginBottom: '0.5rem', fontSize: '1rem' }}>Rounded</h3>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <Badge rounded={false}>Not Rounded</Badge>
                <Badge rounded={true}>Rounded</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

