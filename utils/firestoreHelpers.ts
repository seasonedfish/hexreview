import JSZip from "jszip";
import { db } from "./firebase";
import {
  collection,
  addDoc,
  Timestamp,
  doc,
  setDoc,
  arrayUnion,
  updateDoc,
  getDocs,
  query,
  collectionGroup,
  where,
  orderBy,
  limit,
} from "firebase/firestore";

// Enhanced interfaces
interface Directory {
  id: string;
  directoryName: string;
  parentDirectoryId: string | null;
  createdAt: Timestamp;
  files: FileMetadata[];
  subdirectories: Directory[];
}

export interface FileMetadata {
  fileName: string;
  fileType: string;
  fileSize: number;
  createdAt: Date;
  content: string;
}

export interface ProjectMetadata {
  projectName: string;
  createdAt: Timestamp;
  language: string;
  annotationsCount: number;
  sharedWith: string[];
}

// Updated createProject function
export const createProject = async (
  userId: string,
  projectData: {
    name: string;
    language: string;
  }
) => {
  try {
    const projectRef = await addDoc(
      collection(db, `users/${userId}/projects`),
      {
        projectName: projectData.name,
        createdAt: Timestamp.now(),
        language: projectData.language,
        annotationsCount: 0,
        sharedWith: [],
      }
    );
    return projectRef;
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
};

// New function to get recent projects
export const getRecentProjects = async (
  userId: string,
  numberOfProjects: number = 6
) => {
  try {
    const projectsRef = collection(db, `users/${userId}/projects`);
    const q = query(
      projectsRef,
      orderBy("createdAt", "desc"),
      limit(numberOfProjects)
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching recent projects:", error);
    throw error;
  }
};

export const processZipFileStructure = async (
  userId: string,
  projectId: string,
  zipContent: JSZip,
  onProgress?: (progress: number) => void
) => {
  const processDirectory = async (
    dir: JSZip.JSZipObject,
    parentDirectoryId: string | null = null
  ) => {
    const directoryName = dir.name.replace(/\/$/, "");
    const directoryRef = await createDirectoryInProject(
      userId,
      projectId,
      directoryName,
      parentDirectoryId
    );
    const directoryId = directoryRef.id;

    const dirFiles = Object.values(zipContent.files).filter(
      (file) => file.name.startsWith(directoryName) && !file.dir
    );

    for (const zipEntry of dirFiles) {
      if (zipEntry.dir) {
        await processDirectory(zipEntry, directoryId);
      } else {
        const fileContent = await zipEntry.async("text");
        const fileMetadata = {
          fileName: zipEntry.name.replace(`${directoryName}/`, ""),
          fileType: zipEntry.name.split(".").pop() || "unknown",
          fileSize: (await zipEntry.async("uint8array")).length,
          createdAt: new Date(),
          content: fileContent,
        };
        await addFileToDirectory(userId, projectId, directoryId, fileMetadata);
        onProgress?.(1); // Call progress callback after each file is processed
      }
    }
  };

  for (const zipEntry of Object.values(zipContent.files)) {
    if (zipEntry.dir) {
      await processDirectory(zipEntry);
    }
  }
};

// New function to create a directory within a project
export const createDirectoryInProject = async (
  userId: string,
  projectId: string,
  directoryName: string,
  parentDirectoryId: string | null = null
) => {
  try {
    const directoryRef = await addDoc(
      collection(db, `users/${userId}/projects/${projectId}/directories`),
      {
        directoryName,
        parentDirectoryId, // If it's a subdirectory, link to its parent
        createdAt: Timestamp.now(),
      }
    );
    return directoryRef; // Return the reference to the newly created directory
  } catch (error) {
    console.error("Error creating directory:", error);
    throw error;
  }
};

// Function to add a file to a directory in the project
export const addFileToDirectory = async (
  userId: string,
  projectId: string,
  directoryId: string,
  fileMetadata: FileMetadata
) => {
  try {
    await addDoc(
      collection(
        db,
        `users/${userId}/projects/${projectId}/directories/${directoryId}/files`
      ),
      {
        fileName: fileMetadata.fileName,
        fileType: fileMetadata.fileType,
        fileSize: fileMetadata.fileSize,
        createdAt: fileMetadata.createdAt,
        content: fileMetadata.content, // Store file content
      }
    );
  } catch (error) {
    console.error("Error adding file to directory:", error);
    throw error;
  }
};

// Function to retrieve a project's directory hierarchy
export const getProjectHierarchy = async (
  userId: string,
  projectId: string
): Promise<Directory[]> => {
  try {
    // Get all directories in the project
    const directoriesSnapshot = await getDocs(
      collection(db, `users/${userId}/projects/${projectId}/directories`)
    );

    // Build the directory structure
    const directories: Record<string, Directory> = {};

    directoriesSnapshot.forEach((docSnapshot) => {
      const data = docSnapshot.data();
      directories[docSnapshot.id] = {
        id: docSnapshot.id,
        directoryName: data.directoryName,
        parentDirectoryId: data.parentDirectoryId || null,
        createdAt: data.createdAt,
        files: [],
        subdirectories: [],
      };
    });

    // Get all files and associate them with directories
    for (const directoryId in directories) {
      const filesSnapshot = await getDocs(
        collection(
          db,
          `users/${userId}/projects/${projectId}/directories/${directoryId}/files`
        )
      );
      filesSnapshot.forEach((fileDoc) => {
        const fileData = fileDoc.data();
        directories[directoryId].files.push({
          fileName: fileData.fileName,
          fileType: fileData.fileType,
          fileSize: fileData.fileSize,
          createdAt: fileData.createdAt.toDate(),
          content: fileData.content,
        });
      });
    }

    // Link subdirectories to their parent directories
    const rootDirectories: Directory[] = [];
    for (const directoryId in directories) {
      const directory = directories[directoryId];
      if (directory.parentDirectoryId) {
        directories[directory.parentDirectoryId]?.subdirectories.push(
          directory
        );
      } else {
        rootDirectories.push(directory); // Root-level directories
      }
    }

    return rootDirectories; // Return the root-level directories with the full hierarchy
  } catch (error) {
    console.error("Error retrieving project hierarchy:", error);
    throw error;
  }
};

// Function to share a project with another user
export const shareProjectWithUser = async (
  userId: string,
  projectId: string,
  sharedUserId: string
) => {
  const projectRef = doc(db, `users/${userId}/projects/${projectId}`);

  try {
    await updateDoc(projectRef, {
      sharedWith: arrayUnion(sharedUserId),
    });
  } catch (error) {
    console.error("Error sharing project with user:", error);
    throw error;
  }
};

// Get shared project for user.
export const getSharedProjectsForUser = async (userId: string) => {
  try {
    // collection group searches all users' projects subcollections
    const projectsRef = collectionGroup(db, "projects");
    const q = query(projectsRef, where("sharedWith", "array-contains", userId));
    const querySnapshot = await getDocs(q);
    const sharedProjects = querySnapshot.docs.map((docSnapshot) => ({
      id: docSnapshot.id,
      userId: docSnapshot.ref.parent.parent?.id || "", // Get the owner's userId
      ...docSnapshot.data(),
    }));

    return sharedProjects;
  } catch (error) {
    console.error("Error getting shared projects:", error);
    throw error;
  }
};

// Function to add files to the shared user's collection after a project is shared
export const addSharedFilesToUser = async (
  originalUserId: string,
  projectId: string,
  sharedUserId: string
) => {
  try {
    const filesRef = collection(
      db,
      `users/${originalUserId}/projects/${projectId}/files`
    );
    const querySnapshot = await getDocs(filesRef);

    // Create a reference for each file under the shared user's projects
    for (const fileDoc of querySnapshot.docs) {
      const fileData = fileDoc.data();

      await addDoc(
        collection(
          db,
          `users/${sharedUserId}/sharedProjects/${projectId}/files`
        ),
        {
          ...fileData, // Copy the original file data
          originalOwnerId: originalUserId, // Keep track of the original owner
          projectId: projectId,
          sharedAt: Timestamp.now(), // Timestamp for when the file was shared
        }
      );
    }

    console.log(`Successfully added shared files to user ${sharedUserId}`);
  } catch (error) {
    console.error("Error adding shared files to user:", error);
    throw error;
  }
};
