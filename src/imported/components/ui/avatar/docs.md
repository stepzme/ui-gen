# Avatar Component
**Category:** Медиа

Аватар — это компонент для отображения пользовательских изображений. Поддерживает различные размеры, запасные варианты для отсутствующих изображений и полную доступность для скринридеров. Идеально подходит для отображения профилей пользователей, авторов контента и членов команды.

## Features

- **Multiple sizes**: Flexible sizing options
- **Fallback support**: Shows fallback content when image fails to load
- **Accessibility**: Full ARIA support for screen readers
- **Customizable**: Supports custom styling and content

## Usage

```tsx
import { Avatar } from "@/components/ui/avatar"

// Basic avatar
<Avatar>
  <AvatarImage src="/user.jpg" alt="User" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
```

## Props

### Avatar

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Additional CSS classes |
| `children` | `ReactNode` | - | Avatar content (AvatarImage, AvatarFallback) |

### AvatarImage

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | - | Image source URL |
| `alt` | `string` | - | Image alt text |
| `className` | `string` | - | Additional CSS classes |

### AvatarFallback

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Additional CSS classes |
| `children` | `ReactNode` | - | Fallback content (text or icon) |

## Examples

### Basic Avatar
```tsx
<Avatar>
  <AvatarImage src="/user.jpg" alt="User" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
```

### With Custom Fallback
```tsx
<Avatar>
  <AvatarImage src="/user.jpg" alt="John Doe" />
  <AvatarFallback>
    <UserIcon className="size-6" />
  </AvatarFallback>
</Avatar>
```

### Without Image
```tsx
<Avatar>
  <AvatarFallback>AB</AvatarFallback>
</Avatar>
```

### Different Sizes
```tsx
{/* Small */}
<Avatar className="size-8">
  <AvatarImage src="/user.jpg" alt="User" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>

{/* Medium (default) */}
<Avatar>
  <AvatarImage src="/user.jpg" alt="User" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>

{/* Large */}
<Avatar className="size-16">
  <AvatarImage src="/user.jpg" alt="User" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
```

## Accessibility

- Full ARIA support for screen readers
- Proper semantic HTML structure
- Alt text support for images
- Descriptive fallback content
- Keyboard navigation support

## Styling

The avatar component uses Tailwind classes and can be customized with:
- Size classes: `size-8`, `size-12`, `size-16`, etc.
- Border radius: `rounded-full`, `rounded-md`, etc.
- Background colors for fallback states

## Best Practices

1. Always provide meaningful alt text for images
2. Use descriptive fallback content (initials or icons)
3. Maintain consistent sizing across your application
4. Ensure sufficient contrast for fallback text
5. Consider using avatars in lists and navigation
6. Test with screen readers for accessibility
