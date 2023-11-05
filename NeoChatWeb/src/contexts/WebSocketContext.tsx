import React, { useEffect, useContext, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { getAccessTokenCookie } from '../utils/TokenManager'
import { getUserId } from '../utils/Utils'
import { Message, MessageData } from '../utils/Types'

interface IWebSocketProviderProps {
  children: JSX.Element
}

const WebSocketContext = React.createContext({})

export function useWebSocket(): any {
  return useContext(WebSocketContext)
}

export function WebSocketProvider({
  children,
}: IWebSocketProviderProps): JSX.Element {
  const [messageData, setMessageData] = useState<MessageData>()
  const [socket, setSocket] = useState<WebSocket>()
  const { currentUser } = useAuth()

  const connectToWebSocket = () => {
    const newSocket = new WebSocket(
      `ws://127.0.0.1:8080/chat-socket?userId=${getUserId()}`
    )

    newSocket.onopen = () => {
      console.log('Connected to WebSocket server')
    }

    newSocket.onclose = () => {
      console.log('Disconnected from WebSocket server')
    }

    newSocket.onmessage = (event) => {
      setMessageData(JSON.parse(event.data.toString()))
    }

    return newSocket
  }

  const sendMessage = (message: Message) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message))
    }
  }

  useEffect(() => {
    const accessToken = getAccessTokenCookie()
    if (
      (currentUser != null && currentUser != undefined) ||
      (accessToken !== null && accessToken !== undefined)
    ) {
      const newSocket = connectToWebSocket()
      setSocket(newSocket)

      console.log('useEffect websocket')

      return () => {
        newSocket.close()
      }
    }
  }, [currentUser])

  const value = {
    connectToWebSocket,
    messageData,
    sendMessage,
  }

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  )
}
