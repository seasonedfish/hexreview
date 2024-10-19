"use client";
import React, { DragEvent, useState } from "react";
import {
  Upload,
  User,
  LogOut,
  ChevronDown,
  File,
  FolderOpen,
  Clock,
  Plus,
  Hexagon,
  Code2,
  MessageSquare,
} from "lucide-react";

export default function HomePage() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Mock data for projects
  const recentProjects = [
    {
      id: 1,
      name: "Authentication Service",
      language: "Python",
      lastEdited: "2 hours ago",
      annotations: 12,
    },
    {
      id: 2,
      name: "Frontend Components",
      language: "React",
      lastEdited: "1 day ago",
      annotations: 8,
    },
    {
      id: 3,
      name: "API Integration",
      language: "JavaScript",
      lastEdited: "3 days ago",
      annotations: 15,
    },
  ];

  const pastAnnotations = [
    {
      id: 1,
      name: "Database Schema",
      language: "SQL",
      annotatedAt: "1 week ago",
      collaborators: 3,
    },
    {
      id: 2,
      name: "Auth Middleware",
      language: "Node.js",
      annotatedAt: "2 weeks ago",
      collaborators: 2,
    },
    {
      id: 3,
      name: "UI Components",
      language: "React",
      annotatedAt: "3 weeks ago",
      collaborators: 4,
    },
  ];

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    // Handle file drop logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="border-b border-white/[0.05] backdrop-blur-xl bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <Hexagon
                  size={32}
                  className="text-purple-500"
                  fill="rgba(147, 51, 234, 0.1)"
                />
                <Code2
                  size={16}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-purple-300"
                />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent">
                HexReview
              </span>
            </div>

            {/* Profile Menu */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 bg-white/[0.05] hover:bg-white/[0.08] px-4 py-2 rounded-xl transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <User size={16} className="text-purple-300" />
                </div>
                <ChevronDown size={16} className="text-gray-400" />
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 backdrop-blur-xl bg-gray-900/95 border border-white/[0.05] rounded-xl shadow-xl z-50">
                  <div className="p-2">
                    <button className="w-full flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-white/[0.05] rounded-lg transition-colors">
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Upload Section */}
        <section className="mb-12">
          {/* Upload Button */}
          <div className="flex gap-4 mb-6">
            <button className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-xl transition-colors">
              <Upload size={20} />
              Upload Files
            </button>
            <button className="flex items-center gap-2 bg-white/[0.05] hover:bg-white/[0.08] text-gray-300 px-6 py-3 rounded-xl transition-colors">
              <FolderOpen size={20} />
              Browse Projects
            </button>
          </div>

          {/* Drag & Drop Zone */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`
              border-2 border-dashed rounded-2xl p-12
              flex flex-col items-center justify-center
              transition-all duration-200
              ${
                isDragging
                  ? "border-purple-500 bg-purple-500/10"
                  : "border-white/[0.05] hover:border-purple-500/50 bg-white/[0.02]"
              }
            `}
          >
            <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
              <Plus size={24} className="text-purple-300" />
            </div>
            <h3 className="text-xl font-medium text-gray-300 mb-2">
              Drop your files here
            </h3>
            <p className="text-gray-400">or click to browse</p>
          </div>
        </section>

        {/* Recent Projects Grid */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">
            Recent Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentProjects.map((project) => (
              <div
                key={project.id}
                className="backdrop-blur-xl bg-white/[0.05] border border-white/[0.05] rounded-xl p-6 hover:bg-white/[0.08] transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-1">
                      {project.name}
                    </h3>
                    <span className="text-sm text-gray-400">
                      {project.language}
                    </span>
                  </div>
                  <span className="text-sm text-gray-400">
                    {project.lastEdited}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <MessageSquare size={16} />
                  <span className="text-sm">
                    {project.annotations} annotations
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Past Annotations */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">
            Past Annotations
          </h2>
          <div className="backdrop-blur-xl bg-white/[0.05] border border-white/[0.05] rounded-xl">
            {pastAnnotations.map((annotation, index) => (
              <div
                key={annotation.id}
                className={`
                  flex items-center justify-between p-6
                  ${
                    index !== pastAnnotations.length - 1
                      ? "border-b border-white/[0.05]"
                      : ""
                  }
                  hover:bg-white/[0.08] transition-colors
                `}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <File size={20} className="text-purple-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-1">
                      {annotation.name}
                    </h3>
                    <span className="text-sm text-gray-400">
                      {annotation.language}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {[...Array(annotation.collaborators)].map((_, i) => (
                        <div
                          key={i}
                          className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center ring-2 ring-gray-900"
                        >
                          <User size={12} className="text-purple-300" />
                        </div>
                      ))}
                    </div>
                    <span className="text-sm text-gray-400">
                      {annotation.collaborators} collaborators
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Clock size={16} />
                    <span className="text-sm">{annotation.annotatedAt}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
