# Sheet Component
**Category:** Наложения

Sheet — это боковая панель, которая выезжает с любой стороны экрана. Похож на диалог, но занимает меньше места и лучше подходит для мобильных устройств. Идеально подходит для меню, фильтров и дополнительного контента.

## Features

- **Side panel**: Slides in from any side
- **Multiple sides**: Top, right, bottom, left
- **Focus management**: Traps focus within sheet
- **Accessibility**: Full keyboard and screen reader support
- **Mobile-friendly**: Optimized for touch devices

## Usage

```tsx
import { 
  Sheet, 
  SheetTrigger, 
  SheetContent,
  SheetHeader,
  SheetTitle 
} from "@/components/sheet/sheet"

<Sheet>
  <SheetTrigger>Open Sidebar</SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Sidebar Title</SheetTitle>
    </SheetHeader>
    <p>Content</p>
  </SheetContent>
</Sheet>
```

## Components

### Sheet
Root component that manages the sheet state.

### SheetTrigger
Button that opens the sheet.

### SheetContent
Main content container.

### SheetHeader
Header section.

### SheetTitle
Title of the sheet.

### SheetDescription
Description text.

### SheetFooter
Footer section for actions.

## Examples

### Right Side
```tsx
<Sheet>
  <SheetTrigger>Menu</SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Navigation</SheetTitle>
    </SheetHeader>
    <nav>Menu items</nav>
  </SheetContent>
</Sheet>
```

### Left Side
```tsx
<Sheet>
  <SheetTrigger>Filters</SheetTrigger>
  <SheetContent side="left">
    Filter options
  </SheetContent>
</Sheet>
```

## Accessibility

- Focus trap within sheet
- ESC key closes sheet
- Screen reader announcements
- Proper ARIA attributes
- Keyboard navigation support

## Best Practices

1. Choose appropriate side based on content
2. Provide clear title and structure
3. Include close button
4. Consider mobile interactions
5. Test with keyboard navigation
6. Keep content organized and scannable
