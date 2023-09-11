package com.example.database.repositories

import com.example.database.DatabaseFactory
import com.example.model.Inbox
import com.example.model.Inboxes
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.transactions.transaction

object InboxRepository {

    suspend fun getInbox(
        inboxId: Long,
    ) = DatabaseFactory.dbQuery {
        Inboxes.select { Inboxes.inboxId eq inboxId }.first().toInbox()
    }

    suspend fun getAllUserInbox(userId: Long) = DatabaseFactory.dbQuery {
        Inboxes
            .select { (Inboxes.userId eq userId) or (Inboxes.friendId eq userId) }
            .map { resultRow ->
                resultRow.toInbox()
            }
    }

    fun getInbox(userId: Long, friendId: Long): Inbox? {
        return transaction {
            val c1 = ((Inboxes.userId eq userId) and (Inboxes.friendId eq friendId))
            val c2 = ((Inboxes.userId eq friendId) and (Inboxes.friendId eq userId))
            Inboxes
                .select { c1 or c2 }
                .firstOrNull()?.toInbox()
        }

    }

    private fun ResultRow.toInbox() = Inbox(
        inboxId = this[Inboxes.inboxId],
        userId = this[Inboxes.userId],
        friendId = this[Inboxes.friendId],
        userName = this[Inboxes.userName],
        friendName = this[Inboxes.friendName],
    )

    suspend fun insertInbox(inbox: Inbox) = DatabaseFactory.dbQuery {
        Inboxes.insert {
            it[userId] = inbox.userId
            it[friendId] = inbox.friendId
            it[userName] = inbox.userName
            it[friendName] = inbox.friendName
        }.resultedValues!!.first().toInbox()
    }
}