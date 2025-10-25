import { collectAllComponents, generateComponentsSummary } from '../src/lib/component-collector';
import { getComponentRegistry } from '../src/lib/component-registry';
import { generateSandboxSummary } from '../src/lib/new-component-sandbox-config';

function testComponentStructure(): void {
  console.log('🧪 Testing new component structure...\n');
  
  // Test component collection
  console.log('📁 Testing component collection...');
  const components = collectAllComponents('src/components');
  console.log(`Found ${components.length} components:\n`);
  
  for (const component of components) {
    console.log(`  ${component.name}:`);
    console.log(`    - Component: ${component.hasComponent ? '✅' : '❌'}`);
    console.log(`    - Sandbox: ${component.hasSandbox ? '✅' : '❌'}`);
    console.log(`    - Docs: ${component.hasDocs ? '✅' : '❌'}`);
    console.log(`    - Index: ${component.hasIndex ? '✅' : '❌'}`);
    console.log(`    - Files: ${component.files.length}`);
    console.log('');
  }
  
  // Test component registry
  console.log('📚 Testing component registry...');
  const registry = getComponentRegistry();
  const allComponents = registry.getAllComponents();
  console.log(`Registry loaded ${allComponents.length} components\n`);
  
  for (const component of allComponents) {
    console.log(`  ${component.name}:`);
    console.log(`    - Has Component: ${component.component ? '✅' : '❌'}`);
    console.log(`    - Has Sandbox: ${component.sandboxConfig ? '✅' : '❌'}`);
    console.log(`    - Has Docs: ${component.docs ? '✅' : '❌'}`);
    console.log(`    - Complete: ${component.hasAllFiles ? '✅' : '❌'}`);
    console.log('');
  }
  
  // Test sandbox configurations
  console.log('🎮 Testing sandbox configurations...');
  const sandboxComponents = registry.getComponentsWithSandbox();
  console.log(`Found ${sandboxComponents.length} components with sandbox configs\n`);
  
  for (const component of sandboxComponents) {
    console.log(`  ${component.name}:`);
    if (component.sandboxConfig?.generateVariants) {
      try {
        const variants = component.sandboxConfig.generateVariants({ 
          id: component.name, 
          defaultProps: {} 
        });
        console.log(`    - Variant Sections: ${variants.length}`);
        console.log(`    - Total Variants: ${variants.reduce((sum, section) => sum + section.variants.length, 0)}`);
      } catch (error) {
        console.log(`    - Error: ${error}`);
      }
    }
    console.log('');
  }
  
  // Generate summaries
  console.log('📊 Generating summaries...');
  const componentSummary = generateComponentsSummary('src/components');
  const registrySummary = registry.getComponentSummary();
  const sandboxSummary = generateSandboxSummary();
  
  console.log('\n' + '='.repeat(50));
  console.log('COMPONENT COLLECTION SUMMARY');
  console.log('='.repeat(50));
  console.log(componentSummary);
  
  console.log('\n' + '='.repeat(50));
  console.log('COMPONENT REGISTRY SUMMARY');
  console.log('='.repeat(50));
  console.log(registrySummary);
  
  console.log('\n' + '='.repeat(50));
  console.log('SANDBOX CONFIGURATION SUMMARY');
  console.log('='.repeat(50));
  console.log(sandboxSummary);
  
  console.log('\n🎉 Structure test completed!');
}

testComponentStructure();
