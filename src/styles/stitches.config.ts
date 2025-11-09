import { createStitches } from '@stitches/react'

/**
 * Stitches configuration with Figma tokens
 * All tokens are available as CSS variables and can be accessed via $ prefix
 */
export const {
  styled,
  css,
  getCssText,
  theme,
  createTheme,
  globalCss,
  keyframes,
  config,
} = createStitches({
  theme: {
    // Space tokens (using xBase)
    space: {
      x0: 'var(--x-base-0)',
      x50: 'var(--x-base-50)',
      x100: 'var(--x-base-100)',
      x200: 'var(--x-base-200)',
      x300: 'var(--x-base-300)',
      x400: 'var(--x-base-400)',
      x500: 'var(--x-base-500)',
      x600: 'var(--x-base-600)',
      x700: 'var(--x-base-700)',
      x800: 'var(--x-base-800)',
      x900: 'var(--x-base-900)',
      x1000: 'var(--x-base-1000)',
      x1100: 'var(--x-base-1100)',
      x1200: 'var(--x-base-1200)',
      x1300: 'var(--x-base-1300)',
      x1400: 'var(--x-base-1400)',
      x1500: 'var(--x-base-1500)',
      x1600: 'var(--x-base-1600)',
      x1700: 'var(--x-base-1700)',
      x1800: 'var(--x-base-1800)',
      x1900: 'var(--x-base-1900)',
      x2000: 'var(--x-base-2000)',
      // Gravity system spaces (for components)
      'body-m-medium': 'var(--spaces-gravity-system-body-m-medium)',
      'body-m-small': 'var(--spaces-gravity-system-body-m-small)',
      'body-m-tiny': 'var(--spaces-gravity-system-body-m-tiny)',
      'body-m-large': 'var(--spaces-gravity-system-body-m-large)',
      'body-s-medium': 'var(--spaces-gravity-system-body-s-medium)',
      'body-s-small': 'var(--spaces-gravity-system-body-s-small)',
      'body-s-tiny': 'var(--spaces-gravity-system-body-s-tiny)',
    },

    // Sizes (same as space for convenience)
    sizes: {
      x0: 'var(--x-base-0)',
      x50: 'var(--x-base-50)',
      x100: 'var(--x-base-100)',
      x200: 'var(--x-base-200)',
      x300: 'var(--x-base-300)',
      x400: 'var(--x-base-400)',
      x500: 'var(--x-base-500)',
      x600: 'var(--x-base-600)',
      x700: 'var(--x-base-700)',
      x800: 'var(--x-base-800)',
      x900: 'var(--x-base-900)',
      x1000: 'var(--x-base-1000)',
      x1100: 'var(--x-base-1100)',
      x1200: 'var(--x-base-1200)',
      x1300: 'var(--x-base-1300)',
      x1400: 'var(--x-base-1400)',
      x1500: 'var(--x-base-1500)',
      x1600: 'var(--x-base-1600)',
      x1700: 'var(--x-base-1700)',
      x1800: 'var(--x-base-1800)',
      x1900: 'var(--x-base-1900)',
      x2000: 'var(--x-base-2000)',
    },

    // Font sizes
    fontSizes: {
      // Body sizes
      bodyS: 'var(--font-sizes-body-s)',
      bodyM: 'var(--font-sizes-body-m)',
      bodyL: 'var(--font-sizes-body-l)',
      bodyXL: 'var(--font-sizes-body-x-l)',
      // Headline sizes
      headlineS: 'var(--font-sizes-headline-s)',
      headlineM: 'var(--font-sizes-headline-m)',
      headlineL: 'var(--font-sizes-headline-l)',
      headlineXL: 'var(--font-sizes-headline-x-l)',
      headlineXS: 'var(--font-sizes-headline-x-s)',
      headlineXXS: 'var(--font-sizes-headline-x-x-s)',
      // Display sizes
      displayS: 'var(--font-sizes-display-s)',
      displayM: 'var(--font-sizes-display-m)',
      displayL: 'var(--font-sizes-display-l)',
      displayXL: 'var(--font-sizes-display-x-l)',
      // VTB Group sizes
      'vtbGroup-x1': 'var(--font-sizes-vtb-group-x1)',
      'vtbGroup-x2': 'var(--font-sizes-vtb-group-x2)',
      'vtbGroup-x3': 'var(--font-sizes-vtb-group-x3)',
      'vtbGroup-x4': 'var(--font-sizes-vtb-group-x4)',
      'vtbGroup-x5': 'var(--font-sizes-vtb-group-x5)',
      'vtbGroup-x6': 'var(--font-sizes-vtb-group-x6)',
      'vtbGroup-x7': 'var(--font-sizes-vtb-group-x7)',
      'vtbGroup-x8': 'var(--font-sizes-vtb-group-x8)',
      'vtbGroup-x9': 'var(--font-sizes-vtb-group-x9)',
      // Omega UI sizes
      'omegaUI-x1': 'var(--font-sizes-omega-u-i-x1)',
      'omegaUI-x2': 'var(--font-sizes-omega-u-i-x2)',
      'omegaUI-x3': 'var(--font-sizes-omega-u-i-x3)',
      'omegaUI-x4': 'var(--font-sizes-omega-u-i-x4)',
      'omegaUI-x5': 'var(--font-sizes-omega-u-i-x5)',
      'omegaUI-x6': 'var(--font-sizes-omega-u-i-x6)',
      'omegaUI-x7': 'var(--font-sizes-omega-u-i-x7)',
      'omegaUI-x8': 'var(--font-sizes-omega-u-i-x8)',
      'omegaUI-x9': 'var(--font-sizes-omega-u-i-x9)',
    },

    // Line heights
    lineHeights: {
      // Basic line heights
      x1: 'var(--line-heights-x1)',
      x2: 'var(--line-heights-x2)',
      x3: 'var(--line-heights-x3)',
      x4: 'var(--line-heights-x4)',
      x5: 'var(--line-heights-x5)',
      x6: 'var(--line-heights-x6)',
      x7: 'var(--line-heights-x7)',
      x8: 'var(--line-heights-x8)',
      x9: 'var(--line-heights-x9)',
      x10: 'var(--line-heights-x10)',
      x11: 'var(--line-heights-x11)',
      x12: 'var(--line-heights-x12)',
      x13: 'var(--line-heights-x13)',
      // Body line heights
      'body-s-tight': 'var(--line-heights-body-s-tight)',
      'body-s-paragraph': 'var(--line-heights-body-s-paragraph)',
      'body-m-tight': 'var(--line-heights-body-m-tight)',
      'body-m-paragraph': 'var(--line-heights-body-m-paragraph)',
      'body-l-tight': 'var(--line-heights-body-l-tight)',
      'body-l-paragraph': 'var(--line-heights-body-l-paragraph)',
      'body-xl-tight': 'var(--line-heights-body-x-l-tight)',
      'body-xl-paragraph': 'var(--line-heights-body-x-l-paragraph)',
      // Headline line heights
      'headlines-headline-s': 'var(--line-heights-headlines-headline-s)',
      'headlines-headline-m': 'var(--line-heights-headlines-headline-m)',
      'headlines-headline-l': 'var(--line-heights-headlines-headline-l)',
      'headlines-headline-xl': 'var(--line-heights-headlines-headline-x-l)',
      'headlines-headline-xs': 'var(--line-heights-headlines-headline-x-s)',
      'headlines-headline-xxs': 'var(--line-heights-headlines-headline-x-x-s)',
      // Display line heights
      'displays-display-s': 'var(--line-heights-displays-display-s)',
      'displays-display-m': 'var(--line-heights-displays-display-m)',
      'displays-display-l': 'var(--line-heights-displays-display-l)',
      'displays-display-xl': 'var(--line-heights-displays-display-x-l)',
    },

    // Fonts
    fonts: {
      sans: 'omegaUI, "omegaUI Fallback", ui-sans-serif, system-ui, sans-serif',
      display: 'omegaUI',
      headline: 'omegaUI',
      body: 'omegaUI',
    },

    // Font weights
    fontWeights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      // Token-based weights
      bodyRegular: 'var(--font-weights-body-regular)',
      bodyMedium: 'var(--font-weights-body-medium)',
      bodySemiBold: 'var(--font-weights-body-semi-bold)',
      headline: 'var(--font-weights-headline)',
      display: 'var(--font-weights-display)',
    },

    // Colors - Semantic tokens (most commonly used)
    colors: {
      // Brand colors
      'brand-primary': 'var(--color-scheme-brand-primary)',
      'brand-secondary': 'var(--color-scheme-brand-secondary)',
      'brand-tertiary': 'var(--color-scheme-brand-tertiary)',
      'brand-text-primary': 'var(--color-scheme-brand-text-primary)',
      'brand-text-secondary': 'var(--color-scheme-brand-text-secondary)',
      'brand-icon-primary': 'var(--color-scheme-brand-icon-primary)',
      'brand-icon-secondary': 'var(--color-scheme-brand-icon-secondary)',

      // Background colors
      'bg-secondary-light': 'var(--color-scheme-bg-secondary-light)',
      'bg-secondary-dark': 'var(--color-scheme-bg-secondary-dark)',

      // Button component tokens (filled variant)
      'button-filled-brand-body-normal': 'var(--components-button-filled-brand-body-normal)',
      'button-filled-brand-body-hover': 'var(--components-button-filled-brand-body-hover)',
      'button-filled-brand-body-click': 'var(--components-button-filled-brand-body-click)',
      'button-filled-success-body-normal': 'var(--components-button-filled-success-body-normal)',
      'button-filled-success-body-hover': 'var(--components-button-filled-success-body-hover)',
      'button-filled-success-body-click': 'var(--components-button-filled-success-body-click)',
      'button-filled-info-body-normal': 'var(--components-button-filled-info-body-normal)',
      'button-filled-info-body-hover': 'var(--components-button-filled-info-body-hover)',
      'button-filled-info-body-click': 'var(--components-button-filled-info-body-click)',
      'button-filled-warning-body-normal': 'var(--components-button-filled-warning-body-normal)',
      'button-filled-warning-body-hover': 'var(--components-button-filled-warning-body-hover)',
      'button-filled-warning-body-click': 'var(--components-button-filled-warning-body-click)',
      'button-filled-critical-body-normal': 'var(--components-button-filled-critical-body-normal)',
      'button-filled-critical-body-hover': 'var(--components-button-filled-critical-body-hover)',
      'button-filled-critical-body-click': 'var(--components-button-filled-critical-body-click)',
      'button-filled-neutral-body-normal': 'var(--components-button-filled-neutral-body-normal)',
      'button-filled-neutral-body-hover': 'var(--components-button-filled-neutral-body-hover)',
      'button-filled-neutral-body-click': 'var(--components-button-filled-neutral-body-click)',
      'button-filled-primary-body-normal': 'var(--components-button-filled-primary-body-normal)',
      'button-filled-primary-body-hover': 'var(--components-button-filled-primary-body-hover)',
      'button-filled-primary-body-click': 'var(--components-button-filled-primary-body-click)',
      'button-filled-primary-text': 'var(--components-button-filled-primary-text)',
      'button-filled-primary-icon': 'var(--components-button-filled-primary-icon)',
      'button-filled-constant-body-normal': 'var(--components-button-filled-constant-body-normal)',
      'button-filled-constant-body-hover': 'var(--components-button-filled-constant-body-hover)',
      'button-filled-constant-body-click': 'var(--components-button-filled-constant-body-click)',
      'button-filled-constant-text': 'var(--components-button-filled-constant-text)',
      'button-filled-constant-icon': 'var(--components-button-filled-constant-icon)',
      'button-filled-text': 'var(--components-button-filled-text)',
      'button-filled-icon': 'var(--components-button-filled-icon)',

      // Palette colors (commonly used)
      'venusOrange-0': 'var(--venus-orange-0)',
      'venusOrange-50': 'var(--venus-orange-50)',
      'venusOrange-100': 'var(--venus-orange-100)',
      'venusOrange-200': 'var(--venus-orange-200)',
      'venusOrange-300': 'var(--venus-orange-300)',
      'venusOrange-400': 'var(--venus-orange-400)',
      'venusOrange-500': 'var(--venus-orange-500)',
      'venusOrange-600': 'var(--venus-orange-600)',
      'venusOrange-700': 'var(--venus-orange-700)',
      'venusOrange-800': 'var(--venus-orange-800)',
      'venusOrange-900': 'var(--venus-orange-900)',
      'venusOrange-950': 'var(--venus-orange-950)',
      'venusOrange-1000': 'var(--venus-orange-1000)',

      // Add more colors as needed from tokens.css
      // All colors are available via CSS variables
    },

    // Border radius
    radii: {
      // Basic radii (xBase based)
      x1: 'var(--spaces-static-x1)', // 4px
      x2: 'var(--spaces-static-x2)', // 8px
      x3: 'var(--spaces-static-x3)', // 12px
      x4: 'var(--spaces-static-x4)', // 16px
      infinite: '9999px',
      // Gravity system radii (body-s)
      'body-s-tiny': 'var(--radii-gravity-system-body-s-tiny)',
      'body-s-small': 'var(--radii-gravity-system-body-s-small)',
      'body-s-medium': 'var(--radii-gravity-system-body-s-medium)',
      'body-s-large': 'var(--radii-gravity-system-body-s-large)',
      'body-s-huge': 'var(--radii-gravity-system-body-s-huge)',
      // Gravity system radii (body-m)
      'body-m-tiny': 'var(--radii-gravity-system-body-m-tiny)',
      'body-m-small': 'var(--radii-gravity-system-body-m-small)',
      'body-m-medium': 'var(--radii-gravity-system-body-m-medium)',
      'body-m-large': 'var(--radii-gravity-system-body-m-large)',
      'body-m-huge': 'var(--radii-gravity-system-body-m-huge)',
      // Gravity system radii (body-l)
      'body-l-tiny': 'var(--radii-gravity-system-body-l-tiny)',
      'body-l-small': 'var(--radii-gravity-system-body-l-small)',
      'body-l-medium': 'var(--radii-gravity-system-body-l-medium)',
      'body-l-large': 'var(--radii-gravity-system-body-l-large)',
      'body-l-huge': 'var(--radii-gravity-system-body-l-huge)',
    },

    // Shadows (if available in tokens)
    shadows: {
      // Add shadows from tokens if available
    },
  },

  media: {
    sm: '(min-width: 640px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 1024px)',
    xl: '(min-width: 1280px)',
    '2xl': '(min-width: 1536px)',
  },

  utils: {
    // Padding utilities
    px: (value: string) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    py: (value: string) => ({
      paddingTop: value,
      paddingBottom: value,
    }),
    p: (value: string) => ({
      padding: value,
    }),

    // Margin utilities
    mx: (value: string) => ({
      marginLeft: value,
      marginRight: value,
    }),
    my: (value: string) => ({
      marginTop: value,
      marginBottom: value,
    }),
    m: (value: string) => ({
      margin: value,
    }),

    // Gap utility
    gap: (value: string) => ({
      gap: value,
    }),
  },
})

export type CSS = typeof config.css
export type { VariantProps } from '@stitches/react'

