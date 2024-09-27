import { NextApiRequest, NextApiResponse } from "next";
import { query } from '../../utils/db';

export default asyc function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const results = await query('SELECT * FROM teachers');
            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching teachers' });
        }
    } else if (req.method === 'POST') {
        const { name, email, subject } = req.body;
        try {
            const result = await query('INSERT INTO teachers (name, email, subject) VALUES (?, ?, ?)', [name, email, subject]);
            res.status(201).json({ id: result.insertId, name, email, subject });
        } catch (error) {
            res.status(500).json({ error: 'Error creating teacher' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}