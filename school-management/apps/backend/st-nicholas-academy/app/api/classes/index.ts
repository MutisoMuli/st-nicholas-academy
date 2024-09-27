import { NextApiRequest, NextApiResponse } from "next";
import { query } from '../../utils/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const results = await query('SELECT * FROM classes');
            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching classes' });
        }
    } else if (req.method === 'POST') {
        const { name, teacherId, subjectId } = req.body;
        try {
            const result = await query('INSERT INTO classes (name, teacher_id, subject_id) VALUES (?, ?, ?)', [name, teacherId, subjectId]);
            res.status(201).json({ id: result.insertId, name, teacherId, subjectId });
        } catch (error) {
            res.status(500).json({ error: 'Error creating class' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}