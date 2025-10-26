# Inline Text Editing Implementation

## Overview
Enable inline text editing for Text components within the Artboard by adding an `editable` prop and integrating the existing `InlineEditor` component.

## Implementation Steps

### 1. Update Text Component Interface
**File:** `src/components/text/text.tsx`

Add new props to `TextProps`:
- `editable?: boolean` - controls whether text is editable
- `onTextChange?: (newValue: string) => void` - callback for text changes
- `componentId?: string` - unique identifier for the component

### 2. Add Inline Editing Logic to Text Component
**File:** `src/components/text/text.tsx`

- Import `InlineEditor` and `useState`
- Add state: `const [isEditing, setIsEditing] = useState(false)`
- Add double-click handler: `onDoubleClick={() => editable && setIsEditing(true)}`
- Conditionally render `InlineEditor` when `isEditing` is true
- Pass `onSave` callback that calls `onTextChange` and sets `isEditing` to false
- Pass `onCancel` callback that sets `isEditing` to false

### 3. Update ComponentRenderer Props
**File:** `src/components/component-renderer.tsx`

Remove existing inline editing logic for Text components (lines 70-84) since it will now be handled by the Text component itself. Pass through the `editable`, `onTextChange`, and `componentId` props to Text components.

### 4. Update Artboard to Pass Editable Props
**File:** `src/components/artboard.tsx`

In the `ComponentRenderer` usage (around line 256), add props for Text components:
- `editable: true`
- `componentId: child.id`
- `onTextChange: (newValue) => onSaveEditing(child.id, 'children', newValue)`

### 5. Simplify PageBuilder State Management
**File:** `src/components/page-builder.tsx`

The existing `editingElement` state and handlers (`handleStartEditing`, `handleCancelEditing`) are no longer needed since editing state is now managed within Text component. Keep only `handleSaveEditing` for updating component props.

## Key Benefits

- Text editing works only within Artboard context (controlled by `editable` prop)
- Simpler architecture - editing state managed locally in Text component
- No complex event propagation through ComponentRenderer
- Reuses existing InlineEditor component
- Other uses of Text component (docs, examples) remain unaffected
