import { Navigate, Outlet } from 'react-router-dom'
import { getAccessTokenCookie } from '../utils/TokenManager'
import { LOGIN_ENDPOINT } from './App'
import Home from './Home'

export default function PrivateRoutes() {
  return getAccessTokenCookie() ? (
    <>
      <Home />
    </>
  ) : (
    <Navigate to={LOGIN_ENDPOINT} />
  )
}
