package com.example.database

import com.example.database.repositories.InboxRepository
import com.example.database.repositories.MessageRepository
import com.example.model.ChatSession
import com.example.model.Member
import com.example.model.MessageInfo
import io.ktor.websocket.*
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import java.util.concurrent.ConcurrentHashMap

object ChatController {
    private val members = ConcurrentHashMap<Long, Member>()

    fun onJoin(
        chatSession: ChatSession,
        socket: WebSocketSession
    ) {
        members[chatSession.userId] = Member(
            chatSession = chatSession,
            socket = socket
        )
    }

    suspend fun sendMessage(
        messageInfo: MessageInfo
    ) {
        messageInfo.apply {
            if (inbox.inboxId.isInValidInbox()) {
                inbox = InboxRepository.getInbox(
                    userId = inbox.userId,
                    friendId = inbox.friendId
                ) ?: InboxRepository.insertInbox(inbox)
                message = message.copy(inboxId = inbox.inboxId)
            }

            MessageRepository.insertMessage(message)
            val parsedMessage = Json.encodeToString(this)
            members[inbox.userId]?.socket?.send(Frame.Text(parsedMessage))
            members[inbox.friendId]?.socket?.send(Frame.Text(parsedMessage))
        }
    }

    suspend fun tryDisconnect(userId: Long) {
        members[userId]?.socket?.close()
        if (members.containsKey(userId)) {
            members.remove(userId)
        }
    }
}

private fun Long.isInValidInbox() = this < 0
