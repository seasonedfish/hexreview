import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const comments = [
  {
    id: 1,
    author: "John Doe",
    fileName: "button.tsx",
    lineNumber: 42,
    content: "We should consider adding aria-labels for better accessibility.",
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

export function BottomCommentsSection() {
  return (
    <div className="overflow-y-auto" style={{ maxHeight: "200px" }}>
      <Table className="min-w-full">
        <TableBody>
          {comments.map((comment) => (
            <TableRow key={comment.id}>
              <TableCell className="font-medium">{comment.author}</TableCell>
              <TableCell>{comment.fileName}</TableCell>
              <TableCell>{comment.lineNumber}</TableCell>
              <TableCell>{comment.content}</TableCell>
              <TableCell className="text-right">{comment.timestamp}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default BottomCommentsSection;
