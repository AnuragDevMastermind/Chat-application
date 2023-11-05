package com.example.database.repositories

import com.example.database.DatabaseFactory
import com.example.database.SQL
import com.example.model.Message
import com.example.model.Messages
import com.example.model.Messages.inboxId
import com.example.model.Messages.senderId
import com.example.model.Messages.sentAt
import com.example.model.Messages.text
import io.ktor.server.plugins.*
import org.jetbrains.exposed.sql.ResultRow
import org.jetbrains.exposed.sql.SortOrder
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.select
import java.sql.ResultSet

object MessageRepository {

    private const val DEFAULT_PAGINATION_LIMIT = 10

    suspend fun getMessages(
        inboxId: Long,
        pageNo: Int
    ) = DatabaseFactory.dbQuery {
        val offset = DEFAULT_PAGINATION_LIMIT * (pageNo - 1)
        DatabaseFactory.getConnection().prepareStatement(SQL.MESSAGES).let { statement ->
            statement.setLong(1, inboxId)
            statement.setInt(2, DEFAULT_PAGINATION_LIMIT)
            statement.setInt(3, offset)
            val resultSet = statement.executeQuery()
            resultSet.toMessageList()
        }
    }

    suspend fun getMessagesWithoutIndex(
        userId: Long,
        friendId: Long,
        pageNo: Int
    ) = DatabaseFactory.dbQuery {
        val offset = DEFAULT_PAGINATION_LIMIT * (pageNo - 1)
        val inbox = InboxRepository.getInbox(
            userId = userId,
            friendId = friendId
        ) ?: throw BadRequestException("Inbox not found")

        DatabaseFactory.getConnection().prepareStatement(SQL.MESSAGES).let { statement ->
            statement.setLong(1, inbox.inboxId)
            statement.setInt(2, DEFAULT_PAGINATION_LIMIT)
            statement.setInt(3, offset)
            val resultSet = statement.executeQuery()
            resultSet.toMessageList()
        }
    }

    suspend fun insertMessage(
        message: Message
    ) = DatabaseFactory.dbQuery {
        Messages.insert {
            it[inboxId] = message.inboxId
            it[text] = message.text
            it[senderId] = message.senderId
            it[sentAt] = message.sentAt
        }.resultedValues!!.first().toMessage()
    }

    private fun ResultSet.toMessageList(): List<Message> = mutableListOf<Message>().apply {
        while (next()) {
            add(
                Message(
                    inboxId = getLong("inbox_id"),
                    text = getString("text"),
                    senderId = getLong("sender_id"),
                    sentAt = getLong("sent_at")
                )
            )
        }
    }

    suspend fun getLatestMessageForInbox(inboxId: Long) = DatabaseFactory.dbQuery {
        val result = Messages
            .select() { Messages.inboxId eq inboxId }
            .orderBy(Messages.sentAt, SortOrder.DESC)
            .limit(1)
            .singleOrNull()

        result?.toMessage()
    }

    private fun ResultRow.toMessage() = Message(
        inboxId = this[inboxId],
        text = this[text],
        senderId = this[senderId],
        sentAt = this[sentAt]
    )

}