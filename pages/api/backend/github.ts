// /pages/api/backend/GitHub.ts
import { NextApiRequest, NextApiResponse } from "next";

// GitHub OAuth URLs
const GITHUB_AUTH_URL = "https://github.com/login/oauth/authorize";
const GITHUB_CLIENT_ID = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
const GITHUB_REDIRECT_URI = `https://hexreviewhackwashu.firebaseapp.com/__/auth/handler`; // Ensure this matches your callback URL

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check for required environment variables
  if (!GITHUB_CLIENT_ID || !GITHUB_REDIRECT_URI) {
    return res
      .status(500)
      .json({ message: "Missing GitHub client ID or redirect URI." });
  }

  // Construct the authorization URL
  const url = `${GITHUB_AUTH_URL}?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(
    GITHUB_REDIRECT_URI
  )}&scope=user:email`;

  // Redirect to GitHub's authorization page
  res.redirect(url);
}
