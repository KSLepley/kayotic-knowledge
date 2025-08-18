import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Kayotic Tutoring - Expert Middle & High School Tutoring',
  description: 'Professional tutoring services for middle school and high school students. All subjects, virtual and in-person sessions available.',
  keywords: 'tutoring, middle school, high school, math, science, english, history, online tutoring, in-person tutoring',
  authors: [{ name: 'Kayotic Tutoring' }],
  openGraph: {
    title: 'Kayotic Tutoring - Expert Middle & High School Tutoring',
    description: 'Professional tutoring services for middle school and high school students. All subjects, virtual and in-person sessions available.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kayotic Tutoring - Expert Middle & High School Tutoring',
    description: 'Professional tutoring services for middle school and high school students. All subjects, virtual and in-person sessions available.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  )
} 