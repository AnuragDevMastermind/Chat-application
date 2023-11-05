import Cookies from 'js-cookie'

const TOKEN_COOKIE_KEY = 'accessToken'

export function setAccessTokenCookie(token: string) {
  Cookies.set(TOKEN_COOKIE_KEY, token)
}

export function getAccessTokenCookie() {
  return Cookies.get(TOKEN_COOKIE_KEY)
}

export function removeAccessTokenCookie() {
  Cookies.remove(TOKEN_COOKIE_KEY)
}
