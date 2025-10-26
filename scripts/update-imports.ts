import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

interface ImportUpdate {
  oldPath: string;
  newPath: string;
  componentName: string;
}

const importUpdates: ImportUpdate[] = [
  { oldPath: '@/components/ui/badge', newPath: '@/components/badge', componentName: 'Badge' },
  { oldPath: '@/components/ui/button', newPath: '@/components/button', componentName: 'Button' },
  { oldPath: '@/components/ui/avatar', newPath: '@/components/avatar', componentName: 'Avatar' },
  { oldPath: '@/components/ui/cell', newPath: '@/components/cell', componentName: 'Cell' },
  { oldPath: '@/components/ui/collapsible', newPath: '@/components/collapsible', componentName: 'Collapsible' },
  { oldPath: '@/components/ui/dialog', newPath: '@/components/dialog', componentName: 'Dialog' },
  { oldPath: '@/components/ui/dropdown-menu', newPath: '@/components/dropdown-menu', componentName: 'DropdownMenu' },
  { oldPath: '@/components/ui/image', newPath: '@/components/image', componentName: 'Image' },
  { oldPath: '@/components/ui/input', newPath: '@/components/input', componentName: 'Input' },
  { oldPath: '@/components/ui/label', newPath: '@/components/label', componentName: 'Label' },
  { oldPath: '@/components/ui/select', newPath: '@/components/select', componentName: 'Select' },
  { oldPath: '@/components/ui/separator', newPath: '@/components/separator', componentName: 'Separator' },
  { oldPath: '@/components/ui/sheet', newPath: '@/components/sheet', componentName: 'Sheet' },
  { oldPath: '@/components/ui/skeleton', newPath: '@/components/skeleton', componentName: 'Skeleton' },
  { oldPath: '@/components/ui/switch', newPath: '@/components/switch', componentName: 'Switch' },
  { oldPath: '@/components/ui/text', newPath: '@/components/text', componentName: 'Text' },
  { oldPath: '@/components/ui/textarea', newPath: '@/components/textarea', componentName: 'Textarea' },
  { oldPath: '@/components/ui/tooltip', newPath: '@/components/tooltip', componentName: 'Tooltip' },
];

function updateImportsInFile(filePath: string): boolean {
  try {
    const content = readFileSync(filePath, 'utf-8');
    let updatedContent = content;
    let hasChanges = false;

    for (const update of importUpdates) {
      const oldImportPattern = new RegExp(`from ['"]${update.oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"]`, 'g');
      const newImportPattern = `from "${update.newPath}"`;
      
      if (oldImportPattern.test(updatedContent)) {
        updatedContent = updatedContent.replace(oldImportPattern, newImportPattern);
        hasChanges = true;
        console.log(`  Updated import in ${filePath}: ${update.oldPath} -> ${update.newPath}`);
      }
    }

    if (hasChanges) {
      writeFileSync(filePath, updatedContent);
      return true;
    }

    return false;
  } catch (error) {
    console.warn(`Could not process file ${filePath}:`, error);
    return false;
  }
}

function scanDirectory(dirPath: string): string[] {
  const files: string[] = [];
  
  try {
    const items = readdirSync(dirPath);
    
    for (const item of items) {
      const itemPath = join(dirPath, item);
      const stat = statSync(itemPath);
      
      if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
        files.push(...scanDirectory(itemPath));
      } else if (stat.isFile() && (item.endsWith('.ts') || item.endsWith('.tsx'))) {
        files.push(itemPath);
      }
    }
  } catch (error) {
    console.warn(`Could not scan directory ${dirPath}:`, error);
  }
  
  return files;
}

function main(): void {
  console.log('Starting import updates...\n');
  
  const filesToUpdate = [
    ...scanDirectory('src/app'),
    ...scanDirectory('src/components'),
    ...scanDirectory('src/lib'),
  ];
  
  let updatedFiles = 0;
  
  for (const filePath of filesToUpdate) {
    if (updateImportsInFile(filePath)) {
      updatedFiles++;
    }
  }
  
  console.log(`\n🎉 Import update completed! Updated ${updatedFiles} files.`);
}

main();
