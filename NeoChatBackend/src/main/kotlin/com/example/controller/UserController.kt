package com.example.controller

import com.example.database.repositories.UserRepository
import io.ktor.server.application.*
import io.ktor.server.response.*
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json

object UserController {
    suspend fun getAllUsers(call: ApplicationCall) {
        val users = UserRepository.getAllUsers()
        call.respond(Json.encodeToString(users))
    }
}