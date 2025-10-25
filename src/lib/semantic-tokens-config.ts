/**
 * Semantic Color Tokens Configuration
 * Maps semantic meanings to specific color shades from the Basic Layer
 */

export interface SemanticColorMapping {
  // Background tokens
  background: {
    primary: string;
    secondary: string;
    brand: string;
    success: string;
    info: string;
    warning: string;
    critical: string;
    inverted: string;
  };
  
  // Foreground tokens
  foreground: {
    primary: string;
    secondary: string;
    brand: string;
    success: string;
    info: string;
    warning: string;
    critical: string;
    inverted: string;
  };
  
  // Border tokens
  border: {
    primary: string;
    secondary: string;
    brand: string;
    success: string;
    info: string;
    warning: string;
    critical: string;
    inverted: string;
  };
  
  // Ring tokens
  ring: {
    primary: string;
    secondary: string;
    brand: string;
    success: string;
    info: string;
    warning: string;
    critical: string;
    inverted: string;
  };
}

/**
 * Light theme semantic color mappings
 */
export const lightThemeSemanticTokens: SemanticColorMapping = {
  background: {
    primary: 'var(--slate-50)',
    secondary: 'var(--slate-100)',
    brand: 'var(--blue-500)',
    success: 'var(--green-500)',
    info: 'var(--indigo-500)',
    warning: 'var(--amber-500)',
    critical: 'var(--red-500)',
    inverted: 'var(--slate-900)',
  },
  
  foreground: {
    primary: 'var(--slate-900)',
    secondary: 'var(--slate-700)',
    brand: 'white',
    success: 'white',
    info: 'white',
    warning: 'var(--slate-900)',
    critical: 'white',
    inverted: 'var(--slate-50)',
  },
  
  border: {
    primary: 'var(--slate-200)',
    secondary: 'var(--slate-300)',
    brand: 'var(--blue-300)',
    success: 'var(--green-300)',
    info: 'var(--indigo-300)',
    warning: 'var(--amber-300)',
    critical: 'var(--red-300)',
    inverted: 'var(--slate-700)',
  },
  
  ring: {
    primary: 'var(--slate-400)',
    secondary: 'var(--slate-500)',
    brand: 'var(--blue-500)',
    success: 'var(--green-500)',
    info: 'var(--indigo-500)',
    warning: 'var(--amber-500)',
    critical: 'var(--red-500)',
    inverted: 'var(--slate-400)',
  },
};

/**
 * Dark theme semantic color mappings
 */
export const darkThemeSemanticTokens: SemanticColorMapping = {
  background: {
    primary: 'var(--slate-950)',
    secondary: 'var(--slate-900)',
    brand: 'var(--blue-600)',
    success: 'var(--green-600)',
    info: 'var(--cyan-600)',
    warning: 'var(--amber-600)',
    critical: 'var(--red-600)',
    inverted: 'var(--slate-50)',
  },
  
  foreground: {
    primary: 'var(--slate-50)',
    secondary: 'var(--slate-300)',
    brand: 'white',
    success: 'white',
    info: 'white',
    warning: 'var(--slate-900)',
    critical: 'white',
    inverted: 'var(--slate-900)',
  },
  
  border: {
    primary: 'var(--slate-800)',
    secondary: 'var(--slate-700)',
    brand: 'var(--blue-700)',
    success: 'var(--green-700)',
    info: 'var(--cyan-700)',
    warning: 'var(--amber-700)',
    critical: 'var(--red-700)',
    inverted: 'var(--slate-300)',
  },
  
  ring: {
    primary: 'var(--slate-600)',
    secondary: 'var(--slate-500)',
    brand: 'var(--blue-500)',
    success: 'var(--green-500)',
    info: 'var(--indigo-500)',
    warning: 'var(--amber-500)',
    critical: 'var(--red-500)',
    inverted: 'var(--slate-600)',
  },
};

/**
 * Generate CSS variables for semantic tokens
 */
export function generateSemanticCSSVariables(theme: 'light' | 'dark'): string {
  const tokens = theme === 'light' ? lightThemeSemanticTokens : darkThemeSemanticTokens;
  
  let css = '';
  
  // Background variables
  css += `/* Background semantic tokens */\n`;
  Object.entries(tokens.background).forEach(([key, value]) => {
    css += `--background-${key}: ${value};\n`;
  });
  
  // Foreground variables
  css += `\n/* Foreground semantic tokens */\n`;
  Object.entries(tokens.foreground).forEach(([key, value]) => {
    css += `--foreground-${key}: ${value};\n`;
  });
  
  // Border variables
  css += `\n/* Border semantic tokens */\n`;
  Object.entries(tokens.border).forEach(([key, value]) => {
    css += `--border-${key}: ${value};\n`;
  });
  
  // Ring variables
  css += `\n/* Ring semantic tokens */\n`;
  Object.entries(tokens.ring).forEach(([key, value]) => {
    css += `--ring-${key}: ${value};\n`;
  });
  
  return css;
}

/**
 * Generate Tailwind CSS mappings for semantic tokens
 */
export function generateSemanticTailwindMappings(): string {
  const mappings = [
    // Background mappings
    '--color-background-primary: var(--background-primary);',
    '--color-background-secondary: var(--background-secondary);',
    '--color-background-brand: var(--background-brand);',
    '--color-background-success: var(--background-success);',
    '--color-background-info: var(--background-info);',
    '--color-background-warning: var(--background-warning);',
    '--color-background-critical: var(--background-critical);',
    '--color-background-inverted: var(--background-inverted);',
    
    // Foreground mappings
    '--color-foreground-primary: var(--foreground-primary);',
    '--color-foreground-secondary: var(--foreground-secondary);',
    '--color-foreground-brand: var(--foreground-brand);',
    '--color-foreground-success: var(--foreground-success);',
    '--color-foreground-info: var(--foreground-info);',
    '--color-foreground-warning: var(--foreground-warning);',
    '--color-foreground-critical: var(--foreground-critical);',
    '--color-foreground-inverted: var(--foreground-inverted);',
    
    // Border mappings
    '--color-border-primary: var(--border-primary);',
    '--color-border-secondary: var(--border-secondary);',
    '--color-border-brand: var(--border-brand);',
    '--color-border-success: var(--border-success);',
    '--color-border-info: var(--border-info);',
    '--color-border-warning: var(--border-warning);',
    '--color-border-critical: var(--border-critical);',
    '--color-border-inverted: var(--border-inverted);',
    
    // Ring mappings
    '--color-ring-primary: var(--ring-primary);',
    '--color-ring-secondary: var(--ring-secondary);',
    '--color-ring-brand: var(--ring-brand);',
    '--color-ring-success: var(--ring-success);',
    '--color-ring-info: var(--ring-info);',
    '--color-ring-warning: var(--ring-warning);',
    '--color-ring-critical: var(--ring-critical);',
    '--color-ring-inverted: var(--ring-inverted);',
  ];
  
  return mappings.join('\n');
}
