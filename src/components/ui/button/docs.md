# Button Component
**Category:** Базовые

Кнопка — это основной интерактивный элемент интерфейса, который позволяет выполнять действия. Является ключевым компонентом для навигации, подтверждения операций и запуска процессов. Правильное использование кнопок критически важно для создания интуитивного пользовательского опыта и обеспечения доступности интерфейса.

## Features

- **Multiple variants**: Primary, secondary, tertiary, and text buttons
- **Semantic colors**: Default, accent, success, warning, info, critical
- **Size options**: Small, default, large, and icon buttons
- **Animations**: Smooth hover and tap animations with Framer Motion
- **Accessibility**: Full keyboard navigation and screen reader support
- **Flexible content**: Supports text, icons, and custom content

## Usage

```tsx
import { Button } from "@/components/button/button"

// Basic button
<Button>Click me</Button>

// Semantic button
<Button variant="primary" semantic="success">
  Save
</Button>

// Icon button
<Button size="icon" aria-label="Settings">
  <SettingsIcon />
</Button>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'tertiary' \| 'text'` | `'primary'` | Button style variant |
| `semantic` | `'default' \| 'accent' \| 'success' \| 'warning' \| 'info' \| 'critical'` | `'default'` | Semantic color variant |
| `size` | `'sm' \| 'default' \| 'lg' \| 'icon' \| 'icon-sm' \| 'icon-lg'` | `'default'` | Button size |
| `asChild` | `boolean` | `false` | Render as child component |
| `className` | `string` | - | Additional CSS classes |
| `disabled` | `boolean` | `false` | Disable the button |

## Variants

### Primary
High emphasis buttons for primary actions.

```tsx
<Button variant="primary">Primary Action</Button>
```

### Secondary
Medium emphasis buttons for secondary actions.

```tsx
<Button variant="secondary">Secondary Action</Button>
```

### Tertiary
Low emphasis buttons with outline style.

```tsx
<Button variant="tertiary">Tertiary Action</Button>
```

### Text
Minimal text-only buttons for subtle actions.

```tsx
<Button variant="text">Text Action</Button>
```

## Semantic Colors

### Default
```tsx
<Button semantic="default">Default</Button>
```

### Accent
```tsx
<Button semantic="accent">Accent</Button>
```

### Success
```tsx
<Button semantic="success">Success</Button>
```

### Warning
```tsx
<Button semantic="warning">Warning</Button>
```

### Info
```tsx
<Button semantic="info">Info</Button>
```

### Critical
```tsx
<Button semantic="critical">Critical</Button>
```

## Sizes

### Small
```tsx
<Button size="sm">Small Button</Button>
```

### Default
```tsx
<Button size="default">Default Button</Button>
```

### Large
```tsx
<Button size="lg">Large Button</Button>
```

### Icon Buttons
```tsx
<Button size="icon" aria-label="Settings">
  <SettingsIcon />
</Button>
```

## Examples

### With Icons
```tsx
<Button>
  <PlusIcon className="w-4 h-4" />
  Add Item
</Button>
```

### Loading State
```tsx
<Button disabled>
  <SpinnerIcon className="w-4 h-4 animate-spin" />
  Loading...
</Button>
```

### As Child Component
```tsx
<Button asChild>
  <Link href="/dashboard">Go to Dashboard</Link>
</Button>
```

## Accessibility

- Full keyboard navigation support
- Proper ARIA attributes
- Focus management
- Screen reader compatibility
- Color contrast compliance

## Animations

The button includes smooth animations powered by Framer Motion:

- **Hover**: Subtle scale effect
- **Tap**: Press animation for tactile feedback
- **Transitions**: Smooth color and state transitions

## Styling

The button uses CSS custom properties for theming:

- `--background-*` for background colors
- `--foreground-*` for text colors
- `--border-*` for border colors
- `--ring-*` for focus states

## Best Practices

1. Use primary buttons for main actions
2. Use secondary buttons for secondary actions
3. Use tertiary buttons for less important actions
4. Use text buttons for subtle actions
5. Provide clear labels for icon buttons
6. Use semantic colors to convey meaning
7. Ensure sufficient color contrast
8. Test with keyboard navigation
