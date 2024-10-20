// pages/api/logout.ts
import { NextApiRequest, NextApiResponse } from 'next';

// Remove the 'error' variable if not used
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
      // Perform logout actions here
      res.status(200).json({ message: 'Logged out successfully' });
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
}