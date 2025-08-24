import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Space Conquest - Browser Game',
  description: 'A text-based space conquest browser game',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-space-dark text-white">
        <div className="min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}