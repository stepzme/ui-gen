# Textarea Component
**Category:** Формы

Textarea — это многострочное поле ввода для длинного текста. Идеально подходит для комментариев, описаний и другого текстового контента, который превышает одну строку. Поддерживает автоматическое изменение размера и все стандартные атрибуты HTML5.

## Features

- **Auto-sizing**: Automatically adjusts height to fit content
- **Validation states**: Visual feedback for valid/invalid input
- **Accessibility**: Full ARIA support and keyboard navigation
- **Form integration**: Works seamlessly with HTML forms
- **Customizable**: Flexible styling options

## Usage

```tsx
import { Textarea } from "@/components/textarea/textarea"

// Basic textarea
<Textarea placeholder="Enter your message..." />

// With validation
<Textarea 
  placeholder="Enter description"
  aria-invalid="true"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placeholder` | `string` | - | Placeholder text |
| `value` | `string` | - | Textarea value (controlled) |
| `defaultValue` | `string` | - | Default value (uncontrolled) |
| `rows` | `number` | `3` | Number of visible rows |
| `disabled` | `boolean` | `false` | Disable the textarea |
| `readOnly` | `boolean` | `false` | Make textarea read-only |
| `required` | `boolean` | `false` | Mark textarea as required |
| `aria-invalid` | `boolean` | - | ARIA invalid state |
| `aria-errormessage` | `string` | - | ID of error message element |
| `className` | `string` | - | Additional CSS classes |

## Examples

### Basic Textarea
```tsx
<Textarea placeholder="Enter your message..." />
```

### With Label
```tsx
<div className="space-y-2">
  <Label htmlFor="message">Message</Label>
  <Textarea id="message" placeholder="Enter your message..." />
</div>
```

### With Error State
```tsx
<Textarea 
  placeholder="Enter description"
  aria-invalid="true"
  aria-errormessage="description-error"
/>
```

### Custom Rows
```tsx
<Textarea 
  placeholder="Enter a longer message..." 
  rows={6}
/>
```

### Disabled
```tsx
<Textarea 
  placeholder="Disabled textarea" 
  disabled 
/>
```

### Read Only
```tsx
<Textarea 
  value="This is read-only content" 
  readOnly 
/>
```

### Required Field
```tsx
<Textarea 
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

<Textarea 
  aria-invalid={!isValid}
  onChange={(e) => {
    // Validation logic
    setIsValid(e.target.value.length >= 10)
  }}
/>
```

## Styling

The textarea uses CSS custom properties for theming:

- `--background-*` for background colors
- `--foreground-*` for text colors
- `--border-*` for border colors
- `--ring-*` for focus states

## Best Practices

1. Always use labels for textareas
2. Provide clear placeholders
3. Set appropriate row counts for different use cases
4. Implement proper validation feedback
5. Ensure sufficient color contrast
6. Test with keyboard navigation
7. Provide error messages with `aria-errormessage`
8. Use for content longer than a few words
