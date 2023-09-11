package com.example.neochat.api.login

data class User(
    val mobileNo: String,
    val name: String,
    val password: String,
    val salt: String,
    val userId: Int
)