// app/profile/page.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface SpotifyProfile {
  display_name: string;
  email: string;
  // Add other fields from the Spotify profile response as needed
}

export default function ProfilePage() {
  const searchParams = useSearchParams();
  const [profileData, setProfileData] = useState<SpotifyProfile | null>(null);

  const accessToken = searchParams.get('access_token');

  useEffect(() => {
    if (accessToken) {
      fetchProfile(accessToken);
    }
  }, [accessToken]);

  const fetchProfile = async (token: string) => {
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    const data: SpotifyProfile = await response.json();
    setProfileData(data);
  };

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Spotify Profile</h1>
      <pre>{JSON.stringify(profileData, null, 2)}</pre>
    </div>
  );
}
