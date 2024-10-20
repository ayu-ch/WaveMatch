'use client';

import { useSearchParams } from 'next/navigation';

export default function Success() {
  const searchParams = useSearchParams();
  const access_token = searchParams.get('access_token');

  return (
    <div>
      <h1>Authentication Successful</h1>
      <p>Your access token is: {access_token}</p>
    </div>
  );
}