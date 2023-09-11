package com.example.neochat.api.inbox

data class InboxItem(
    val friendId: Int,
    val friendName: String,
    val inboxId: Int,
    val userId: Int,
    val userName: String
)