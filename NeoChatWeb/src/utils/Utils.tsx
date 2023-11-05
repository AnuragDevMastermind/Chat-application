import { getAccessTokenCookie } from '../utils/TokenManager'

export function getUserId(): string {
  const token = getAccessTokenCookie()

  if (token) {
    const payloadBase64 = token.split('.')[1]
    const base64 = payloadBase64.replace(/-/g, '+').replace(/_/g, '/')
    const decodedJwt = JSON.parse(window.atob(base64))
    return decodedJwt.userId || ''
  }

  return ''
}

export function getUserName(): string {
  const token = getAccessTokenCookie()

  if (token) {
    const payloadBase64 = token.split('.')[1]
    const base64 = payloadBase64.replace(/-/g, '+').replace(/_/g, '/')
    const decodedJwt = JSON.parse(window.atob(base64))
    return decodedJwt.userName || ''
  }

  return ''
}

export function formatTimestamp(timestamp: number) {
  const currentTime = Date.now()
  const timeDifference = currentTime - timestamp

  if (timeDifference < 24 * 60 * 60 * 1000) {
    // If the difference is less than 24 hours, format as hh:mm AM/PM
    const date = new Date(timestamp)
    var hours = date.getHours()
    const minutes = date.getMinutes()
    const ampm = hours >= 12 ? 'PM' : 'AM'
    hours = hours % 12
    hours = hours ? hours : 12 // Handle midnight (0:00)
    const formattedTime = `${String(hours).padStart(2, '0')} : ${String(
      minutes
    ).padStart(2, '0')} ${ampm}`
    return formattedTime
  } else {
    // If the difference is 24 hours or more, format as a full date
    const date = new Date(timestamp)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }
}
