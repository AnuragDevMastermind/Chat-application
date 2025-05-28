import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './hooks/useTheme.tsx'
import { Toaster } from './components/shadcn/toaster.tsx'
import LinearProgressIndicator from './components/custom/LinearProgressIndicator.tsx'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import { SocketIOProvider } from './context/SocketIOContext.tsx'

createRoot(document.getElementById('root')!).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <Provider store={store}>
      <div className="h-screen relative">
        <div className="absolute h-screen w-full">
          <SocketIOProvider>
            <App />
          </SocketIOProvider>
        </div>
        <LinearProgressIndicator/>
      </div>
      <Toaster />
    </Provider>
  </ThemeProvider>
)
