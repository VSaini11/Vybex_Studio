import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://vybexstudio.in'),
  title: {
    default: 'Vybex Studio | Premium Digital Agency & Software House',
    template: '%s | Vybex Studio',
  },
  description: 'Vybex Studio specializes in building high-performance websites, AI-driven applications, and scalable digital products. From branding to backend, we build it right.',
  keywords: ['Web Development', 'Digital Agency', 'UI/UX Design', 'Branding', 'Software House', 'Vybex Studio', 'AI Applications'],
  authors: [{ name: 'Vybex Studio Team' }],
  creator: 'Vybex Studio',
  publisher: 'Vybex Studio',
  icons: {
    icon: [
      {
        url: '/Vybex.png',
        type: 'image/png',
      }
    ],
    apple: '/Vybex.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://vybexstudio.in',
    siteName: 'Vybex Studio',
    title: 'Vybex Studio | Premium Digital Agency & Software House',
    description: 'Elevate your digital presence with Vybex Studio. We build scalable, high-performance digital solutions tailored for growth.',
    images: [
      {
        url: '/Vybex.png',
        width: 800,
        height: 600,
        alt: 'Vybex Studio Logo',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vybex Studio | Premium Digital Agency & Software House',
    description: 'Elevate your digital presence with Vybex Studio. We build scalable, high-performance digital solutions tailored for growth.',
    images: ['/Vybex.png'],
    creator: '@vybexstudio',
  },
  verification: {
    google: 'FyOvDsuM1hZ3CJvP1NHORsvzX2zbyTu-59AemUKkv1E',
  },
}

import { IntroAnimation } from '@/components/IntroAnimation'
import { Navbar } from '@/components/navbar'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <IntroAnimation />
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
