import { getComponentRegistry } from './component-registry';
import type { SandboxSection } from './component-sandbox-config';

export interface NewSandboxConfig {
  generateVariants?: (component: any) => SandboxSection[];
}

/**
 * Gets sandbox configuration for a component using the new structure
 */
export function getNewSandboxConfig(componentId: string): NewSandboxConfig | null {
  const registry = getComponentRegistry();
  const component = registry.getComponent(componentId);
  
  if (!component || !component.sandboxConfig) {
    return null;
  }
  
  return component.sandboxConfig;
}

/**
 * Generates sandbox variants for a component using the new structure
 */
export function generateNewComponentSandbox(componentId: string): SandboxSection[] | null {
  const config = getNewSandboxConfig(componentId);
  
  if (!config?.generateVariants) {
    return null;
  }
  
  // Create a mock component definition for compatibility
  const mockComponent = {
    id: componentId,
    name: componentId,
    defaultProps: {}
  };
  
  return config.generateVariants(mockComponent);
}

/**
 * Gets all components that have sandbox configurations
 */
export function getAllSandboxComponents(): Array<{
  id: string;
  name: string;
  path: string;
  sandboxConfig: any;
}> {
  const registry = getComponentRegistry();
  const components = registry.getComponentsWithSandbox();
  
  return components.map(component => ({
    id: component.name,
    name: component.name,
    path: component.path,
    sandboxConfig: component.sandboxConfig
  }));
}

/**
 * Generates a summary of all sandbox configurations
 */
export function generateSandboxSummary(): string {
  const components = getAllSandboxComponents();
  
  let summary = '# Sandbox Configuration Summary\n\n';
  summary += `Total Components with Sandbox: ${components.length}\n\n`;
  
  for (const component of components) {
    summary += `## ${component.name}\n`;
    summary += `- Path: ${component.path}\n`;
    summary += `- Has Config: ${component.sandboxConfig ? '✅' : '❌'}\n`;
    
    if (component.sandboxConfig?.generateVariants) {
      try {
        const variants = component.sandboxConfig.generateVariants({ id: component.id, defaultProps: {} });
        summary += `- Variant Sections: ${variants.length}\n`;
        summary += `- Total Variants: ${variants.reduce((sum, section) => sum + section.variants.length, 0)}\n`;
      } catch (error) {
        summary += `- Error generating variants: ${error}\n`;
      }
    }
    
    summary += '\n';
  }
  
  return summary;
}
