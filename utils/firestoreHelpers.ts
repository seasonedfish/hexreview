import { db } from './firebase'; 
import { collection, addDoc, Timestamp, doc, setDoc, arrayUnion, updateDoc, query, orderBy, getDocs, collectionGroup, where } from "firebase/firestore";

// New project (created when zip file is uploaded)
export const createProject = async (userId: string, projectName: string) => {
    try {
        const projectRef = await addDoc(collection(db, `users/${userId}/projects`), {
            projectName,
            createdAt: Timestamp.now(),
            sharedWith: [],
        });
        return projectRef; // Return the reference to the newly created project
    } catch (error) {
        console.error('Error creating project:', error);
        throw error;
    }
};

// Function to add a file to the specified project
export const addFileToProject = async (userId: string, projectId: string, file: File) => {
    try {
        await addDoc(collection(db, `users/${userId}/projects/${projectId}/files`), {
            fileName: file.name,
            fileType: file.type,
            fileSize: file.size,
            createdAt: Timestamp.now(),
            content: await file.text(), // I think this works.
        });
    } catch (error) {
        console.error('Error adding file to project:', error);
        throw error;
    }
};

// Function to get all projects by user
export const getProjectsByUser = async (userId: string) => {
    const projectsRef = collection(db, `users/${userId}/projects`);
    const q = query(projectsRef, orderBy('createdAt', 'desc'));

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    }));
};

// Function to share a project with another user
export const shareProjectWithUser = async (userId: string, projectId: string, sharedUserId: string) => {
    const projectRef = doc(db, `users/${userId}/projects/${projectId}`);

    try {
        await updateDoc(projectRef, {
            sharedWith: arrayUnion(sharedUserId),
        });
    } catch (error) {
        console.error('Error sharing project with user:', error);
        throw error;
    }
};

// Get shared project for user.
export const getSharedProjectsForUser = async (userId: string) => {
    try {
        // collection group searches all users' projects subcollections
        const projectsRef = collectionGroup(db, 'projects');
        const q = query(projectsRef, where('sharedWith', 'array-contains', userId));
        
        const querySnapshot = await getDocs(q);
        
        const sharedProjects = querySnapshot.docs.map(doc => ({
            id: doc.id,
            userId: doc.ref.parent.parent?.id, // Get the owner's userId
            ...doc.data(),
        }));

        return sharedProjects;
    } catch (error) {
        console.error('Error getting shared projects:', error);
        throw error;
    }
};


// Function to add files to the shared user's collection after a project is shared
export const addSharedFilesToUser = async (originalUserId: string, projectId: string, sharedUserId: string) => {
    try {
        const filesRef = collection(db, `users/${originalUserId}/projects/${projectId}/files`);
        const querySnapshot = await getDocs(filesRef);

        // gotta make a reference for each file under the shared user's projects
        for (const fileDoc of querySnapshot.docs) {
            const fileData = fileDoc.data();

            await addDoc(collection(db, `users/${sharedUserId}/sharedProjects/${projectId}/files`), {
                ...fileData, // Copy the original file data
                originalOwnerId: originalUserId, // Keep track of the original owner
                projectId: projectId,
                sharedAt: Timestamp.now(), // Timestamp for when the file was shared
            });
        }

        console.log(`Successfully added shared files to user ${sharedUserId}`);
    } catch (error) {
        console.error('Error adding shared files to user:', error);
        throw error;
    }
};  