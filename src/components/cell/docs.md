# Cell Component
**Category:** Макет

Cell — это универсальный компонент для отображения информации в структурированном виде. Поддерживает иконки, заголовки, описания и настраиваемую типографику. Идеально подходит для списков, карточек контента и информационных блоков.

## Features

- **Flexible layout**: Left/right icons, title, and description
- **Customizable typography**: Multiple sizes, weights, and colors
- **Icon support**: Colored icon containers on both sides
- **Flexible content**: Use default structure or custom children

## Usage

```tsx
import { Cell } from "@/components/cell/cell"

<Cell 
  title="Title"
  description="Description"
  leftIcon={<Icon />}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | - | Main title text |
| `description` | `string` | - | Secondary description text |
| `leftIcon` | `ReactNode` | - | Icon on the left side |
| `rightIcon` | `ReactNode` | - | Icon on the right side |
| `titleSize` | `'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6' \| 'body' \| 'caption' \| 'footnote'` | `'body'` | Title text size |
| `descriptionSize` | `'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6' \| 'body' \| 'caption' \| 'footnote'` | `'caption'` | Description text size |
| `titleWeight` | `'thin' \| 'light' \| 'normal' \| 'medium' \| 'semibold' \| 'bold' \| 'extrabold' \| 'black'` | `'medium'` | Title font weight |
| `descriptionWeight` | `'thin' \| 'light' \| 'normal' \| 'medium' \| 'semibold' \| 'bold' \| 'extrabold' \| 'black'` | `'normal'` | Description font weight |
| `titleColor` | `'default' \| 'muted' \| 'primary' \| 'secondary' \| 'destructive' \| 'accent'` | `'default'` | Title text color |
| `descriptionColor` | `'default' \| 'muted' \| 'primary' \| 'secondary' \| 'destructive' \| 'accent'` | `'muted'` | Description text color |
| `iconColor` | `'default' \| 'muted' \| 'primary' \| 'secondary' \| 'destructive' \| 'accent' \| 'success' \| 'warning' \| 'info'` | `'default'` | Icon container color |
| `children` | `ReactNode` | - | Custom content (overrides title/description) |

## Examples

### Basic Cell
```tsx
<Cell 
  title="John Doe"
  description="Software Engineer"
/>
```

### With Icon
```tsx
<Cell 
  leftIcon={<UserIcon />}
  title="Profile"
  description="View your profile information"
  iconColor="primary"
/>
```

### With Right Icon
```tsx
<Cell 
  title="Settings"
  description="Manage your preferences"
  rightIcon={<ChevronRight />}
/>
```

### Custom Typography
```tsx
<Cell 
  title="Large Title"
  description="Small description"
  titleSize="h3"
  descriptionSize="footnote"
  titleWeight="bold"
/>
```

## Best Practices

1. Use consistent icon placement
2. Keep titles concise
3. Use appropriate text sizes
4. Choose semantic icon colors
5. Consider the content hierarchy
