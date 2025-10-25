import { collectAllComponents, ComponentStructure } from './component-collector';

export interface ComponentInfo {
  name: string;
  path: string;
  component: any;
  sandboxConfig?: any;
  docs?: string;
  hasAllFiles: boolean;
}

export class ComponentRegistry {
  private components: Map<string, ComponentInfo> = new Map();
  private componentsPath: string;

  constructor(componentsPath: string = 'src/components') {
    this.componentsPath = componentsPath;
    this.loadComponents();
  }

  private async loadComponents(): Promise<void> {
    try {
      const componentStructures = collectAllComponents(this.componentsPath);
      
      for (const structure of componentStructures) {
        if (structure.hasComponent && structure.hasIndex) {
          try {
            // Dynamic import of the component
            const componentModule = await import(`@/${structure.path.replace('src/', '')}`);
            const componentName = this.getComponentName(structure.name);
            
            const componentInfo: ComponentInfo = {
              name: structure.name,
              path: structure.path,
              component: componentModule[componentName],
              sandboxConfig: componentModule[`${structure.name}SandboxConfig`],
              docs: this.getDocsContent(structure),
              hasAllFiles: structure.hasComponent && structure.hasSandbox && structure.hasDocs && structure.hasIndex
            };
            
            this.components.set(structure.name, componentInfo);
          } catch (error) {
            console.warn(`Failed to load component ${structure.name}:`, error);
          }
        }
      }
    } catch (error) {
      console.error('Failed to load components:', error);
    }
  }

  private getComponentName(componentName: string): string {
    return componentName.split('-').map(part => 
      part.charAt(0).toUpperCase() + part.slice(1)
    ).join('');
  }

  private getDocsContent(structure: ComponentStructure): string | undefined {
    const docsFile = structure.files.find(file => file.type === 'docs');
    return docsFile?.content;
  }

  public getComponent(name: string): ComponentInfo | undefined {
    return this.components.get(name);
  }

  public getAllComponents(): ComponentInfo[] {
    return Array.from(this.components.values());
  }

  public getComponentsWithSandbox(): ComponentInfo[] {
    return this.getAllComponents().filter(comp => comp.sandboxConfig);
  }

  public getComponentsWithDocs(): ComponentInfo[] {
    return this.getAllComponents().filter(comp => comp.docs);
  }

  public getComponentNames(): string[] {
    return Array.from(this.components.keys());
  }

  public hasComponent(name: string): boolean {
    return this.components.has(name);
  }

  public getComponentSummary(): string {
    const components = this.getAllComponents();
    let summary = '# Component Registry Summary\n\n';
    
    summary += `Total Components: ${components.length}\n`;
    summary += `With Sandbox: ${this.getComponentsWithSandbox().length}\n`;
    summary += `With Docs: ${this.getComponentsWithDocs().length}\n`;
    summary += `Complete: ${components.filter(c => c.hasAllFiles).length}\n\n`;
    
    for (const component of components) {
      summary += `\n## ${component.name}\n`;
      summary += `- Path: ${component.path}\n`;
      summary += `- Component: ${component.component ? '✅' : '❌'}\n`;
      summary += `- Sandbox: ${component.sandboxConfig ? '✅' : '❌'}\n`;
      summary += `- Docs: ${component.docs ? '✅' : '❌'}\n`;
      summary += `- Complete: ${component.hasAllFiles ? '✅' : '❌'}\n`;
    }
    
    return summary;
  }
}

// Singleton instance
let registryInstance: ComponentRegistry | null = null;

export function getComponentRegistry(): ComponentRegistry {
  if (!registryInstance) {
    registryInstance = new ComponentRegistry();
  }
  return registryInstance;
}

// Helper functions for easy access
export function getComponent(name: string): ComponentInfo | undefined {
  return getComponentRegistry().getComponent(name);
}

export function getAllComponents(): ComponentInfo[] {
  return getComponentRegistry().getAllComponents();
}

export function getComponentsWithSandbox(): ComponentInfo[] {
  return getComponentRegistry().getComponentsWithSandbox();
}

export function getComponentsWithDocs(): ComponentInfo[] {
  return getComponentRegistry().getComponentsWithDocs();
}
