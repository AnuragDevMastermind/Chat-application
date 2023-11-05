import React, { useState, useEffect, useRef } from 'react'
import styles from './Home.module.css'
import {
  messageResponse,
  messageWithoutIndexResponse,
} from '../utils/ApiManager'
import { useWebSocket } from '../contexts/WebSocketContext'
import { getUserId } from '../utils/Utils'

import { Inbox } from '../utils/Types'

interface MessagePanelProps {
  selectedInbox: Inbox
  onClose: () => void // Callback function to handle close button click
}

type MessagePOJO = {
  position: string
  messages: {
    text: string
    sentAt: number
  }[]
}

const MessagePanel: React.FC<MessagePanelProps> = ({
  selectedInbox,
  onClose,
}) => {
  const [pageNo, setPageNo] = useState(-1)
  const [messages, setMessages] = useState<MessagePOJO[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const inputMessageRef = useRef<HTMLInputElement>(null)
  const { messageData, sendMessage } = useWebSocket()
  const handleScroll = (e: any) => {
    const scrollableDiv = e.target
    const isAtTop =
      scrollableDiv.clientHeight - scrollableDiv.scrollTop + 1 >=
      scrollableDiv.scrollHeight

    if (isAtTop) {
      setPageNo((prev) => prev + 1)
    }
  }

  const getMessageData = async () => {
    let response
    if (selectedInbox.inboxId !== -1) {
      response = await messageResponse(selectedInbox.inboxId, pageNo)
    } else {
      response = await messageWithoutIndexResponse(
        selectedInbox.userId,
        selectedInbox.friendId,
        pageNo
      )
    }

    const data = response.data
    setMessages((prev) => [...prev, ...data])
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit()
      e.preventDefault()
    }
  }

  const handleSubmit = () => {
    if (inputMessage.trim() !== '') {
      sendMessage({
        message: {
          inboxId: selectedInbox.inboxId,
          text: inputMessage,
          senderId: getUserId(),
          sentAt: Date.now(),
        },
        inbox: selectedInbox,
      })

      if (inputMessageRef.current) {
        inputMessageRef.current.value = ''
      }
    }
  }

  useEffect(() => {
    if (pageNo != -1) getMessageData()
  }, [pageNo])

  useEffect(() => {
    setMessages([])
    if (pageNo == -1) setPageNo(1)
    else getMessageData()
  }, [selectedInbox])

  useEffect(() => {
    if (messageData && messageData.inbox.inboxId === selectedInbox.inboxId) {
      const updatedMessages = [...messages]
      const msgText = messageData?.message.text
      const posCal =
        messageData?.message.senderId.toString() === getUserId() ? 'R' : 'L'
      if (
        updatedMessages.length > 0 &&
        updatedMessages[0].position === posCal
      ) {
        updatedMessages[0].messages.push({
          text: msgText,
          sentAt: Date.now(),
        })
      } else {
        const newMessage = {
          position: posCal,
          messages: [{ text: msgText, sentAt: Date.now() }],
        }
        updatedMessages.unshift(newMessage)
      }
      setMessages(updatedMessages)
      setInputMessage('')
    }
  }, [messageData])

  return (
    <div className={styles.messagePanel}>
      <div className={styles.frameContainer}>
        <div className={styles.panelHeader}>
          <div className={styles.userContent}>
            <img
              className={styles.userContentChild}
              alt=""
              src={'/user2.png'}
            />
            <div className={styles.florencioDorranceParent}>
              <div className={styles.florencioDorrance}>
                {selectedInbox.userId.toString() === getUserId()
                  ? selectedInbox.friendName
                  : selectedInbox.userName}
              </div>
              <div className={styles.ellipseParent}>
                <div className={styles.frameChild} />
                <div className={styles.online}>Online</div>
              </div>
            </div>
          </div>
          <div className={styles.close1} onClick={onClose}>
            <img className={styles.vectorIcon} alt="" src="/vector.svg" />
          </div>
        </div>
        <div className={styles.divider1} />
        <div className={styles.messageList1} onScroll={handleScroll}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={
                message.position === 'L'
                  ? styles.frameParent10
                  : styles.frameParent11
              }
            >
              <div
                className={
                  message.position === 'L'
                    ? styles.messageItemParent
                    : styles.messageItemParentRight
                }
              >
                {message.messages.map((msg, msgIndex) => (
                  <div key={msgIndex} className={styles.messageItem}>
                    <div className={styles.messageContentGoes}>{msg.text}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.messageBox}>
        <img className={styles.paperclip1Icon} alt="" src="/paperclip-1.svg" />
        <div className={styles.typeAMessageParent}>
          <div className={styles.typeAMessage}>
            <input
              className={styles.messagePanelInput}
              type="text"
              placeholder="Type a message"
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              ref={inputMessageRef}
            />
          </div>
          <img
            onClick={handleSubmit}
            className={styles.paperPlane1Icon}
            alt=""
            src="/paperplane-1.svg"
          />
        </div>
      </div>
    </div>
  )
}

export default MessagePanel
