'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  const [userProfile, setUserProfile] = useState<any>(null);
  const [tokens, setTokens] = useState<{ access_token: string | null, refresh_token: string | null }>({
    access_token: null,
    refresh_token: null
  });
  const searchParams = useSearchParams();

  useEffect(() => {
    const access_token = searchParams.get('access_token');
    const refresh_token = searchParams.get('refresh_token');

    if (access_token && refresh_token) {
      setTokens({ access_token, refresh_token });
      fetchUserProfile(access_token);
    }
  }, [searchParams]);

  const fetchUserProfile = async (access_token: string) => {
    try {
      const response = await fetch('https://api.spotify.com/v1/me', {
        headers: { 'Authorization': 'Bearer ' + access_token }
      });
      const data = await response.json();
      setUserProfile(data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const obtainNewToken = async () => {
    try {
      const response = await fetch(`/api/refresh_token?refresh_token=${tokens.refresh_token}`);
      const data = await response.json();
      setTokens(prevTokens => ({ ...prevTokens, access_token: data.access_token }));
    } catch (error) {
      console.error('Error refreshing token:', error);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      {!userProfile ? (
        <div>
          <h1>This is an example of the Authorization Code flow</h1>
          <Link href="/api/login" style={{ 
            backgroundColor: '#1DB954', 
            color: 'white', 
            padding: '10px 20px', 
            textDecoration: 'none', 
            borderRadius: '5px' 
          }}>
            Log in with Spotify
          </Link>
        </div>
      ) : (
        <div>
          <h1>Logged in as {userProfile.display_name}</h1>
          <div style={{ display: 'flex', marginBottom: '20px' }}>
            <img width="150" src={userProfile.images?.[0]?.url} alt="Profile" style={{ marginRight: '20px' }} />
            <div>
              <p><strong>Display name:</strong> {userProfile.display_name}</p>
              <p><strong>Id:</strong> {userProfile.id}</p>
              <p><strong>Email:</strong> {userProfile.email}</p>
              <p><strong>Spotify URI:</strong> <a href={userProfile.external_urls?.spotify}>{userProfile.external_urls?.spotify}</a></p>
              <p><strong>Link:</strong> <a href={userProfile.href}>{userProfile.href}</a></p>
              <p><strong>Profile Image:</strong> <a href={userProfile.images?.[0]?.url}>{userProfile.images?.[0]?.url}</a></p>
              <p><strong>Country:</strong> {userProfile.country}</p>
            </div>
          </div>
          <div>
            <h2>oAuth info</h2>
            <p><strong>Access token:</strong> <span style={{ wordBreak: 'break-all' }}>{tokens.access_token}</span></p>
            <p><strong>Refresh token:</strong> <span style={{ wordBreak: 'break-all' }}>{tokens.refresh_token}</span></p>
          </div>
          <button 
            onClick={obtainNewToken}
            style={{
              backgroundColor: '#1DB954',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Obtain new token using the refresh token
          </button>
        </div>
      )}
    </div>
  );
}