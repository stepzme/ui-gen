# Text Component
**Category:** Базовые

Text — это универсальный компонент для отображения текста с различными размерами, весами и цветами. Поддерживает множество вариантов типографики от заголовков до мелких подписей. Компонент обеспечивает консистентную типографику по всему приложению.

## Features

- **Multiple sizes**: h1-h6, body, caption, footnote
- **Font weights**: From thin to black
- **Semantic colors**: Default, muted, primary, secondary, etc.
- **Flexible rendering**: Can render as any HTML element
- **Customizable**: Full control over appearance

## Usage

```tsx
import { Text } from "@/components/text/text"

// Basic text
<Text>Hello World</Text>

// Heading
<Text size="h1">Main Heading</Text>

// Colored text
<Text textColor="primary">Primary text</Text>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6' \| 'body' \| 'caption' \| 'footnote'` | `'body'` | Text size |
| `weight` | `'thin' \| 'light' \| 'normal' \| 'medium' \| 'semibold' \| 'bold' \| 'extrabold' \| 'black'` | `'normal'` | Font weight |
| `textColor` | `'default' \| 'muted' \| 'primary' \| 'secondary' \| 'destructive' \| 'accent'` | `'default'` | Text color |
| `as` | `ElementType` | `'p'` | HTML element to render as |
| `bPadding` | `number` | - | Bottom padding in pixels |
| `tPadding` | `number` | - | Top padding in pixels |
| `className` | `string` | - | Additional CSS classes |

## Sizes

### Headings
```tsx
<Text size="h1">Heading 1</Text>
<Text size="h2">Heading 2</Text>
<Text size="h3">Heading 3</Text>
<Text size="h4">Heading 4</Text>
<Text size="h5">Heading 5</Text>
<Text size="h6">Heading 6</Text>
```

### Body Text
```tsx
<Text size="body">Body text</Text>
<Text size="caption">Caption text</Text>
<Text size="footnote">Footnote text</Text>
```

## Weights

```tsx
<Text weight="thin">Thin</Text>
<Text weight="light">Light</Text>
<Text weight="normal">Normal</Text>
<Text weight="medium">Medium</Text>
<Text weight="semibold">Semibold</Text>
<Text weight="bold">Bold</Text>
<Text weight="extrabold">Extrabold</Text>
<Text weight="black">Black</Text>
```

## Colors

```tsx
<Text textColor="default">Default</Text>
<Text textColor="muted">Muted</Text>
<Text textColor="primary">Primary</Text>
<Text textColor="secondary">Secondary</Text>
<Text textColor="destructive">Destructive</Text>
<Text textColor="accent">Accent</Text>
```

## Examples

### Heading with Custom Element
```tsx
<Text size="h1" as="h1">
  Page Title
</Text>
```

### Body Text with Spacing
```tsx
<Text size="body" bPadding={16} tPadding={8}>
  Paragraph with custom padding
</Text>
```

### Muted Secondary Text
```tsx
<Text size="caption" textColor="muted">
  Secondary information
</Text>
```

### Styled Combination
```tsx
<Text 
  size="h3" 
  weight="bold" 
  textColor="primary"
>
  Important Heading
</Text>
```

## Best Practices

1. Use semantic heading sizes (h1-h6) for proper document structure
2. Maintain consistent typography hierarchy
3. Use muted colors for secondary information
4. Choose appropriate weights for emphasis
5. Ensure sufficient color contrast for readability
6. Keep text concise and scannable
7. Use appropriate sizes for different contexts
