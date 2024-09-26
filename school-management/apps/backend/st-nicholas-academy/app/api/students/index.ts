import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../utils/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const results = await query('SELECT * FROM students');
            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching students'});
        }
    } else if (req.method === 'POST') {
        // Add student logic
        const { name, email } = req.body;
        try {
            const result = await query('INSERT INTO students (name, email) VALUES (?, ?)', [name, email]);
            res.status(201).json({ id: result.insertId, name, email });
        } catch (error) {
            res.status(500).json({ error: 'Error creating student' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}