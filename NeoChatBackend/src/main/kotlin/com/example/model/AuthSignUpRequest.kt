package com.example.model

import kotlinx.serialization.Serializable

@Serializable
data class AuthSignUpRequest(
    val name: String,
    val mobileNo: String,
    var password: String
)