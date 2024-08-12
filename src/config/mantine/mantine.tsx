'use client'

import '@mantine/core/styles.css'
import { createTheme, MantineProvider } from '@mantine/core'
import './globals.css'

const theme = createTheme({
  /** Put your mantine theme override here */
})

export default function MantineUIProvider({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <MantineProvider theme={theme} forceColorScheme='light'>
      {children}
    </MantineProvider>
  )
}
