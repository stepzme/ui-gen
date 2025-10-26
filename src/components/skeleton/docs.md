# Skeleton Component
**Category:** Базовые

Skeleton — это компонент для отображения плейсхолдера содержимого во время загрузки. Используется для создания эффекта shimmer/shimmer при загрузке контента, улучшая восприятие производительности. Идеально подходит для карточек, текста, изображений и других элементов интерфейса.

## Features

- **Loading states**: Animated placeholder during content load
- **Flexible sizing**: Adapts to any content size
- **Customizable**: Full control over appearance
- **Performance**: Lightweight animation
- **Versatile**: Works for any content type

## Usage

```tsx
import { Skeleton } from "@/components/skeleton/skeleton"

// Basic skeleton
<Skeleton className="h-4 w-full" />

// Multiple skeletons
<div className="space-y-2">
  <Skeleton className="h-4 w-full" />
  <Skeleton className="h-4 w-3/4" />
</div>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Additional CSS classes (typically sizing) |

## Examples

### Text Loading
```tsx
<div className="space-y-2">
  <Skeleton className="h-4 w-full" />
  <Skeleton className="h-4 w-5/6" />
  <Skeleton className="h-4 w-4/5" />
</div>
```

### Card Loading
```tsx
<div className="space-y-3">
  <Skeleton className="h-48 w-full rounded-lg" />
  <Skeleton className="h-4 w-full" />
  <Skeleton className="h-4 w-3/4" />
</div>
```

### Avatar Loading
```tsx
<Skeleton className="h-12 w-12 rounded-full" />
```

### List Loading
```tsx
<div className="space-y-4">
  {[...Array(3)].map((_, i) => (
    <div key={i} className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  ))}
</div>
```

### Custom Shape
```tsx
<Skeleton className="h-8 w-24 rounded-md" />
```

## Best Practices

1. Match skeleton size to actual content
2. Use multiple skeletons for complex layouts
3. Provide visual hierarchy with different sizes
4. Match border radius to actual elements
5. Don't overuse - only for longer load times
6. Consider skeleton patterns for complex UIs
7. Ensure smooth transition to actual content
