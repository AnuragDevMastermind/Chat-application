package com.example.controller

import com.example.database.repositories.UserRepository
import com.example.model.*
import com.example.services.JwtTokenService
import com.example.services.SHA256HashingService
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import org.apache.commons.codec.digest.DigestUtils

object AuthController {
    suspend fun signup(call: ApplicationCall) {
        val authSignUpRequest = call.receiveNullable<AuthSignUpRequest>() ?: run {
            call.respond(HttpStatusCode.BadRequest)
            return
        }

        val areFieldsBlank = authSignUpRequest.name.isBlank() || authSignUpRequest.mobileNo.isBlank()|| authSignUpRequest.password.isBlank()
        val isPwTooShort = authSignUpRequest.password.length < 8
        if (areFieldsBlank || isPwTooShort) {
            call.respond(HttpStatusCode.Conflict)
            return
        }

        UserRepository.insertUser(
            authSignUpRequest = authSignUpRequest,
            saltedHash = SHA256HashingService.generateSaltedHash(authSignUpRequest.password)
        )

        call.respond(HttpStatusCode.OK)
    }

    suspend fun signIn(call: ApplicationCall, environment: ApplicationEnvironment) {
        val request = call.receiveNullable<AuthSignInRequest>() ?: kotlin.run {
            call.respond(HttpStatusCode.BadRequest)
            return
        }

        val user = UserRepository.getUserByMobileNumber(request.mobileNo)
        if(user == null) {
            call.respond(HttpStatusCode.Conflict, "Incorrect username or password")
            return
        }

        val isValidPassword = SHA256HashingService.verify(
            value = request.password,
            saltedHash = SaltedHash(
                hash = user.password,
                salt = user.salt
            )
        )

        if(!isValidPassword) {
            println("Entered hash: ${DigestUtils.sha256Hex("${user.salt}${request.password}")}, Hashed PW: ${user.password}")
            call.respond(HttpStatusCode.Conflict, "Incorrect username or password")
            return
        }

        val token = JwtTokenService.generate(
            config = JwtTokenService.getTokenConfig(environment),
            TokenClaim(
                name = "userId",
                value = user.userId.toString()
            )
        )

        val signInResponse = SignInResponse(
            user = user,
            token = token
        )
        call.respond(Json.encodeToString(signInResponse))
    }
}