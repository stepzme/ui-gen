# Select Component
**Category:** Формы

Select — это выпадающий список для выбора одного значения из множества опций. Идеально подходит для форм с ограниченным набором вариантов. Компонент обеспечивает доступность и удобство использования на всех устройствах.

## Features

- **Single selection**: Choose one option from a list
- **Search support**: Filter options (with search implementation)
- **Accessibility**: Full keyboard and screen reader support
- **Customizable**: Flexible styling and content
- **Groups and labels**: Organize options logically

## Usage

```tsx
import { 
  Select, 
  SelectTrigger, 
  SelectValue, 
  SelectContent, 
  SelectItem 
} from "@/components/select/select"

<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
  </SelectContent>
</Select>
```

## Components

### Select
Root component that manages the select state.

### SelectTrigger
Button that opens the select dropdown.

### SelectValue
Displays the selected value.

### SelectContent
Container for select options.

### SelectItem
Individual option in the list.

### SelectGroup
Groups related options.

### SelectLabel
Label for option groups.

### SelectSeparator
Visual separator between options.

## Examples

### Basic Select
```tsx
<Select>
  <SelectTrigger>
    <SelectValue placeholder="Choose an option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
    <SelectItem value="orange">Orange</SelectItem>
  </SelectContent>
</Select>
```

### With Label
```tsx
<div className="space-y-2">
  <Label htmlFor="fruit">Select fruit</Label>
  <Select>
    <SelectTrigger id="fruit">
      <SelectValue placeholder="Choose a fruit" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="apple">Apple</SelectItem>
      <SelectItem value="banana">Banana</SelectItem>
    </SelectContent>
  </Select>
</div>
```

### Grouped Options
```tsx
<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Fruits</SelectLabel>
      <SelectItem value="apple">Apple</SelectItem>
      <SelectItem value="banana">Banana</SelectItem>
    </SelectGroup>
    <SelectSeparator />
    <SelectGroup>
      <SelectLabel>Vegetables</SelectLabel>
      <SelectItem value="carrot">Carrot</SelectItem>
      <SelectItem value="potato">Potato</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>
```

## Accessibility

- Full keyboard navigation
- Arrow keys to navigate
- Enter/Space to select
- Escape to close
- Screen reader support
- Proper ARIA attributes

## Best Practices

1. Always provide labels for selects
2. Use clear, descriptive option text
3. Group related options
4. Keep options list manageable
5. Consider search for long lists
6. Test with keyboard navigation
