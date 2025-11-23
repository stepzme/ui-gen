# Наследование InputFilled из Meta компонента

## 📋 Обзор

UI компонент `InputFilled` наследует из meta компонента:
- **Структуру и layout** (flexbox, gap, padding)
- **Типографику** (fontSize, lineHeight)
- **Базовые HTML элементы** (input, label, div)

UI компонент добавляет:
- **Цвета** (background, border, text colors)
- **Font weights** (regular, medium)
- **Состояния** (hover, focus, disabled, warning)
- **Позиционирование** (placeholder absolute positioning)

---

## 🔄 Прямое наследование (используются как есть)

Эти компоненты используются напрямую без дополнительной стилизации:

### 1. `MetaInputFilled.InputRow`
```typescript
// Meta: layout структура
display: 'flex',
flexDirection: 'row',
alignItems: 'center',
gap: 'var(--x-base-200)', // x2 = 8px
width: '100%',
```
**Использование в UI:**
```332:332:src/components/ui/inputFilled/inputFilled.tsx
<MetaInputFilled.InputRow>
```

### 2. `MetaInputFilled.LeftSide`
```typescript
// Meta: layout структура
display: 'flex',
alignItems: 'center',
flexShrink: 0,
```
**Использование в UI:**
```341:344:src/components/ui/inputFilled/inputFilled.tsx
{leftSide && (
  <MetaInputFilled.LeftSide aria-hidden="true">
    {leftSide}
  </MetaInputFilled.LeftSide>
)}
```

### 3. `MetaInputFilled.RightSide`
```typescript
// Meta: layout структура
display: 'flex',
alignItems: 'center',
flexShrink: 0,
```
**Использование в UI:**
```366:369:src/components/ui/inputFilled/inputFilled.tsx
{rightSide && (
  <MetaInputFilled.RightSide>
    {rightSide}
  </MetaInputFilled.RightSide>
)}
```

### 4. `MetaInputFilled.Footer`
```typescript
// Meta: layout структура
display: 'flex',
flexDirection: 'row',
alignItems: 'flex-start',
gap: 'var(--x-base-200)', // x2 = 8px
marginTop: 'var(--x-base-200)', // x2 = 8px
width: '100%',
```
**Использование в UI:**
```375:375:src/components/ui/inputFilled/inputFilled.tsx
<MetaInputFilled.Footer>
```

### 5. `MetaInputFilled.FooterColumn`
```typescript
// Meta: layout структура
display: 'flex',
flexDirection: 'column',
gap: 'var(--x-base-100)', // x1 = 4px
flex: 1,
minWidth: 0,
```
**Использование в UI:**
```376:376:src/components/ui/inputFilled/inputFilled.tsx
<MetaInputFilled.FooterColumn>
```

---

## 🎨 Наследование с добавлением стилей

Эти компоненты наследуются через `styled()` с добавлением визуальных стилей:

### 1. `BackgroundWrapper`

**Из Meta (наследуется):**
```typescript
// Layout структура
display: 'flex',
flexDirection: 'column',
gap: 'var(--x-base-100)', // x1 = 4px
padding: 'var(--x-base-200) var(--x-base-400)', // x2 сверху/снизу, x4 слева/справа
boxSizing: 'border-box',
```

**Добавляется в UI:**
```79:85:src/components/ui/inputFilled/inputFilled.tsx
const StyledBackgroundWrapper = styled(MetaInputFilled.BackgroundWrapper, {
  background: 'var(--semantic-neutral-4)',
  border: '1px solid transparent',
  borderRadius: '$x2',
  transition: 'background-color 0.2s ease-in-out, border-color 0.2s ease-in-out',
})
```

**Наследуется:**
- ✅ Layout (flex, direction, gap, padding)
- ✅ Box sizing

**Добавляется:**
- 🎨 Background color
- 🎨 Border (transparent по умолчанию)
- 🎨 Border radius
- 🎨 Transitions

---

### 2. `InputContainer`

**Из Meta (наследуется):**
```typescript
// Layout структура
display: 'flex',
flexDirection: 'row',
alignItems: 'center',
gap: 'var(--x-base-200)', // x2 = 8px
flex: 1,
minWidth: 0,
```

**Добавляется в UI:**
```87:91:src/components/ui/inputFilled/inputFilled.tsx
const StyledInputContainer = styled(MetaInputFilled.InputContainer, {
  flexDirection: 'row',
  alignItems: 'center',
})
```

**Наследуется:**
- ✅ Layout (flex, direction, gap, flex, minWidth)

**Добавляется:**
- (Дублирование для явности, но уже есть в meta)

---

### 3. `Label`

**Из Meta (наследуется):**
```typescript
// Typography
fontSize: '$fontSizes.bodyS',
lineHeight: '$lineHeights["body-s-tight"]',
// Truncation
overflow: 'hidden',
textOverflow: 'ellipsis',
whiteSpace: 'nowrap',
```

**Добавляется в UI:**
```93:97:src/components/ui/inputFilled/inputFilled.tsx
const StyledLabel = styled(MetaInputFilled.Label, {
  color: 'var(--semantic-text-secondary)',
  WebkitTapHighlightColor: 'transparent',
})
```

**Наследуется:**
- ✅ Typography (fontSize, lineHeight)
- ✅ Truncation (overflow, textOverflow, whiteSpace)

**Добавляется:**
- 🎨 Color
- 🎨 Tap highlight (для мобильных)

---

### 4. `Input`

**Из Meta (наследуется):**
```typescript
// Base input styles
flex: 1,
minWidth: 0,
border: 'none',
outline: 'none',
background: 'transparent',
// Typography (из StyledInputWithTypography)
fontSize: '$fontSizes.bodyM',
lineHeight: '$lineHeights["body-m-tight"]',
```

**Добавляется в UI:**
```99:129:src/components/ui/inputFilled/inputFilled.tsx
const StyledInput = styled(MetaInputFilled.Input, {
  backgroundColor: 'transparent',
  color: 'var(--components-input-text-value)',
  opacity: 1,
  fontWeight: '$bodyRegular',
  width: '100%',
  
  '&::placeholder': {
    color: 'var(--components-input-text-placeholder)',
    fontWeight: '$bodyRegular',
  },
  
  '&:-webkit-autofill': {
    WebkitBoxShadow: '0 0 0 1000px var(--semantic-neutral-4) inset !important',
    WebkitTextFillColor: 'var(--components-input-text-value) !important',
    caretColor: 'var(--components-input-text-value) !important',
    transition: 'background-color 5000s ease-in-out 0s, color 5000s ease-in-out 0s',
  },
  
  variants: {
    textAlign: {
      left: { textAlign: 'left' },
      right: { textAlign: 'right' },
      center: { textAlign: 'center' },
    },
  },
  defaultVariants: {
    textAlign: 'left',
  },
})
```

**Наследуется:**
- ✅ Layout (flex, minWidth)
- ✅ Typography (fontSize, lineHeight)
- ✅ Base styles (border, outline, background)

**Добавляется:**
- 🎨 Color (text value)
- 🎨 Font weight (regular)
- 🎨 Width (100%)
- 🎨 Placeholder styles (color, weight)
- 🎨 Autofill styles
- 🎨 Text align variant

---

### 5. `Error`

**Из Meta (наследуется):**
```typescript
// Typography
fontSize: '$fontSizes.bodyS',
lineHeight: '$lineHeights["body-s-paragraph"]',
```

**Добавляется в UI:**
```131:134:src/components/ui/inputFilled/inputFilled.tsx
const StyledError = styled(MetaInputFilled.Error, {
  color: 'var(--semantic-text-warning)',
})
```

**Наследуется:**
- ✅ Typography (fontSize, lineHeight)

**Добавляется:**
- 🎨 Color (warning)

---

### 6. `AdditionalText`

**Из Meta (наследуется):**
```typescript
// Typography
fontSize: '$fontSizes.bodyS',
lineHeight: '$lineHeights["body-s-paragraph"]',
// Layout
flexShrink: 0,
```

**Добавляется в UI:**
```136:139:src/components/ui/inputFilled/inputFilled.tsx
const StyledAdditionalText = styled(MetaInputFilled.AdditionalText, {
  color: 'var(--components-input-text-additional)',
})
```

**Наследуется:**
- ✅ Typography (fontSize, lineHeight)
- ✅ Layout (flexShrink)

**Добавляется:**
- 🎨 Color

---

### 7. `RightText`

**Из Meta (наследуется):**
```typescript
// Typography
fontSize: '$fontSizes.bodyM',
lineHeight: '$lineHeights["body-m-tight"]',
```

**Добавляется в UI:**
```141:144:src/components/ui/inputFilled/inputFilled.tsx
const StyledRightText = styled(MetaInputFilled.RightText, {
  color: 'var(--semantic-text-secondary)',
})
```

**Наследуется:**
- ✅ Typography (fontSize, lineHeight)

**Добавляется:**
- 🎨 Color

---

### 8. `Placeholder`

**Из Meta (наследуется):**
```typescript
// Typography
fontSize: '$fontSizes.bodyM',
lineHeight: '$lineHeights["body-m-tight"]',
```

**Добавляется в UI:**
```146:165:src/components/ui/inputFilled/inputFilled.tsx
const StyledPlaceholder = styled(MetaInputFilled.Placeholder, {
  color: 'var(--semantic-primary-70)',
  fontWeight: '$bodyRegular',
  position: 'absolute',
  top: '50%',
  left: 0,
  transform: 'translateY(-50%)',
  pointerEvents: 'none',
  variants: {
    textAlign: {
      left: { textAlign: 'left' },
      right: { textAlign: 'right' },
      center: { textAlign: 'center' },
    },
  },
  defaultVariants: {
    textAlign: 'left',
  },
})
```

**Наследуется:**
- ✅ Typography (fontSize, lineHeight)

**Добавляется:**
- 🎨 Color
- 🎨 Font weight
- 🎨 Positioning (absolute, top, left, transform)
- 🎨 Pointer events
- 🎨 Text align variant

---

### 9. `Description`

**Из Meta (наследуется):**
```typescript
// Typography
fontSize: '$fontSizes.bodyS',
lineHeight: '$lineHeights["body-s-paragraph"]',
```

**Добавляется в UI:**
```167:170:src/components/ui/inputFilled/inputFilled.tsx
const StyledDescription = styled(MetaInputFilled.Description, {
  color: 'var(--components-input-text-description)',
})
```

**Наследуется:**
- ✅ Typography (fontSize, lineHeight)

**Добавляется:**
- 🎨 Color

---

### 10. `Container`

**Из Meta (наследуется):**
```typescript
// Variants структура (пустые, для расширения)
variants: {
  hideInputField: { true: {} },
  warning: { true: {} },
  disabled: { true: {} },
  readOnly: { true: {} },
  filled: { true: {} },
  tight: { true: {} },
  size: { small: {} },
},
```

**Добавляется в UI:**
```173:281:src/components/ui/inputFilled/inputFilled.tsx
const InputFilledContainer = styled(MetaInputFilled.Container, {
  '&:focus-visible': {
    outline: '2px solid var(--color-scheme-brand-primary)',
    outlineOffset: '-2px',
  },
  
  '&:focus-within': {
    [`& ${StyledRightText}`]: {
      display: 'none',
    },
    [`& ${StyledPlaceholder}`]: {
      display: 'none',
    },
  },
  
  '&:hover': {
    [`& ${StyledBackgroundWrapper}`]: {
      background: 'var(--semantic-neutral-8)',
    },
  },
  
  [`&:has(${StyledInput}:focus)`]: {
    [`& ${StyledBackgroundWrapper}`]: {
      background: 'var(--semantic-neutral-8)',
      border: '1px solid var(--components-input-border-active)',
    },
  },
  
  '&:has(input:focus):hover': {
    [`& ${StyledBackgroundWrapper}`]: {
      background: 'var(--semantic-neutral-8)',
      border: '1px solid var(--components-input-border-active)',
    },
  },
  
  variants: {
    hideInputField: {
      true: {
        [`& ${StyledInput}`]: {
          position: 'absolute',
          opacity: 0,
          height: 1,
          width: 1,
        },
      },
    },
    warning: {
      true: {
        [`& ${StyledBackgroundWrapper}`]: {
          background: 'var(--semantic-warning-4)',
        },
        '&:hover': {
          [`& ${StyledBackgroundWrapper}`]: {
            background: 'var(--semantic-warning-8)',
          },
        },
        [`&:has(${StyledInput}:focus)`]: {
          [`& ${StyledBackgroundWrapper}`]: {
            background: 'var(--semantic-warning-8)',
            border: '1px solid var(--components-input-border-warning)',
          },
        },
        '&:has(input:focus):hover': {
          [`& ${StyledBackgroundWrapper}`]: {
            background: 'var(--semantic-warning-8)',
            border: '1px solid var(--components-input-border-warning)',
          },
        },
      },
    },
    disabled: {
      true: {
        [`& ${StyledBackgroundWrapper}`]: {
          background: 'var(--semantic-neutral-4)',
          opacity: 0.6,
        },
        [`& ${StyledRightText}`]: {
          display: 'block',
        },
      },
    },
    readOnly: {
      true: {
        [`& ${StyledBackgroundWrapper}`]: {
          background: 'var(--semantic-neutral-4)',
          opacity: 0.6,
        },
        [`& ${StyledInput}`]: {
          color: 'var(--components-input-text-value)',
        },
        [`& ${StyledRightText}`]: {
          display: 'block',
        },
      },
    },
    filled: {
      true: {
        [`& ${StyledInput}`]: {
          fontWeight: '$bodyMedium',
        },
      },
    },
    textAlign: {
      left: {},
      right: {},
      center: {},
    },
  },
})
```

**Наследуется:**
- ✅ Variants структура (для расширения)

**Добавляется:**
- 🎨 Focus-visible styles (outline)
- 🎨 Focus-within styles (скрытие placeholder/rightText)
- 🎨 Hover styles (background change)
- 🎨 Focus styles (background + border)
- 🎨 State variants (warning, disabled, readOnly, filled)
- 🎨 Text align variant

---

## 📊 Сводная таблица наследования

| Компонент | Layout | Typography | Colors | Font Weight | States | Positioning |
|-----------|--------|------------|--------|-------------|--------|-------------|
| **BackgroundWrapper** | ✅ Meta | ❌ | 🎨 UI | ❌ | 🎨 UI | ❌ |
| **InputContainer** | ✅ Meta | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Label** | ❌ | ✅ Meta | 🎨 UI | ❌ | ❌ | ❌ |
| **Input** | ✅ Meta | ✅ Meta | 🎨 UI | 🎨 UI | 🎨 UI | ❌ |
| **Error** | ❌ | ✅ Meta | 🎨 UI | ❌ | ❌ | ❌ |
| **AdditionalText** | ✅ Meta | ✅ Meta | 🎨 UI | ❌ | ❌ | ❌ |
| **RightText** | ❌ | ✅ Meta | 🎨 UI | ❌ | ❌ | ❌ |
| **Placeholder** | ❌ | ✅ Meta | 🎨 UI | 🎨 UI | ❌ | 🎨 UI |
| **Description** | ❌ | ✅ Meta | 🎨 UI | ❌ | ❌ | ❌ |
| **Container** | ❌ | ❌ | ❌ | ❌ | 🎨 UI | ❌ |
| **InputRow** | ✅ Meta | ❌ | ❌ | ❌ | ❌ | ❌ |
| **LeftSide** | ✅ Meta | ❌ | ❌ | ❌ | ❌ | ❌ |
| **RightSide** | ✅ Meta | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Footer** | ✅ Meta | ❌ | ❌ | ❌ | ❌ | ❌ |
| **FooterColumn** | ✅ Meta | ❌ | ❌ | ❌ | ❌ | ❌ |

---

## 🎯 Ключевые принципы

1. **Meta компонент определяет:**
   - Структуру (flexbox, direction, gap, padding)
   - Типографику (fontSize, lineHeight)
   - Базовые HTML стили (border: none, outline: none)

2. **UI компонент добавляет:**
   - Цвета (background, border, text colors)
   - Font weights (regular, medium)
   - Состояния (hover, focus, disabled, warning, filled)
   - Позиционирование (placeholder absolute)
   - Transitions и animations

3. **Разделение ответственности:**
   - Meta = Layout + Typography (структурные стили)
   - UI = Colors + States + Interactions (визуальные стили)

