"use client"

import { useState } from "react"
import { Tooltip } from "./tooltip"
import type { Typography } from "./tooltip"
import { useTheme } from "@/hooks/use-theme"
import { Typography as TypographyComponent } from "@/imported/components/meta/typography"
import { Button } from "@/imported/components/ui/button"
import { Icon } from "@/imported/components/ui/icon"

export default function TooltipDemo() {
  const { isDark, toggleTheme } = useTheme()
  
  const [content, setContent] = useState('Это текст тултипа')
  const [typography, setTypography] = useState<Typography>('bodyM')
  const [side, setSide] = useState<'top' | 'right' | 'bottom' | 'left'>('top')
  const [align, setAlign] = useState<'start' | 'center' | 'end'>('center')
  const [delayDuration, setDelayDuration] = useState(0)
  const [disabled, setDisabled] = useState(false)
  const [open, setOpen] = useState<boolean | undefined>(undefined)

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
              Tooltip Component Demo
            </h1>
            <p style={{ margin: 0, color: 'var(--colors-text-secondary)' }}>
              Тестирование компонента Tooltip с переключением всех пропсов
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
                Content:
                <input
                  type="text"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
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

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>
                Side:
                <select
                  value={side}
                  onChange={(e) => setSide(e.target.value as 'top' | 'right' | 'bottom' | 'left')}
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
                  <option value="top">top</option>
                  <option value="right">right</option>
                  <option value="bottom">bottom</option>
                  <option value="left">left</option>
                </select>
              </label>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>
                Align:
                <select
                  value={align}
                  onChange={(e) => setAlign(e.target.value as 'start' | 'center' | 'end')}
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
                  <option value="start">start</option>
                  <option value="center">center</option>
                  <option value="end">end</option>
                </select>
              </label>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>
                Delay Duration (ms):
                <input
                  type="number"
                  min="0"
                  max="5000"
                  step="100"
                  value={delayDuration}
                  onChange={(e) => setDelayDuration(Number(e.target.value))}
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
                onChange={(e) => {
                  setDisabled(e.target.checked)
                  if (e.target.checked) setOpen(undefined)
                }}
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
                checked={open !== undefined}
                onChange={(e) => setOpen(e.target.checked ? true : undefined)}
                disabled={disabled}
                style={{
                  width: '1.25rem',
                  height: '1.25rem',
                  cursor: 'pointer',
                }}
              />
              <span style={{ fontSize: '0.875rem' }}>Force Open</span>
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
            <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
              <Tooltip
                content={content}
                typography={typography}
                side={side}
                align={align}
                delayDuration={delayDuration}
                disabled={disabled}
                open={open}
              >
                <Button>Hover me</Button>
              </Tooltip>
            </div>
          </div>

          {/* Basic Examples */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <TypographyComponent typography="bodyM_paragraph_normal">
              Basic Examples:
            </TypographyComponent>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', padding: '2rem' }}>
              <Tooltip content="Это простой тултип">
                <Button>Hover me</Button>
              </Tooltip>
              
              <Tooltip content="Тултип с длинным текстом, который может занимать несколько строк">
                <Button>Long text</Button>
              </Tooltip>
              
              <Tooltip content="Тултип с иконкой" disabled={disabled}>
                <Button>
                  <Icon icon="bell" />
                </Button>
              </Tooltip>
            </div>
          </div>

          {/* Typography Sizes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <TypographyComponent typography="bodyM_paragraph_normal">
              Typography Sizes:
            </TypographyComponent>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', padding: '2rem' }}>
              <Tooltip content="Small tooltip" typography="bodyS">
                <Button>Small</Button>
              </Tooltip>
              
              <Tooltip content="Medium tooltip" typography="bodyM">
                <Button>Medium</Button>
              </Tooltip>
              
              <Tooltip content="Large tooltip" typography="bodyL">
                <Button>Large</Button>
              </Tooltip>
            </div>
          </div>

          {/* Positions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <TypographyComponent typography="bodyM_paragraph_normal">
              Positions:
            </TypographyComponent>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(3, 1fr)', 
              gap: '2rem', 
              padding: '4rem',
              placeItems: 'center'
            }}>
              <Tooltip content="Top" side="top">
                <Button>Top</Button>
              </Tooltip>
              
              <Tooltip content="Top Start" side="top" align="start">
                <Button>Top Start</Button>
              </Tooltip>
              
              <Tooltip content="Top End" side="top" align="end">
                <Button>Top End</Button>
              </Tooltip>
              
              <Tooltip content="Left" side="left">
                <Button>Left</Button>
              </Tooltip>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <TypographyComponent typography="bodyS_paragraph_normal" css={{ color: 'var(--colors-text-secondary)' }}>
                  Center
                </TypographyComponent>
              </div>
              
              <Tooltip content="Right" side="right">
                <Button>Right</Button>
              </Tooltip>
              
              <Tooltip content="Bottom End" side="bottom" align="end">
                <Button>Bottom End</Button>
              </Tooltip>
              
              <Tooltip content="Bottom" side="bottom">
                <Button>Bottom</Button>
              </Tooltip>
              
              <Tooltip content="Bottom Start" side="bottom" align="start">
                <Button>Bottom Start</Button>
              </Tooltip>
            </div>
          </div>

          {/* With Delay */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <TypographyComponent typography="bodyM_paragraph_normal">
              With Delay:
            </TypographyComponent>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', padding: '2rem' }}>
              <Tooltip content="No delay" delayDuration={0}>
                <Button>No delay</Button>
              </Tooltip>
              
              <Tooltip content="500ms delay" delayDuration={500}>
                <Button>500ms delay</Button>
              </Tooltip>
              
              <Tooltip content="1000ms delay" delayDuration={1000}>
                <Button>1000ms delay</Button>
              </Tooltip>
            </div>
          </div>

          {/* With Rich Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <TypographyComponent typography="bodyM_paragraph_normal">
              With Rich Content:
            </TypographyComponent>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', padding: '2rem' }}>
              <Tooltip 
                content={
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <TypographyComponent typography="bodyM_paragraph_normal" css={{ fontWeight: 'bold' }}>
                      Заголовок
                    </TypographyComponent>
                    <TypographyComponent typography="bodyS_paragraph_normal">
                      Описание тултипа
                    </TypographyComponent>
                  </div>
                }
              >
                <Button>Rich content</Button>
              </Tooltip>
              
              <Tooltip 
                content={
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Icon icon="bell" />
                    <span>Тултип с иконкой</span>
                  </div>
                }
              >
                <Button>With icon</Button>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

