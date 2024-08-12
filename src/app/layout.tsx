import type { Metadata } from 'next'
import '@mantine/core/styles.css'
import MantineUIProvider from '@/config/mantine/mantine'

export const metadata: Metadata = {
  title: {
    template: '%s | NaoDoku.com',
    default: 'NaoDoku.com',
  },
  description: '数独アプリ',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ja'>
      <body>
        <MantineUIProvider>{children}</MantineUIProvider>
      </body>
    </html>
  )
}
