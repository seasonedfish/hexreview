// components/GitHubAuthButton.tsx
import { useState } from "react";
import { getAuth, GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "/Users/aldoestrada/hexreview/utils/firebase";

export default function GitHubAuthButton() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const signInWithGitHub = async () => {
    setLoading(true);
    setError(null);

    const auth = getAuth();
    const provider = new GithubAuthProvider();

    // Add all required scopes
    provider.addScope("read:user");
    provider.addScope("user:email");

    try {
      console.log("Starting GitHub authentication...");
      const result = await signInWithPopup(auth, provider);
      console.log("Authentication result:", result);

      // Get GitHub OAuth Access Token
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      console.log("Got access token:", token ? "Yes" : "No");

      // Get User Info
      const user = result.user;
      const githubUser = result.user.providerData[0];
      console.log("User data:", {
        uid: user.uid,
        displayName: githubUser.displayName,
        email: githubUser.email,
      });

      // Store user data in Firestore
      const userRef = doc(db, "users", user.uid);
      const userSnapshot = await getDoc(userRef);

      if (!userSnapshot.exists()) {
        console.log("Creating new user document in Firestore...");
        await setDoc(userRef, {
          userId: user.uid,
          username: githubUser.displayName,
          email: githubUser.email,
          avatarUrl: githubUser.photoURL,
          githubAccessToken: token,
          createdAt: new Date().toISOString(),
        });
        console.log("User document created successfully");
      }

      console.log("Authentication complete!");
      // You might want to redirect or update UI state here
    } catch (error: any) {
      console.error("Detailed error:", {
        code: error.code,
        message: error.message,
        credential: error.credential,
      });

      let errorMessage = "An error occurred during authentication.";

      switch (error.code) {
        case "auth/popup-closed-by-user":
          errorMessage =
            "The sign-in popup was closed before authentication could complete.";
          break;
        case "auth/popup-blocked":
          errorMessage =
            "The sign-in popup was blocked by your browser. Please allow popups for this site.";
          break;
        case "auth/cancelled-popup-request":
          errorMessage = "The authentication request was cancelled.";
          break;
        case "auth/account-exists-with-different-credential":
          errorMessage =
            "An account already exists with the same email address but different sign-in credentials.";
          break;
        default:
          errorMessage =
            error.message || "Authentication failed. Please try again.";
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        onClick={signInWithGitHub}
        disabled={loading}
        className={`
          px-4 py-2 bg-gray-900 text-white rounded-md 
          flex items-center gap-2
          ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800"}
        `}
      >
        {loading ? (
          <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
        )}
        {loading ? "Signing in..." : "Sign in with GitHub"}
      </button>

      {error && (
        <div className="mt-2 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md max-w-md">
          {error}
        </div>
      )}
    </div>
  );
}
