import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  authenticateResponse,
  loginResponse,
  signupResponse,
} from '../utils/ApiManager'
import {
  setAccessTokenCookie,
  removeAccessTokenCookie,
  getAccessTokenCookie,
} from '../utils/TokenManager'
import {
  HOME_ENDPOINT,
  LOGIN_ENDPOINT,
  SIGNUP_ENDPOINT,
} from '../Components/App'

interface IAuthProviderProps {
  children: JSX.Element
}

const AuthContext = React.createContext({})

export function useAuth(): any {
  return useContext(AuthContext)
}

export function AuthProvider({ children }: IAuthProviderProps): JSX.Element {
  const [currentUser, setCurrentUser] = useState<any>()

  const navigate = useNavigate()

  async function signup(name: string, mobileNo: string, password: string) {
    const response = await signupResponse(name, mobileNo, password)
    const { token, user } = response.data
    setAccessTokenCookie(token)
    setCurrentUser(user)
  }

  async function login(mobileNo: string, password: string) {
    const response = await loginResponse(mobileNo, password)
    const { token, user } = response.data
    setAccessTokenCookie(token)
    setCurrentUser(user)
  }

  function logout() {
    removeAccessTokenCookie()
    navigate(LOGIN_ENDPOINT)
  }

  useEffect(() => {
    const accessToken = getAccessTokenCookie()
    const currentPath = window.location.pathname
    console.log('useEffect: AuthContext')
    if (accessToken !== null && accessToken !== undefined) {
      authenticateResponse(accessToken)
        .then(() => {
          if (
            currentPath === LOGIN_ENDPOINT ||
            currentPath === SIGNUP_ENDPOINT
          ) {
            navigate(HOME_ENDPOINT)
          } else {
            navigate(currentPath)
          }
        })
        .catch((error) => {
          logout()
        })
    }
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
