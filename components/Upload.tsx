'use client';

import { Fragment, useRef, useState } from 'react';
import JSZip from 'jszip';
import { addFileToProject, createProject } from '../utils/firestoreHelpers';
import styles from './upload.module.css';

export default function Upload({ userId }: { userId: string }) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [files, setFiles] = useState<File[]>([]);

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.item(0);

        if (file) {
            if (file.type === 'application/zip' || file.name.endsWith('.zip')) {
                try {
                    await handleZipFile(file, userId);
                } catch (error) {
                    alert(`Failed to process ZIP file: ${error}`);
                }
            } else {
                alert('Please upload a valid ZIP file.');
            }
        }
    };

    const handleZipFile = async (file: File, userId: string) => {
        try {
            const zip = new JSZip();
            const zipContent = await zip.loadAsync(file);
            const extractedFiles: File[] = [];

            // Create a new project under the user's collection
            const projectRef = await createProject(userId, file.name.replace('.zip', ''));

            for (const filename in zipContent.files) {
                if (zipContent.files[filename].dir) {
                    continue; // Skip directories
                }

                const zipEntry = zipContent.files[filename];
                const fileData = await zipEntry.async('blob');
                const extractedFile = new File([fileData], filename, {
                    type: fileData.type,
                });

                // Add the extracted file to Firestore
                await addFileToProject(userId, projectRef.id, extractedFile);
                extractedFiles.push(extractedFile);
            }

            setFiles(extractedFiles);
            alert(`Successfully extracted ${extractedFiles.length} files and added them to Firestore.`);
        } catch (error) {
            console.error('Error while extracting ZIP and storing in Firestore:', error);
            throw new Error('Failed to extract ZIP and store files');
        }
    };

    return (
        <Fragment>
            <input
                ref={fileInputRef}
                type="file"
                accept=".zip"
                className={styles.uploadInput}
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            <button className={styles.uploadButton} onClick={handleButtonClick}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                    width="24"
                    height="24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                    />
                </svg>
                Select ZIP File
            </button>

            <div className={styles.fileList}>
                {files.map((file, index) => (
                    <div key={index}>
                        <strong>{file.name}</strong> ({file.size} bytes)
                    </div>
                ))}
            </div>
        </Fragment>
    );
}
