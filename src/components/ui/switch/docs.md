# Switch Component
**Category:** Формы

Switch — это элемент управления для переключения между двумя состояниями (включено/выключено). Идеально подходит для настроек, функций и опций, которые требуют бинарного выбора. Компонент обеспечивает визуальную обратную связь и полную доступность.

## Features

- **Binary states**: On/off toggle functionality
- **Accessibility**: Full keyboard and screen reader support
- **Smooth animations**: Transitions for better UX
- **Customizable**: Flexible styling options
- **Controlled/Uncontrolled**: Works with both patterns

## Usage

```tsx
import { Switch } from "@/components/switch/switch"

// Basic switch
<Switch />

// Controlled switch
const [checked, setChecked] = useState(false)
<Switch checked={checked} onCheckedChange={setChecked} />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | - | Controlled checked state |
| `defaultChecked` | `boolean` | `false` | Default checked state (uncontrolled) |
| `onCheckedChange` | `(checked: boolean) => void` | - | Callback when checked state changes |
| `disabled` | `boolean` | `false` | Disable the switch |
| `required` | `boolean` | `false` | Mark switch as required |
| `name` | `string` | - | Form field name |
| `value` | `string` | - | Form field value |
| `className` | `string` | - | Additional CSS classes |

## Examples

### Basic Switch
```tsx
<Switch />
```

### With Label
```tsx
<div className="flex items-center space-x-2">
  <Switch id="airplane-mode" />
  <Label htmlFor="airplane-mode">Airplane Mode</Label>
</div>
```

### Controlled Switch
```tsx
const [enabled, setEnabled] = useState(false)

<Switch 
  checked={enabled} 
  onCheckedChange={setEnabled} 
/>
```

### Uncontrolled Switch
```tsx
<Switch defaultChecked={true} />
```

### Disabled
```tsx
<Switch disabled />
```

## Accessibility

- Full keyboard navigation (Space/Enter to toggle)
- ARIA attributes for screen readers
- Proper focus management
- Announcements for state changes
- Works with form labels

## Best Practices

1. Always provide a label for switches
2. Use for binary on/off settings
3. Provide clear visual feedback
4. Ensure sufficient color contrast
5. Test with keyboard navigation
6. Use in forms for boolean values
7. Consider grouping related switches
