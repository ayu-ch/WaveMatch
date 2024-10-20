'use client';

import { useEffect, useState } from 'react';

interface Track {
  id: string;
  name: string;
  artists: { name: string }[];
  album: { name: string };
  external_urls: { spotify: string };
}

export default function TopTracks() {
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [tokenInfo, setTokenInfo] = useState<any>(null);

  useEffect(() => {
    const access_token = 'BQAE1JY1-8L6aRK9WX7xszNmQq2toCveyjjAe61WXqfqRYdgeP35hsHM0Pvg6O3PIUz-g5XVdBWBY0c0DzOZfQW2pvQ-BuzIYPBiZbYEnabRxvKl4pmiHKRvsXNz9ruGVtCNLL4AL3kz1Ve2sQVphBRcruPZ7vtn9A2b6RjoAn8_cGe_nWid47dNP5SXXnQn27C6v-RNXM6UwCVHrOuzrDM_PS1tZHKntrQ';

    const checkToken = async () => {
      try {
        const response = await fetch('https://api.spotify.com/v1/me', {
          headers: {
            'Authorization': `Bearer ${access_token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch token info');
        }

        const data = await response.json();
        setTokenInfo(data);
      } catch (err) {
        setError("Error checking token. The token might be invalid or expired.");
        console.error(err);
      }
    };

    const fetchTopTracks = async () => {
      try {
        const response = await fetch('https://api.spotify.com/v1/me/top/tracks', {
          headers: {
            'Authorization': `Bearer ${access_token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch top tracks');
        }

        const data = await response.json();
        setTopTracks(data.items);
      } catch (err) {
        setError("Error fetching top tracks. Please try again.");
        console.error(err);
      }
    };

    checkToken();
    fetchTopTracks();
  }, []);

  if (error) {
    return <div className="container"><p>{error}</p></div>;
  }

  return (
    <div className="container">
      <h1>Your Top Tracks</h1>
      {tokenInfo && (
        <div>
          <h2>Token Info</h2>
          <pre>{JSON.stringify(tokenInfo, null, 2)}</pre>
        </div>
      )}
      {topTracks.length === 0 ? (
        <p>Loading your top tracks...</p>
      ) : (
        <ul>
          {topTracks.map((track) => (
            <li key={track.id}>
              <a href={track.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                {track.name}
              </a>
              {' by '}
              {track.artists.map(artist => artist.name).join(', ')}
              {' from '}
              {track.album.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}