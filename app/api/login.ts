// pages/api/login.ts
import { NextApiRequest, NextApiResponse } from 'next';
import querystring from 'querystring';
import cookie from 'cookie';
import crypto from 'crypto';

const generateRandomString = (length: number): string => {
    return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const state = generateRandomString(16);
    res.setHeader('Set-Cookie', cookie.serialize('spotify_auth_state', state, { httpOnly: true }));

    const scope = 'user-read-private user-read-email';
    res.redirect(`https://accounts.spotify.com/authorize?${querystring.stringify({
        response_type: 'code',
        client_id: process.env.SPOTIFY_CLIENT_ID,
        scope: scope,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
        state: state,
    })}`);
}
