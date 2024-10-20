// pages/api/refresh_token.ts
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import querystring from 'querystring';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { refresh_token } = req.query;

    try {
        const tokenResponse = await axios.post('https://accounts.spotify.com/api/token', querystring.stringify({
            grant_type: 'refresh_token',
            refresh_token: refresh_token,
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64'),
            },
        });

        res.send({
            access_token: tokenResponse.data.access_token,
            refresh_token: tokenResponse.data.refresh_token,
        });
    } catch (error) {
        res.status(400)
    }
}
