package com.example.config

import com.example.controller.AuthController
import com.example.controller.InboxController
import com.example.controller.MessageController
import com.example.controller.UserController
import com.example.database.ChatController
import com.example.model.ChatSession
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.auth.jwt.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.server.sessions.*
import io.ktor.server.websocket.*
import io.ktor.websocket.*
import kotlinx.coroutines.channels.consumeEach
import kotlinx.serialization.json.Json

fun Application.configureRouting() {
    routing {
        webSocket("/chat-socket") {
            val session = call.sessions.get<ChatSession>()
            if (session == null) {
                close(CloseReason(CloseReason.Codes.VIOLATED_POLICY, "No session."))
                return@webSocket
            }
            try {
                ChatController.onJoin(
                    chatSession = session,
                    socket = this
                )
                incoming.consumeEach { frame ->
                    if (frame is Frame.Text) {
                        ChatController.sendMessage(
                            messageInfo = Json.decodeFromString(frame.readText())
                        )
                    }
                }
            } catch (e: Exception) {
                e.printStackTrace()
            } finally {
                ChatController.tryDisconnect(session.userId)
            }
        }
        post("/users") { UserController.getAllUsers(call) }
        post("/inbox") { InboxController.getAllUserInbox(call) }
        post("/message") { MessageController.getMessages(call) }
        post("/message/without-index") { MessageController.getMessageWithoutIndex(call) }
        post("/signin") { AuthController.signIn(call, this@configureRouting.environment) }
        post("/signup") { AuthController.signup(call) }
        authenticate {
            get("authenticate") { call.respond(HttpStatusCode.OK) }
            get("secret") {
                val principal = call.principal<JWTPrincipal>()
                val userId = principal?.getClaim("userId", String::class)
                call.respond(HttpStatusCode.OK, "Your userId is $userId")
            }
        }
    }
}
