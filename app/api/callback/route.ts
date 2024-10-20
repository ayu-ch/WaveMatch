import { NextResponse } from 'next/server';
import querystring from 'querystring';

const CLIENT_ID = 'd63b89baea864fd89a7a57bb4da402d0';
const CLIENT_SECRET = '3135fe6a44dd42688e102d105daa37f2';
const REDIRECT_URI = 'http://localhost:3000/api/callback';
const BASE_URL = 'http://localhost:3000'; // Add this line

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  if (state === null) {
    return NextResponse.redirect(`${BASE_URL}/error?error=state_mismatch`);
  } else {
    const authOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')
      },
      body: querystring.stringify({
        code: code,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code'
      })
    };

    try {
      const response = await fetch('https://accounts.spotify.com/api/token', authOptions);
      const data = await response.json();

      if (response.ok) {
        // Redirect to the frontend with the tokens
        return NextResponse.redirect(
          `${BASE_URL}/?access_token=${data.access_token}&refresh_token=${data.refresh_token}`
        );
      } else {
        return NextResponse.redirect(`${BASE_URL}/error?error=invalid_token`);
      }
    } catch (error) {
      console.error('Error:', error);
      return NextResponse.redirect(`${BASE_URL}/error?error=server_error`);
    }
  }
}