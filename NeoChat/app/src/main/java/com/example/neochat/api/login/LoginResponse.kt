package com.example.neochat.api.login

data class LoginResponse(
    val token: String,
    val user: User
)