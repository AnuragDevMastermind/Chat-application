package com.example.controller

import com.example.database.repositories.InboxRepository
import com.example.database.repositories.MessageRepository
import com.example.model.Inbox
import com.example.model.InboxWeb
import io.ktor.server.application.*
import io.ktor.server.plugins.*
import io.ktor.server.response.*
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json

object InboxController {
    suspend fun getAllUserInbox(call: ApplicationCall) {
        val userId = call.parameters["userId"]?.toLongOrNull()
            ?: throw MissingRequestParameterException("userId")
        val userInbox = InboxRepository.getAllUserInbox(userId)
        call.respond(Json.encodeToString(userInbox))
    }

    suspend fun getAllUserInboxWeb(call: ApplicationCall) {
        val userId = call.parameters["userId"]?.toLongOrNull()
            ?: throw MissingRequestParameterException("userId")
        val userInbox = InboxRepository.getAllUserInbox(userId)
        val inboxWeb = userInbox.map { inbox: Inbox ->
            InboxWeb(
                inbox = inbox,
                message = MessageRepository.getLatestMessageForInbox(inbox.inboxId),
            )
        }
        call.respond(Json.encodeToString(inboxWeb))
    }
}