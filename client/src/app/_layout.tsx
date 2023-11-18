/**
 * @name RootLayout
 * @description
 * @author darcrand
 */

import LoginModal from '@/components/LoginModal'
import { config } from '@gluestack-ui/config'
import { GluestackUIProvider } from '@gluestack-ui/themed'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Slot } from 'expo-router'

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, gcTime: 5 * 60 * 1000, staleTime: 60 * 1000 } },
})

export default function RootLayout() {
  return (
    <>
      <GluestackUIProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <LoginModal />
          <Slot />
        </QueryClientProvider>
      </GluestackUIProvider>
    </>
  )
}
