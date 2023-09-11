package com.example.neochat.ui.screen.chat

import com.example.neochat.api.chat.MessageItem
import com.example.neochat.api.inbox.InboxItem

data class SocketMsgResponse(
    val message: MessageItem,
    val inbox: InboxItem
)
