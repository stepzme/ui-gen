# Label Component
**Category:** Формы

Label — это компонент для создания подписей к полям формы. Обеспечивает правильную связь между текстом метки и соответствующим элементом формы, что критично для доступности и удобства использования. Поддерживает различные стили и автоматически связывается с элементами через атрибут `htmlFor`.

## Features

- **Form integration**: Proper association with form elements
- **Accessibility**: Full ARIA support and keyboard navigation
- **Flexible content**: Supports text, icons, and custom content
- **Customizable**: Flexible styling options

## Usage

```tsx
import { Label } from "@/components/label/label"

// Basic label
<Label htmlFor="email">Email</Label>

// Required field
<Label htmlFor="name">Name <span>*</span></Label>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `htmlFor` | `string` | - | ID of associated form element |
| `className` | `string` | - | Additional CSS classes |
| `children` | `ReactNode` | - | Label content |

## Examples

### With Input
```tsx
<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="email@example.com" />
</div>
```

### Required Field
```tsx
<div className="space-y-2">
  <Label htmlFor="name">
    Name <span className="text-destructive">*</span>
  </Label>
  <Input id="name" required />
</div>
```

### With Icon
```tsx
<Label htmlFor="username" className="flex items-center gap-2">
  <UserIcon className="size-4" />
  Username
</Label>
```

### Disabled State
```tsx
<Label htmlFor="disabled" className="opacity-50">
  Disabled Field
</Label>
```

### Custom Styling
```tsx
<Label 
  htmlFor="custom" 
  className="text-lg font-semibold"
>
  Custom Label
</Label>
```

## Accessibility

- Proper association with form elements via `htmlFor`
- Clickable label that focuses associated input
- Screen reader announcements
- Keyboard navigation support
- ARIA label support when needed

## Best Practices

1. Always provide an `htmlFor` attribute linking to the input ID
2. Make label text descriptive and clear
3. Position labels consistently in your forms
4. Indicate required fields visually
5. Keep label text concise but descriptive
6. Don't use placeholder text as a replacement for labels
7. Test with screen readers for accessibility
8. Consider using icons alongside labels for visual clarity
