import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

export interface ComponentFile {
  type: 'component' | 'sandbox' | 'docs' | 'index';
  path: string;
  content: string;
}

export interface ComponentStructure {
  name: string;
  path: string;
  files: ComponentFile[];
  hasComponent: boolean;
  hasSandbox: boolean;
  hasDocs: boolean;
  hasIndex: boolean;
}

/**
 * Scans a component directory and collects all relevant files
 */
export function collectComponentFiles(componentPath: string): ComponentStructure {
  const name = componentPath.split('/').pop() || '';
  const files: ComponentFile[] = [];
  
  let hasComponent = false;
  let hasSandbox = false;
  let hasDocs = false;
  let hasIndex = false;

  try {
    const dirContents = readdirSync(componentPath);
    
    for (const file of dirContents) {
      const filePath = join(componentPath, file);
      const stat = statSync(filePath);
      
      if (stat.isFile()) {
        const content = readFileSync(filePath, 'utf-8');
        
        if (file === 'index.ts' || file === 'index.tsx') {
          files.push({ type: 'index', path: filePath, content });
          hasIndex = true;
        } else if (file.includes('sandbox') || file.includes('config')) {
          files.push({ type: 'sandbox', path: filePath, content });
          hasSandbox = true;
        } else if (file.endsWith('.md')) {
          files.push({ type: 'docs', path: filePath, content });
          hasDocs = true;
        } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
          // Check if it's the main component file
          if (file === `${name}.tsx` || file === `${name}.ts` || 
              (file !== 'index.ts' && file !== 'index.tsx' && !file.includes('sandbox'))) {
            files.push({ type: 'component', path: filePath, content });
            hasComponent = true;
          }
        }
      }
    }
  } catch (error) {
    console.warn(`Could not read component directory: ${componentPath}`, error);
  }

  return {
    name,
    path: componentPath,
    files,
    hasComponent,
    hasSandbox,
    hasDocs,
    hasIndex
  };
}

/**
 * Scans all component directories in the components folder
 */
export function collectAllComponents(componentsPath: string = 'src/components'): ComponentStructure[] {
  const components: ComponentStructure[] = [];
  
  try {
    const dirContents = readdirSync(componentsPath);
    
    for (const item of dirContents) {
      const itemPath = join(componentsPath, item);
      const stat = statSync(itemPath);
      
      if (stat.isDirectory() && item !== 'ui') {
        const component = collectComponentFiles(itemPath);
        components.push(component);
      }
    }
  } catch (error) {
    console.warn(`Could not read components directory: ${componentsPath}`, error);
  }

  return components;
}

/**
 * Generates a summary of all components and their structure
 */
export function generateComponentsSummary(componentsPath: string = 'src/components'): string {
  const components = collectAllComponents(componentsPath);
  
  let summary = '# Components Summary\n\n';
  
  for (const component of components) {
    summary += `## ${component.name}\n`;
    summary += `- Path: ${component.path}\n`;
    summary += `- Component: ${component.hasComponent ? '✅' : '❌'}\n`;
    summary += `- Sandbox: ${component.hasSandbox ? '✅' : '❌'}\n`;
    summary += `- Docs: ${component.hasDocs ? '✅' : '❌'}\n`;
    summary += `- Index: ${component.hasIndex ? '✅' : '❌'}\n`;
    summary += `- Files: ${component.files.length}\n\n`;
  }
  
  return summary;
}

/**
 * Validates that a component has all required files
 */
export function validateComponentStructure(component: ComponentStructure): {
  isValid: boolean;
  missing: string[];
  warnings: string[];
} {
  const missing: string[] = [];
  const warnings: string[] = [];
  
  if (!component.hasComponent) {
    missing.push('Component file (component.tsx or component.ts)');
  }
  
  if (!component.hasIndex) {
    missing.push('Index file (index.ts)');
  }
  
  if (!component.hasSandbox) {
    warnings.push('Sandbox configuration (sandbox.config.ts)');
  }
  
  if (!component.hasDocs) {
    warnings.push('Documentation (docs.md)');
  }
  
  return {
    isValid: missing.length === 0,
    missing,
    warnings
  };
}
