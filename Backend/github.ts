import { NextApiRequest, NextApiResponse } from "next";

// GitHub OAuth URLs
const GITHUB_AUTH_URL = "https://github.com/login/oauth/authorize";
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_REDIRECT_URI = `${process.env.NEXTAUTH_URL}/api/auth/github/callback`; // Your callback URL

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Redirect to GitHub's authorization page
  const url = `${GITHUB_AUTH_URL}?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(GITHUB_REDIRECT_URI)}&scope=user:email`;
  res.redirect(url);
}
