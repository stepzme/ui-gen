"use client"

import { useState } from "react"
import { Link } from "./link"
import type { Typography, ColorScheme } from "./link"
import { useTheme } from "@/hooks/use-theme"
import { Icon } from "@/imported/components/ui/icon"
import { Typography as TypographyComponent } from "@/imported/components/meta/typography"

export default function LinkDemo() {
  const { isDark, toggleTheme } = useTheme()
  
  const [href, setHref] = useState('https://example.com')
  const [target, setTarget] = useState('_blank')
  const [colorScheme, setColorScheme] = useState<ColorScheme>('brand')
  const [typography, setTypography] = useState<Typography>('bodyM')
  const [disabled, setDisabled] = useState(false)
  const [block, setBlock] = useState(false)
  const [children, setChildren] = useState('Link text')

  const COLOR_SCHEMES: ColorScheme[] = [
    'brand', 'success', 'info', 'warning', 'critical', 'primary', 'constant', 'draft'
  ]

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
              Link Component Demo
            </h1>
            <p style={{ margin: 0, color: 'var(--colors-text-secondary)' }}>
              Тестирование компонента Link с переключением всех пропсов
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
                Children (Text):
                <input
                  type="text"
                  value={children}
                  onChange={(e) => setChildren(e.target.value)}
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
                Href:
                <input
                  type="text"
                  value={href}
                  onChange={(e) => setHref(e.target.value)}
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
                Target:
                <select
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
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
                  <option value="_blank">_blank</option>
                  <option value="_self">_self</option>
                  <option value="_parent">_parent</option>
                  <option value="_top">_top</option>
                </select>
              </label>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>
                Color Scheme:
                <select
                  value={colorScheme}
                  onChange={(e) => setColorScheme(e.target.value as ColorScheme)}
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
                  {COLOR_SCHEMES.map(scheme => (
                    <option key={scheme} value={scheme}>{scheme}</option>
                  ))}
                </select>
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
                checked={block}
                onChange={(e) => setBlock(e.target.checked)}
                style={{
                  width: '1.25rem',
                  height: '1.25rem',
                  cursor: 'pointer',
                }}
              />
              <span style={{ fontSize: '0.875rem' }}>Block</span>
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
            <Link
              href={href || undefined}
              target={target}
              colorScheme={colorScheme}
              typography={typography}
              disabled={disabled}
              block={block}
            >
              {children}
            </Link>
          </div>

          {/* Basic Examples */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <TypographyComponent typography="bodyM_paragraph_normal">
              Basic Examples:
            </TypographyComponent>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Link href="https://example.com">Simple link</Link>
              <Link href="https://example.com" target="_blank">Link with target="_blank"</Link>
              <Link onClick={() => alert('Clicked!')}>Link with onClick</Link>
              <Link disabled>Disabled link</Link>
            </div>
          </div>

          {/* Color Schemes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <TypographyComponent typography="bodyM_paragraph_normal">
              Color Schemes:
            </TypographyComponent>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {COLOR_SCHEMES.map(scheme => (
                <Link key={scheme} href="#" colorScheme={scheme}>
                  {scheme.charAt(0).toUpperCase() + scheme.slice(1)} link
                </Link>
              ))}
            </div>
          </div>

          {/* Typography Sizes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <TypographyComponent typography="bodyM_paragraph_normal">
              Typography Sizes:
            </TypographyComponent>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Link href="#" typography="bodyS">Small link (bodyS)</Link>
              <Link href="#" typography="bodyM">Medium link (bodyM)</Link>
              <Link href="#" typography="bodyL">Large link (bodyL)</Link>
            </div>
          </div>

          {/* With Icons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <TypographyComponent typography="bodyM_paragraph_normal">
              With Icons:
            </TypographyComponent>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Link href="#">
                <Icon icon="arrow-right" />
                Link with icon on left
              </Link>
              <Link href="#">
                Link with icon on right
                <Icon icon="arrow-right" />
              </Link>
              <Link href="#">
                <Icon icon="external-link" />
                External link
                <Icon icon="arrow-right" />
              </Link>
            </div>
          </div>

          {/* Block Display */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <TypographyComponent typography="bodyM_paragraph_normal">
              Block Display:
            </TypographyComponent>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Link href="#" block>
                Block link (takes full width)
              </Link>
              <Link href="#" block>
                <Icon icon="arrow-right" />
                Block link with icon
              </Link>
            </div>
          </div>

          {/* In Text */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <TypographyComponent typography="bodyM_paragraph_normal">
              In Text Context:
            </TypographyComponent>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <TypographyComponent typography="bodyM_paragraph_normal">
                This is a paragraph with a <Link href="#">link inside</Link> the text.
              </TypographyComponent>
              <TypographyComponent typography="bodyM_paragraph_normal">
                You can also have <Link href="#" colorScheme="success">colored links</Link> in text.
              </TypographyComponent>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

