package com.example.model

import io.ktor.websocket.*

data class Member(
    val chatSession: ChatSession,
    val socket: WebSocketSession
)
