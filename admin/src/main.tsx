import { StyleProvider } from '@ant-design/cssinjs'
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.tsx'
import './index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      gcTime: 5 * 60 * 1000,
      staleTime: 60 * 1000,
    },
  },
  queryCache: new QueryCache(),
  mutationCache: new MutationCache(),
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <StyleProvider hashPriority='high'>
        <App />
      </StyleProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
