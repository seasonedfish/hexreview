// utils.test.ts
import { getLanguageFromFilename } from './utils';

describe('getLanguageFromFilename', () => {
  it('should return "cpp" for .cpp file', () => {
    expect(getLanguageFromFilename('main.cpp')).toBe('cpp');
  });

  it('should return "typescript" for .ts file', () => {
    expect(getLanguageFromFilename('text.ts')).toBe('typescript');
  });

  it('should return "plain" for unknown extension', () => {
    expect(getLanguageFromFilename('unknownfile.xyz')).toBe('plain');
  });

  it('should return "javascript" for .js file', () => {
    expect(getLanguageFromFilename('app.js')).toBe('javascript');
  });

  it('should return "java" for .java file', () => {
    expect(getLanguageFromFilename('Main.java')).toBe('java');
  });
});
