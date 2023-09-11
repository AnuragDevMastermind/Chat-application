package com.example.neochat.api.chat

data class MessageItem(
    val inboxId: Int,
    val senderId: Int,
    val sentAt: Long,
    val text: String
)