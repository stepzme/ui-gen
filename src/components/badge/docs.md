# Badge Component
**Category:** Базовые

Бейдж — это компактный элемент интерфейса, используемый для отображения статусов, меток и категорий. Компонент поддерживает семантические цвета и интерактивные состояния, что делает его универсальным инструментом для визуальной индикации информации и интерактивного выбора.

## Features

- **Semantic variants**: Default, accent, success, warning, info, critical
- **Active states**: Toggle between active and inactive states
- **Interactive mode**: Clickable badges with hover and focus states
- **Accessibility**: Full keyboard navigation support
- **Flexible content**: Supports text, icons, and custom content

## Usage

```tsx
import { Badge } from "@/components/badge/badge"

// Basic badge
<Badge>New</Badge>

// Semantic badge
<Badge semantic="success">Completed</Badge>

// Interactive badge
<Badge interactive onActiveChange={(active) => console.log(active)}>
  Toggle me
</Badge>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `semantic` | `'default' \| 'accent' \| 'success' \| 'warning' \| 'info' \| 'critical'` | `'default'` | Semantic color variant |
| `active` | `boolean` | `true` | Active state of the badge |
| `interactive` | `boolean` | `false` | Whether the badge is clickable |
| `onActiveChange` | `(active: boolean) => void` | - | Callback when active state changes |
| `asChild` | `boolean` | `false` | Render as child component |
| `className` | `string` | - | Additional CSS classes |
| `children` | `ReactNode` | - | Badge content |

## Semantic Colors

### Default
```tsx
<Badge semantic="default">Default</Badge>
```

### Accent
```tsx
<Badge semantic="accent">Accent</Badge>
```

### Success
```tsx
<Badge semantic="success">Success</Badge>
```

### Warning
```tsx
<Badge semantic="warning">Warning</Badge>
```

### Info
```tsx
<Badge semantic="info">Info</Badge>
```

### Critical
```tsx
<Badge semantic="critical">Critical</Badge>
```

## States

### Active
```tsx
<Badge active={true}>Active</Badge>
```

### Inactive
```tsx
<Badge active={false}>Inactive</Badge>
```

### Interactive

Interactive badges can be clicked to toggle their active state.

```tsx
<Badge 
  interactive 
  onActiveChange={(active) => console.log('Active:', active)}
>
  Click me
</Badge>
```

## Examples

### With Icons
```tsx
<Badge semantic="success">
  <CheckIcon className="w-3 h-3" />
  Verified
</Badge>
```

### As Filter Tag
```tsx
<Badge interactive semantic="accent" active={false}>
  Design
</Badge>
```

### As Status Indicator
```tsx
<Badge semantic="success" active={true}>
  Published
</Badge>
```

## Accessibility

- Interactive badges support keyboard navigation (Enter/Space)
- Proper ARIA roles and attributes
- Focus management for screen readers
- Color contrast meets WCAG guidelines
- Screen reader announcements for state changes

## Styling

The badge uses CSS custom properties for theming and supports all semantic color tokens:

- `--background-*` for background colors
- `--foreground-*` for text colors
- `--border-*` for border colors

## Best Practices

1. Use semantic variants to convey meaning
2. Keep badge text concise (1-2 words)
3. Use interactive badges for filters and selections
4. Ensure sufficient color contrast for readability
5. Test with keyboard navigation
6. Use active states to indicate selected items
7. Combine with icons for better visual communication
