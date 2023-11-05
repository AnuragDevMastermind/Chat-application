import axios from 'axios'
import { getUserId } from '../utils/Utils'

const BASE_URL = 'http://127.0.0.1:8080'

export async function loginResponse(mobileNo: string, password: string) {
  return await axios.post(`${BASE_URL}/signin`, {
    mobileNo,
    password,
  })
}

export async function signupResponse(
  name: string,
  mobileNo: string,
  password: string
) {
  return await axios.post(`${BASE_URL}/signup`, {
    name,
    mobileNo,
    password,
  })
}

export async function authenticateResponse(token: string) {
  return await axios.get(`${BASE_URL}/authenticate`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export async function messageResponse(inboxId: number, pageNo: number) {
  return await axios.get(
    `${BASE_URL}/message-web?inboxId=${inboxId}&pageNo=${pageNo}&userId=${getUserId()}`
  )
}

export async function messageWithoutIndexResponse(userId: number, friendId: number, pageNo: number) {
  return await axios.post(
    `${BASE_URL}/message-web/without-index?userId=${userId}&friendId=${friendId}&pageNo=${pageNo}`
  )
}

export async function getAllInobx() {
  return await axios.post(`${BASE_URL}/inbox-web?userId=${getUserId()}`)
}

export async function getAllUsers() {
  return await axios.post(`${BASE_URL}/users`)
}
