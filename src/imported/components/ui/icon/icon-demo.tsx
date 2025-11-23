"use client"

import { useState } from "react"
import { Icon, getRegisteredIcons } from "./icon"
import { useTheme } from "@/hooks/use-theme"

export default function IconDemo() {
  const { isDark, toggleTheme } = useTheme()
  const [variant, setVariant] = useState("check")
  const [semantic, setSemantic] = useState<"default" | "accent" | "success" | "warning" | "info" | "critical">("default")
  const [container, setContainer] = useState(false)
  
  const availableIcons = getRegisteredIcons()
  const iconList = availableIcons.length > 0 ? availableIcons : ["check", "cross", "arrow-up", "arrow-down", "plus", "minus"]

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
              Icon Component Demo
            </h1>
            <p style={{ margin: 0, color: 'var(--colors-text-secondary)' }}>
              Тестирование компонента Icon с переключением всех пропсов
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
            <label style={{ fontSize: '0.875rem', fontWeight: '500' }}>Icon Variant</label>
            <input
              type="text"
              value={variant}
              onChange={(e) => setVariant(e.target.value)}
              placeholder="Enter icon name"
              style={{
                padding: '0.5rem',
                borderRadius: '0.375rem',
                border: '1px solid var(--colors-elevation0-borderNormal)',
                backgroundColor: 'var(--colors-background0-primary)',
                color: 'var(--colors-text-primary)'
              }}
            />
            {availableIcons.length > 0 && (
              <select
                value={variant}
                onChange={(e) => setVariant(e.target.value)}
                style={{
                  padding: '0.5rem',
                  borderRadius: '0.375rem',
                  border: '1px solid var(--colors-elevation0-borderNormal)',
                  backgroundColor: 'var(--colors-background0-primary)',
                  color: 'var(--colors-text-primary)'
                }}
              >
                {iconList.slice(0, 20).map((icon) => (
                  <option key={icon} value={icon}>{icon}</option>
                ))}
              </select>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: '500' }}>Semantic</label>
            <select
              value={semantic}
              onChange={(e) => setSemantic(e.target.value as typeof semantic)}
              style={{
                padding: '0.5rem',
                borderRadius: '0.375rem',
                border: '1px solid var(--colors-elevation0-borderNormal)',
                backgroundColor: 'var(--colors-background0-primary)',
                color: 'var(--colors-text-primary)'
              }}
            >
              <option value="default">default</option>
              <option value="accent">accent</option>
              <option value="success">success</option>
              <option value="warning">warning</option>
              <option value="info">info</option>
              <option value="critical">critical</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="checkbox"
              id="container"
              checked={container}
              onChange={(e) => setContainer(e.target.checked)}
            />
            <label htmlFor="container" style={{ fontSize: '0.875rem', fontWeight: '500' }}>Container</label>
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
                <div style={{ fontSize: '2rem' }}>
                  <Icon variant={variant} semantic={semantic} container={container} />
                </div>
              </div>
            </div>

            <div>
              <h3 style={{ margin: 0, marginBottom: '0.5rem', fontSize: '1rem' }}>Semantic Variants</h3>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ fontSize: '2rem' }}>
                  <Icon variant={variant} semantic="default" />
                </div>
                <div style={{ fontSize: '2rem' }}>
                  <Icon variant={variant} semantic="accent" />
                </div>
                <div style={{ fontSize: '2rem' }}>
                  <Icon variant={variant} semantic="success" />
                </div>
                <div style={{ fontSize: '2rem' }}>
                  <Icon variant={variant} semantic="warning" />
                </div>
                <div style={{ fontSize: '2rem' }}>
                  <Icon variant={variant} semantic="info" />
                </div>
                <div style={{ fontSize: '2rem' }}>
                  <Icon variant={variant} semantic="critical" />
                </div>
              </div>
            </div>

            <div>
              <h3 style={{ margin: 0, marginBottom: '0.5rem', fontSize: '1rem' }}>With Container</h3>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <Icon variant={variant} semantic="default" container={false} />
                <Icon variant={variant} semantic="default" container={true} />
                <Icon variant={variant} semantic="accent" container={true} />
                <Icon variant={variant} semantic="success" container={true} />
                <Icon variant={variant} semantic="warning" container={true} />
                <Icon variant={variant} semantic="info" container={true} />
                <Icon variant={variant} semantic="critical" container={true} />
              </div>
            </div>

            <div>
              <h3 style={{ margin: 0, marginBottom: '0.5rem', fontSize: '1rem' }}>Different Sizes</h3>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ fontSize: '1rem' }}>
                  <Icon variant={variant} semantic={semantic} />
                </div>
                <div style={{ fontSize: '1.5rem' }}>
                  <Icon variant={variant} semantic={semantic} />
                </div>
                <div style={{ fontSize: '2rem' }}>
                  <Icon variant={variant} semantic={semantic} />
                </div>
                <div style={{ fontSize: '3rem' }}>
                  <Icon variant={variant} semantic={semantic} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
