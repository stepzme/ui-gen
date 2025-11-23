# Шаблон демо-страницы для компонентов

Этот файл служит шаблоном для создания демо-страниц для всех компонентов.

## Структура

Демо-страница должна находиться в папке компонента с именем `{component-name}-demo.tsx`

Например:
- `src/components/ui/avatar/avatar-demo.tsx`
- `src/components/ui/button/button-demo.tsx`
- `src/components/ui/badge/badge-demo.tsx`

## Роутинг

Демо-страницы доступны по адресу: `/demo/{component-name}`

Например:
- `/demo/avatar` → `src/components/ui/avatar/avatar-demo.tsx`
- `/demo/button` → `src/components/ui/button/button-demo.tsx`
- `/demo/badge` → `src/components/ui/badge/badge-demo.tsx`

**Важно:** После создания демо-страницы нужно добавить её в `src/app/demo/[component]/page.tsx` в функцию `loadDemoComponent`:

```tsx
case 'your-component':
  return (await import("@/components/ui/your-component/your-component-demo")).default
```

## Основные принципы

1. **Использовать только базовые HTML контролы** - не использовать наши компоненты, так как они могут быть нестабильны
2. **Импорт компонента** - использовать относительный импорт `./{component-name}`
3. **Название компонента** - `{ComponentName}Demo` (например, `AvatarDemo`)
4. **Переключатель темы** - обязательно добавлять переключатель темы в header используя хук `useTheme`
5. **Структура страницы**:
   - Заголовок с названием компонента и переключателем темы
   - Две колонки: контролы слева, предпросмотр справа
   - Контролы для всех пропсов компонента
   - Основной предпросмотр
   - Генерация кода компонента
   - Дополнительные примеры (разные размеры, варианты и т.д.)

## Базовый шаблон

```tsx
"use client"

import { useState } from "react"
import { ComponentName, type ComponentProps } from "./component-name"
import { useTheme } from "@/hooks/use-theme"

export default function ComponentNameDemo() {
  const { isDark, toggleTheme } = useTheme()
  // Состояния для всех пропсов
  const [prop1, setProp1] = useState("defaultValue")
  const [prop2, setProp2] = useState("defaultValue")
  // ... другие пропсы

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
              ComponentName Component Demo
            </h1>
            <p style={{ margin: 0, color: 'var(--colors-text-secondary)' }}>
              Тестирование компонента ComponentName с переключением всех пропсов
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

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
          {/* Controls Panel */}
          <div 
            style={{ 
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              padding: '1.5rem',
              borderRadius: '0.5rem',
              backgroundColor: 'var(--colors-background1-primary)',
              border: '1px solid var(--colors-elevation0-borderNormal)'
            }}
          >
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>Контролы</h2>

            {/* Контролы для каждого пропса */}
            {/* ... */}
          </div>

          {/* Preview Panel */}
          <div 
            style={{ 
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              padding: '1.5rem',
              borderRadius: '0.5rem',
              backgroundColor: 'var(--colors-background1-primary)',
              border: '1px solid var(--colors-elevation0-borderNormal)'
            }}
          >
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>Предпросмотр</h2>

            {/* Основной предпросмотр */}
            {/* ... */}

            {/* Генерация кода */}
            {/* ... */}

            {/* Дополнительные примеры */}
            {/* ... */}
          </div>
        </div>
      </div>
    </div>
  )
}
```

## Стили для контролов

### Input
```tsx
<input
  type="text"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  style={{
    padding: '0.5rem 0.75rem',
    borderRadius: '0.375rem',
    border: '1px solid var(--colors-elevation0-borderNormal)',
    backgroundColor: 'var(--colors-background0-primary)',
    color: 'var(--colors-text-primary)',
    fontSize: '0.875rem',
    outline: 'none',
  }}
/>
```

### Select
```tsx
<select
  value={value}
  onChange={(e) => setValue(e.target.value)}
  style={{
    padding: '0.5rem 0.75rem',
    borderRadius: '0.375rem',
    border: '1px solid var(--colors-elevation0-borderNormal)',
    backgroundColor: 'var(--colors-background0-primary)',
    color: 'var(--colors-text-primary)',
    fontSize: '0.875rem',
    outline: 'none',
    cursor: 'pointer',
  }}
>
  {options.map((option) => (
    <option key={option} value={option}>
      {option}
    </option>
  ))}
</select>
```

### Checkbox
```tsx
<input
  type="checkbox"
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
  style={{
    width: '1.25rem',
    height: '1.25rem',
    cursor: 'pointer',
  }}
/>
```

### Theme Toggle Button
```tsx
import { useTheme } from "@/hooks/use-theme"

const { isDark, toggleTheme } = useTheme()

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
```

## Пример использования

Смотрите `src/components/ui/avatar/avatar-demo.tsx` как референсную реализацию.

## Добавление нового компонента

1. Создайте `{component-name}-demo.tsx` в папке компонента
2. Добавьте case в `src/app/demo/[component]/page.tsx`:
   ```tsx
   case 'your-component':
     return (await import("@/components/ui/your-component/your-component-demo")).default
   ```
3. Демо будет доступно по адресу `/demo/your-component`
