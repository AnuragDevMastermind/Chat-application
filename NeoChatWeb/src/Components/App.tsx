import Signup from './Signup'
import { AuthProvider } from '../contexts/AuthContext'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './Login'
import PrivateRoutes from './PrivateRoutes'
import { ToastProvider } from '../contexts/ToastContext'
import AppContextProviders from '../contexts/AppContextProvider'
import Home from './Home'
import { WebSocketProvider } from '../contexts/WebSocketContext'

export const HOME_ENDPOINT = '/'
export const LOGIN_ENDPOINT = '/login'
export const SIGNUP_ENDPOINT = '/signup'

function App() {
  const providers = [ToastProvider, AuthProvider, WebSocketProvider]
  return (
    <Router>
      <AppContextProviders components={providers}>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route element={<Home />} path={HOME_ENDPOINT} />
          </Route>
          <Route path={SIGNUP_ENDPOINT} element={<Signup />} />
          <Route path={LOGIN_ENDPOINT} element={<Login />} />
        </Routes>
      </AppContextProviders>
    </Router>
  )
}

export default App
