// pages/index.tsx
import Link from 'next/link';

export default function Home() {
    return (
        <div>
            <h1>Welcome to the Spotify Auth Example</h1>
            <Link href="/api/login">
                <button>Login with Spotify</button>
            </Link>
        </div>
    );
}
