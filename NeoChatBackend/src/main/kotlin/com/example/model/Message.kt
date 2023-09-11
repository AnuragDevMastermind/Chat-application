package com.example.model

import kotlinx.serialization.Serializable
import org.jetbrains.exposed.dao.id.LongIdTable

@Serializable
data class Message(
    val inboxId: Long,
    val text: String,
    val senderId: Long,
    val sentAt: Long
)

object Messages : LongIdTable("messages") {
    val inboxId = long("inbox_id").autoIncrement()
    val text = text("text")
    val senderId = long("sender_id")
    val sentAt = long("sent_at")
}