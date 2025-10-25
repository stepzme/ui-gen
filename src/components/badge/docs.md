# Badge Component

A versatile badge component for displaying status, labels, and interactive elements.

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

## Examples

### Semantic Variants

```tsx
<Badge semantic="default">Default</Badge>
<Badge semantic="accent">Accent</Badge>
<Badge semantic="success">Success</Badge>
<Badge semantic="warning">Warning</Badge>
<Badge semantic="info">Info</Badge>
<Badge semantic="critical">Critical</Badge>
```

### Active States

```tsx
<Badge active={true}>Active</Badge>
<Badge active={false}>Inactive</Badge>
```

### Interactive Badges

```tsx
<Badge 
  interactive 
  onActiveChange={(active) => console.log('Active:', active)}
>
  Click me
</Badge>
```

### With Icons

```tsx
<Badge semantic="success">
  <CheckIcon className="w-3 h-3" />
  Verified
</Badge>
```

## Accessibility

- Interactive badges support keyboard navigation (Enter/Space)
- Proper ARIA roles and attributes
- Focus management for screen readers
- Color contrast meets WCAG guidelines

## Styling

The badge uses CSS custom properties for theming and supports all semantic color tokens:

- `--background-*` for background colors
- `--foreground-*` for text colors
- `--border-*` for border colors

## Best Practices

1. Use semantic variants to convey meaning
2. Keep badge text concise
3. Use interactive badges sparingly
4. Ensure sufficient color contrast
5. Test with screen readers
