'use client'; // Allows the component to use client-side rendering
import React, { useEffect, useState } from 'react';

const LoggedInPage: React.FC = () => {
  const [userProfile, setUserProfile] = useState<any>(null);
  const accessToken = new URLSearchParams(window.location.search).get('access_token');

  useEffect(() => {
    if (accessToken) {
      fetch('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then(response => response.json())
        .then(data => setUserProfile(data))
        .catch(error => console.error('Error fetching user profile:', error));
    }
  }, [accessToken]);

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>Logged in as {userProfile.display_name}</h1>
      <div>
        <img src={userProfile.images[0]?.url} alt="Profile" width={150} />
        <dl>
          <dt>Email</dt>
          <dd>{userProfile.email}</dd>
          <dt>Spotify URI</dt>
          <dd><a href={userProfile.external_urls.spotify}>{userProfile.external_urls.spotify}</a></dd>
        </dl>
      </div>
    </div>
  );
};

export default LoggedInPage;
