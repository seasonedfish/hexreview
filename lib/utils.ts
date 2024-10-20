import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Define a mapping from file extensions to language names
const languageMap: Record<string, string> = {
  ".js": "javascript",
  ".jsx": "javascript",
  ".ts": "typescript",
  ".tsx": "typescript",
  ".py": "python",
  ".java": "java",
  ".cpp": "cpp",
  ".c": "c",
  ".html": "html",
  ".css": "css",
  ".php": "php",
  ".rb": "ruby",
  ".go": "go",
  ".swift": "swift",
  ".rs": "rust",
  ".json": "json"
  // Add more extensions as needed based on the react-syntax-highlighter documentation
};

/**
 * Get the language name based on the file extension
 * @param filename - The name of the file
 * @returns The corresponding language name or 'plain' if not found
 */
export function getLanguageFromFilename(filename: string): string {
  const extension = filename.slice(filename.lastIndexOf('.'));
  return languageMap[extension] || 'plain'; // Return 'plain' if the extension is not recognized
}

export function isInCode(node: Node | null) {
  if (!node) {
    return false;
  }

  if (node.nodeName === "CODE") {
    return true;
  }
  else if (node.parentElement?.nodeName === "CODE") {
    return true;
  }
  else if (node.parentElement?.matches("code *")) {
    return true;
  }
  return false;
}

export function getTopLevelSpan(range: Range) {
  if (range.startContainer.parentElement?.matches("code")) {
    return range.startContainer;
  }
  let element = range.startContainer.parentElement;
  while (true) {
    if (element?.parentElement?.matches("code")) {
      return element;
    }
    element = element?.parentElement ?? null;
  }
}

export const getLineNumbers = function (selection: Selection): {begin: number, end: number} | undefined {
  const beginElement = getTopLevelSpan(selection.getRangeAt(0));
  const code = beginElement.parentElement;
  if (!code) {
    console.warn("Could not get code parent element");
    return undefined;
  }

  let lineNumber = 1;
  let i = 0;
  for (; i < code.children.length; i++) {
    const currentChild = code.children[i];

    if (currentChild === beginElement) {
      break;
    }
    if (currentChild.matches(".linenumber")) {
      if (!currentChild.textContent) {
        return undefined;
      }
      lineNumber = Number.parseInt(currentChild.textContent)
    }
  }
  const begin = lineNumber;

  const endElement = getTopLevelSpan(selection.getRangeAt(selection.rangeCount - 1));
  if (!endElement) {
    console.warn("Could not get end element");
    return undefined;
  }
  for (; i < code.children.length; i++) {
    const currentChild = code.children[i];

    if (currentChild === endElement) {
      break;
    }
    if (currentChild.matches(".linenumber")) {
      if (!currentChild.textContent) {
        return undefined;
      }
      lineNumber = Number.parseInt(currentChild.textContent)
    }
  }
  const end = lineNumber;

  return {begin: begin, end: end};
}
