# Image Component
**Category:** Медиа

Image — это компонент для отображения изображений с поддержкой загрузки, редактирования и управления. Включает загрузку файлов, ввод URL, состояния загрузки и fallback для отсутствующих изображений.

## Features

- **Multiple sources**: File upload, URL input
- **Aspect ratios**: Square, video, portrait, landscape
- **Loading states**: Shimmer and placeholder support
- **Error handling**: Fallback content for failed loads
- **Interactive controls**: Upload, URL input, remove

## Usage

```tsx
import { Image } from "@/components/image/image"

<Image 
  src="/image.jpg" 
  alt="Description"
  aspectRatio="square"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | - | Image source URL |
| `alt` | `string` | - | Alt text for accessibility |
| `width` | `number \| string` | - | Image width |
| `height` | `number \| string` | - | Image height |
| `aspectRatio` | `'square' \| 'video' \| 'portrait' \| 'landscape' \| 'auto'` | `'auto'` | Aspect ratio |
| `objectFit` | `'cover' \| 'contain' \| 'fill' \| 'none' \| 'scale-down'` | `'cover'` | How image fits container |
| `radius` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Border radius |
| `fallback` | `ReactNode` | - | Fallback content when image fails |
| `loading` | `'lazy' \| 'eager'` | `'lazy'` | Loading strategy |
| `placeholder` | `'blur' \| 'empty'` | `'empty'` | Placeholder type |
| `blurDataURL` | `string` | - | Blur placeholder data URL |
| `onImageChange` | `(src: string) => void` | - | Callback when image changes |
| `showControls` | `boolean` | `false` | Show upload/edit controls |

## Examples

### Basic Image
```tsx
<Image 
  src="/photo.jpg" 
  alt="Photo" 
/>
```

### With Aspect Ratio
```tsx
<Image 
  src="/photo.jpg" 
  alt="Photo" 
  aspectRatio="square"
/>
```

### With Controls
```tsx
<Image 
  src="/photo.jpg" 
  alt="Photo" 
  showControls
  onImageChange={(src) => console.log(src)}
/>
```

### Custom Fallback
```tsx
<Image 
  src="/missing.jpg" 
  alt="Photo" 
  fallback={<div>Image not found</div>}
/>
```

## Best Practices

1. Always provide descriptive alt text
2. Use appropriate aspect ratios
3. Implement proper loading states
4. Provide fallbacks for errors
5. Consider image optimization
