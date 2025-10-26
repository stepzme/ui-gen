# Collapsible Component
**Category:** Макет

Collapsible — это компонент для отображения скрываемого контента. Позволяет показывать и скрывать контент по нажатию на триггер. Идеально подходит для аккордеонов, раскрывающихся списков и секций с дополнительной информацией.

## Features

- **Expandable content**: Show/hide content on demand
- **Controlled/Uncontrolled**: Works with both patterns
- **Smooth animations**: Transitions for better UX
- **Accessibility**: Full keyboard and screen reader support
- **Flexible**: Works with any content

## Usage

```tsx
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/collapsible/collapsible"

<Collapsible>
  <CollapsibleTrigger>Toggle content</CollapsibleTrigger>
  <CollapsibleContent>
    <p>Hidden content</p>
  </CollapsibleContent>
</Collapsible>
```

## Components

### Collapsible
Root component that manages the open state.

### CollapsibleTrigger
Button that toggles the collapsible content.

### CollapsibleContent
Content that is shown/hidden based on state.

## Examples

### Basic Usage
```tsx
<Collapsible>
  <CollapsibleTrigger>Show more</CollapsibleTrigger>
  <CollapsibleContent>
    This is the hidden content
  </CollapsibleContent>
</Collapsible>
```

### Controlled State
```tsx
const [open, setOpen] = useState(false)

<Collapsible open={open} onOpenChange={setOpen}>
  <CollapsibleTrigger>Toggle</CollapsibleTrigger>
  <CollapsibleContent>
    Controlled content
  </CollapsibleContent>
</Collapsible>
```

### Uncontrolled State
```tsx
<Collapsible>
  <CollapsibleTrigger>View details</CollapsibleTrigger>
  <CollapsibleContent>
    Additional information
  </CollapsibleContent>
</Collapsible>
```

## Accessibility

- Full keyboard navigation (Space/Enter to toggle)
- ARIA attributes for screen readers
- Proper focus management
- Announcements for state changes

## Best Practices

1. Use clear trigger labels
2. Provide visual indicators for state
3. Maintain consistent behavior
4. Test with keyboard navigation
5. Consider animation performance
