"use client";
import React, { useCallback, useRef, useState, useEffect } from "react";
import { User, File, Clock, Plus, MessageSquare } from "lucide-react";
import Header from "@/components/header";
import { useDropzone } from "react-dropzone";
import JSZip from "jszip";
import {
  createProject,
  processZipFileStructure,
  getRecentProjects,
  ProjectMetadata,
} from "@/utils/firestoreHelpers";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import ProgressBar from "@/components/ui/ProgressBar";

interface Project extends ProjectMetadata {
  id: string;
}
interface UploadStatus {
  fileName: string;
  progress: number;
  isComplete: boolean;
}

export default function HomePage() {
  const [droppedFiles, setDroppedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [recentProjects, setRecentProjects] = useState<Project[]>([]);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus | null>(null);

  // Authentication check and fetch initial data
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        fetchUserProjects(user.uid);
      } else {
        window.location.href = "/login";
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const fetchUserProjects = async (userId: string) => {
    try {
      const projects = await getRecentProjects(userId);
      setRecentProjects(projects as Project[]);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const formatTimestamp = (timestamp: any) => {
    if (!timestamp) return "Just now";

    const now = new Date();
    const date = timestamp.toDate();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
  };

  // Function to detect project language based on file extensions
  const detectProjectLanguage = (files: { [key: string]: any }) => {
    const extensions = Object.keys(files)
      .filter((filename) => filename.includes("."))
      .map((filename) => filename.split(".").pop()?.toLowerCase());

    const languageMap: { [key: string]: string } = {
      js: "JavaScript",
      jsx: "React",
      ts: "TypeScript",
      tsx: "React/TypeScript",
      py: "Python",
      java: "Java",
      cpp: "C++",
      rb: "Ruby",
    };

    const counts: { [key: string]: number } = {};
    extensions.forEach((ext) => {
      if (ext && languageMap[ext]) {
        counts[languageMap[ext]] = (counts[languageMap[ext]] || 0) + 1;
      }
    });

    return (
      Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || "Unknown"
    );
  };

  // Function to handle file drop
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setDroppedFiles(acceptedFiles);
    processFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const processFiles = async (acceptedFiles: File[]) => {
    const auth = getAuth();
    if (!auth.currentUser) {
      console.error("No user is currently signed in");
      return;
    }

    for (const file of acceptedFiles) {
      if (file.type === "application/zip" || file.name.endsWith(".zip")) {
        try {
          setUploadStatus({
            fileName: file.name,
            progress: 0,
            isComplete: false,
          });

          const zip = new JSZip();
          const zipContent = await zip.loadAsync(file, {});

          const language = detectProjectLanguage(zipContent.files);

          // Create project
          const projectRef = await createProject(auth.currentUser.uid, {
            name: file.name.replace(".zip", ""),
            language,
          });

          let processedFiles = 0;
          const totalFiles = Object.keys(zipContent.files).length;

          // Process the ZIP file structure
          await processZipFileStructure(
            auth.currentUser.uid,
            projectRef.id,
            zipContent,
            (progress: number) => {
              processedFiles++;
              const uploadProgress = 50 + (processedFiles / totalFiles) * 50; // Second 50% for processing
              setUploadStatus((prev) => ({
                fileName: file.name,
                progress: uploadProgress,
                isComplete: false,
              }));
            }
          );

          setUploadStatus((prev) => ({
            fileName: file.name,
            progress: 100,
            isComplete: true,
          }));

          // Refresh the projects list
          await fetchUserProjects(auth.currentUser.uid);

          setTimeout(() => {
            setUploadStatus(null);
          }, 2000);
        } catch (error) {
          console.error("Error processing ZIP file:", error);
          alert("Failed to process ZIP file");
        }
      } else {
        alert("Please upload a valid ZIP file");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <section className="mb-12">
          <div
            {...getRootProps()}
            className="border-2 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center transition-all duration-200"
          >
            <input {...getInputProps()} />
            <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
              <Plus size={24} className="text-purple-300" />
            </div>
            <h3 className="text-xl font-medium text-gray-300 mb-2">
              Drop your files here
            </h3>
            <p className="text-gray-400">or click to browse</p>
          </div>
          {uploadStatus && (
            <div className="mt-6 flex justify-center">
              <ProgressBar
                progress={uploadStatus.progress}
                isComplete={uploadStatus.isComplete}
                fileName={uploadStatus.fileName}
              />
            </div>
          )}
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">
            Recent Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentProjects.map((project) => (
              <Link href={`/projects/${project.id}`} key={project.id}>
                <div className="backdrop-blur-xl bg-white/[0.05] border border-white/[0.05] rounded-xl p-6 hover:bg-white/[0.08] transition-colors cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-medium text-white mb-1">
                        {project.projectName}
                      </h3>
                      <span className="text-sm text-gray-400">
                        {project.language}
                      </span>
                    </div>
                    <span className="text-sm text-gray-400">
                      {formatTimestamp(project.createdAt)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <MessageSquare size={16} />
                    <span className="text-sm">
                      {project.annotationsCount || 0} annotations
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
