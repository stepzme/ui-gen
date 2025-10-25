# OKLCH Color System

## Overview

This project implements a comprehensive color system using the OKLCH color space with dynamic shade generation. The system provides 22 colors with 10 shades each (50-900), totaling 220 color variables that integrate seamlessly with Tailwind CSS.

## Why OKLCH?

OKLCH (OK Lightness, Chroma, Hue) offers several advantages over traditional color formats:

- **Visual Uniformity**: Colors with the same lightness value appear equally bright to the human eye
- **Predictable Manipulation**: Mathematical operations on lightness and chroma produce visually consistent results
- **Better Gradients**: Smooth transitions between colors without unexpected shifts
- **Future-Proof**: Modern color format with excellent browser support

## Color Structure

### Base Configuration

Each color is defined by three OKLCH values stored in `src/lib/colors-config.ts`:

```typescript
interface OKLCHColor {
  l: number; // lightness (0-1)
  c: number; // chroma (0-0.4)
  h: number; // hue (0-360)
}
```

### Dynamic Generation

Shades are generated using CSS `calc()` functions based on the base values:

- **50-400**: Lightness increases, chroma decreases for lighter shades
- **500**: Base color (unchanged)
- **600-900**: Lightness decreases, chroma decreases for darker shades

## Available Colors

### Neutral Colors (5)
- **slate**: Cool gray with subtle blue tint
- **gray**: Pure neutral gray
- **zinc**: Cool gray with minimal tint
- **neutral**: Pure neutral gray (identical to gray)
- **stone**: Warm gray with subtle brown tint

### Chromatic Colors (17)

#### Red/Warm Spectrum
- **red**: Classic red
- **orange**: Vibrant orange
- **amber**: Golden yellow-orange
- **yellow**: Bright yellow

#### Green Spectrum
- **lime**: Bright green-yellow
- **green**: Classic green
- **emerald**: Blue-tinted green
- **teal**: Blue-green

#### Blue Spectrum
- **cyan**: Blue-green
- **sky**: Light blue
- **blue**: Classic blue
- **indigo**: Deep blue

#### Purple/Pink Spectrum
- **violet**: Purple with blue tint
- **purple**: Classic purple
- **fuchsia**: Magenta
- **pink**: Light pink
- **rose**: Pink with red tint

## Shade Generation Formula

### Light Shades (50-400)
```css
--color-50: oklch(0.98 calc(var(--base-c) * 0.15) var(--base-h));
--color-100: oklch(0.95 calc(var(--base-c) * 0.3) var(--base-h));
--color-200: oklch(0.88 calc(var(--base-c) * 0.5) var(--base-h));
--color-300: oklch(0.78 calc(var(--base-c) * 0.7) var(--base-h));
--color-400: oklch(0.65 calc(var(--base-c) * 0.85) var(--base-h));
```

### Base Color (500)
```css
--color-500: oklch(var(--base-l) var(--base-c) var(--base-h));
```

### Dark Shades (600-900)
```css
--color-600: oklch(calc(var(--base-l) * 0.9) var(--base-c) var(--base-h));
--color-700: oklch(calc(var(--base-l) * 0.8) calc(var(--base-c) * 0.9) var(--base-h));
--color-800: oklch(calc(var(--base-l) * 0.7) calc(var(--base-c) * 0.8) var(--base-h));
--color-900: oklch(calc(var(--base-l) * 0.6) calc(var(--base-c) * 0.6) var(--base-h));
```

## Usage Examples

### Tailwind Classes
```html
<!-- Background colors -->
<div class="bg-red-500">Primary red</div>
<div class="bg-blue-600">Darker blue</div>
<div class="bg-slate-100">Light slate</div>

<!-- Text colors -->
<p class="text-green-700">Dark green text</p>
<span class="text-purple-400">Light purple text</span>

<!-- Border colors -->
<div class="border border-orange-300">Orange border</div>
```

### CSS Variables
```css
.custom-element {
  background-color: var(--red-500);
  color: var(--blue-700);
  border-color: var(--slate-200);
}
```

### Direct OKLCH Usage
```css
.custom-color {
  background: oklch(var(--red-l) var(--red-c) var(--red-h));
}
```

## File Structure

```
src/
├── lib/
│   ├── colors-config.ts      # Base OKLCH color definitions
│   └── generate-color-scale.ts # Color generation utilities
└── app/
    └── globals.css           # CSS variables and Tailwind integration
```

## Integration with Tailwind

The color system integrates with Tailwind CSS v4 through the `@theme inline` directive:

```css
@theme inline {
  --color-red-500: var(--red-500);
  --color-blue-600: var(--blue-600);
  /* ... 220 total color mappings */
}
```

This allows using all standard Tailwind color utilities (`bg-*`, `text-*`, `border-*`, etc.) with the custom OKLCH colors.

## Semantic Tokens

**Note**: Existing semantic tokens (`--primary`, `--secondary`, `--muted`, etc.) remain unchanged and are not affected by this color system. They will be updated in a future semantic token layer.

## Future Enhancements

1. **Semantic Token Layer**: Create semantic color tokens that map to the base OKLCH colors
2. **Dark Mode Variants**: Generate optimized dark mode versions of all colors
3. **Color Picker Integration**: Build UI tools for customizing the color palette
4. **Accessibility Tools**: Add contrast checking and accessibility validation

## Browser Support

OKLCH is supported in all modern browsers:
- Chrome 111+
- Firefox 113+
- Safari 15.4+
- Edge 111+

For older browsers, consider providing fallback colors or using a CSS custom property fallback strategy.
