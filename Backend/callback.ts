import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const GITHUB_TOKEN_URL = "https://github.com/login/oauth/access_token";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code } = req.query;

  if (!code || Array.isArray(code)) {
    return res.status(400).json({ message: "Authorization code is missing or invalid" });
  }

  try {
    // Exchange the authorization code for an access token
    const response = await axios.post(GITHUB_TOKEN_URL, null, {
      params: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      headers: {
        Accept: "application/json",
      },
    });

    const { access_token } = response.data;

    if (access_token) {
      // Use the access token to fetch user info
      const userResponse = await axios.get("https://api.github.com/user", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      const userData = userResponse.data;

      console.log("Authenticated user data:", userData);

      // Redirect to the home page (or any other page) after successful authentication
      res.redirect(`http://localhost:3000/home?user=${encodeURIComponent(JSON.stringify(userData))}`);
    } else {
      return res.status(400).json({ message: "Failed to retrieve access token" });
    }
  } catch (error) {
    console.error("Error during GitHub authentication:", error);
    return res.status(500).json({ message: "Authentication error" });
  }
}