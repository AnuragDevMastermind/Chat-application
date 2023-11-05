package com.example.model

import kotlinx.serialization.Serializable
import org.jetbrains.exposed.sql.Table

@Serializable
data class Inbox(
    val inboxId: Long,
    val userId: Long,
    val friendId: Long,
    val userName: String,
    val friendName: String
)

@Serializable
data class InboxWeb(
    val inbox: Inbox,
    val message: Message?
)

object Inboxes : Table("inbox") {
    val inboxId = long("inbox_id").autoIncrement()
    val userId = long("user_id")
    val friendId = long("friend_id")
    val userName = varchar("user_name", 255)
    val friendName = varchar("friend_name", 255)

    override val primaryKey = PrimaryKey(inboxId)
}