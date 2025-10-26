# Tooltip Component
**Category:** Обратная связь

Tooltip — это контекстная подсказка, которая появляется при наведении или фокусе на элемент. Используется для предоставления дополнительной информации и уточнений. Компонент автоматически позиционируется относительно триггера.

## Features

- **Contextual help**: Provides additional information
- **Smart positioning**: Auto-positions to stay visible
- **Accessibility**: Full keyboard and screen reader support
- **Arrow indicator**: Points to trigger element
- **Flexible placement**: All sides supported

## Usage

```tsx
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/tooltip/tooltip"

<Tooltip>
  <TooltipTrigger>Hover me</TooltipTrigger>
  <TooltipContent>
    <p>Tooltip content</p>
  </TooltipContent>
</Tooltip>
```

## Examples

### Basic Tooltip
```tsx
<Tooltip>
  <TooltipTrigger>
    <Button variant="icon">ℹ️</Button>
  </TooltipTrigger>
  <TooltipContent>
    Additional information
  </TooltipContent>
</Tooltip>
```

### With Custom Side
```tsx
<Tooltip>
  <TooltipTrigger>Button</TooltipTrigger>
  <TooltipContent side="right">
    Tooltip on the right
  </TooltipContent>
</Tooltip>
```

### Delay Configuration
```tsx
<TooltipProvider delayDuration={300}>
  <Tooltip>
    <TooltipTrigger>Hover</TooltipTrigger>
    <TooltipContent>
      Delayed tooltip
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

## Accessibility

- Keyboard accessible (focus triggers tooltip)
- Screen reader announcements
- Proper ARIA attributes
- Works with assistive technologies

## Best Practices

1. Keep tooltip text concise
2. Use for clarifying information
3. Don't duplicate visible content
4. Consider mobile interactions
5. Test with keyboard navigation
6. Use appropriate delay timing
