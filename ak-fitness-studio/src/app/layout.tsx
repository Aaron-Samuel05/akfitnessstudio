import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AK Fitness Studio — Train Without Excuses',
  description: 'AK Fitness Studio. Strength, conditioning and a space built for people who show up.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://videos.pexels.com" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://images.pexels.com" />
      </head>
      <body>{children}</body>
    </html>
  );
}
