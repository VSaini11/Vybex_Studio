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
  description: 'Vybex Studio is a premium digital agency specializing in high-performance websites, AI-driven applications, and scalable digital products. We build tools like Vyana (AI Agent), Orbit (Codebase Analyzer), and Vybex Studio DNA (Startup Analysis).',
  keywords: ['Web Development', 'Digital Agency', 'UI/UX Design', 'Branding', 'Software House', 'Vybex Studio', 'AI Applications', 'Vyana', 'Orbit Codebase Analyzer', 'Startup Analysis'],
  category: 'technology',
  authors: [{ name: 'Vybex Studio Team' }],
  creator: 'Vybex Studio',
  publisher: 'Vybex Studio',
  icons: {
    icon: [
      {
        url: '/vybex-new-transparent.png',
        type: 'image/png',
      },
      {
        url: '/icon.png',
        type: 'image/png',
      },
      {
        url: '/favicon.ico',
        type: 'image/x-icon',
      }
    ],
    apple: [
      {
        url: '/vybex-new-transparent.png',
        type: 'image/png',
      }
    ],
    shortcut: '/vybex-new-transparent.png',
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
        url: '/vybex-new-transparent.png',
        width: 666,
        height: 659,
        alt: 'Vybex Studio Logo',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vybex Studio | Premium Digital Agency & Software House',
    description: 'Elevate your digital presence with Vybex Studio. We build scalable, high-performance digital solutions tailored for growth.',
    images: ['/vybex-new-transparent.png'],
    creator: '@vybexstudio',
  },
  verification: {
    google: 'FyOvDsuM1hZ3CJvP1NHORsvzX2zbyTu-59AemUKkv1E',
  },
}

import { Plus_Jakarta_Sans } from 'next/font/google'
import { IntroAnimation } from '@/components/IntroAnimation'
import { Navbar } from '@/components/navbar'

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta"
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Vybex Studio",
  "url": "https://vybexstudio.in",
  "logo": "https://vybexstudio.in/vybex-new-transparent.png",
  "description": "Premium Digital Agency & Software House specializing in high-performance websites, AI-driven applications, and scalable digital products.",
  "makesOffer": [
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "SoftwareApplication",
        "name": "Vyana",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web, Windows, macOS, Linux, iOS, Android",
        "description": "An advanced AI Agent that assists with problem-solving, answers questions, and helps users build and automate within the Vybex ecosystem.",
        "url": "https://vybexai.vercel.app/"
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "SoftwareApplication",
        "name": "Vybex Studio DNA",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web, Windows, macOS, Linux, iOS, Android",
        "description": "A startup and idea analysis tool that evaluates business ideas and tells users where their idea stands in the market.",
        "url": "https://vybexstudio.in/dna"
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "SoftwareApplication",
        "name": "Orbit",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Web, Windows, macOS, Linux, iOS, Android",
        "description": "An AI-powered codebase analyzer that helps developers understand, explore, and improve any project instantly.",
        "url": "https://the-orbit-vyana.vercel.app/"
      }
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${jakarta.className} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <IntroAnimation />
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
