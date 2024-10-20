"use client";

import Header from "@/components/header";
import { File, Folder, Tree } from "@/components/ui/file-tree";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/esm/styles/prism";
import BottomCommentsSection from "@/components/ui/BottomCommentsSection";
import RightCommentsSection from "@/components/ui/RightCommentsSection";
import { useEffect, useState } from "react";
import { getLineNumbers } from "@/lib/utils";

export default function FileTreeDemo() {
  const codeString = `
import toml from "toml";
import { RgbColor, fromHex, toHex } from "./rgbcolor";

export interface Ansi {
	black: RgbColor;
	red: RgbColor;
	green: RgbColor;
	yellow: RgbColor;
	blue: RgbColor;
	magenta: RgbColor;
	cyan: RgbColor;
	white: RgbColor;
}
      `;

  const [selection, setSelection] = useState({ begin: 0, end: 0 });
  const handleSelection = () => {
    const selection = window.getSelection();
    if (selection == null || selection.rangeCount === 0) return;

    const result = getLineNumbers(selection);
    if (!result) return;
    console.log(result.begin, result.end);
    setSelection({begin: result.begin, end: result.end});
  };

  useEffect(() => {

    // Add event listeners
    document.addEventListener('selectionchange', handleSelection);

    // Cleanup
    return () => {
      document.removeEventListener('selectionchange', handleSelection);
    };
  }, []);



  return (
    <div className="flex flex-col justify-items-stretch h-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Header></Header>
      <main className="flex-grow overflow-y-auto flex">
        <div className="relative basis-1/4 h-full flex w-1/2 flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
          <Tree
            className="p-2 overflow-hidden rounded-md bg-background h-full"
            initialSelectedId="7"
            initialExpandedItems={[
              "1",
              "2",
              "3",
              "4",
              "5",
              "6",
              "7",
              "8",
              "9",
              "10",
              "11",
            ]}
            elements={ELEMENTS}
          >
            <Folder element="src" value="1">
              <Folder value="2" element="app">
                <File value="3">
                  <p>layout.tsx</p>
                </File>
                <File value="4">
                  <p>page.tsx</p>
                </File>
              </Folder>
              <Folder value="5" element="components">
                <Folder value="6" element="ui">
                  <File value="7">
                    <p>button.tsx</p>
                  </File>
                </Folder>
                <File value="8">
                  <p>header.tsx</p>
                </File>
                <File value="9">
                  <p>footer.tsx</p>
                </File>
              </Folder>
              <Folder value="10" element="lib">
                <File value="11">
                  <p>utils.ts</p>
                </File>
              </Folder>
            </Folder>
          </Tree>
        </div>
        <div className="basis-1/2">
          <SyntaxHighlighter
            className="w-full h-full !m-0 !bg-black"
            language="typescript"
            style={okaidia}
            showLineNumbers={true}
            id="main-code"
          >
            {codeString}
          </SyntaxHighlighter>
        </div>
        <div className="basis-1/4">
          <RightCommentsSection />{" "}
          {/* Here is where the CommentsSection is rendered */}
        </div>
      </main>
      <div>
        <BottomCommentsSection />{" "}
      </div>
    </div>
  );
}

const ELEMENTS = [
  {
    id: "1",
    isSelectable: true,
    name: "src",
    children: [
      {
        id: "2",
        isSelectable: true,
        name: "app",
        children: [
          {
            id: "3",
            isSelectable: true,
            name: "layout.tsx",
          },
          {
            id: "4",
            isSelectable: true,
            name: "page.tsx",
          },
        ],
      },
      {
        id: "5",
        isSelectable: true,
        name: "components",
        children: [
          {
            id: "6",
            isSelectable: true,
            name: "header.tsx",
          },
          {
            id: "7",
            isSelectable: true,
            name: "footer.tsx",
          },
        ],
      },
      {
        id: "8",
        isSelectable: true,
        name: "lib",
        children: [
          {
            id: "9",
            isSelectable: true,
            name: "utils.ts",
          },
        ],
      },
    ],
  },
];
