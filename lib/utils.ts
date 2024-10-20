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
  ".rs": "rust"
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