/**
 * Utility for generating OKLCH color scales
 * Creates CSS variables for color shades 50-900 based on base OKLCH values
 */

import type { OKLCHColor } from './colors-config';

export interface ColorScale {
  base: {
    l: string;
    c: string;
    h: string;
  };
  shades: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
}

/**
 * Generate CSS variables for a color scale based on base OKLCH values
 * @param colorName - Name of the color (e.g., 'red', 'blue')
 * @param baseColor - Base OKLCH color values
 * @returns Object with base variables and generated shade variables
 */
export function generateColorScale(colorName: string, baseColor: OKLCHColor): ColorScale {
  const { l, c, h } = baseColor;
  
  // Base variables
  const baseVars = {
    l: `--${colorName}-l: ${l};`,
    c: `--${colorName}-c: ${c};`,
    h: `--${colorName}-h: ${h};`,
  };

  // Generated shades using CSS calc()
  const shades = {
    50: `--${colorName}-50: oklch(0.98 calc(var(--${colorName}-c) * 0.15) var(--${colorName}-h));`,
    100: `--${colorName}-100: oklch(0.95 calc(var(--${colorName}-c) * 0.3) var(--${colorName}-h));`,
    200: `--${colorName}-200: oklch(0.88 calc(var(--${colorName}-c) * 0.5) var(--${colorName}-h));`,
    300: `--${colorName}-300: oklch(0.78 calc(var(--${colorName}-c) * 0.7) var(--${colorName}-h));`,
    400: `--${colorName}-400: oklch(0.65 calc(var(--${colorName}-c) * 0.85) var(--${colorName}-h));`,
    500: `--${colorName}-500: oklch(var(--${colorName}-l) var(--${colorName}-c) var(--${colorName}-h));`,
    600: `--${colorName}-600: oklch(calc(var(--${colorName}-l) * 0.9) var(--${colorName}-c) var(--${colorName}-h));`,
    700: `--${colorName}-700: oklch(calc(var(--${colorName}-l) * 0.8) calc(var(--${colorName}-c) * 0.9) var(--${colorName}-h));`,
    800: `--${colorName}-800: oklch(calc(var(--${colorName}-l) * 0.7) calc(var(--${colorName}-c) * 0.8) var(--${colorName}-h));`,
    900: `--${colorName}-900: oklch(calc(var(--${colorName}-l) * 0.6) calc(var(--${colorName}-c) * 0.6) var(--${colorName}-h));`,
  };

  return {
    base: baseVars,
    shades,
  };
}

/**
 * Generate CSS variables for Tailwind integration
 * @param colorName - Name of the color
 * @returns Array of CSS variable declarations for Tailwind
 */
export function generateTailwindVariables(colorName: string): string[] {
  return [
    `--color-${colorName}-50: var(--${colorName}-50);`,
    `--color-${colorName}-100: var(--${colorName}-100);`,
    `--color-${colorName}-200: var(--${colorName}-200);`,
    `--color-${colorName}-300: var(--${colorName}-300);`,
    `--color-${colorName}-400: var(--${colorName}-400);`,
    `--color-${colorName}-500: var(--${colorName}-500);`,
    `--color-${colorName}-600: var(--${colorName}-600);`,
    `--color-${colorName}-700: var(--${colorName}-700);`,
    `--color-${colorName}-800: var(--${colorName}-800);`,
    `--color-${colorName}-900: var(--${colorName}-900);`,
  ];
}

/**
 * Generate complete CSS block for a color
 * @param colorName - Name of the color
 * @param baseColor - Base OKLCH color values
 * @returns Complete CSS block as string
 */
export function generateColorCSS(colorName: string, baseColor: OKLCHColor): string {
  const scale = generateColorScale(colorName, baseColor);
  
  return `/* ${colorName.charAt(0).toUpperCase() + colorName.slice(1)} */
${scale.base.l}
${scale.base.c}
${scale.base.h}
${scale.shades[50]}
${scale.shades[100]}
${scale.shades[200]}
${scale.shades[300]}
${scale.shades[400]}
${scale.shades[500]}
${scale.shades[600]}
${scale.shades[700]}
${scale.shades[800]}
${scale.shades[900]}`;
}

/**
 * Generate all Tailwind variables for a color
 * @param colorName - Name of the color
 * @returns CSS block with Tailwind variables
 */
export function generateTailwindCSS(colorName: string): string {
  const variables = generateTailwindVariables(colorName);
  return variables.join('\n');
}
