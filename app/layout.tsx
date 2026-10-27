import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Smart Class Automation — A Smarter Way to Learn',
  description:
    'Explore Smart Class Automation, an engineering prototype designed to make learning environments more responsive, efficient, and connected.',
  icons: {
    icon: '/icon.svg',
  },
  openGraph: {
    title: 'Smart Class Automation',
    description:
      'An intelligent classroom automation prototype designed to make learning environments more responsive, efficient, and connected.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#ffffff',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="light">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
