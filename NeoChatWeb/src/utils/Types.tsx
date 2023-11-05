export type Message = {
  inboxId: number
  text: string
  senderId: number
  sentAt: number
}

export type Inbox = {
  inboxId: number
  userId: number
  friendId: number
  userName: string
  friendName: string
}

export type MessageData = {
  message: Message
  inbox: Inbox
}

export type User = {
  userId: number
  name: string
  mobileNo: string
  password: string
  salt: string
}
