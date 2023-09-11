package com.example.model

import kotlinx.serialization.Serializable

@Serializable
data class MessageInfo(
    var message: Message,
    var inbox: Inbox
)