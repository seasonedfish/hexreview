import React from "react";
import { motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";

interface ProgressBarProps {
  progress: number;
  isComplete: boolean;
  fileName: string;
}

export default function ProgressBar({
  progress,
  isComplete,
  fileName,
}: ProgressBarProps) {
  return (
    <div className="w-full max-w-md">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-300 truncate">{fileName}</span>
        <span className="text-sm text-gray-400">{Math.round(progress)}%</span>
      </div>

      <div className="relative h-2 w-full bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-purple-500 to-purple-400"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="flex items-center mt-2">
        {isComplete ? (
          <div className="flex items-center text-green-400">
            <Check size={16} className="mr-1" />
            <span className="text-sm">Upload complete</span>
          </div>
        ) : (
          <div className="flex items-center text-purple-400">
            <Loader2 size={16} className="mr-1 animate-spin" />
            <span className="text-sm">Uploading...</span>
          </div>
        )}
      </div>
    </div>
  );
}
