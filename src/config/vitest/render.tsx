import { render as testingLibraryRender } from '@testing-library/react'
import MantineUIProvider from '@/config/mantine/mantine'

export function render(ui: React.ReactNode) {
  // biome-ignore lint/complexity/noUselessFragments: <explanation>
  return testingLibraryRender(<>{ui}</>, {
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <MantineUIProvider>{children}</MantineUIProvider>
    ),
  })
}
