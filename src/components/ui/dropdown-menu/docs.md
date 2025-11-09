# Dropdown Menu Component
**Category:** Навигация

Dropdown Menu — это выпадающее меню, которое появляется при нажатии на триггер. Поддерживает действия, чекбоксы, радио-кнопки, группы и разделители. Идеально подходит для контекстных меню, команд и опций действий.

## Features

- **Action menu**: Commands and actions
- **Checkbox items**: Multiple selections
- **Radio groups**: Single selection within group
- **Sub-menus**: Nested menu items
- **Accessibility**: Full keyboard and screen reader support

## Usage

```tsx
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem 
} from "@/components/dropdown-menu/dropdown-menu"

<DropdownMenu>
  <DropdownMenuTrigger>Open</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Edit</DropdownMenuItem>
    <DropdownMenuItem>Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

## Components

### DropdownMenu
Root component that manages the menu state.

### DropdownMenuTrigger
Button that opens the menu.

### DropdownMenuContent
Container for menu items.

### DropdownMenuItem
Individual menu item.

### DropdownMenuCheckboxItem
Checkbox item for multiple selection.

### DropdownMenuRadioGroup
Radio group for single selection.

### DropdownMenuRadioItem
Radio option within a group.

### DropdownMenuGroup
Groups related items.

### DropdownMenuLabel
Label for groups.

### DropdownMenuSeparator
Visual separator.

## Examples

### Basic Menu
```tsx
<DropdownMenu>
  <DropdownMenuTrigger>
    <Button>Actions</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Edit</DropdownMenuItem>
    <DropdownMenuItem>Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### With Separators
```tsx
<DropdownMenu>
  <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Edit</DropdownMenuItem>
    <DropdownMenuItem>Duplicate</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### Checkbox Items
```tsx
<DropdownMenu>
  <DropdownMenuTrigger>View</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuCheckboxItem checked>Show sidebar</DropdownMenuCheckboxItem>
    <DropdownMenuCheckboxItem>Show toolbar</DropdownMenuCheckboxItem>
  </DropdownMenuContent>
</DropdownMenu>
```

## Accessibility

- Full keyboard navigation
- Arrow keys to navigate
- Enter to activate
- Escape to close
- Screen reader support
- Proper ARIA attributes

## Best Practices

1. Use for contextual actions
2. Group related items
3. Use separators effectively
4. Provide clear labels
5. Test with keyboard navigation
6. Consider mobile interactions
