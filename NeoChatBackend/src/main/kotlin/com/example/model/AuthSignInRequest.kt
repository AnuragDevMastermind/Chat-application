package com.example.model

import kotlinx.serialization.Serializable

@Serializable
data class AuthSignInRequest(
    val mobileNo: String,
    var password: String
)