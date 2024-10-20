"use client";
import React, { useCallback, useRef, useState } from "react";
import { User, File, Clock, Plus, MessageSquare } from "lucide-react";
import Header from "@/components/header";
import { useDropzone } from "react-dropzone";
import JSZip from "jszip";
import { addFileToProject, createProject } from "@/utils/firestoreHelpers";
import { getAuth } from "firebase/auth";
import Link from "next/link";
import { getLanguageFromFilename } from '../../lib/utils'; // Adjust the import path as needed

export default function HomePage() {
    const [droppedFiles, setDroppedFiles] = useState<File[]>([]);
    const [extractedFiles, setExtractedFiles] = useState<{ name: string; language: string }[]>([]); // State for extracted files
    const fileInputRef = useRef<HTMLInputElement>(null);

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

    // Function to handle file drop
    const onDrop = useCallback((acceptedFiles: File[]) => {
        setDroppedFiles(acceptedFiles);
        processFiles(acceptedFiles);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.item(0);
        if (file) {
            processFiles([file]);
        }
    };

    // Function to process the files
    const processFiles = async (acceptedFiles: File[]) => {
        for (const file of acceptedFiles) {
            if (file.type === 'application/zip' || file.name.endsWith('.zip')) {
                try {
                    await handleZipFile(file);
                } catch (error) {
                    alert(`Failed to process ZIP file: ${error}`);
                }
            } else {
                alert('Please upload a valid ZIP file.');
            }
        }
    };

    // Function to handle ZIP files
    const handleZipFile = async (file: File) => {
        const auth = getAuth();

        if (!auth.currentUser) {
            console.error("No user is currently signed in");
            return;
        }

        const userId = auth.currentUser.uid;

        try {
            const zip = new JSZip();
            const zipContent = await zip.loadAsync(file);
            const filesWithLanguages: { name: string; language: string }[] = []; // Array to store file names and languages

            // Create a new project under the authenticated user's collection
            const projectRef = await createProject(userId, file.name.replace('.zip', ''));
            const projectId = projectRef.id; // The ID of the newly created project

            for (const filename in zipContent.files) {
                if (zipContent.files[filename].dir) {
                    continue; // Skip directories
                }

                const zipEntry = zipContent.files[filename];
                const fileData: Blob = await zipEntry.async('blob');

                const language = getLanguageFromFilename(filename);
                filesWithLanguages.push({ name: filename, language }); // Add to the list with language

                // Prepare metadata for the file
                const fileMetadata = {
                    fileName: filename,
                    fileType: fileData.type,
                    fileSize: fileData.size,
                    createdAt: new Date(),
                    content: await fileData.text(), // Store the content as text
                };

                await addFileToProject(userId, projectId, fileMetadata);
            }

            setExtractedFiles(filesWithLanguages); // Update the state with extracted files
            alert(`Successfully extracted ${filesWithLanguages.length} files and added them to Firestore.`);
        } catch (error) {
            console.error('Error while extracting ZIP and storing in Firestore:', error);
            throw new Error('Failed to extract ZIP and store files');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <Header />

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-8">
                {/* Upload Section */}
                <section className="mb-12">
                    {/* Drag & Drop Zone */}
                    <div
                        {...getRootProps({ className: "dropzone" })}
                        className={`border-2 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center transition-all duration-200`}
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
                </section>

                {/* Extracted Files Section */}
                {extractedFiles.length > 0 && (
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-white mb-6">Extracted Files</h2>
                        <ul className="list-disc pl-6 text-gray-300">
                            {extractedFiles.map((file, index) => (
                                <li key={index}>
                                    {file.name} <span className="text-gray-500">({file.language})</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* Recent Projects Grid */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-white mb-6">
                        Recent Projects
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {recentProjects.map((project) => (
                            <Link href={`/projects/${project.id}`} key={project.id}>
                                <div
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
                            </Link>
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
                                ${index !== pastAnnotations.length - 1 ? "border-b border-white/[0.05]" : ""}
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
