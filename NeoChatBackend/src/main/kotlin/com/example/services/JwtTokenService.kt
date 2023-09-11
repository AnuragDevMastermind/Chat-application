package com.example.services

import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import com.example.model.TokenClaim
import com.example.model.TokenConfig
import io.ktor.server.application.*
import java.util.*
import kotlin.time.Duration.Companion.days

object JwtTokenService {

    fun getTokenConfig(environment: ApplicationEnvironment) = TokenConfig(
        issuer = environment.config.property("jwt.issuer").getString(),
        audience = environment.config.property("jwt.audience").getString(),
        expiresIn = 365.days.inWholeMilliseconds,
        secret = System.getenv("JWT_SECRET")
    )

    fun generate(config: TokenConfig, vararg claims: TokenClaim): String {
        var token = JWT.create()
            .withAudience(config.audience)
            .withIssuer(config.issuer)
            .withExpiresAt(Date(System.currentTimeMillis() + config.expiresIn))
        claims.forEach { claim ->
            token = token.withClaim(claim.name, claim.value)
        }
        return token.sign(Algorithm.HMAC256(config.secret))
    }
}