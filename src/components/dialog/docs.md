# Dialog Component
**Category:** Наложения

Dialog — это модальное окно для отображения важного контента или информации. Открывается поверх основного контента и требует взаимодействия с пользователем. Идеально подходит для подтверждений, форм и важных сообщений.

## Features

- **Modal overlay**: Blocks interaction with background content
- **Focus management**: Traps focus within dialog
- **Accessibility**: Full keyboard and screen reader support
- **Animations**: Smooth open/close transitions
- **Flexible content**: Supports any content

## Usage

```tsx
import { 
  Dialog, 
  DialogTrigger, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription 
} from "@/components/dialog/dialog"

<Dialog>
  <DialogTrigger>Open Dialog</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Description</DialogDescription>
    </DialogHeader>
    <p>Dialog content</p>
  </DialogContent>
</Dialog>
```

## Components

### Dialog
Root component that manages the dialog state.

### DialogTrigger
Button that opens the dialog.

### DialogContent
Main content container with overlay.

### DialogHeader
Header section for title and description.

### DialogTitle
Title of the dialog.

### DialogDescription
Description or subtitle.

### DialogFooter
Footer section for actions.

## Examples

### Basic Dialog
```tsx
<Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Confirmation</DialogTitle>
      <DialogDescription>Are you sure?</DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
```

### With Form
```tsx
<Dialog>
  <DialogTrigger>Add Item</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>New Item</DialogTitle>
    </DialogHeader>
    <form>
      <Input placeholder="Name" />
      <DialogFooter>
        <Button type="submit">Save</Button>
      </DialogFooter>
    </form>
  </DialogContent>
</Dialog>
```

## Accessibility

- Focus trap within dialog
- ESC key closes dialog
- Screen reader announcements
- Proper ARIA attributes
- Return focus to trigger on close

## Best Practices

1. Use for important information or actions
2. Provide clear titles and descriptions
3. Include cancel/close actions
4. Keep content concise
5. Test with keyboard navigation
6. Avoid nesting dialogs
