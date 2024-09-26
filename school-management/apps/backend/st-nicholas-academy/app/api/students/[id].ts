import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../utils/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (req.method === 'GET') {
        try {
            const results = await query('SELECT * FROM students WHERE id = ?', [id]);
            if (results.lenngth > 0) {
                res.status(200).json(results[0]);
            } else {
                res.status(404).json({ message: 'Student not found' });
            }
        }catch (error) {
            res.status(500).json({ error: 'Error fetching student' });
        }
    } else if (req.method === 'PUT') {
        const { name, email } = req.body;
        try {
            await query('UPDATE students SET name = ?, email = ? WHERE id = ?', [name, email, id]);
            res.status(200).json({ id, name, email });
        } catch (error) {
            res.status(500).json({ error: 'Error updating student' });
        }
    } else if (req.method == 'DELETE') {
        try {
            await query('DELETE FROM students WHERE id = ?', [id]);
            res.status(200).json({ message: 'Student deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Error deleting student' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}