/**
 * @name RootLayout
 * @description
 * @author darcrand
 */

import LoginModal from '@/components/LoginModal'
import { LoginModalContext } from '@/components/LoginModal/context'
import { config } from '@gluestack-ui/config'
import { GluestackUIProvider } from '@gluestack-ui/themed'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Slot } from 'expo-router'
import { useState } from 'react'

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, gcTime: 5 * 60 * 1000, staleTime: 60 * 1000 } },
})

export default function RootLayout() {
  const [isOpen, setOpen] = useState(false)

  return (
    <>
      <GluestackUIProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <LoginModalContext.Provider value={{ isOpen, onOpen: () => setOpen(true), onClose: () => setOpen(false) }}>
            <LoginModal />
            <Slot />
          </LoginModalContext.Provider>
        </QueryClientProvider>
      </GluestackUIProvider>
    </>
  )
}
