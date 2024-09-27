import { NextApiRequest, NextApiResponse } from "next";
import { query } from '../../utils/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (req.method === 'GET') {
        try {
            const results = await query('SELECT * FROM teachers WHERE id = ?', [id]);
            if (results.length > 0) {
                res.status(200).json(results[0]);
            } else {
                res.status(404).json({ message: 'Teacher ot found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Error fetching teacher'});
        }
    } else if (req.method === 'PUT') {
        const { name, email, subject } = req.body;
        try {
            await query('UPDATE teachers SET name = ?, email = ?, subect = ? WHERE id = ?', [name, email, subject, id]);
            res.status(200).json({ id, name, email, subject });
        } catch (error) {
            res.status(500).json({ error: 'Error updating teacher' });
        }
    } else if (req.method === 'DELETE') {
        try {
            await query('DELETE FROM teachers WHERE id = ?', [id]);
            res.status(500).json({ message: 'Teacher deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Error deleting teacher' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}