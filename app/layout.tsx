import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cinzel, Montserrat } from 'next/font/google'
import './globals.css'

const cinzel = Cinzel({ subsets: ['latin'], variable: '--font-cinzel' })
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' })

export const metadata: Metadata = {
  title: 'The King of Picanha | Brazilian Steakhouse in Philadelphia, PA',
  description: 'Experience authentic Brazilian steakhouse flavors at The King of Picanha in Philadelphia, PA. Enjoy picanha, Brazilian classics and grilled specialties.',
  keywords: ['Brazilian Steakhouse Philadelphia', 'Brazilian Restaurant Philadelphia', 'Picanha Philadelphia', 'Churrasco Philadelphia'],
  openGraph: { title: 'The King of Picanha', description: 'Authentic Brazilian steakhouse in Philadelphia.', type: 'website' },
}

export const viewport: Viewport = { colorScheme: 'light', themeColor: '#171211' }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${cinzel.variable} ${montserrat.variable} light bg-background`}><body className="antialiased">{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
