import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'LibraryHub — Discover DMV Library Offerings',
  description: 'Explore unique programs, maker spaces, and services at libraries across DC, Maryland, and Virginia.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-navy-900 antialiased">{children}</body>
    </html>
  )
}