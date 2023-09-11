package com.example.model

import kotlinx.serialization.Serializable

@Serializable
data class AuthResponse(
    val token: String
)
