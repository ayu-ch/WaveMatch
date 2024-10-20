import { NextResponse } from 'next/server';
import querystring from 'querystring';

const CLIENT_ID = 'd63b89baea864fd89a7a57bb4da402d0';
const BASE_URL = 'http://localhost:3000'; // Add this line
const REDIRECT_URI = `${BASE_URL}/api/callback`; // Update this line

export async function GET() {
  const state = Math.random().toString(36).substring(2, 15);
  // const scope = 'user-read-private user-read-email';
  const scope = 'user-read-private user-read-email user-top-read';
  return NextResponse.redirect(
    'https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: CLIENT_ID,
      scope: scope,
      redirect_uri: REDIRECT_URI,
      state: state
    })
  );
}