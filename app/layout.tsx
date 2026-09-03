import type { Metadata } from 'next';
import './globals.css';
import AdminSidebar from '../components/AdminSidebar';

export const metadata: Metadata = {
  title: 'Skyline Health | Executive & Telehealth Command Console',
  description:
    'Institutional administration console for real-time telehealth operations, clinician credentialing, continuous biometric telemetry monitoring, and financial payouts.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:ital,wght@0,300..900;1,300..900&family=Manrope:wght@300..800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-surface-canvas text-text-primary flex antialiased selection:bg-primary selection:text-white">
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto max-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
