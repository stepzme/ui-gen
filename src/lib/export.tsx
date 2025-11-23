import { PageData, DocumentData } from "@/types/document";

export function generatePageTSX(page: PageData, documentData: DocumentData): string {
  const componentName = page.name.replace(/[^a-zA-Z0-9]/g, "") || "Page";
  const elementsTSX = page.elements.map((el) => renderElement(el)).join("\n");

  return `import { ${getComponentImports(page.elements).join(", ")} } from "@/imported/components";

export default function ${componentName}() {
  return (
    <div className="w-full h-full">
${indent(elementsTSX, 6)}
    </div>
  );
}
`;
}

function renderElement(el: any, depth = 0): string {
  const Component = el.type.charAt(0).toUpperCase() + el.type.slice(1);
  const props = Object.entries(el.props || {})
    .map(([k, v]) => {
      if (typeof v === "string") return `${k}="${v}"`;
      if (typeof v === "boolean") return v ? k : "";
      if (typeof v === "number") return `${k}={${v}}`;
      return `${k}={${JSON.stringify(v)}}`;
    })
    .filter(Boolean)
    .join(" ");

  const children = el.children?.length ? el.children.map((c: any) => renderElement(c, depth + 1)).join("\n") : null;

  const indentStr = " ".repeat(depth * 2);
  if (children) {
    return `${indentStr}<${Component}${props ? " " + props : ""}>\n${children}\n${indentStr}</${Component}>`;
  }
  return `${indentStr}<${Component}${props ? " " + props : ""} />`;
}

function getComponentImports(elements: any[]): string[] {
  const imports = new Set<string>();
  function traverse(els: any[]) {
    for (const el of els) {
      if (el.type) imports.add(el.type);
      if (el.children) traverse(el.children);
    }
  }
  traverse(elements);
  return Array.from(imports);
}

function indent(str: string, spaces: number): string {
  return str
    .split("\n")
    .map((line) => (line.trim() ? " ".repeat(spaces) + line : ""))
    .join("\n");
}

export async function copyToClipboard(text: string): Promise<void> {
  await navigator.clipboard.writeText(text);
}

export async function downloadAsZip(files: { name: string; content: string }[]): Promise<void> {
  // TODO: implement zip download using JSZip or similar
  throw new Error("Zip download not yet implemented");
}

