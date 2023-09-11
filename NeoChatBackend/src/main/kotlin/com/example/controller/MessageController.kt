package com.example.controller

import com.example.database.repositories.MessageRepository
import io.ktor.server.application.*
import io.ktor.server.plugins.*
import io.ktor.server.response.*
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json

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
}