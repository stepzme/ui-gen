"use client"

import { useState } from "react"
import { Dropdown } from "./dropdown"
import { useTheme } from "@/hooks/use-theme"
import { Button } from "@/imported/components/ui/button"
import { Icon } from "@/imported/components/ui/icon"
import { Typography } from "@/imported/components/meta/typography"

export default function DropdownDemo() {
  const { isDark, toggleTheme } = useTheme()
  
  const [isOpen1, setIsOpen1] = useState(false)
  const [isOpen2, setIsOpen2] = useState(false)
  const [isOpen3, setIsOpen3] = useState(false)
  const [isOpen4, setIsOpen4] = useState(false)
  const [isOpen5, setIsOpen5] = useState(false)
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [placement, setPlacement] = useState<'bottom' | 'top' | 'left' | 'right'>('bottom')
  const [grow, setGrow] = useState(false)

  const menuItems = [
    { id: '1', label: 'Пункт меню 1', icon: 'gear' },
    { id: '2', label: 'Пункт меню 2', icon: 'person' },
    { id: '3', label: 'Пункт меню 3', icon: 'folder' },
    { id: '4', label: 'Пункт меню 4', disabled: true },
    { id: '5', label: 'Пункт меню 5', icon: 'trashbox_cross' },
  ]

  const handleItemClick = (id: string) => {
    setSelectedItem(id)
    setIsOpen1(false)
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
              Dropdown Component Demo
            </h1>
            <p style={{ margin: 0, color: 'var(--colors-text-secondary)' }}>
              Тестирование компонента Dropdown с переключением всех пропсов
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
                Placement:
                <select
                  value={placement}
                  onChange={(e) => setPlacement(e.target.value as 'bottom' | 'top' | 'left' | 'right')}
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
                  <option value="bottom">Bottom</option>
                  <option value="top">Top</option>
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                </select>
              </label>
            </div>

            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={grow}
                  onChange={(e) => setGrow(e.target.checked)}
                  style={{ cursor: 'pointer' }}
                />
                <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>Grow (stretch to trigger width)</span>
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
          
          {/* Basic Dropdown */}
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '1rem' }}>Basic Dropdown</h3>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Dropdown
                isOpen={isOpen1}
                onClose={() => setIsOpen1(false)}
                placement={placement}
                grow={grow}
                content={
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    {menuItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => !item.disabled && handleItemClick(item.id)}
                        disabled={item.disabled}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.5rem 0.75rem',
                          borderRadius: '0.375rem',
                          border: 'none',
                          background: selectedItem === item.id 
                            ? 'var(--semantic-brand-12)' 
                            : 'transparent',
                          color: 'var(--colors-text-primary)',
                          cursor: item.disabled ? 'not-allowed' : 'pointer',
                          opacity: item.disabled ? 0.5 : 1,
                          fontSize: '0.875rem',
                          textAlign: 'left',
                          width: '100%',
                          transition: 'background-color 0.2s',
                        }}
                        onMouseEnter={(e) => {
                          if (!item.disabled) {
                            e.currentTarget.style.backgroundColor = 'var(--semantic-neutral-8)'
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 
                            selectedItem === item.id 
                              ? 'var(--semantic-brand-12)' 
                              : 'transparent'
                        }}
                      >
                        {item.icon && <Icon variant={item.icon} />}
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                }
              >
                <Button
                  onClick={() => setIsOpen1(!isOpen1)}
                  variant="primary"
                  semantic="default"
                >
                  {selectedItem ? `Selected: ${menuItems.find(i => i.id === selectedItem)?.label}` : 'Open Dropdown'}
                </Button>
              </Dropdown>
            </div>
          </div>

          {/* With Footer */}
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '1rem' }}>With Footer</h3>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Dropdown
                isOpen={isOpen2}
                onClose={() => setIsOpen2(false)}
                placement="bottom"
                content={
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    {menuItems.slice(0, 3).map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setIsOpen2(false)}
                        style={{
                          padding: '0.5rem 0.75rem',
                          borderRadius: '0.375rem',
                          border: 'none',
                          background: 'transparent',
                          color: 'var(--colors-text-primary)',
                          cursor: 'pointer',
                          fontSize: '0.875rem',
                          textAlign: 'left',
                          width: '100%',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'var(--semantic-neutral-8)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent'
                        }}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                }
                footer={
                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                    <Button
                      variant="secondary"
                      semantic="default"
                      size="sm"
                      onClick={() => setIsOpen2(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      semantic="default"
                      size="sm"
                      onClick={() => setIsOpen2(false)}
                    >
                      Apply
                    </Button>
                  </div>
                }
              >
                <Button
                  onClick={() => setIsOpen2(!isOpen2)}
                  variant="primary"
                  semantic="default"
                >
                  Dropdown with Footer
                </Button>
              </Dropdown>
            </div>
          </div>

          {/* Different Placements */}
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '1rem' }}>Different Placements</h3>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <Dropdown
                isOpen={isOpen3}
                onClose={() => setIsOpen3(false)}
                placement="bottom"
                content={
                  <div style={{ padding: '0.5rem' }}>
                    <Typography typography="bodyM_paragraph_normal">Bottom placement</Typography>
                  </div>
                }
              >
                <Button
                  onClick={() => setIsOpen3(!isOpen3)}
                  variant="secondary"
                  semantic="default"
                >
                  Bottom
                </Button>
              </Dropdown>

              <Dropdown
                isOpen={isOpen4}
                onClose={() => setIsOpen4(false)}
                placement="top"
                content={
                  <div style={{ padding: '0.5rem' }}>
                    <Typography typography="bodyM_paragraph_normal">Top placement</Typography>
                  </div>
                }
              >
                <Button
                  onClick={() => setIsOpen4(!isOpen4)}
                  variant="secondary"
                  semantic="default"
                >
                  Top
                </Button>
              </Dropdown>
            </div>
          </div>

          {/* With Icons */}
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '1rem' }}>With Icons</h3>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Dropdown
                isOpen={isOpen5}
                onClose={() => setIsOpen5(false)}
                placement="bottom"
                content={
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    {menuItems.filter(i => i.icon).map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setIsOpen5(false)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.5rem 0.75rem',
                          borderRadius: '0.375rem',
                          border: 'none',
                          background: 'transparent',
                          color: 'var(--colors-text-primary)',
                          cursor: 'pointer',
                          fontSize: '0.875rem',
                          textAlign: 'left',
                          width: '100%',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'var(--semantic-neutral-8)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent'
                        }}
                      >
                        <Icon variant={item.icon!} />
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                }
              >
                <Button
                  onClick={() => setIsOpen5(!isOpen5)}
                  variant="primary"
                  semantic="default"
                >
                  Menu with Icons
                </Button>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

