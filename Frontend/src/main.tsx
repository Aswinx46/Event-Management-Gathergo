import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux'
import { store, persistor } from './store/store.tsx'
import { PersistGate } from 'redux-persist/integration/react'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ErrorBoundary from './errorBoundary/ErrorBoundary.tsx'
const queryClient = new QueryClient()
const clientId=import.meta.env.VITE_GOOGLE_CLIENT_ID
createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId={clientId}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <ToastContainer />
          <ErrorBoundary>
          <App />
          </ErrorBoundary>
        </QueryClientProvider>
      </PersistGate>
    </GoogleOAuthProvider>
  </Provider>
)
