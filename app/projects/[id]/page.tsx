"use client";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import Header from "@/components/header";
import { File, Folder, Tree } from "@/components/ui/file-tree";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/esm/styles/prism";
import BottomCommentsSection from "@/components/ui/BottomCommentsSection";
import RightCommentsSection from "@/components/ui/RightCommentsSection";
import { useEffect, useRef, useState } from "react";
import { getLineNumbers, isInCode } from "@/lib/utils";
import { Card } from "@/components/ui/card";

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

	brightBlack: RgbColor;
	brightRed: RgbColor;
	brightGreen: RgbColor;
	brightYellow: RgbColor;
	brightBlue: RgbColor;
	brightMagenta: RgbColor;
	brightCyan: RgbColor;
	brightWhite: RgbColor;
}

export function normalColors(ansi: Ansi): Array<RgbColor> {
	return [
		ansi.black,
		ansi.red,
		ansi.green,
		ansi.yellow,
		ansi.blue,
		ansi.magenta,
		ansi.cyan,
		ansi.white,
	]
}`;

  const menuRef = useRef(null);

  const handleShare = () => {
    // You can implement sharing logic here
    alert("Sharing functionality coming soon!");
  };

  const [selection, setSelection] = useState({ begin: 0, end: 0 });
  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

    const handleSelection = () => {
      setShowMenu(false);
      const selection = window.getSelection();
      if (selection == null || selection.rangeCount === 0 || selection.type === "Caret") return;

      if (!isInCode(selection.anchorNode) || !isInCode(selection.anchorNode)) {
        return;
      }
  
      const result = getLineNumbers(selection);
      if (!result) return;

      setSelection({ begin: result.begin, end: result.end });
      
      // Get the bounding box of the selected range
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
    
      // Set the position of the floating menu
      setMenuPosition({ top: rect.top, left: rect.left + 300});
    
      setShowMenu(true);
    };

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false); // Hide the menu if click is outside
      }
    };
    

    const handleCommentSubmit = (comment) => {
      console.log("Comment submitted:", comment, "for selection:", selection);
      setShowMenu(false); // Hide the menu after submitting a comment
    };
  
    useEffect(() => {
      // Add event listeners
      document.addEventListener('mouseup', handleSelection);
      document.addEventListener('mousedown', handleClickOutside);
  
      // Cleanup
      return () => {
        document.removeEventListener('mouseup', handleSelection);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

  return (
    <div className="flex flex-col justify-items-stretch h-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="relative">
        <Header />
        <div className="absolute top-4 right-4">
          <Button className="flex items-center gap-2 border-white bg-gray-900 text-white ">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>
      </div>
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
          {
            showMenu && (
              <Card
                style={{
                  position: 'absolute', 
                  top: `${menuPosition.top}px`, 
                  left: `${menuPosition.left}px`, 
                }}
                className="bg-gray-900 border-gray-700"
                ref={menuRef}
              >
                <div className="m-2">
                  <textarea 
                    placeholder="Enter your comment" 
                    rows={3}
                    style={{ width: '200px' }}
                    className="rounded-md p-2 bg-gray-950"
                  ></textarea>
                  <div className="mt-2">
                    <button className="bg-gray-950 p-2 rounded-sm" onClick={() => handleCommentSubmit("User's comment here")}>Submit</button>
                  </div>
                </div>
              </Card>
            )
          }
        </div>
        <div className="basis-1/4 h-full overflow-auto">
          <RightCommentsSection />
        </div>
      </main>
      <div>
        <BottomCommentsSection />
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
