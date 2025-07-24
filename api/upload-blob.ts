// /api/upload-blob.ts
import { put } from '@vercel/blob';

// Vercel Blob needs environment variables set in the project settings.
// Ensure BLOB_READ_WRITE_TOKEN is set.

// Disable the default body parser to handle file streams.
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const filename = req.query.filename;
    if (!filename) {
        return res.status(400).json({ error: '`filename` query parameter is required.' });
    }

    try {
        // The request body is a stream. Vercel Blob's `put` can handle it directly.
        const blob = await put(filename, req, {
            access: 'public',
        });
        
        return res.status(200).json(blob);

    } catch (error: any) {
        console.error("Error in /api/upload-blob:", error);
        return res.status(500).json({ error: error.message || 'Failed to upload file.' });
    }
}