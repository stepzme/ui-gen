/**
 * Base color configuration in OKLCH format
 * Each color has lightness (l), chroma (c), and hue (h) values
 * These values are used to generate full color scales (50-900)
 */

export interface OKLCHColor {
  l: number; // lightness (0-1)
  c: number; // chroma (0-0.4)
  h: number; // hue (0-360)
}

export interface ColorConfig {
  [key: string]: OKLCHColor;
}

/**
 * Neutral colors - low chroma values
 */
export const neutralColors: ColorConfig = {
  slate: { l: 0.52, c: 0.015, h: 255 },
  gray: { l: 0.52, c: 0.0, h: 0 },
  zinc: { l: 0.52, c: 0.006, h: 255 },
  neutral: { l: 0.52, c: 0.0, h: 0 },
  stone: { l: 0.52, c: 0.012, h: 60 },
};

/**
 * Chromatic colors - full spectrum
 */
export const chromaticColors: ColorConfig = {
  red: { l: 0.577, c: 0.245, h: 27.325 },
  orange: { l: 0.68, c: 0.19, h: 50 },
  amber: { l: 0.75, c: 0.15, h: 75 },
  yellow: { l: 0.82, c: 0.16, h: 95 },
  lime: { l: 0.75, c: 0.18, h: 125 },
  green: { l: 0.6, c: 0.18, h: 142 },
  emerald: { l: 0.62, c: 0.17, h: 163 },
  teal: { l: 0.62, c: 0.15, h: 180 },
  cyan: { l: 0.7, c: 0.14, h: 195 },
  sky: { l: 0.68, c: 0.15, h: 225 },
  blue: { l: 0.5, c: 0.2, h: 264 },
  indigo: { l: 0.48, c: 0.2, h: 283 },
  violet: { l: 0.55, c: 0.22, h: 293 },
  purple: { l: 0.52, c: 0.21, h: 308 },
  fuchsia: { l: 0.58, c: 0.25, h: 325 },
  pink: { l: 0.68, c: 0.19, h: 355 },
  rose: { l: 0.62, c: 0.2, h: 12 },
};

/**
 * All colors combined
 */
export const allColors: ColorConfig = {
  ...neutralColors,
  ...chromaticColors,
};

/**
 * Color names in order (for consistent iteration)
 */
export const colorNames = [
  // Neutrals
  'slate',
  'gray',
  'zinc',
  'neutral',
  'stone',
  // Chromatic
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
] as const;

export type ColorName = (typeof colorNames)[number];

