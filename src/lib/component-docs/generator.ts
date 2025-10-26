import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';
import { ComponentDocumentation, ComponentDocsConfig } from './types';
import { categories } from './categories';

/**
 * Генератор документации компонентов
 * Парсит docs.md файлы и создает структурированную конфигурацию
 */
export class ComponentDocsGenerator {
  private componentsPath: string;

  constructor(componentsPath: string = join(process.cwd(), 'src/components')) {
    this.componentsPath = componentsPath;
  }

  /**
   * Генерирует конфигурацию документации для всех компонентов
   */
  public generateDocsConfig(): ComponentDocsConfig {
    const config: ComponentDocsConfig = {};
    
    try {
      const componentDirs = this.getComponentDirectories();
      
      for (const dir of componentDirs) {
        const componentName = dir.split('/').pop() || '';
        const docsPath = join(dir, 'docs.md');
        
        try {
          if (statSync(docsPath).isFile()) {
            const docsContent = readFileSync(docsPath, 'utf-8');
            const parsedDocs = this.parseMarkdownDocs(docsContent, componentName);
            
            if (parsedDocs) {
              config[componentName] = parsedDocs;
            }
          }
        } catch (error) {
          console.warn(`Could not read docs for ${componentName}:`, error);
        }
      }
    } catch (error) {
      console.error('Error generating docs config:', error);
    }

    return config;
  }

  /**
   * Получает список директорий компонентов
   */
  private getComponentDirectories(): string[] {
    const dirs: string[] = [];
    
    try {
      const items = readdirSync(this.componentsPath);
      
      for (const item of items) {
        const itemPath = join(this.componentsPath, item);
        const stat = statSync(itemPath);
        
        if (stat.isDirectory() && item !== 'ui') {
          dirs.push(itemPath);
        }
      }
    } catch (error) {
      console.error('Error reading components directory:', error);
    }

    return dirs;
  }

  /**
   * Парсит markdown документацию компонента
   */
  private parseMarkdownDocs(content: string, componentName: string): ComponentDocumentation | null {
    try {
      const lines = content.split('\n');
      let currentSection = '';
      
      const title = componentName.charAt(0).toUpperCase() + componentName.slice(1);
      const category = this.parseCategoryFromDocs(lines) || this.determineCategory(componentName);
      
      let description = '';
      let props: any[] = [];
      let examples: any[] = [];
      let variants: any[] = [];
      let accessibility: any[] = [];
      let bestPractices: any[] = [];

      // Парсим содержимое по секциям
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        if (line.startsWith('# ')) {
          // Заголовок компонента - извлекаем описание
          description = this.extractDescription(lines, i + 1);
        } else if (line.toLowerCase().includes('## props') || line.toLowerCase().includes('## properties')) {
          currentSection = 'props';
          props = this.parsePropsSection(lines, i + 1);
        } else if (line.toLowerCase().includes('## examples') || line.toLowerCase().includes('## usage')) {
          currentSection = 'examples';
          examples = this.parseExamplesSection(lines, i + 1);
        } else if (line.toLowerCase().includes('## variants') || line.toLowerCase().includes('## types')) {
          currentSection = 'variants';
          variants = this.parseVariantsSection(lines, i + 1);
        } else if (line.toLowerCase().includes('## accessibility')) {
          currentSection = 'accessibility';
          accessibility = this.parseAccessibilitySection(lines, i + 1);
        } else if (line.toLowerCase().includes('## best practices') || line.toLowerCase().includes('## guidelines')) {
          currentSection = 'bestPractices';
          bestPractices = this.parseBestPracticesSection(lines, i + 1);
        }
      }

      return {
        title,
        description: description || `A ${title} component for the design system.`,
        category,
        props: props.length > 0 ? props : this.getDefaultProps(componentName),
        examples: examples.length > 0 ? examples : this.getDefaultExamples(title),
        variants: variants.length > 0 ? variants : this.getDefaultVariants(title),
        accessibility: accessibility.length > 0 ? accessibility : this.getDefaultAccessibility(),
        bestPractices: bestPractices.length > 0 ? bestPractices : this.getDefaultBestPractices(title),
        relatedComponents: [],
        designTokens: [],
        notes: []
      };
    } catch (error) {
      console.error(`Error parsing docs for ${componentName}:`, error);
      return null;
    }
  }

  /**
   * Парсит категорию из документации
   */
  private parseCategoryFromDocs(lines: string[]): string | null {
    for (const line of lines) {
      // Ищем строки вида "**Category:** Базовые" или "Category: Базовые"
      const categoryMatch = line.match(/\*\*Category:\*\*\s*(.+)|Category:\s*(.+)/i);
      if (categoryMatch) {
        const category = (categoryMatch[1] || categoryMatch[2])?.trim();
        if (category && categories[category]) {
          return category;
        }
      }
    }
    return null;
  }

  /**
   * Определяет категорию компонента (fallback если не найдена в docs.md)
   */
  private determineCategory(componentName: string): string {
    // Простой fallback - если категория не найдена в docs.md, используем "Базовые"
    return 'Базовые';
  }

  /**
   * Извлекает описание из заголовка
   */
  private extractDescription(lines: string[], startIndex: number): string {
    let description = '';
    for (let i = startIndex; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith('##') || line.startsWith('#')) {
        break;
      }
      if (line && !line.startsWith('-') && !line.startsWith('*')) {
        description += line + ' ';
      }
    }
    return description.trim();
  }

  /**
   * Парсит секцию пропсов
   */
  private parsePropsSection(lines: string[], startIndex: number): any[] {
    const props: any[] = [];
    let inTable = false;
    
    for (let i = startIndex; i < lines.length; i++) {
      const line = lines[i].trim();
      
      if (line.startsWith('##')) {
        break;
      }
      
      if (line.includes('|') && line.includes('Prop')) {
        inTable = true;
        continue;
      }
      
      if (inTable && line.includes('|') && !line.includes('---')) {
        const cells = line.split('|').map(cell => cell.trim()).filter(cell => cell);
        if (cells.length >= 4) {
          const defaultValue = cells[2] === '-' ? undefined : cells[2];
          props.push({
            name: cells[0] || 'prop',
            type: cells[1] || 'any',
            defaultValue,
            required: !defaultValue || defaultValue === '-',
            description: cells[3] || 'No description',
            example: cells[4] || undefined
          });
        }
      }
    }
    
    return props;
  }

  /**
   * Парсит секцию примеров
   */
  private parseExamplesSection(lines: string[], startIndex: number): any[] {
    const examples: any[] = [];
    let currentExample: any = null;
    let inCodeBlock = false;
    let codeContent = '';
    
    for (let i = startIndex; i < lines.length; i++) {
      const line = lines[i].trim();
      
      if (line.startsWith('##')) {
        break;
      }
      
      if (line.startsWith('### ')) {
        if (currentExample) {
          examples.push(currentExample);
        }
        currentExample = {
          title: line.replace('### ', ''),
          description: '',
          code: '',
          language: 'tsx' as const
        };
      } else if (line.startsWith('```')) {
        if (inCodeBlock && currentExample) {
          currentExample.code = codeContent.trim();
          codeContent = '';
        }
        inCodeBlock = !inCodeBlock;
      } else if (inCodeBlock && currentExample) {
        codeContent += line + '\n';
      } else if (currentExample && !inCodeBlock && line && !line.startsWith('-')) {
        currentExample.description += line + ' ';
      }
    }
    
    if (currentExample) {
      examples.push(currentExample);
    }
    
    return examples;
  }

  /**
   * Парсит секцию вариантов
   */
  private parseVariantsSection(lines: string[], startIndex: number): any[] {
    const variants: any[] = [];
    let currentVariant: any = null;
    
    for (let i = startIndex; i < lines.length; i++) {
      const line = lines[i].trim();
      
      if (line.startsWith('##')) {
        break;
      }
      
      if (line.startsWith('### ')) {
        if (currentVariant) {
          variants.push(currentVariant);
        }
        currentVariant = {
          name: line.replace('### ', ''),
          description: '',
          usage: '',
          example: ''
        };
      } else if (currentVariant && line.startsWith('- ')) {
        const content = line.replace('- ', '');
        if (content.toLowerCase().includes('usage')) {
          currentVariant.usage = content;
        } else if (content.toLowerCase().includes('example')) {
          currentVariant.example = content;
        } else {
          currentVariant.description = content;
        }
      }
    }
    
    if (currentVariant) {
      variants.push(currentVariant);
    }
    
    return variants;
  }

  /**
   * Парсит секцию accessibility
   */
  private parseAccessibilitySection(lines: string[], startIndex: number): any[] {
    const accessibility: any[] = [];
    let currentItem: any = null;
    
    for (let i = startIndex; i < lines.length; i++) {
      const line = lines[i].trim();
      
      if (line.startsWith('##')) {
        break;
      }
      
      if (line.startsWith('### ')) {
        if (currentItem) {
          accessibility.push(currentItem);
        }
        currentItem = {
          title: line.replace('### ', ''),
          description: '',
          implementation: ''
        };
      } else if (currentItem && line.startsWith('- ')) {
        const content = line.replace('- ', '');
        if (content.toLowerCase().includes('implementation')) {
          currentItem.implementation = content;
        } else {
          currentItem.description = content;
        }
      }
    }
    
    if (currentItem) {
      accessibility.push(currentItem);
    }
    
    return accessibility;
  }

  /**
   * Парсит секцию best practices
   */
  private parseBestPracticesSection(lines: string[], startIndex: number): any[] {
    const bestPractices: any[] = [];
    let currentPractice: any = null;
    let currentDo: string[] = [];
    let currentDont: string[] = [];
    
    for (let i = startIndex; i < lines.length; i++) {
      const line = lines[i].trim();
      
      if (line.startsWith('##')) {
        break;
      }
      
      if (line.startsWith('### ')) {
        if (currentPractice) {
          currentPractice.do = currentDo;
          currentPractice.dont = currentDont;
          bestPractices.push(currentPractice);
        }
        currentPractice = {
          title: line.replace('### ', ''),
          description: '',
          do: [],
          dont: []
        };
        currentDo = [];
        currentDont = [];
      } else if (currentPractice && line.startsWith('- ')) {
        const content = line.replace('- ', '');
        if (content.toLowerCase().startsWith('do:')) {
          // Следующие строки будут do
          continue;
        } else if (content.toLowerCase().startsWith('don\'t:') || content.toLowerCase().startsWith('dont:')) {
          // Следующие строки будут dont
          continue;
        } else if (content) {
          currentPractice.description = content;
        }
      }
    }
    
    if (currentPractice) {
      currentPractice.do = currentDo;
      currentPractice.dont = currentDont;
      bestPractices.push(currentPractice);
    }
    
    return bestPractices;
  }

  /**
   * Возвращает дефолтные пропсы для компонента
   */
  private getDefaultProps(componentName: string): any[] {
    return [
      {
        name: 'children',
        type: 'ReactNode',
        required: false,
        description: 'The content of the component',
        example: 'children'
      },
      {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Additional CSS classes',
        example: 'className="custom-class"'
      }
    ];
  }

  /**
   * Возвращает дефолтные примеры
   */
  private getDefaultExamples(title: string): any[] {
    return [
      {
        title: 'Basic Usage',
        description: `Basic example of ${title} component`,
        code: `<${title}>Content</${title}>`,
        language: 'tsx' as const
      }
    ];
  }

  /**
   * Возвращает дефолтные варианты
   */
  private getDefaultVariants(title: string): any[] {
    return [
      {
        name: 'Default',
        description: `Default variant of ${title}`,
        usage: 'Use for standard cases',
        example: `<${title}>Default</${title}>`
      }
    ];
  }

  /**
   * Возвращает дефолтную accessibility информацию
   */
  private getDefaultAccessibility(): any[] {
    return [
      {
        title: 'Keyboard Navigation',
        description: 'Component supports keyboard navigation',
        implementation: 'Use Tab to navigate, Enter/Space to activate'
      }
    ];
  }

  /**
   * Возвращает дефолтные best practices
   */
  private getDefaultBestPractices(title: string): any[] {
    return [
      {
        title: 'Usage Guidelines',
        description: `Best practices for using ${title}`,
        do: ['Use for appropriate use cases', 'Follow accessibility guidelines'],
        dont: ['Don\'t overuse', 'Don\'t ignore accessibility']
      }
    ];
  }
}

/**
 * Создает экземпляр генератора и генерирует конфигурацию
 */
export function generateComponentDocs(): ComponentDocsConfig {
  const generator = new ComponentDocsGenerator();
  return generator.generateDocsConfig();
}
