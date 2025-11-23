"use client"

import { useState } from "react"
import { Card, type CardPaddingSize, type CardGapSize } from "./card"
import { useTheme } from "@/hooks/use-theme"
import { Button } from "@/imported/components/ui/button"
import { Icon } from "@/imported/components/ui/icon"
import { Typography } from "@/imported/components/meta/typography"
import { Avatar } from "@/imported/components/ui/avatar"

export default function CardDemo() {
  const { isDark, toggleTheme } = useTheme()
  
  const [variant, setVariant] = useState<'outlined' | 'filled' | 'tonned'>('outlined')
  const [paddingSize, setPaddingSize] = useState<'tiny' | 'small' | 'medium' | 'large' | 'huge'>('medium')
  const [gapSize, setGapSize] = useState<'tiny' | 'small' | 'medium' | 'large' | 'huge'>('medium')
  const [hasBorder, setHasBorder] = useState(false)
  const [clickable, setClickable] = useState(false)
  const [isHorizontal, setIsHorizontal] = useState(false)
  const [fullWidth, setFullWidth] = useState(false)

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
              Card Component Demo
            </h1>
            <p style={{ margin: 0, color: 'var(--colors-text-secondary)' }}>
              Тестирование компонента Card с переключением всех пропсов
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
                Variant:
                <select
                  value={variant}
                  onChange={(e) => setVariant(e.target.value as 'outlined' | 'filled' | 'tonned')}
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
                  <option value="outlined">Outlined</option>
                  <option value="filled">Filled</option>
                  <option value="tonned">Tonned</option>
                </select>
              </label>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>
                Padding Size:
                <select
                  value={paddingSize}
                  onChange={(e) => setPaddingSize(e.target.value as CardPaddingSize)}
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
                  <option value="tiny">Tiny</option>
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                  <option value="huge">Huge</option>
                </select>
              </label>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>
                Gap Size:
                <select
                  value={gapSize}
                  onChange={(e) => setGapSize(e.target.value as CardGapSize)}
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
                  <option value="tiny">Tiny</option>
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                  <option value="huge">Huge</option>
                </select>
              </label>
            </div>

            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={hasBorder}
                  onChange={(e) => setHasBorder(e.target.checked)}
                  style={{ cursor: 'pointer' }}
                />
                <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>Has Border</span>
              </label>
            </div>

            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={clickable}
                  onChange={(e) => setClickable(e.target.checked)}
                  style={{ cursor: 'pointer' }}
                />
                <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>Clickable</span>
              </label>
            </div>

            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={isHorizontal}
                  onChange={(e) => setIsHorizontal(e.target.checked)}
                  style={{ cursor: 'pointer' }}
                />
                <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>Horizontal</span>
              </label>
            </div>

            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={fullWidth}
                  onChange={(e) => setFullWidth(e.target.checked)}
                  style={{ cursor: 'pointer' }}
                />
                <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>Full Width</span>
              </label>
            </div>
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
          gap: '1.5rem'
        }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', margin: 0 }}>Examples</h2>
          
          {/* Current Configuration */}
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '1rem' }}>Current Configuration</h3>
            <Card
              variant={variant}
              paddingSize={paddingSize}
              gapSize={gapSize}
              hasBorder={hasBorder}
              clickable={clickable}
              isHorizontal={isHorizontal}
              fullWidth={fullWidth}
              onClick={clickable ? () => alert('Card clicked!') : undefined}
            >
              <Icon variant="card_rectangle_checkmark" />
              <Card.Content>
                <Card.Row>
                  <Typography typography="headlineS">Card Title</Typography>
                </Card.Row>
                <Card.Row>
                  <Typography typography="bodyM_paragraph_normal">
                    This is a card with current configuration settings.
                  </Typography>
                </Card.Row>
              </Card.Content>
            </Card>
          </div>

          {/* Variants */}
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '1rem' }}>Variants</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <Card variant="outlined" hasBorder>
                <Card.Content>
                  <Typography typography="headlineS">Outlined</Typography>
                  <Typography typography="bodyM_paragraph_normal" style={{ marginTop: '0.5rem' }}>
                    Card with border
                  </Typography>
                </Card.Content>
              </Card>
              <Card variant="filled">
                <Card.Content>
                  <Typography typography="headlineS">Filled</Typography>
                  <Typography typography="bodyM_paragraph_normal" style={{ marginTop: '0.5rem' }}>
                    Card with background
                  </Typography>
                </Card.Content>
              </Card>
              <Card variant="tonned">
                <Card.Content>
                  <Typography typography="headlineS">Tonned</Typography>
                  <Typography typography="bodyM_paragraph_normal" style={{ marginTop: '0.5rem' }}>
                    Card with toned background
                  </Typography>
                </Card.Content>
              </Card>
            </div>
          </div>

          {/* With Icon */}
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '1rem' }}>With Icon</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <Card hasBorder>
                <Card.IconContainer>
                  <Icon variant="card_rectangle_checkmark" />
                </Card.IconContainer>
                <Card.Content>
                  <Typography typography="headlineS">Card with Icon</Typography>
                  <Typography typography="bodyM_paragraph_normal" style={{ marginTop: '0.5rem' }}>
                    Icon on the left side
                  </Typography>
                </Card.Content>
              </Card>
            </div>
          </div>

          {/* Horizontal */}
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '1rem' }}>Horizontal Layout</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Card isHorizontal hasBorder>
                <Avatar src="" alt="User" />
                <Card.Content>
                  <Typography typography="headlineS">John Doe</Typography>
                  <Typography typography="bodyM_paragraph_normal" style={{ marginTop: '0.5rem' }}>
                    Software Developer
                  </Typography>
                </Card.Content>
              </Card>
            </div>
          </div>

          {/* Clickable */}
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '1rem' }}>Clickable Cards</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <Card
                variant="outlined"
                hasBorder
                clickable
                onClick={() => alert('Card 1 clicked!')}
              >
                <Card.Content>
                  <Typography typography="headlineS">Clickable Card</Typography>
                  <Typography typography="bodyM_paragraph_normal" style={{ marginTop: '0.5rem' }}>
                    Click me!
                  </Typography>
                </Card.Content>
              </Card>
            </div>
          </div>

          {/* Padding Sizes */}
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '1rem' }}>Padding Sizes</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <Card variant="outlined" hasBorder paddingSize="tiny">
                <Typography typography="bodyM_paragraph_normal">Tiny padding</Typography>
              </Card>
              <Card variant="outlined" hasBorder paddingSize="small">
                <Typography typography="bodyM_paragraph_normal">Small padding</Typography>
              </Card>
              <Card variant="outlined" hasBorder paddingSize="medium">
                <Typography typography="bodyM_paragraph_normal">Medium padding</Typography>
              </Card>
              <Card variant="outlined" hasBorder paddingSize="large">
                <Typography typography="bodyM_paragraph_normal">Large padding</Typography>
              </Card>
              <Card variant="outlined" hasBorder paddingSize="huge">
                <Typography typography="bodyM_paragraph_normal">Huge padding</Typography>
              </Card>
            </div>
          </div>

          {/* Full Width */}
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '1rem' }}>Full Width</h3>
            <Card variant="outlined" hasBorder fullWidth>
              <Card.Content>
                <Typography typography="headlineS">Full Width Card</Typography>
                <Typography typography="bodyM_paragraph_normal" style={{ marginTop: '0.5rem' }}>
                  This card takes full width of its container
                </Typography>
              </Card.Content>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

