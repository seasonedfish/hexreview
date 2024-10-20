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
];

export function BottomCommentsSection() {
  return (
    <Table>
      <TableCaption>A list of recent code comments.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-white border border-white">
            Author
          </TableHead>
          <TableHead className="text-white border border-white">File</TableHead>
          <TableHead className="text-white border border-white">Line</TableHead>
          <TableHead className="text-white border border-white">
            Comment
          </TableHead>
          <TableHead className="text-right text-white border border-white">
            Timestamp
          </TableHead>
        </TableRow>
      </TableHeader>
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
  );
}

export default BottomCommentsSection;
