import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { route } from './Routes/Route'
import AuthProvider from './Provider/AuthProvider'
import { Toaster } from 'react-hot-toast'
import {
  QueryClient,
  QueryClientProvider,

} from '@tanstack/react-query'
import { FilterProvider } from './Provider/FilterProvider'
const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FilterProvider>
      <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={route} />
      </AuthProvider>
      <Toaster/>
      </QueryClientProvider>
    </FilterProvider>
  </StrictMode>
)
