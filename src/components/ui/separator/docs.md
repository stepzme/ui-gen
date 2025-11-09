# Separator Component
**Category:** Базовые

Separator — это визуальный элемент для разделения контента на логические секции. Используется для создания визуальной иерархии и организации содержимого. Поддерживает горизонтальную и вертикальную ориентацию.

## Features

- **Multiple orientations**: Horizontal and vertical
- **Accessibility**: Proper ARIA role
- **Flexible styling**: Customizable appearance
- **Semantic**: Can be decorative or structural
- **Customizable**: Full control over styling

## Usage

```tsx
import { Separator } from "@/components/separator/separator"

// Horizontal separator
<Separator />

// Vertical separator
<Separator orientation="vertical" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Separator orientation |
| `decorative` | `boolean` | `true` | Whether the separator is decorative |
| `className` | `string` | - | Additional CSS classes |

## Examples

### Horizontal Separator
```tsx
<div>
  <h2>Section Title</h2>
  <Separator />
  <p>Section content</p>
</div>
```

### Vertical Separator
```tsx
<div className="flex items-center space-x-4">
  <span>Left</span>
  <Separator orientation="vertical" />
  <span>Right</span>
</div>
```

### In List
```tsx
<ul className="space-y-2">
  <li>Item 1</li>
  <Separator />
  <li>Item 2</li>
  <Separator />
  <li>Item 3</li>
</ul>
```

### Custom Styling
```tsx
<Separator className="my-4 h-0.5" />
```

### In Menu
```tsx
<div className="space-y-1">
  <MenuItem>Edit</MenuItem>
  <MenuItem>Delete</MenuItem>
  <Separator />
  <MenuItem>Share</MenuItem>
</div>
```

## Accessibility

- Proper semantic role when not decorative
- ARIA attributes for screen readers
- Hidden from assistive technology when decorative
- Appropriate for content structure

## Best Practices

1. Use to separate distinct content sections
2. Maintain consistent spacing around separators
3. Consider orientation based on layout
4. Use sparingly to avoid visual clutter
5. Match separator styling to design system
6. Consider context for decorative vs structural use
