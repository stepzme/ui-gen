# Input Component
**Category:** Формы

Input — это базовое поле ввода для текстовых данных. Поддерживает различные типы ввода, состояния валидации, отключение и полную интеграцию с формами. Компонент обеспечивает доступность и соблюдает стандарты HTML5.

## Features

- **Multiple types**: text, email, password, number, tel, url, search, etc.
- **Validation states**: Visual feedback for valid/invalid input
- **Accessibility**: Full ARIA support and keyboard navigation
- **Form integration**: Works seamlessly with HTML forms
- **Customizable**: Flexible styling options

## Usage

```tsx
import { Input } from "@/components/input/input"

// Basic input
<Input type="text" placeholder="Enter your name" />

// With validation
<Input 
  type="email" 
  placeholder="Enter email"
  aria-invalid="true"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `string` | `'text'` | Input type (text, email, password, etc.) |
| `placeholder` | `string` | - | Placeholder text |
| `value` | `string` | - | Input value (controlled) |
| `defaultValue` | `string` | - | Default value (uncontrolled) |
| `disabled` | `boolean` | `false` | Disable the input |
| `readOnly` | `boolean` | `false` | Make input read-only |
| `required` | `boolean` | `false` | Mark input as required |
| `aria-invalid` | `boolean` | - | ARIA invalid state |
| `aria-errormessage` | `string` | - | ID of error message element |
| `className` | `string` | - | Additional CSS classes |

## Types

### Text
```tsx
<Input type="text" placeholder="Enter text" />
```

### Email
```tsx
<Input type="email" placeholder="email@example.com" />
```

### Password
```tsx
<Input type="password" placeholder="Enter password" />
```

### Number
```tsx
<Input type="number" placeholder="Enter number" />
```

### Search
```tsx
<Input type="search" placeholder="Search..." />
```

### File
```tsx
<Input type="file" />
```

## Examples

### With Label
```tsx
<div className="space-y-2">
  <Label htmlFor="name">Name</Label>
  <Input id="name" placeholder="Enter your name" />
</div>
```

### With Error State
```tsx
<Input 
  type="email"
  placeholder="Enter email"
  aria-invalid="true"
  aria-errormessage="email-error"
/>
```

### Disabled
```tsx
<Input 
  placeholder="Disabled input" 
  disabled 
/>
```

### Read Only
```tsx
<Input 
  value="Read-only value" 
  readOnly 
/>
```

### Required Field
```tsx
<Input 
  placeholder="Required field" 
  required 
/>
```

## Accessibility

- Full keyboard navigation support
- ARIA attributes for validation states
- Proper labeling with associated labels
- Error message association
- Screen reader announcements
- Focus management

## Validation

Use the `aria-invalid` attribute to indicate validation state:

```tsx
const [isValid, setIsValid] = useState(false)

<Input 
  type="email"
  aria-invalid={!isValid}
  onChange={(e) => {
    // Validation logic
    setIsValid(validateEmail(e.target.value))
  }}
/>
```

## Styling

The input uses CSS custom properties for theming:

- `--background-*` for background colors
- `--foreground-*` for text colors
- `--border-*` for border colors
- `--ring-*` for focus states

## Best Practices

1. Always use labels for inputs
2. Provide clear placeholders
3. Implement proper validation feedback
4. Use appropriate input types for semantic meaning
5. Ensure sufficient color contrast
6. Test with keyboard navigation
7. Provide error messages with `aria-errormessage`
8. Group related inputs in forms
