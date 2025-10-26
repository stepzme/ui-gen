import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

interface ComponentMigration {
  name: string;
  sourcePath: string;
  targetPath: string;
}

const componentsToMigrate: ComponentMigration[] = [
  { name: 'avatar', sourcePath: 'src/components/ui/avatar.tsx', targetPath: 'src/components/avatar' },
  { name: 'cell', sourcePath: 'src/components/ui/cell.tsx', targetPath: 'src/components/cell' },
  { name: 'collapsible', sourcePath: 'src/components/ui/collapsible.tsx', targetPath: 'src/components/collapsible' },
  { name: 'dialog', sourcePath: 'src/components/ui/dialog.tsx', targetPath: 'src/components/dialog' },
  { name: 'dropdown-menu', sourcePath: 'src/components/ui/dropdown-menu.tsx', targetPath: 'src/components/dropdown-menu' },
  { name: 'image', sourcePath: 'src/components/ui/image.tsx', targetPath: 'src/components/image' },
  { name: 'input', sourcePath: 'src/components/ui/input.tsx', targetPath: 'src/components/input' },
  { name: 'label', sourcePath: 'src/components/ui/label.tsx', targetPath: 'src/components/label' },
  { name: 'select', sourcePath: 'src/components/ui/select.tsx', targetPath: 'src/components/select' },
  { name: 'separator', sourcePath: 'src/components/ui/separator.tsx', targetPath: 'src/components/separator' },
  { name: 'sheet', sourcePath: 'src/components/ui/sheet.tsx', targetPath: 'src/components/sheet' },
  { name: 'skeleton', sourcePath: 'src/components/ui/skeleton.tsx', targetPath: 'src/components/skeleton' },
  { name: 'switch', sourcePath: 'src/components/ui/switch.tsx', targetPath: 'src/components/switch' },
  { name: 'text', sourcePath: 'src/components/ui/text.tsx', targetPath: 'src/components/text' },
  { name: 'textarea', sourcePath: 'src/components/ui/textarea.tsx', targetPath: 'src/components/textarea' },
  { name: 'tooltip', sourcePath: 'src/components/ui/tooltip.tsx', targetPath: 'src/components/tooltip' },
];

function migrateComponent(migration: ComponentMigration): void {
  const { name, sourcePath, targetPath } = migration;
  
  console.log(`Migrating ${name}...`);
  
  // Create target directory if it doesn't exist
  if (!existsSync(targetPath)) {
    mkdirSync(targetPath, { recursive: true });
  }
  
  // Read source file
  const sourceContent = readFileSync(sourcePath, 'utf-8');
  
  // Write component file
  const componentFileName = `${name}.tsx`;
  const componentPath = join(targetPath, componentFileName);
  writeFileSync(componentPath, sourceContent);
  
  // Create basic sandbox config
  const sandboxConfig = `import type { SandboxSection } from "@/lib/component-sandbox-config";

export const ${name}SandboxConfig = {
  generateVariants: (component: any): SandboxSection[] => {
    // TODO: Implement sandbox variants for ${name}
    return [
      {
        title: 'Basic Variants',
        variants: [
          {
            label: 'Default',
            props: {
              ...component.defaultProps
            }
          }
        ]
      }
    ];
  }
};`;
  
  const sandboxPath = join(targetPath, 'sandbox.config.ts');
  writeFileSync(sandboxPath, sandboxConfig);
  
  // Create basic docs
  const docsContent = `# ${name.charAt(0).toUpperCase() + name.slice(1)} Component

A ${name} component for the design system.

## Usage

\`\`\`tsx
import { ${name.charAt(0).toUpperCase() + name.slice(1)} } from "@/components/${name}/${name}"

<${name.charAt(0).toUpperCase() + name.slice(1)}>
  Content
</${name.charAt(0).toUpperCase() + name.slice(1)}>
\`\`\`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`className\` | \`string\` | - | Additional CSS classes |

## Examples

### Basic Usage
\`\`\`tsx
<${name.charAt(0).toUpperCase() + name.slice(1)}>
  Basic ${name}
</${name.charAt(0).toUpperCase() + name.slice(1)}>
\`\`\`

## Accessibility

- Proper ARIA attributes
- Keyboard navigation support
- Screen reader compatibility
`;
  
  const docsPath = join(targetPath, 'docs.md');
  writeFileSync(docsPath, docsContent);
  
  // Create index file
  const indexContent = `export { ${name.charAt(0).toUpperCase() + name.slice(1)} } from "./${name}";
export { ${name}SandboxConfig } from "./sandbox.config";`;
  
  const indexPath = join(targetPath, 'index.ts');
  writeFileSync(indexPath, indexContent);
  
  console.log(`✅ Migrated ${name} successfully`);
}

function main(): void {
  console.log('Starting component migration...\n');
  
  for (const migration of componentsToMigrate) {
    try {
      migrateComponent(migration);
    } catch (error) {
      console.error(`❌ Failed to migrate ${migration.name}:`, error);
    }
  }
  
  console.log('\n🎉 Component migration completed!');
}

main();
