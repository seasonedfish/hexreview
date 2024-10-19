import { app, dialog } from "electron";

function openFileExplorer(): Promise<string | null> {
    return new Promise((resolve, reject) => {
        // Ensure the Electron app is ready
        app.whenReady().then(async () => {
            try {
                const result = await dialog.showOpenDialog({
                    title: "Select a .zip file",
                    properties: ["openFile"],
                    filters: [{ name: "Zip Files", extensions: ["zip"] }],
                });

                if (result.canceled) {
                    resolve(null); // User canceled
                } else {
                    resolve(result.filePaths[0]); // Return the selected file path
                }
            } catch (error) {
                reject(error);
            }
        });
    });
}

async function main() {
    const filePath = await openFileExplorer();
    if (filePath) {
        console.log("Selected file path:", filePath);
        
        // Import and call the handle function
        const handleFile = require('./handle').default; // Adjust path as necessary
        handleFile(filePath); // Call the handle function with the selected file path
    } else {
        console.log("No file selected");
    }

    app.quit(); // Close the Electron app after processing
}

// Start the main function
main();
