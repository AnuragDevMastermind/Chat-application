package com.example.neochat.api.allusers

data class AllUsersResponseItem(
    val mobileNo: String,
    val name: String,
    val password: String,
    val salt: String,
    val userId: Int
)