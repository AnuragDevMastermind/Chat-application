package com.example.plugin

import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import com.example.model.ChatSession
import com.example.services.JwtTokenService
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.auth.jwt.*
import io.ktor.server.plugins.*
import io.ktor.server.request.*
import io.ktor.server.sessions.*

fun Application.configureSecurity() {
    install(Sessions) {
        cookie<ChatSession>("SESSION")
    }

    intercept(ApplicationCallPipeline.Features) {
        if (call.request.uri.contains("chat-socket") && call.sessions.get<ChatSession>() == null) {
            val userId = call.parameters["userId"] ?: throw MissingRequestParameterException("userId")
            call.sessions.set(
                ChatSession(
                    userId = userId.toLong()
                )
            )
        }
    }

    authentication {
        jwt {
            val config = JwtTokenService.getTokenConfig(this@configureSecurity.environment)
            realm = this@configureSecurity.environment.config.property("jwt.realm").getString()
            verifier(
                JWT
                    .require(Algorithm.HMAC256(config.secret))
                    .withAudience(config.audience)
                    .withIssuer(config.issuer)
                    .build()
            )
            validate { credential ->
                if (credential.payload.audience.contains(config.audience)) {
                    JWTPrincipal(credential.payload)
                } else null
            }
        }
    }
}
