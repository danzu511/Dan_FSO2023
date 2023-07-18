import React from 'react'
import ReactDOM from 'react-dom/client'

import { QueryClient, QueryClientProvider } from 'react-query'

import App from './App'
import { NotificationProvider } from './NotificationContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <NotificationProvider>
    <QueryClientProvider client={new QueryClient()}>
      <App />
    </QueryClientProvider>
  </NotificationProvider>
)