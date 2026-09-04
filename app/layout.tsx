import type { Metadata } from 'next';
import './globals.css';
import AdminSidebar from '../components/AdminSidebar';
import AdminMobileNav from '../components/AdminMobileNav';
import AdminAuthGate from '../components/AdminAuthGate';

export const metadata: Metadata = {
  metadataBase: new URL('https://admin.skylinehealth.org'),
  title: 'Skyline Health | Executive & Telehealth Command Console',
  description:
    'Institutional administration console for real-time telehealth operations, clinician credentialing, continuous biometric telemetry monitoring, and financial payouts.',
  keywords: [
    'Skyline Health Admin',
    'telehealth operations',
    'clinical console',
    'remote patient monitoring administration',
    'biometric telemetry',
  ],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', type: 'image/png' },
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: [{ url: '/logo.png' }],
    shortcut: ['/favicon.ico'],
  },
  openGraph: {
    title: 'Skyline Health | Executive & Telehealth Command Console',
    description:
      'Institutional administration console for real-time telehealth operations, clinician credentialing, continuous biometric telemetry monitoring, and financial payouts.',
    url: 'https://admin.skylinehealth.org',
    siteName: 'Skyline Health Admin Command',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Skyline Health Executive Operations Command',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Skyline Health | Executive & Telehealth Command Console',
    description:
      'Institutional administration console for real-time telehealth operations, clinician credentialing, continuous biometric telemetry monitoring, and financial payouts.',
    images: ['/og-image.jpg'],
    creator: '@SkylineHealth',
  },
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
      <body className="min-h-screen bg-surface-canvas text-text-primary flex flex-col md:flex-row antialiased selection:bg-primary selection:text-white">
        <AdminAuthGate>
          <AdminMobileNav />
          <AdminSidebar />
          <div className="flex-1 flex flex-col min-w-0 overflow-y-auto md:max-h-screen">
            {children}
          </div>
        </AdminAuthGate>
      </body>
    </html>
  );
}
