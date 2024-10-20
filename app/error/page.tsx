'use client';

import { useSearchParams } from 'next/navigation';

export default function Error() {
  const searchParams = useSearchParams();
  const message = searchParams.get('message');

  return (
    <div>
      <h1>Authentication Error</h1>
      <p>Error message: {message}</p>
    </div>
  );
}