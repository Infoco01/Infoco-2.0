// /api/delete-blob.ts
import { del } from '@vercel/blob';

export default async function handler(req: any, res: any) {
    // Using POST for simplicity as DELETE can sometimes be tricky with CORS/clients.
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        // We expect a JSON body with the URL of the blob to delete.
        const { url } = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
        
        if (!url) {
            return res.status(400).json({ error: '`url` is required in the request body.' });
        }

        await del(url);

        return res.status(200).json({ success: true });

    } catch (error: any) {
        console.error("Error in /api/delete-blob:", error);
        // Don't expose detailed error messages unless necessary.
        return res.status(500).json({ error: error.message || 'Failed to delete file.' });
    }
}