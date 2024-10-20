"use client";
import React from "react";
import { User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const RightCommentsSection = () => {
  const comments = [
    {
      id: 1,
      author: "John Doe",
      fileName: "button.tsx",
      lineNumber: 42,
      content:
        "We should consider adding aria-labels for better accessibility.",
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      author: "Jane Smith",
      fileName: "utils.ts",
      lineNumber: 15,
      content: "This utility function could be optimized further.",
      timestamp: "5 hours ago",
    },
    {
      id: 3,
      author: "Mike Johnson",
      fileName: "header.tsx",
      lineNumber: 23,
      content: "The responsive design breaks at smaller viewport sizes.",
      timestamp: "1 day ago",
    },
    {
      id: 4,
      author: "Mike Johnson",
      fileName: "header.tsx",
      lineNumber: 23,
      content: "The responsive design breaks at smaller viewport sizes.",
      timestamp: "1 day ago",
    },
    {
      id: 5,
      author: "Mike Johnson",
      fileName: "header.tsx",
      lineNumber: 23,
      content: "The responsive design breaks at smaller viewport sizes.",
      timestamp: "1 day ago",
    },
    {
      id: 6,
      author: "Mike Johnson",
      fileName: "header.tsx",
      lineNumber: 23,
      content: "The responsive design breaks at smaller viewport sizes.",
      timestamp: "1 day ago",
    },
  ];

  return (
    <div className="w-full bg-gray-900 p-4">
      <h2 className="text-xl font-bold mb-4 text-white">Comments</h2>
      <div className="overflow-y-auto" style={{ maxHeight: "600px" }}>
        <div className="space-y-4">
          {comments.map((comment) => (
            <Card key={comment.id} className="bg-gray-800 border-gray-700">
              <CardContent className="pt-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                      <User className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-white">
                        {comment.author}
                      </span>
                      <span className="text-sm text-gray-400">
                        {comment.timestamp}
                      </span>
                    </div>
                    <div className="text-sm text-gray-400 mb-1">
                      {comment.fileName} • Line {comment.lineNumber}
                    </div>
                    <p className="text-gray-200">{comment.content}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightCommentsSection;
