import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Spotify Authorization Code Flow Example',
  description: 'Example of the Authorization Code flow with Spotify',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css" />
        <style>{`
          #login, #loggedin {
            display: none;
          }
          .text-overflow {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 500px;
          }
        `}</style>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}