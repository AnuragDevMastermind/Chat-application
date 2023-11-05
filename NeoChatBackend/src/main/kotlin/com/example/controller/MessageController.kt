package com.example.controller

import com.example.database.repositories.MessageRepository
import com.example.model.Message
import io.ktor.server.application.*
import io.ktor.server.plugins.*
import io.ktor.server.response.*
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import kotlinx.serialization.Serializable

object MessageController {
    suspend fun getMessages(call: ApplicationCall) {
        val inboxId = call.parameters["inboxId"]?.toLongOrNull()
            ?: throw MissingRequestParameterException("inboxId")
        val pageNo = call.parameters["pageNo"]?.toIntOrNull()
            ?: throw MissingRequestParameterException("pageNo")
        val messages = MessageRepository.getMessages(
            inboxId = inboxId,
            pageNo = pageNo
        )
        call.respond(Json.encodeToString(messages))
    }

    suspend fun getMessageWithoutIndex(call: ApplicationCall) {
        val userId = call.parameters["userId"]?.toLongOrNull()
            ?: throw MissingRequestParameterException("userId")
        val friendId = call.parameters["friendId"]?.toLongOrNull()
            ?: throw MissingRequestParameterException("friendId")
        val pageNo = call.parameters["pageNo"]?.toIntOrNull()
            ?: throw MissingRequestParameterException("pageNo")
        val messages = MessageRepository.getMessagesWithoutIndex(
            userId = userId,
            friendId = friendId,
            pageNo = pageNo
        )
        call.respond(Json.encodeToString(messages))
    }

    suspend fun getMessagesWeb(call: ApplicationCall) {
        val inboxId = call.parameters["inboxId"]?.toLongOrNull()
            ?: throw MissingRequestParameterException("inboxId")
        val pageNo = call.parameters["pageNo"]?.toIntOrNull()
            ?: throw MissingRequestParameterException("pageNo")
        val userId = call.parameters["userId"]?.toLongOrNull()
            ?: throw MissingRequestParameterException("userId")
        val messages = MessageRepository.getMessages(inboxId = inboxId, pageNo = pageNo)

        val formattedMessages = formatMessages(messages, userId)
        call.respond(Json.encodeToString(formattedMessages))
    }

    suspend fun getMessagesWebWithoutIndex(call: ApplicationCall) {
        val userId = call.parameters["userId"]?.toLongOrNull()
            ?: throw MissingRequestParameterException("userId")
        val friendId = call.parameters["friendId"]?.toLongOrNull()
            ?: throw MissingRequestParameterException("friendId")
        val pageNo = call.parameters["pageNo"]?.toIntOrNull()
            ?: throw MissingRequestParameterException("pageNo")
        val messages = MessageRepository.getMessagesWithoutIndex(
            userId = userId,
            friendId = friendId,
            pageNo = pageNo
        )

        val formattedMessages = formatMessages(messages, userId)
        call.respond(Json.encodeToString(formattedMessages))
    }

    @Serializable
    data class FormattedMessage(
        val position: String,
        val messages: List<MessageWithoutPosition>
    )

    @Serializable
    data class MessageWithoutPosition(val text: String, val sentAt: Long)

    fun formatMessages(messages: List<Message>, userId: Long): List<FormattedMessage> {
        val groupedMessages = groupConsecutiveMessages(messages)

        return groupedMessages
            .map { list ->
                FormattedMessage(
                    getMessagePosition(list[0], userId),
                    list.map { MessageWithoutPosition(it.text, it.sentAt) }
                )
            }
    }

    fun groupConsecutiveMessages(messages: List<Message>): List<List<Message>> {
        if (messages.isEmpty()) return emptyList()

        return messages.fold(mutableListOf<MutableList<Message>>()) { result, current ->
            val lastGroup = result.lastOrNull()
            if (lastGroup != null && lastGroup.last().senderId == current.senderId) {
                lastGroup.add(current)
            } else {
                result.add(mutableListOf(current))
            }
            result
        }.reversed()
    }


    fun getMessagePosition(message: Message, userId: Long): String {
        // Implement your logic to determine the position ("L" or "R") based on the message properties
        // For example, you can compare the senderId to decide the position.
        // Replace this logic with your actual implementation.
        return if (message.senderId == userId) "R" else "L"
    }


    /*    suspend fun getMessagesWeb(call: ApplicationCall) {
            val pageNo = call.parameters["pageNo"]?.toIntOrNull()
                ?: throw MissingRequestParameterException("pageNo")
            if (pageNo > 10)
                call.respond("[]")
            else
                call.respond(
                    "[\n" +
                            "    {\n" +
                            "        \"position\": \"L\",\n" +
                            "        \"messages\": [\n" +
                            "            {\n" +
                            "                \"text\": \"hi mohan counter: ${pageNo}\",\n" +
                            "                \"sentAt\": 1693759627042\n" +
                            "            },\n" +
                            "            {\n" +
                            "                \"text\": \"hi mohan2\",\n" +
                            "                \"sentAt\": 1693759715290\n" +
                            "            }\n" +
                            "        ]\n" +
                            "    },\n" +
                            "    {\n" +
                            "        \"position\": \"R\",\n" +
                            "        \"messages\": [\n" +
                            "            {\n" +
                            "                \"text\": \"hi rohan 1\",\n" +
                            "                \"sentAt\": 1693763225355\n" +
                            "            },\n" +
                            "            {\n" +
                            "                \"text\": \"hi rohan 2\",\n" +
                            "                \"sentAt\": 1693763235548\n" +
                            "            }\n" +
                            "        ]\n" +
                            "    }\n" +
                            "]"
                )
        }*/
}