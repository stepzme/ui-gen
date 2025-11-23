"use client"

import { useState } from "react"
import { Chip } from "./chip"
import { useTheme } from "@/hooks/use-theme"
import { Icon } from "@/imported/components/ui/icon"
import { Avatar } from "@/imported/components/ui/avatar"

export default function ChipDemo() {
  const { isDark, toggleTheme } = useTheme()
  
  const [variant, setVariant] = useState<'filled' | 'outlined'>('filled')
  const [selected, setSelected] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [removable, setRemovable] = useState(false)
  const [hasIcon, setHasIcon] = useState(false)
  const [hasAvatar, setHasAvatar] = useState(false)
  const [counter, setCounter] = useState<number | undefined>(undefined)
  const [rounded, setRounded] = useState(false)
  const [typography, setTypography] = useState<'bodyS' | 'bodyM' | 'bodyL'>('bodyM')
  const [text, setText] = useState('Chip')

  const handleRemove = () => {
    alert('Chip removed!')
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
              Chip Component Demo
            </h1>
            <p style={{ margin: 0, color: 'var(--colors-text-secondary)' }}>
              Тестирование компонента Chip с переключением всех пропсов
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
                Text:
                <input
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
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
                Variant:
                <select
                  value={variant}
                  onChange={(e) => setVariant(e.target.value as 'filled' | 'outlined')}
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
                  <option value="filled">Filled</option>
                  <option value="outlined">Outlined</option>
                </select>
              </label>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>
                Typography:
                <select
                  value={typography}
                  onChange={(e) => setTypography(e.target.value as 'bodyS' | 'bodyM' | 'bodyL')}
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
                  <option value="bodyS">Body S</option>
                  <option value="bodyM">Body M</option>
                  <option value="bodyL">Body L</option>
                </select>
              </label>
            </div>

            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={selected}
                  onChange={(e) => setSelected(e.target.checked)}
                  style={{ cursor: 'pointer' }}
                />
                <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>Selected</span>
              </label>
            </div>

            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={disabled}
                  onChange={(e) => setDisabled(e.target.checked)}
                  style={{ cursor: 'pointer' }}
                />
                <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>Disabled</span>
              </label>
            </div>

            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={removable}
                  onChange={(e) => setRemovable(e.target.checked)}
                  style={{ cursor: 'pointer' }}
                />
                <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>Removable</span>
              </label>
            </div>

            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={hasIcon}
                  onChange={(e) => setHasIcon(e.target.checked)}
                  style={{ cursor: 'pointer' }}
                />
                <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>With Icon</span>
              </label>
            </div>

            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={hasAvatar}
                  onChange={(e) => setHasAvatar(e.target.checked)}
                  style={{ cursor: 'pointer' }}
                />
                <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>With Avatar</span>
              </label>
            </div>

            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={rounded}
                  onChange={(e) => setRounded(e.target.checked)}
                  style={{ cursor: 'pointer' }}
                />
                <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>Rounded</span>
              </label>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>
                Counter (leave empty to hide):
                <input
                  type="number"
                  value={counter ?? ''}
                  onChange={(e) => setCounter(e.target.value ? parseInt(e.target.value) : undefined)}
                  min="0"
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
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              <Chip
                variant={variant}
                selected={selected}
                disabled={disabled}
                removable={removable}
                icon={hasIcon ? <Icon variant="label" /> : undefined}
                avatar={hasAvatar ? <Avatar src="" alt="User" /> : undefined}
                counter={counter}
                rounded={rounded}
                typography={typography}
                onRemove={handleRemove}
                onClick={() => setSelected(!selected)}
              >
                {text}
              </Chip>
            </div>
          </div>

          {/* Variants */}
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '1rem' }}>Variants</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              <Chip variant="filled">Filled</Chip>
              <Chip variant="outlined">Outlined</Chip>
              <Chip variant="filled" selected>Filled Selected</Chip>
              <Chip variant="outlined" selected>Outlined Selected</Chip>
            </div>
          </div>

          {/* With Icons */}
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '1rem' }}>With Icons</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              <Chip icon={<Icon variant="label" />}>Tag</Chip>
              <Chip icon={<Icon variant="funnel" />}>Filter</Chip>
              <Chip icon={<Icon variant="person" />} selected>User Selected</Chip>
            </div>
          </div>

          {/* With Avatar */}
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '1rem' }}>With Avatar</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              <Chip avatar={<Avatar src="" alt="User" />}>John Doe</Chip>
              <Chip avatar={<Avatar src="" alt="User" />} selected>Jane Smith</Chip>
            </div>
          </div>

          {/* With Counter */}
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '1rem' }}>With Counter</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              <Chip counter={5}>Notifications</Chip>
              <Chip counter={99}>Messages</Chip>
              <Chip counter={150}>Items</Chip>
              <Chip counter={5} selected>Selected</Chip>
            </div>
          </div>

          {/* Removable */}
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '1rem' }}>Removable</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              <Chip removable onRemove={handleRemove}>Removable</Chip>
              <Chip removable selected onRemove={handleRemove}>Removable Selected</Chip>
            </div>
          </div>

          {/* Rounded */}
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '1rem' }}>Rounded</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              <Chip rounded>Rounded</Chip>
              <Chip rounded selected>Rounded Selected</Chip>
              <Chip rounded removable onRemove={handleRemove}>Rounded Removable</Chip>
            </div>
          </div>

          {/* Disabled */}
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '1rem' }}>Disabled</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              <Chip disabled>Disabled</Chip>
              <Chip disabled selected>Disabled Selected</Chip>
              <Chip disabled removable>Disabled Removable</Chip>
            </div>
          </div>

          {/* Typography Sizes */}
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '1rem' }}>Typography Sizes</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
              <Chip typography="bodyS">Body S</Chip>
              <Chip typography="bodyM">Body M</Chip>
              <Chip typography="bodyL">Body L</Chip>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

