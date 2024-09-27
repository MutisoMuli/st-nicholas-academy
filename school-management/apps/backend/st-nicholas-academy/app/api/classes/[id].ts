import { NextApiRequest, NextApiResponse } from "next";
import { query } from '../../utils/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (req.method === 'GET') {
        try {
            const results = await query('SELECT * FROM classes WHERE id = ?', [id]);
            if (results.length > 0) {
                res.status(200).json(results[0]);
            } else {
                res.status(404).json()
            }
        }
    }
}