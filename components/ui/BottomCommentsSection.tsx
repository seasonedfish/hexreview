import React from "react";

const BottomCommentsSection = () => {
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
  ];

  return (
    <div className="w-full bg-gray-900 p-4">
      <h2 className="text-xl font-bold mb-4 text-white">Comments</h2>
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border border-gray-700 text-white">
              Author
            </th>
            <th className="px-4 py-2 border border-gray-700 text-white">
              File
            </th>
            <th className="px-4 py-2 border border-gray-700 text-white">
              Line
            </th>
            <th className="px-4 py-2 border border-gray-700 text-white">
              Comment
            </th>
            <th className="px-4 py-2 border border-gray-700 text-white">
              Timestamp
            </th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment) => (
            <tr key={comment.id}>
              <td className="px-4 py-2 border border-gray-700 text-gray-300">
                {comment.author}
              </td>
              <td className="px-4 py-2 border border-gray-700 text-gray-300">
                {comment.fileName}
              </td>
              <td className="px-4 py-2 border border-gray-700 text-gray-300">
                {comment.lineNumber}
              </td>
              <td className="px-4 py-2 border border-gray-700 text-gray-300">
                {comment.content}
              </td>
              <td className="px-4 py-2 border border-gray-700 text-gray-300">
                {comment.timestamp}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BottomCommentsSection;
