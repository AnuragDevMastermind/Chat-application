package com.example.model

import kotlinx.serialization.Serializable

@Serializable
data class SignInResponse (
    val user: User,
    val token: String,
)