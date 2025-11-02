import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const iconsDir = join(process.cwd(), 'src/components/icon/icons');

// Преобразует имя файла в имя компонента (PascalCase)
function toComponentName(filename: string): string {
  // Убираем ic_24_ и .svg
  const name = filename.replace(/^ic_24_/, '').replace(/\.svg$/, '');
  
  // Преобразуем snake_case в PascalCase
  return name
    .split(/[-_]/)
    .map(word => {
      // Обрабатываем специальные случаи
      if (word === 'nfc') return 'NFC';
      if (word === 'totp') return 'TOTP';
      if (word === 'vk') return 'VK';
      if (word === 'e') return 'E';
      if (word === 'sim') return 'SIM';
      if (word === 'sms') return 'SMS';
      // Если слово начинается с цифры
      if (/^\d/.test(word)) {
        const numMap: Record<string, string> = {
          '7': 'Seven',
          '3': 'Three',
        };
        return numMap[word] || word;
      }
      // Обычное слово - первая буква заглавная
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join('');
}

// Преобразует имя файла в variant (kebab-case)
function toVariantName(filename: string): string {
  const name = filename.replace(/^ic_24_/, '').replace(/\.svg$/, '');
  return name;
}

// Конвертирует SVG атрибуты с дефисами в camelCase для React
function convertSvgAttributesToReact(content: string): string {
  // Маппинг SVG атрибутов в React формат
  const attributeMap: Record<string, string> = {
    'clip-path': 'clipPath',
    'fill-rule': 'fillRule',
    'clip-rule': 'clipRule',
    'stroke-width': 'strokeWidth',
    'stroke-linecap': 'strokeLinecap',
    'stroke-linejoin': 'strokeLinejoin',
    'stroke-dasharray': 'strokeDasharray',
    'stroke-dashoffset': 'strokeDashoffset',
    'stroke-miterlimit': 'strokeMiterlimit',
    'font-family': 'fontFamily',
    'font-size': 'fontSize',
    'font-weight': 'fontWeight',
    'text-anchor': 'textAnchor',
    'xlink:href': 'xlinkHref',
    'xml:space': 'xmlSpace',
  };

  let converted = content;
  
  // Заменяем все атрибуты с дефисами
  for (const [oldAttr, newAttr] of Object.entries(attributeMap)) {
    const regex = new RegExp(`\\b${oldAttr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}=`, 'g');
    converted = converted.replace(regex, `${newAttr}=`);
  }

  return converted;
}

// Конвертирует SVG в React компонент
function convertSvgToComponent(svgContent: string, componentName: string): string {
  // Заменяем fill="#22252B" на fill="currentColor"
  let converted = svgContent
    .replace(/fill="#22252B"/g, 'fill="currentColor"')
    .replace(/fill="#000"/g, 'fill="currentColor"')
    .replace(/fill="#000000"/g, 'fill="currentColor"')
    .replace(/fill="black"/g, 'fill="currentColor"')
    // Убираем width и height атрибуты, оставляем viewBox
    .replace(/\s+width="[^"]*"/g, '')
    .replace(/\s+height="[^"]*"/g, '')
    // Убираем xmlns если есть (React добавляет автоматически)
    .replace(/\s+xmlns="[^"]*"/g, '');

  // Убираем обертку <svg> чтобы можно было добавить props
  const svgMatch = converted.match(/<svg([^>]*)>(.*?)<\/svg>/s);
  if (!svgMatch) {
    throw new Error(`Invalid SVG format in ${componentName}`);
  }

  const svgAttrs = svgMatch[1];
  let innerSvgContent = svgMatch[2];

  // Конвертируем SVG атрибуты в React формат
  innerSvgContent = convertSvgAttributesToReact(innerSvgContent);
  
  // Удаляем атрибут style (React не поддерживает style как строку в SVG)
  // Это нужно для избежания ошибок, если style присутствует в SVG
  innerSvgContent = innerSvgContent.replace(/\s+style="[^"]*"/g, '');

  // Извлекаем viewBox если есть
  const viewBoxMatch = svgAttrs.match(/viewBox="([^"]*)"/);
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24';

  return `import * as React from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function ${componentName}({ className, ...props }: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="${viewBox}"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      {...props}
    >
${innerSvgContent
  .split('\n')
  .map(line => '      ' + line)
  .join('\n')}
    </svg>
  )
}
`;
}

// Главная функция
function main() {
  try {
    const files = readdirSync(iconsDir)
      .filter(file => file.endsWith('.svg'));

    console.log(`Found ${files.length} SVG files`);

    const registrations: string[] = [];
    const iconNames: string[] = [];

    for (const file of files) {
      try {
        const filePath = join(iconsDir, file);
        const svgContent = readFileSync(filePath, 'utf-8');
        
        const componentName = toComponentName(file);
        const variantName = toVariantName(file);
        
        // Создаем React компонент
        const componentCode = convertSvgToComponent(svgContent, componentName);
        const componentFileName = file.replace('.svg', '.tsx');
        const componentFilePath = join(iconsDir, componentFileName);
        
        writeFileSync(componentFilePath, componentCode);
        
        // Добавляем в список регистраций
        registrations.push(`import { ${componentName} } from "./${componentFileName.replace('.tsx', '')}"`);
        registrations.push(`registerIcon("${variantName}", ${componentName})`);
        
        iconNames.push(`"${variantName}"`);
        
        console.log(`✓ Created ${componentName} (variant: ${variantName})`);
      } catch (error) {
        console.error(`✗ Error processing ${file}:`, error);
      }
    }

    // Создаем index.ts
    const indexContent = `// Регистрация всех иконок
// Этот файл автоматически сгенерирован. Не редактируйте вручную.

import { registerIcon } from "../icon"

${registrations.join('\n')}

// Список всех доступных имен иконок для TypeScript типизации
export const iconNames = [${iconNames.join(',\n  ')}] as const

export type IconName = typeof iconNames[number]
`;

    const indexPath = join(iconsDir, 'index.ts');
    writeFileSync(indexPath, indexContent);
    
    console.log(`\n✓ Generated ${files.length} icon components`);
    console.log(`✓ Created index.ts with ${iconNames.length} registered icons`);
  } catch (error) {
    console.error('Error generating icons:', error);
    process.exit(1);
  }
}

main();

